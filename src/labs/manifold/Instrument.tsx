import {
  memo,
  useLayoutEffect,
  useRef,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { getShellCommits, subscribeShellCommits } from "../../shell/shellCommits";
import { LINE_A, LINE_B, LINE_SUM, SEED_A, SEED_B } from "./addresses";
import { createBus, type Bus } from "./bus";
import { createCounts, type Counts } from "./counts";
import { formatSum } from "./derive";
import { createLineStore, type ExternalStore } from "./externalStore";
import { useBind } from "./useBind";

export type InstrumentMode = "bus" | "store";

function useConstant<T>(create: () => T): T {
  const ref = useRef<T | null>(null);
  if (ref.current === null) ref.current = create();
  return ref.current;
}

function useLineBus(counts: Counts): Bus {
  const bus = useConstant(() => {
    const created = createBus();
    created.write(LINE_A, SEED_A);
    created.write(LINE_B, SEED_B);
    counts.syncWrites(created.writeCount);
    return created;
  });

  useLayoutEffect(() => {
    const stop = bus.depend([LINE_A, LINE_B], () => {
      bus.write(LINE_SUM, formatSum(bus.get(LINE_A), bus.get(LINE_B)));
    });
    counts.syncWrites(bus.writeCount);
    return stop;
  }, [bus, counts]);

  return bus;
}

const BusReadout = memo(function BusReadout({
  bus,
  address,
  which,
  counts,
}: {
  bus: Bus;
  address: string;
  which: "a" | "b" | "sum";
  counts: Counts;
}) {
  const ref = useBind<HTMLElement>(bus, address);
  // Every commit. A dependency array would skip later commits, because
  // `counts` and `which` do not change.
  useLayoutEffect(() => {
    counts.noteReadoutCommit(which);
  });
  return (
    <strong
      ref={ref}
      className="figure"
      data-address={address}
      aria-live="polite"
    />
  );
});

const StoreReadout = memo(function StoreReadout({
  store,
  address,
  which,
  counts,
}: {
  store: ExternalStore;
  address: string;
  which: "a" | "b" | "sum";
  counts: Counts;
}) {
  const value = useSyncExternalStore(
    store.subscribe(address),
    () => store.get(address),
    () => store.get(address),
  );
  useLayoutEffect(() => {
    counts.noteReadoutCommit(which);
  });
  return (
    <strong className="figure" data-address={address} aria-live="polite">
      {value}
    </strong>
  );
});

function Tally({ counts }: { counts: Counts }) {
  const shellRef = useRef<HTMLElement>(null);
  const exhibitRef = useRef<HTMLElement>(null);
  const figureARef = useRef<HTMLElement>(null);
  const figureBRef = useRef<HTMLElement>(null);
  const totalRef = useRef<HTMLElement>(null);
  const writesRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const paint = () => {
      const snap = counts.snapshot();
      if (shellRef.current) shellRef.current.textContent = String(getShellCommits());
      if (exhibitRef.current) {
        exhibitRef.current.textContent = String(snap.exhibitCommits);
      }
      if (figureARef.current) figureARef.current.textContent = String(snap.figureA);
      if (figureBRef.current) figureBRef.current.textContent = String(snap.figureB);
      if (totalRef.current) totalRef.current.textContent = String(snap.total);
      if (writesRef.current) writesRef.current.textContent = String(snap.writes);
    };
    paint();
    const stopCounts = counts.subscribe(paint);
    const stopShell = subscribeShellCommits(paint);
    return () => {
      stopCounts();
      stopShell();
    };
  }, [counts]);

  return (
    <dl className="tally">
      <div>
        <dt>Address writes</dt>
        <dd data-count="writes" ref={writesRef}>
          0
        </dd>
      </div>
      <div>
        <dt>Shell updates</dt>
        <dd data-count="shell" ref={shellRef}>
          0
        </dd>
      </div>
      <div>
        <dt>Exhibit updates</dt>
        <dd data-count="exhibit" ref={exhibitRef}>
          0
        </dd>
      </div>
      <div className="tally__span">
        <p className="tally-group__label">Readout updates</p>
      </div>
      <div>
        <dt>Line A</dt>
        <dd data-count="figure-a" ref={figureARef}>
          0
        </dd>
      </div>
      <div>
        <dt>Line B</dt>
        <dd data-count="figure-b" ref={figureBRef}>
          0
        </dd>
      </div>
      <div>
        <dt>Total</dt>
        <dd data-count="total" ref={totalRef}>
          0
        </dd>
      </div>
    </dl>
  );
}

const LINE_A_WRITES = [
  "keystroke",
  "write line.a",
  "derive sum",
  "write line.sum",
] as const;

function lineAFlow(mode: InstrumentMode): readonly string[] {
  if (mode === "store") {
    return [...LINE_A_WRITES, "update A readout", "update total readout"];
  }
  return [...LINE_A_WRITES, "update total node", "update A node"];
}

function KeystrokeFlow({ mode }: { mode: InstrumentMode }) {
  return (
    <div className="flow-block">
      <ol className="flow" aria-label="A Line A keystroke">
        {lineAFlow(mode).map((step) => (
          <li key={step}>&nbsp;{step}&nbsp;</li>
        ))}
      </ol>
    </div>
  );
}

function InstrumentCard({
  modeLabel,
  counts,
  onCounts,
  onChangeA,
  onChangeB,
  figureA,
  figureB,
  total,
}: {
  modeLabel: string;
  counts: Counts;
  onCounts?: (counts: Counts | null) => void;
  onChangeA: (value: string) => void;
  onChangeB: (value: string) => void;
  figureA: ReactNode;
  figureB: ReactNode;
  total: ReactNode;
}) {
  useLayoutEffect(() => {
    counts.noteExhibitCommit();
  });

  useLayoutEffect(() => {
    onCounts?.(counts);
    return () => onCounts?.(null);
  }, [counts, onCounts]);

  return (
    <section className="glass instrument" aria-labelledby="manifold-instrument-title">
      <p className="status">
        <span className="status__label">Instrument</span>
        {modeLabel}
      </p>
      <h2 id="manifold-instrument-title">Two line items and total</h2>
      <div className="lines">
        <div className="line">
          <label htmlFor="line-a">Line A</label>
          <input
            id="line-a"
            name="line.a"
            inputMode="decimal"
            autoComplete="off"
            defaultValue={SEED_A}
            onInput={(event) => onChangeA(event.currentTarget.value)}
          />
          <p className="figure-row">
            <span className="figure-label">Figure</span>
            {figureA}
          </p>
        </div>
        <div className="line">
          <label htmlFor="line-b">Line B</label>
          <input
            id="line-b"
            name="line.b"
            inputMode="decimal"
            autoComplete="off"
            defaultValue={SEED_B}
            onInput={(event) => onChangeB(event.currentTarget.value)}
          />
          <p className="figure-row">
            <span className="figure-label">Figure</span>
            {figureB}
          </p>
        </div>
      </div>
      <p className="figure-row total-row">
        <span className="figure-label">Total</span>
        {total}
      </p>
    </section>
  );
}

export function ManifoldTrace({
  mode,
  counts,
}: {
  mode: InstrumentMode;
  counts: Counts | null;
}) {
  if (!counts) return null;
  return (
    <>
      <KeystrokeFlow mode={mode} />
      {/*
        Both modes: the browser updates the input first, then two writes
        (line.a, then line.sum). Address space then updates the total node
        and the A node directly. React control renders the A readout and the
        total readout afterward. Those two can share one pass. The rest of
        the account is in src/labs/manifold/README.md.
      */}
      <p className="tally-note">
        Readout updates count readout components that rendered again. On the
        React control, the edited line and the total can share one pass.
        Address space writes those DOM nodes directly, so a keystroke adds
        address writes and no readout updates.
        {import.meta.env.DEV
          ? " Development strict mode mounts an extra time, so the opening counts include that."
          : ""}
      </p>
      <Tally counts={counts} />
    </>
  );
}

function BusInstrument({
  onCounts,
}: {
  onCounts?: (counts: Counts | null) => void;
}) {
  const counts = useConstant(createCounts);
  const bus = useLineBus(counts);

  const writeLine = (address: string, value: string) => {
    const before = bus.writeCount;
    bus.write(address, value);
    if (bus.writeCount !== before) counts.syncWrites(bus.writeCount);
  };

  return (
    <InstrumentCard
      modeLabel="Address space"
      counts={counts}
      onCounts={onCounts}
      onChangeA={(value) => writeLine(LINE_A, value)}
      onChangeB={(value) => writeLine(LINE_B, value)}
      figureA={
        <BusReadout bus={bus} address={LINE_A} which="a" counts={counts} />
      }
      figureB={
        <BusReadout bus={bus} address={LINE_B} which="b" counts={counts} />
      }
      total={
        <BusReadout bus={bus} address={LINE_SUM} which="sum" counts={counts} />
      }
    />
  );
}

function StoreInstrument({
  onCounts,
}: {
  onCounts?: (counts: Counts | null) => void;
}) {
  const counts = useConstant(createCounts);
  const store = useConstant(() => {
    const next = createLineStore();
    counts.syncWrites(next.writeCount);
    return next;
  });

  const writeLine = (address: string, value: string) => {
    const before = store.writeCount;
    store.write(address, value);
    if (store.writeCount !== before) counts.syncWrites(store.writeCount);
  };

  return (
    <InstrumentCard
      modeLabel="React control"
      counts={counts}
      onCounts={onCounts}
      onChangeA={(value) => writeLine(LINE_A, value)}
      onChangeB={(value) => writeLine(LINE_B, value)}
      figureA={
        <StoreReadout store={store} address={LINE_A} which="a" counts={counts} />
      }
      figureB={
        <StoreReadout store={store} address={LINE_B} which="b" counts={counts} />
      }
      total={
        <StoreReadout
          store={store}
          address={LINE_SUM}
          which="sum"
          counts={counts}
        />
      }
    />
  );
}

export const ManifoldInstrument = memo(function ManifoldInstrument({
  mode,
  onCounts,
}: {
  mode: InstrumentMode;
  onCounts?: (counts: Counts | null) => void;
}) {
  if (mode === "store") return <StoreInstrument onCounts={onCounts} />;
  return <BusInstrument onCounts={onCounts} />;
});

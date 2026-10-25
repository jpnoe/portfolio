import { useEffect, useState } from "react";
import { hrefForMode, modeFromSearch } from "../labs/manifold/control";
import type { Counts } from "../labs/manifold/counts";
import {
  ManifoldInstrument,
  ManifoldTrace,
  type InstrumentMode,
} from "../labs/manifold/Instrument";
import { ManifoldStudy } from "../labs/manifold/ManifoldStudy";
import { PageHeader } from "../shell/PageHeader";

export function ManifoldPage() {
  const [mode, setMode] = useState<InstrumentMode>(() =>
    modeFromSearch(window.location.search),
  );
  const [counts, setCounts] = useState<Counts | null>(null);

  useEffect(() => {
    const sync = () => setMode(modeFromSearch(window.location.search));
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  const select = (next: InstrumentMode) => {
    if (next === mode) return;
    window.history.pushState(
      null,
      "",
      hrefForMode(window.location.pathname, window.location.search, next),
    );
    setMode(next);
  };

  return (
    <article className="page">
      <PageHeader
        index="03 — Study"
        title="Manifold"
      />
      <ManifoldStudy />
      <ManifoldInstrument key={mode} mode={mode} onCounts={setCounts} />
      <details className="disclosure">
        <summary id="mode-select-label">Technical control</summary>
        <div className="disclosure__body">
          <div className="mode-select__options" role="radiogroup" aria-labelledby="mode-select-label">
            <button
              type="button"
              role="radio"
              data-mode="bus"
              aria-checked={mode === "bus"}
              onClick={() => select("bus")}
            >
              Address space
            </button>
            <button
              type="button"
              role="radio"
              data-mode="store"
              aria-checked={mode === "store"}
              onClick={() => select("store")}
            >
              React control
            </button>
          </div>
          {mode === "bus" && (
            <p className="tally-note">
              <strong>Developer note:</strong> After mount, typing updates the
              edited figure node and the total node directly. The readout
              components do not render again. The React control makes the same
              visible change by rendering the subscribed readouts. This is a
              structural observation, not a latency result.
            </p>
          )}
          {mode === "store" && (
            <p className="tally-note">
              <strong>Developer note:</strong> Each readout has its own
              useSyncExternalStore subscriber. A keystroke renders the edited
              readout and the total. Those two updates can share one React
              pass. The address space writes those DOM nodes directly.
            </p>
          )}
        </div>
      </details>
      <details className="disclosure">
        <summary>Execution trace</summary>
        <div className="disclosure__body">
          <ManifoldTrace mode={mode} counts={counts} />
        </div>
      </details>
    </article>
  );
}

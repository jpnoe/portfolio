# Reference architecture review

Preserved 6 Oct 2026 from a read of the two reference trees, before any address-bus code landed in this repository.

Sources, both read-only:

- `manifold-main` — the research bench (hydraulics tree, sweep harness, telemetry).
- `fullstack` — the simplified checksheet. Conversation sometimes called this `react-killer`; that name was a mixup. The folder is `fullstack`.

This repository (`portfolio`) is the writable record. It does not vendor either tree.

Three kinds of statement are kept apart below.

| Kind | Meaning |
| --- | --- |
| Implemented mechanism | Behavior present in the reference source. |
| Measured evidence | A number written down by a run. Scope and gaps stay attached to the number. |
| Unvalidated claim | A sentence in copy, comments, or a plan that no saved run supports. |

## Implemented mechanisms

These four are real in both references. They are the part worth carrying forward later, behind `src/labs/manifold`, and only when an exhibit needs them.

1. **Address to DOM map.** `Manifold` keeps `coordinate → set of atom ids` and `atom id → element`. `emit` writes those elements directly. Lookup is a `Map` get. In `fullstack` the address is a readable string (`fieldId:value`). In `manifold-main` it is a fixed 14-character base-36 encoding.
2. **Mount-only React hook.** `useAtom` and `useOrbitalAtom` register a ref in `useLayoutEffect` and remove it on cleanup. The input path does not call `setState`.
3. **Separate value map.** `OrbitalLedger` stores the current value beside the DOM. A write that finds an equal value returns before paint. `manifold-main` also records source commits in a time ledger and can replay them for rewind.
4. **Dependent index.** A source address points at recompute functions. The hydraulics sum keeps a running total and applies a delta. Extra fan-out sinks each get their own function in the visual bench; the headless world folds them into one function so the index stays one edge per leaf, then that function still writes each sink.

Surrounding machinery that is also implemented, and that this repository is not taking:

- Base-36 coordinate encoder (`BBB:IIIIIIIIII`, FNV-1a identity, `BigInt` behavior decode on paint).
- Commit gate with `write`, `rewind`, and `seed`.
- Wormhole map: a signature string resolves to one canonical address (`hyd.system.pressure`).
- Projection modes `sync`, `headless`, and `governed`. Governed mode queues paints and flushes at most 8 ms per frame. Flush priority reads demo class names (`.pressure`, `.fanout-chip`, `.field__input`).
- Physical lens selector. `selectLens` runs at the end of a telemetry stroke and stores a label. `dispatch`, `runFluid`, `runPhotoelectric`, `runThermodynamic`, and `runAdversarial` have no callers outside `selector.ts`.
- Chromatic phase matrix: schedules style writes for a visual effect. The React tree comment says it stays off the primary benchmark unless armed.
- Time-ledger rewind (hold-to-rewind).
- Photon pressure threshold and a flash on every emit in `fullstack`. The checksheet never passes a threshold other than the default `1`.
- `fullstack` ledger methods that reach past the registry: `setExpandedAll` sets caret text with `querySelectorAll`, and `setSystemInService` edits `className` through `getBinding`.
- `useOrbitalAtom` imports `demo/telemetry.ts`. The hook and the scoreboard are one module graph.
- Sweep UI, Chart.js, `server.ts`, and `simulator.py`.

The two React opponents are different programs.

- `fullstack` `ReactChecksheet` is a naive root `useState` tree. The file says so: no memo, and a visible-tree re-evaluation on expand and typing. `bumpReactRender` counts that root function body.
- `manifold-main` `ReactTree` is a steel-manned control: uncontrolled inputs, memoized branches, and `useSyncExternalStore` slots so a leaf write notifies the fan-out subscribers. Burst mode `flushSync`s those publishes.

## Measured evidence

All of this comes from `manifold-main/public/benchmark_fixture.json`, generated `2026-08-04T02:06:08.785Z`. One sweep. No repeats. 48 cells: engines `orbital` and `react`; N of 2000, 10000, and 25000; fan-out 1, 8, 32, and 128; burst 1 and 8; speed 0. Each cell’s `durationMs` is 2000.

**Keystroke latency was not captured.** `p95Ms`, `peakMs`, and `avgMs` are 0 on all 48 rows. `longTaskCount` and `heapDeltaMb` are 0 on all 48 rows. The bench UI states this directly: latency fields are zero and the sweep needs a re-run with the telemetry ticker mounted. Treat that warning as part of the evidence.

**Mount duration was captured, and it is a different metric.** `mountMs` is non-zero on every row. The bench excludes mount from the typing scoreboard (`ignorePeakFor`). At fan-out 1 and burst 1, rounded to the nearest millisecond:

| N | Orbital mount | React mount |
| --- | ---: | ---: |
| 2000 | 380 ms | 254 ms |
| 10000 | 942 ms | 804 ms |
| 25000 | 3748 ms | 2365 ms |

The highest cell is orbital, N 25000, fan-out 128, burst 1, at about 5362 ms. These are single observations of whatever that sweep called “sheet mount.” They are not a published mount benchmark and they are not keystroke cost.

**Structural counters did move.** `depsPerStroke` is 1, 8, 32, or 128, matching fan-out. `touchesPerStroke` equals fan-out on all 24 React rows and is 0 on all 24 orbital rows. That matches the ticker gap: the React side recorded fan-out notifications; the orbital side recorded no paints.

`fullstack/PLAN.md` does not add a measurement. Its “~100 ms” and “~33 ms” peaks are examples inside a demo script.

## Unvalidated claims

Do not cite these as results.

- A horizontal latency series would prove O(1) work. Address lookup is a hash get. A keystroke still runs the dependent functions and one write per sink. The hero chart has no latency to draw.
- Headless mode “stays flat” at 100,000 leaves. `HEADLESS_MAX_LEAVES` is 100000. The fixture stops at 25000 and stores no manifold milliseconds.
- Governed paint locks 60 FPS. The 8 ms slice budget is implemented. The fixture does not measure frame time.
- The lens formula routes updates. It labels a finished stroke.
- Wormholes emit to many branches at once. The map stores one canonical address. Fan-out is the dependent index.
- Orbital renders stay at zero while React walks the fat tree, as a general result. Orbital inputs do avoid `setState`. The `manifold-main` React control also avoids a full-tree walk. The `fullstack` React sheet does walk from the root. Those are three implementations, and none of them has a saved frame-time comparison.
- “Zero re-renders” for the whole page. Host chrome in the bench still renders when dials change.

## Coupling this repository leaves behind

Copying the bench in order to look finished would fuse the site to a scoreboard.

- Irreversible hashed addresses, and a `BigInt` decode on the paint path.
- A selector, a chromatic field, rewind, and projection modes that know demo CSS classes.
- A core hook that imports the harness.
- A ledger that queries the document.
- WebSocket, Python simulator, and Chart.js sweep UI.
- Either React opponent as if it were “React.”

## Decision for this repository

Ordinary pages stay ordinary React. The shell does not import an address bus.

`src/labs/manifold` is the only future home for a bus. Until an exhibit needs one, that folder holds a placeholder and this note’s conclusions, not a port of either reference.

When a bus does land, the smallest shape agreed on 6 Oct 2026 is:

- One bus per interactive exhibit. Readable addresses such as `hydraulics.psi-a:value`.
- Three maps: values, bound nodes, dependents.
- `write` skips an unchanged value, stores, runs dependents, then paints an input, text, or the `hidden` attribute.
- A mount hook registers a ref and removes it on cleanup.
- Static pages do not go through that hook.

A new latency claim waits for a run whose p95 is not zero, with the metric, the opponent, and the hardware written down beside it.

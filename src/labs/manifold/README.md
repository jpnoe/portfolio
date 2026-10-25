# Manifold boundary

This directory is the only place an address bus may live.

- `src/shell` must not import this folder. The shell is ordinary React.
- The Manifold page may import the exhibit (`ManifoldStudy`, `ManifoldInstrument`).
- Do not copy `manifold-main` or `fullstack` into this directory.
- A latency claim does not land here until a run records it. The review is `docs/reference-architecture-review.md`.

The Manifold page mounts one card at a time. Public labels are "Address space" and "React control". The code modes stay `bus` and `store`. `/work/manifold?control=store` is a deep link the page writes itself. The shell router still tracks the pathname only.

The store control uses the same addresses, sum, and initial values. Each readout has one `useSyncExternalStore` subscriber. The comparison is a direct DOM-node update versus those readout components rendering again. It is not React in general, and it is not a race.

Address writes count stored values. Readout updates count readout components that rendered again. On the React control, the edited line and the total can share one pass. The counters are not a count of separate root commits.

The public page shows the instrument first. Technical control and the execution trace are collapsed underneath. The trace stays mode-specific.

A Line A keystroke:

1. The browser changes the input. That field is current without an address write.
2. `write line.a` stores the new value. On the address bus, dependents run before that address's DOM node is updated.
3. The sum is derived, then `write line.sum` runs. On the address bus this updates the total node before `write line.a` updates the A figure node. One address write may update every node bound there. This card binds one figure per address.
4. On the React control the writes are the same two. React then updates the readout components in tree order: the A figure, then the total. Those component updates can share one pass.
5. Line B does not change. Two writes, three current values: the input, the A figure, and the total.

16.7 ms is the 60 Hz frame budget (1000/60, to one decimal). This exhibit does not record time. In development, React strict mode mounts an extra time, so the opening counts include that extra mount. Typing is the signal.

Public labels are "Address space" and "React control". The code modes stay `bus` and `store`. The selector and the instrument status must use the same public words.

The study page no longer repeats the bench result. The saved sweep in manifold-main records mount time and leaves p95, peak, and average at 0 ms. Do not cite those as latency.

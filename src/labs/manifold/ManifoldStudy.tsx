/**
 * Study text for the Manifold page. The instrument is Instrument.tsx.
 * What is not evidence yet lives in this folder's README, not on the page.
 */
export function ManifoldStudy() {
  return (
    <section className="glass" aria-labelledby="manifold-question">
      <h2 id="manifold-question">The question</h2>
      <p>
        When a value changes, can the screen update the nodes that depend on
        it without asking React to reconcile the surrounding tree?
      </p>
      <h2>What is currently implemented</h2>
      <ul className="principles">
        <li>A map from an address to the DOM nodes that display it.</li>
        <li>A hook that registers a node on mount and removes it on cleanup.</li>
        <li>A value map that skips a write when nothing changed.</li>
        <li>A dependent index for formulas, including a running sum.</li>
      </ul>
    </section>
  );
}

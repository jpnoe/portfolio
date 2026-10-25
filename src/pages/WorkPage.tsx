import { ProjectList } from "../components/ProjectList";
import { PageHeader } from "../shell/PageHeader";

export function WorkPage() {
  return <article className="page">
    <PageHeader index="Selected work" title="Built with epistemic rigor." description="Production engineering, behavioral data processing, AI harness engineering with associative memory retrieval, and physical interfaces. The following case studies detail the system architecture, my specific technical contributions, and the current theoretical or practical limitations of each project." />
    <ProjectList />
    <section className="case-section"><h2>Earlier work</h2><p>At California Polytechnic State University, I developed public-facing websites for faculty and two mobile applications: an augmented-reality experience and a diet-tracking app using barcode scanning and nutrition APIs.</p><p>I also built a D3 node-graph interface for exploring employment pathways through a city-funded startup, and implemented Shopify / Liquid integrations for From War to Peace.</p></section>
  </article>;
}

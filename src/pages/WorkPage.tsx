import { ProjectList } from "../components/ProjectList";
import { PageHeader } from "../shell/PageHeader";

export function WorkPage() {
  return <article className="page">
    <PageHeader index="Selected work" title="Projects." description="A production platform, cognitive-inspired memory retrieval, behavioral state modeling, and physical computing. Each case study covers the system design, what I built, and where the project stands." />
    <ProjectList />
    <section className="case-section"><h2>Earlier work</h2><p>At California Polytechnic State University, I built public-facing websites for faculty and two mobile applications: an augmented-reality experience and a diet-tracking app using barcode scanning and nutrition APIs.</p><p>I also built a D3 node-graph interface for exploring employment pathways for a city-funded startup, and implemented Shopify / Liquid integrations for From War to Peace.</p></section>
  </article>;
}

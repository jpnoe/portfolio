import { projects } from "../content/projects";
import { PageHeader } from "../shell/PageHeader";
import { SiteLink } from "../shell/navigation";
import { NotFoundPage } from "./NotFoundPage";

export function ProjectPage({ id }: { id: string }) {
  const project = projects.find(item => item.id === id);
  if (!project) return <NotFoundPage />;
  return <article className="page case-page">
    <SiteLink to="/work" className="back-link">← Selected work</SiteLink>
    <PageHeader index={`${project.number} / ${project.kind}`} title={project.name} description={project.summary} />
    <div className="case-meta"><span className="status-dot" aria-hidden="true" />{project.status}</div>
    <ul className="tags" aria-label="Technologies and methods">{project.stack.map(tag => <li key={tag}>{tag}</li>)}</ul>
    <section className="question-section"><p className="eyebrow">The engineering question</p><h2>{project.question}</h2></section>
    <section className="case-section"><h2>My contribution</h2><p>{project.contribution}</p></section>
    <section className="architecture" aria-labelledby="architecture-title">
      <p className="eyebrow" id="architecture-title">System overview</p>
      <ol className="pipeline">{project.flow.map((step, index) => <li key={step}><span className="pipeline-number">0{index + 1}</span>{step}</li>)}</ol>
      <p className="architecture-note">Conceptual flow · components and processing stages</p>
    </section>
    <section className="case-section"><h2>Implemented work</h2><ul className="implementation-list">{project.implementation.map(item => <li key={item}>{item}</li>)}</ul></section>
    <div className="case-columns">
      <section><p className="eyebrow">Evidence and status</p><p>{project.evidence}</p></section>
      <section><p className="eyebrow">Scope and limitations</p><p>{project.boundaries}</p></section>
    </div>
    <section className="next-section"><p className="eyebrow">Next direction</p><p>{project.next}</p></section>
    <div className="case-end"><SiteLink to="/work" className="text-link">Explore another project</SiteLink><a className="text-link" href={`mailto:jake.p.noe.99@gmail.com?subject=${encodeURIComponent(`Portfolio: ${project.name}`)}`}>Discuss this work ↗</a></div>
  </article>;
}

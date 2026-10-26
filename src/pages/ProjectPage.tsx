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
    {project.repo && <p className="case-source"><a className="button-primary" href={project.repo}>View source on GitHub <span aria-hidden="true">↗</span></a></p>}
    <section className="question-section"><p className="eyebrow">The question</p><h2>{project.question}</h2></section>
    <section className="case-section"><h2>My contribution</h2><p>{project.contribution}</p></section>
    <section className="architecture" aria-labelledby="architecture-title">
      <p className="eyebrow" id="architecture-title">System overview</p>
      <ol className="pipeline">{project.flow.map((step, index) => <li key={step}><span className="pipeline-number">0{index + 1}</span>{step}</li>)}</ol>
    </section>
    <section className="case-section"><h2>What I built</h2><ul className="implementation-list">{project.implementation.map(item => <li key={item}>{item}</li>)}</ul></section>
    <div className="case-columns">
      <section><p className="eyebrow">Status</p><p>{project.outcome}</p></section>
      {project.next && <section><p className="eyebrow">Next project</p><p>{project.next}</p></section>}
    </div>
    <div className="case-end"><SiteLink to="/work" className="text-link">Explore another project</SiteLink><a className="text-link" href={`mailto:jake.p.noe.99@gmail.com?subject=${encodeURIComponent(`Portfolio: ${project.name}`)}`}>Discuss this work ↗</a></div>
  </article>;
}

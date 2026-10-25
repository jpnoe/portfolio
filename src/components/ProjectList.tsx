import { projects } from "../content/projects";
import { SiteLink } from "../shell/navigation";

export function ProjectList() {
  return <ol className="project-list">
    {projects.map(project => <li key={project.id} className="project-row">
      <span className="project-number" aria-hidden="true">{project.number}</span>
      <div>
        <p className="eyebrow">{project.kind}</p>
        <h3><SiteLink to={project.path}>{project.name}<span aria-hidden="true"> ↗</span></SiteLink></h3>
        <p className="project-summary">{project.summary}</p>
        <p className="project-status">{project.status}</p>
      </div>
    </li>)}
  </ol>;
}

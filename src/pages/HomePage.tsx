import { ProjectList } from "../components/ProjectList";
import { SiteLink } from "../shell/navigation";
import { sitePath } from "../shell/routes";

export function HomePage() {
  return <article className="page home-page">
    <header className="hero">
      <div>
        <p className="index">Software engineer</p>
        <h1 id="page-title" tabIndex={-1}>Jacob Noe<span className="name-period">.</span></h1>
        <p className="hero-statement">Production systems.<br /><em>Experimental interfaces.</em></p>
        <p className="hero-description">I build resilient web and mobile platforms while exploring novel architectures for signal collection and data organization.</p>
        <div className="hero-actions"><SiteLink to="/work" className="button-primary">Explore my work <span aria-hidden="true">↗</span></SiteLink><a href={sitePath("/resume.docx")} className="text-link">Résumé · DOCX</a></div>
      </div>
      <aside className="hero-aside" aria-label="Experience and direction">
        <p className="eyebrow">Experience</p><p className="aside-number">4+<span>years building production software</span></p>
        <dl className="hero-facts"><div><dt>Practice</dt><dd>Python, full-stack systems,<br />mobile, and infrastructure</dd></div><div><dt>Direction</dt><dd>Software for neuroscience<br />and computational research</dd></div><div><dt>Approach</dt><dd>Transparent architectures.<br />Empirically driven design.</dd></div></dl>
      </aside>
    </header>
    <section className="home-note"><p className="eyebrow">Engineering practice</p><div><h2>From idea to implementation.</h2><p>My work spans production operations, behavioral logging, associative retrieval, and musical interfaces. I care about understanding the mechanism, explaining the tradeoffs, and separating a working implementation from a claim that still needs evaluation.</p></div></section>
    <section className="home-contact" aria-labelledby="contact-title"><p className="eyebrow">Let's talk</p><h2 id="contact-title">Bring a difficult question.</h2><p>I am interested in research software roles where dependable engineering helps people investigate complex systems.</p><a className="contact-link" href="mailto:jake.p.noe.99@gmail.com">jake.p.noe.99@gmail.com ↗</a></section>
  </article>;
}

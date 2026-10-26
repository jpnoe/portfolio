import { SiteLink } from "../shell/navigation";
import { sitePath } from "../shell/routes";

export function HomePage() {
  return <article className="page home-page">
    <header className="hero">
      <div>
        <p className="index">Software engineer</p>
        <h1 id="page-title" tabIndex={-1}>Jacob Noe<span className="name-period">.</span></h1>
        <p className="hero-statement">Dependable software.<br /><em>Thoughtful design.</em></p>
        <p className="hero-description">I build reliable web and mobile platforms, and in my own projects I explore how memory, mood, and behavior can be represented in software.</p>
        <div className="hero-actions"><SiteLink to="/work" className="button-primary">Explore my work <span aria-hidden="true">↗</span></SiteLink><a href={sitePath("/resume.pdf")} className="text-link">Résumé · PDF</a></div>
      </div>
      <aside className="hero-aside" aria-label="Experience and direction">
        <p className="eyebrow">Experience</p><p className="aside-number">4+<span>years building production software</span></p>
        <dl className="hero-facts"><div><dt>Practice</dt><dd>Python, full-stack systems,<br />mobile, and infrastructure</dd></div><div><dt>Direction</dt><dd>Software for cognitive science<br />and computational research</dd></div><div><dt>Approach</dt><dd>Clear architecture.<br />Honest evaluation.</dd></div></dl>
      </aside>
    </header>
    <section className="home-note"><p className="eyebrow">Engineering practice</p><div><h2>From research question to implementation.</h2><p>I've spent four years owning a production platform end to end, from mobile apps to deployment. Alongside that, I build independent projects in associative memory retrieval, behavioral state modeling, and physical computing. I like understanding how a system works, explaining its tradeoffs, and testing whether it does what it claims.</p></div></section>
    <section className="home-contact" aria-labelledby="contact-title"><p className="eyebrow">Let's talk</p><h2 id="contact-title">Get in touch.</h2><p>I'm looking for research software roles where solid engineering helps people study the mind and other complex systems.</p><a className="contact-link" href="mailto:jake.p.noe.99@gmail.com">jake.p.noe.99@gmail.com ↗</a></section>
  </article>;
}

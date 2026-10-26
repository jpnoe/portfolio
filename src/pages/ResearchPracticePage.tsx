import { PageHeader } from "../shell/PageHeader";

export function ResearchPracticePage() {
  return (
    <article className="page case-page">
      <PageHeader
        index="Research practice"
        title="Collaborative reasoning. Verifiable work."
        description="My independent projects use sustained collaboration with AI systems to formalize ideas, implement explicit mechanisms, and test whether the evidence supports the claim."
      />

      <section className="case-section">
        <p className="eyebrow">Collaborative workflow</p>
        <h2>From open question to inspectable system.</h2>
        <p>
          I work with multiple AI collaborators across problem formulation,
          architecture, implementation, debugging, and review. Extended discussion
          helps turn an intuition into explicit assumptions and constraints; those
          decisions then become scoped implementation work, including changes made
          through repository-aware coding agents.
        </p>
        <p>
          I integrate the resulting work, inspect the source, run the tests, and
          remain accountable for every claim I publish.
        </p>
      </section>

      <section className="question-section">
        <p className="eyebrow">Current collaboration</p>
        <h2>Different collaborators contribute in different ways.</h2>
        <p>
          ChatGPT contributes to research formulation, architecture, implementation,
          and critical review. Cursor&apos;s repository-aware agents translate scoped
          decisions into code changes and verification. Gemini has provided targeted
          debugging and language review. Roles vary by project, and concrete
          contributions are recorded alongside the relevant work.
        </p>
      </section>

      <div className="case-columns">
        <section>
          <p className="eyebrow">Scientific rigor</p>
          <h2>Separate mechanism from evidence.</h2>
          <p>
            A working mechanism is not the same as a demonstrated interpretation.
            Our review process looks for unsupported assumptions, alternative
            explanations, failure modes, and experiments that could distinguish
            between competing claims.
          </p>
        </section>
        <section>
          <p className="eyebrow">Reproducibility</p>
          <h2>Leave an auditable trail.</h2>
          <p>
            Projects include deterministic examples where practical, automated
            tests, explicit verification notes, and clear statements about what was
            not run, measured, or established.
          </p>
        </section>
      </div>

      <section className="case-section">
        <p className="eyebrow">Attribution</p>
        <h2>Credit meaningful contributions.</h2>
        <p>
          When an AI collaborator contributes materially to architecture,
          implementation, formalization, or debugging, I record that contribution
          at the project level. Attribution and accountability are complementary:
          collaboration is acknowledged, while published work remains subject to
          source review, testing, and reproducible verification.
        </p>
      </section>

      <section className="question-section">
        <p className="eyebrow">Why this matters</p>
        <h2>Research software is part of the evidence pipeline.</h2>
        <p>
          Clear provenance, explicit limitations, and honest reporting make it
          easier for other people to understand, reproduce, and challenge the work.
        </p>
      </section>
    </article>
  );
}

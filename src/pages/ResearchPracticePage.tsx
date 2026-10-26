import { PageHeader } from "../shell/PageHeader";

export function ResearchPracticePage() {
  return (
    <article className="page case-page">
      <PageHeader
        index="Research practice"
        title="AI-augmented reasoning. Verifiable work."
        description="My independent projects use sustained integration with AI systems to formalize ideas, implement explicit mechanisms, and test whether the evidence supports the claim."
      />

      <section className="case-section">
        <p className="eyebrow">Collaborative workflow</p>
        <p>
          I utilize Large Language Models (LLMs) and repository-aware agents across problem formulation, architecture, implementation, and review. 
          Extended interaction with these systems helps translate abstract intuition into explicit engineering constraints; 
          those decisions are then scoped into direct implementation work.
        </p>
      </section>

      <section className="question-section">
        <p className="eyebrow">Current flow</p>
        <p>
          Different models excel at different stages of the research pipeline. 
          I use ChatGPT for architectural formalization and theoretical sounding-boarding. 
          Cursor's agents translate those scoped decisions into rapid codebase iteration. 
          Gemini serves as an interactive logic reviewer and targeted debugger. 
        </p>
      </section>

      <section>
        <p className="eyebrow">Methodological Transparecy</p>
        <p>
          In computational research, documenting the tools used to generate architecture or code is as critical as documenting the data pipeline. 
          I explicitly record where AI-assisted generation is utilized to ensure full transparency.
          While these systems heavily accelerate the implementation phase, the accountability for source review, testing, and scientific rigor remains entirely mine.
        </p>
      </section>
    </article>
  );
}

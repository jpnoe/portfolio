import { PageHeader } from "../shell/PageHeader";

export function ResearchPracticePage() {
  return (
    <article className="page">
      <PageHeader
        index="Research practice"
        title="AI-augmented development."
        description="My independent projects use sustained integration with AI systems to formalize ideas and implement explicit mechanisms."
      />

      <section className="question-section">
        <p className="eyebrow">AI-augmented workflow</p>
        <p>
          I utilize Large Language Models (LLMs) and repository-aware agents across problem formulation, architecture, implementation, and review. 
          Extended interaction with these systems helps translate abstract intuition into explicit engineering constraints; 
          those decisions are then scoped into direct implementation work.
        </p>
      </section>

      <section className="question-section">
        <p className="eyebrow">Multi-model approach</p>
        <p>
            Different models excel at different stages of the research pipeline. 
            ChatGPT excels at architectural planning and formalization. 
            Cursor's agents effectively translate those scoped decisions into rapid codebase iteration. 
            Gemini is effective for theoretical brainstorming and as a targeted debugger. 
        </p>
      </section>
    </article>
  );
}

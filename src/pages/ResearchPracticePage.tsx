import { PageHeader } from "../shell/PageHeader";

export function ResearchPracticePage() {
  return (
    <article className="page">
      <PageHeader
        index="Research practice"
        title="AI-augmented development."
      />

      <section className="question-section">
        <p className="eyebrow">Human-AI Collaboration</p>
        <p>
          My independent projects are developed through sustained collaboration with multiple AI systems across problem formulation, architecture, implementation, and critical review. Different participants contribute differently: 
        </p>
        <ul>
          <li>
          ChatGPT supports formalization and architectural reasoning.
          </li>
          <li>
          Cursor’s repository-aware agents translate scoped decisions into codebase changes and verification.
          </li>
          <li>
          Gemini contributes targeted debugging and language review. I integrate and inspect the resulting work, test published claims, and document material contributions at the project level.
          </li>
        </ul>
      </section>
    </article>
  );
}

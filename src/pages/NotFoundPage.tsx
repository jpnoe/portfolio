import { PageHeader } from "../shell/PageHeader";
import { SiteLink } from "../shell/navigation";

export function NotFoundPage() {
  return (
    <article className="page">
      <PageHeader
        index="—"
        title="This address is empty"
        description="Nothing is mounted on this path."
      />
      <p>
        <SiteLink to="/" className="text-link">
          Back to home
        </SiteLink>
      </p>
    </article>
  );
}

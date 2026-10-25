export function PageHeader({
  index,
  title,
  description,
}: {
  index: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="page-header">
      <p className="index">{index}</p>
      <h1 id="page-title" tabIndex={-1}>
        {title}
      </h1>
      {description ? <p className="description">{description}</p> : null}
    </header>
  );
}

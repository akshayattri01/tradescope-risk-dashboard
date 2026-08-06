interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="mb-4 flex flex-col gap-1">
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
        {eyebrow}
      </p>
      <h2 className="text-xl font-bold tracking-normal text-foreground">{title}</h2>
      {description ? (
        <p className="max-w-2xl text-sm text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}

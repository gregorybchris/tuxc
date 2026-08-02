import { cn } from "@/lib/utilities/style-utils";

/**
 * How wide a page's content is allowed to get.
 *
 * Every page picks one of these rather than inventing its own padding, so a
 * heading lands in the same place whichever page you arrived from.
 */
type PageWidth = "measure" | "page";

const WIDTHS: Record<PageWidth, string> = {
  measure: "max-w-measure",
  page: "max-w-page",
};

interface PageProps {
  width?: PageWidth;
  children: React.ReactNode;
  className?: string;
}

export function Page({ width = "page", children, className }: PageProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 pb-16 pt-8 sm:px-8 md:pb-24 md:pt-12",
        WIDTHS[width],
        className,
      )}
    >
      {children}
    </div>
  );
}

interface PageHeaderProps {
  /** A short line above the title saying where you are or how much is here. */
  eyebrow?: string;
  title: string;
  /** One or two sentences under the title. Kept to a readable measure. */
  lede?: React.ReactNode;
  /** Links or buttons that belong to the page as a whole. */
  actions?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function PageHeader({
  eyebrow,
  title,
  lede,
  actions,
  align = "left",
  className,
}: PageHeaderProps) {
  const centered = align === "center";

  return (
    <header
      className={cn(
        "flex flex-col gap-3",
        centered && "items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink/40">
          {eyebrow}
        </p>
      )}

      <h1 className="text-balance text-2xl font-bold tracking-tight text-ink/80 md:text-3xl">
        {title}
      </h1>

      {lede && (
        <div
          className={cn(
            "max-w-measure text-pretty leading-relaxed text-ink/60",
            centered && "mx-auto",
          )}
        >
          {lede}
        </div>
      )}

      {actions && (
        <div
          className={cn(
            "flex flex-wrap items-center gap-x-2 gap-y-1 pt-1",
            centered && "justify-center",
          )}
        >
          {actions}
        </div>
      )}
    </header>
  );
}

interface SectionProps {
  /** Sits above the section as a quiet label. */
  heading?: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({ heading, children, className }: SectionProps) {
  return (
    <section className={cn("flex flex-col gap-4", className)}>
      {heading && (
        <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-ink/40">
          {heading}
        </h2>
      )}
      {children}
    </section>
  );
}

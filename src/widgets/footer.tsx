import { LinkText } from "./link-text";

const FOOTER_LINKS = [
  { text: "All Runs", href: "/runs" },
  { text: "Heatmap", href: "/runs/map" },
  { text: "Town Lines", href: "/town-lines" },
  { text: "Submit a Run", href: "/edit" },
  { text: "About", href: "/rpp" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-black/10">
      <div className="mx-auto flex max-w-page flex-col gap-6 px-5 py-10 sm:px-8 md:flex-row md:justify-between">
        <div className="flex max-w-measure flex-col gap-2">
          <p className="text-sm font-bold text-black/60">
            TUXC Run Preservation Project
          </p>
          <p className="text-sm leading-relaxed text-black/50">
            An athlete-run archive of Tufts cross country routes. Not affiliated
            with the university. Team history lives on{" "}
            <LinkText
              text="gojumbos.com"
              href="https://www.gojumbos.com"
              target="_blank"
            />
            .
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-2">
          <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-black/40 md:text-right">
            Pages
          </h2>
          <ul className="flex flex-col gap-1.5 text-sm md:items-end">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <LinkText text={link.text} href={link.href} />
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-2">
          <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-black/40 md:text-right">
            Get in touch
          </h2>
          <ul className="flex flex-col gap-1.5 text-sm md:items-end">
            <li>
              <LinkText
                text="tuxc.org@gmail.com"
                href="mailto:tuxc.org@gmail.com"
              />
            </li>
            <li>
              <LinkText
                text="GitHub"
                href="https://github.com/gregorybchris/tuxc"
                target="_blank"
              />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

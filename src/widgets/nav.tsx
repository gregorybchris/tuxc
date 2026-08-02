import jumboIcon from "@/assets/images/jumbo-head-simplified.png";
import { cn } from "@/lib/utilities/style-utils";
import { List, X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CommonIcon, IconName } from "./common-icon";

interface NavItem {
  text: string;
  href: string;
  iconName: IconName;
}

const NAV_ITEMS: NavItem[] = [
  { text: "Runs", href: "/runs", iconName: "shoe" },
  { text: "Heatmap", href: "/runs/map", iconName: "map" },
  { text: "Town Lines", href: "/town-lines", iconName: "globe" },
  { text: "About", href: "/rpp", iconName: "info" },
  { text: "Submit a Run", href: "/edit", iconName: "pin-plus" },
];

/** Whether a nav item points at the page you are on, or at a page inside it. */
function isCurrent(pathname: string, href: string): boolean {
  if (href === "/runs") {
    return pathname === "/runs" || /^\/runs\/\d+$/.test(pathname);
  }
  return pathname === href;
}

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  // Following a link should land you on the new page, not on the menu you
  // opened to get there.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-tufts-blue">
      {/* The height here is what the run filters stick to, as top-14 md:top-16. */}
      <div className="mx-auto flex h-14 max-w-page flex-row items-center justify-between gap-4 px-5 sm:px-8 md:h-16">
        <Link
          to="/"
          className="flex flex-row items-center gap-2.5 rounded outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          aria-label="tuxc home"
        >
          {/* The artwork is wider than it is tall, so only the height is set. */}
          <img
            src={jumboIcon}
            width={4600}
            height={3694}
            alt=""
            className="h-9 w-auto md:h-11"
          />
          <span className="text-lg font-bold tracking-tight text-white">
            tuxc
          </span>
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex flex-row items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  aria-current={
                    isCurrent(pathname, item.href) ? "page" : undefined
                  }
                  className={cn(
                    "rounded px-3 py-2 text-sm text-white/80 outline-none transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-white/70",
                    isCurrent(pathname, item.href) && "bg-white/15 text-white",
                  )}
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="rounded p-1 text-white outline-none transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/70 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X size={28} /> : <List size={28} />}
        </button>
      </div>

      <nav
        id="mobile-menu"
        aria-label="Main"
        className={cn(
          "border-t border-white/15 bg-tufts-blue md:hidden",
          !menuOpen && "hidden",
        )}
      >
        <ul className="flex flex-col px-3 py-2">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                aria-current={
                  isCurrent(pathname, item.href) ? "page" : undefined
                }
                className={cn(
                  "flex flex-row items-center gap-3 rounded px-2 py-3 text-white/85 outline-none transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/70",
                  isCurrent(pathname, item.href) && "bg-white/15 text-white",
                )}
              >
                <CommonIcon
                  name={item.iconName}
                  size={20}
                  color="#FFFFFF"
                  weight="duotone"
                />
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

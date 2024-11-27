import Link from "next/link";

interface LinkTextProps {
  href: string;
  text: string;
  target?: string;
}

export function LinkText({ href, text, target }: LinkTextProps) {
  return (
    <Link
      href={href}
      target={target}
      className="text-tufts-blue transition-all hover:text-tufts-brown"
    >
      {text}
    </Link>
  );
}

import Link from "next/link";

interface LinkTextProps {
  href: string;
  text: string;
}

export function LinkText({ href, text }: LinkTextProps) {
  return (
    <Link
      href={href}
      className="text-tufts-blue transition-all hover:text-tufts-brown"
    >
      {text}
    </Link>
  );
}

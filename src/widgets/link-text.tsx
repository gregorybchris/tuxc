import { Link } from "react-router-dom";

interface LinkTextProps {
  href: string;
  text: string;
  target?: string;
}

const EXTERNAL_HREF_PATTERN = /^(https?:|mailto:)/;

export function LinkText({ href, text, target }: LinkTextProps) {
  const className = "text-accent transition-all hover:text-link-hover";

  if (EXTERNAL_HREF_PATTERN.test(href)) {
    return (
      <a href={href} target={target} className={className}>
        {text}
      </a>
    );
  }

  return (
    <Link to={href} target={target} className={className}>
      {text}
    </Link>
  );
}

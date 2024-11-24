import "../globals.css";

import { ReactNode } from "react";
import { Nav } from "../widgets/nav";

const title = "tuxc";
const description = "Athlete-run home of Tufts cross country.";

export const metadata = {
  title,
  description,
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  metadataBase: new URL("https://tuxc.org"),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div>
          <Nav>{children}</Nav>
        </div>
      </body>
    </html>
  );
}

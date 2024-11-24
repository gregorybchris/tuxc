import "./globals.css";

import { ReactNode } from "react";

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
      <body className="font-manrope">{children}</body>
    </html>
  );
}

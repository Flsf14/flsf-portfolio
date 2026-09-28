import type { Metadata } from "next";
import "@fontsource/barlow-condensed/400.css";
import "@fontsource/barlow-condensed/600.css";
import "@fontsource/barlow-condensed/700.css";
import "@fontsource/barlow-condensed/800.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/700.css";
import "@fontsource/jetbrains-mono/400.css";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Afsun Filosof | Creative & Content Specialist", template: "%s | Afsun Filosof" },
  description: "Portfolio multidisiplin Afsun Filosof: brand identity, editorial, social media, video, UI/UX, dan web.",
  openGraph: {
    title: "Afsun Filosof | Creative & Content Specialist",
    description: "Ide, konten, dan pengalaman digital yang dapat bekerja.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main-content">Lewati ke konten</a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <footer className="site-footer">
          <p>Afsun Filosof</p>
          <p>Creative &amp; Content Specialist</p>
          <a href="mailto:aaffilosof@gmail.com">aaffilosof@gmail.com</a>
          <p>Surabaya, Indonesia · {new Date().getFullYear()}</p>
        </footer>
      </body>
    </html>
  );
}

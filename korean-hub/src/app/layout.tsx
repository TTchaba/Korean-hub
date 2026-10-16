import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { siteContent } from "@/siteContent";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteContent.site.url),
  title: {
    default: siteContent.seo.defaultTitle,
    template: siteContent.seo.titleTemplate,
  },
  description: siteContent.seo.defaultDescription,
  openGraph: {
    title: siteContent.seo.defaultTitle,
    description: siteContent.seo.defaultDescription,
    url: siteContent.site.url,
    siteName: siteContent.brand.name,
    images: [{ url: siteContent.seo.ogImage }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteContent.seo.defaultTitle,
    description: siteContent.seo.defaultDescription,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-porcelain"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Outfit, Source_Sans_3 } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/utils";
import "./globals.css";
import "@/widgets/styles/widgets.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Technology & Construction Solutions`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.legalName }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  keywords: [
    "Abel Solutions",
    "IT support in London",
    "Computer repair in London",
    "Custom PC builds",
    "Gaming PC upgrades",
    "Media wall installation",
    "TV wall mounting",
    "Construction services in London",
    "Property improvement services",
    "Technology support for small businesses",
  ],
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: absoluteUrl("/"),
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Technology & Construction Solutions`,
    description: siteConfig.description,
    images: [
      {
        url: absoluteUrl(siteConfig.ogImage.path),
        width: siteConfig.ogImage.width,
        height: siteConfig.ogImage.height,
        alt: siteConfig.ogImage.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Technology & Construction Solutions`,
    description: siteConfig.description,
    images: [absoluteUrl(siteConfig.ogImage.path)],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={`${outfit.variable} ${sourceSans.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <SkipLink />
        <OrganizationJsonLd />
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

import profile from "../data/profile.json";
import { resolveMediaUrl } from "../lib/media";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"
// Self-hosted font files (via @fontsource): bundled at build time, zero
// runtime requests to Google's font CDN, zero layout shift.
import "@fontsource/space-grotesk/latin-500.css";
import "@fontsource/space-grotesk/latin-700.css";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import "@fontsource/ibm-plex-mono/latin-400.css";
import "@fontsource/ibm-plex-mono/latin-500.css";
import "@fontsource/ibm-plex-mono/latin-600.css";

const ogImage = resolveMediaUrl("/images/profile.jpg");

const siteUrl = "https://www.ariyan.app";
const description =
  "Ariyan Jahangir is an Associate Software Engineer building scalable airline platforms, OTA integrations, payment gateway systems, and production software for travel technology teams in Bangladesh.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ariyan Jahangir | Associate Software Engineer | .NET & C#",
    template: "%s | Ariyan Jahangir",
  },
  description,
  keywords: [
    "Ariyan Jahangir",
    "Associate Software Engineer",
    ".NET Software Engineer",
    "C# Software Engineer",
    "ASP.NET Core",
    "Airline API",
    "OTA",
    "Payment Gateway",
    "Sabre",
    "Amadeus",
    "Galileo",
    "Machine Learning",
    "Microservices",
    "Bangladesh",
    "Travel technology engineer",
  ],
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  alternates: { canonical: siteUrl },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Ariyan Jahangir",
    title: "Ariyan Jahangir | Associate Software Engineer | .NET & C#",
    description,
    locale: "en_US",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Ariyan Jahangir",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ariyan Jahangir | Associate Software Engineer | .NET & C#",
    description,
    images: [ogImage],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    description: profile.summary,
    email: `mailto:${profile.email}`,
    telephone: profile.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dhaka",
      addressCountry: "BD",
    },
    url: siteUrl,
    image: ogImage.startsWith("http") ? ogImage : `${siteUrl}${ogImage}`,
    sameAs: profile.links.map((l) => l.url),
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: siteUrl,
    name: "Ariyan Jahangir",
    description,
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
        {children}
      </body>
    </html>
  );
}

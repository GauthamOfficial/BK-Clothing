import type { Metadata } from "next";
import { Inter, Playfair_Display, Black_Ops_One } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  SITE_NAME,
  SITE_DESCRIPTION,
  SITE_URL,
  CONTACT,
  SOCIAL,
} from "@/lib/constants";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const blackOpsOne = Black_Ops_One({
  variable: "--font-black-ops-one",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "wholesale clothing",
    "Sri Lanka",
    "formal wear",
    "casual wear",
    "innerwear",
    "BK Clothing",
    "Colombo",
    "clothing manufacturer",
    "bulk clothing",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Wholesale Clothing Sri Lanka`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Wholesale Clothing Sri Lanka`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  telephone: CONTACT.phones[0].href.replace("tel:", ""),
  email: CONTACT.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: CONTACT.address.line1,
    addressLocality: "Colombo 11",
    addressCountry: "LK",
  },
  sameAs: [SOCIAL.instagram, SOCIAL.facebook],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} ${blackOpsOne.variable} font-sans antialiased`}
      >
        <div id="fabric-texture" aria-hidden="true" />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

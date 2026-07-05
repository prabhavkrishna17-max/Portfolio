import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getBaseUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Prabhav Krishna R | Software Engineer",
  description: "Portfolio of Prabhav Krishna R, Software Engineer & Product Designer",
  keywords: ["Prabhav Krishna R", "Software Engineer", "Product Designer", "Portfolio", "Next.js", "React", "Frontend Developer", "Backend Developer"],
  alternates: {
    canonical: getBaseUrl(),
  },
  metadataBase: new URL(getBaseUrl()),
  openGraph: {
    title: 'Prabhav Krishna R | Software Engineer',
    description: 'Portfolio of Prabhav Krishna R, Software Engineer & Product Designer',
    url: getBaseUrl(),
    siteName: 'Prabhav Krishna R',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title: 'Prabhav Krishna R',
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} dark antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Prabhav Krishna R",
              url: getBaseUrl(),
              jobTitle: "Software Engineer",
              sameAs: [
                "https://github.com/prabhavkrishna",
                "https://www.linkedin.com/in/prabhav-krishna"
              ]
            })
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground font-sans selection:bg-white selection:text-black">
        <CustomCursor />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

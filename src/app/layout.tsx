import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getBaseUrl } from "@/lib/utils";
import { Toaster } from "sonner";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

export const metadata: Metadata = {
  title: "Prabhav Krishna R | Student & Developer",
  description: "Portfolio of Prabhav Krishna R, a Computer Science student learning modern web development through hands-on projects and AI-assisted workflows.",
  keywords: ["Prabhav Krishna R", "Student", "Developer", "Next.js", "React", "Portfolio", "India", "Computer Science"],
  authors: [{ name: "Prabhav Krishna R", url: "https://github.com/prabhavkrishna17-max" }],
  creator: "Prabhav Krishna R",
  alternates: {
    canonical: getBaseUrl(),
  },
  metadataBase: new URL(getBaseUrl()),
  openGraph: {
    title: 'Prabhav Krishna R | Student & Developer',
    description: 'Portfolio of Prabhav Krishna R, a Computer Science student learning modern web development through hands-on projects and AI-assisted workflows.',
    url: getBaseUrl(),
    siteName: 'Prabhav Krishna R Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title: 'Prabhav Krishna R | Student & Developer',
    description: 'Portfolio of Prabhav Krishna R, a Computer Science student learning modern web development.',
    card: 'summary_large_image',
    creator: '@prabhavkrishna',
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
                "https://github.com/prabhavkrishna17-max",
                "https://www.linkedin.com/in/prabhav-krishna"
              ]
            })
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground font-sans selection:bg-white selection:text-black overflow-x-hidden">
        <ScrollProgress />
        <CommandPalette />
        <CustomCursor />
        {children}
        <Toaster position="bottom-right" theme="dark" />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { CustomCursor } from "@/components/ui/CustomCursor";

export const metadata: Metadata = {
  title: "Prabhav Krishna R | Software Engineer",
  description: "Portfolio of Prabhav Krishna R, Software Engineer & Product Designer",
  metadataBase: new URL('https://prabhavkrishna.com'),
  openGraph: {
    title: 'Prabhav Krishna R | Software Engineer',
    description: 'Portfolio of Prabhav Krishna R, Software Engineer & Product Designer',
    url: 'https://prabhavkrishna.com',
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
      <body className="min-h-screen bg-background text-foreground font-sans selection:bg-white selection:text-black">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}

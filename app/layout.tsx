import type React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { UserProvider } from "@/context/user-context";
import { AuthProvider } from "@/context/auth-context";
import Navbar from "@/components/navbar";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BLACKSTREAM - Streaming Platform",
  description: "A modern streaming platform for movies and TV shows",
  keywords: ["streaming", "movies", "tv shows", "series", "entertainment", "bengali movies", "hindi movies", "hollywood", "bollywood"],
  authors: [{ name: "BLACKSTREAM Team" }],
  creator: "BLACKSTREAM",
  publisher: "BLACKSTREAM",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://blackstream.vercel.app",
    title: "BLACKSTREAM - Streaming Platform",
    description: "A modern streaming platform for movies and TV shows",
    siteName: "BLACKSTREAM",
  },
  twitter: {
    card: "summary_large_image",
    title: "BLACKSTREAM - Streaming Platform",
    description: "A modern streaming platform for movies and TV shows",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="26CLvvCnF62u0CmaIRoofb0T7S1eoX4M2scl_sMkD-g" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7NP46PQTQY"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7NP46PQTQY');
          `}
        </Script>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <UserProvider>
              <Navbar />
              {children}
              <Toaster />
            </UserProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
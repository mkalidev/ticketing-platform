import type { Metadata } from "next";
import { QueryProvider } from "@/providers/QueryProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tixly | Modern Ticketing Platform",
  description: "The modern ticketing platform for unforgettable experiences. Simple for organizers, seamless for attendees.",
  keywords: ["tickets", "events", "concerts", "festivals", "conferences", "ticketing platform"],
  authors: [{ name: "Tixly" }],
  openGraph: {
    title: "Tixly | Modern Ticketing Platform",
    description: "The modern ticketing platform for unforgettable experiences.",
    type: "website",
    locale: "en_US",
    siteName: "Tixly",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tixly | Modern Ticketing Platform",
    description: "The modern ticketing platform for unforgettable experiences.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-mesh min-h-screen flex flex-col antialiased">
        <QueryProvider>
          <Header />
          <main className="flex-1 pt-16 md:pt-20">
            {children}
          </main>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}

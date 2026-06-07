import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DIGITAKT DIY",
  description: "Projet, notes et fichiers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="bg-black">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col selection:bg-neutral-800 selection:text-white`}
      >
        <header className="sticky top-0 z-50 border-b border-neutral-900 bg-black/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6">
            <Link
              href="/"
              className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-400 hover:text-white transition-colors"
            >
              DIGITAKT DIY
            </Link>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-neutral-700"></div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-600">System</span>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-3xl flex-1 px-3 py-8 sm:px-6 sm:py-12">
          {children}
        </main>
      </body>
    </html>
  );
}

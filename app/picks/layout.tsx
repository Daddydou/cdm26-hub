import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import BottomNav from "./components/BottomNav";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "CDM26",
  description: "Jeu de pronostics Coupe du Monde 2026",
  manifest: "/manifest.json",
  themeColor: "#09090b",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "CDM26",
  },
};

export default function PicksLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}>
      <a href="/" className="fixed top-3 left-3 z-50 text-xs text-zinc-600 hover:text-zinc-400 transition-colors px-2 py-1 rounded-md hover:bg-zinc-800/50">← Hub</a>
      {children}
      <BottomNav />
    </div>
  )
}

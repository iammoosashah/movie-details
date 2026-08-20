import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CineSearch — Discover Movies & TV Shows",
  description: "Search millions of movies and TV shows powered by the OMDB API. Find ratings, cast, plot and more.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.variable}>
      <body style={{ margin: 0, minHeight: "100vh" }}>{children}</body>
    </html>
  );
}

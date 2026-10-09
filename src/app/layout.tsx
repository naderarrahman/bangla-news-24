import type { Metadata } from "next";
import {Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Marquee from "@/components/Marquee";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["latin", "bengali"],
});

export const metadata: Metadata = {
  title: "Bangla News 24 | বাংলা সংবাদ",
  description:
    "Bangla News 24 is an online Bengali news portal where readers can explore the latest news, browse news by category, and stay informed about current events.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${notoSerifBengali.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <Marquee />
        <main>{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}

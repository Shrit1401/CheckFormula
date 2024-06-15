import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

const dm_sans = DM_Sans({
  weight: ["100", "200", "300", "400", "500", "700", "800", "900", "1000"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Check Formula",
  description:
    "Check Formula is a platform to practice formulas on almost all chapters.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={dm_sans.className}>
        <link
          rel="icon"
          href="images/favicon.ico"
          type="image/x-icon"
          sizes="48x48"
        />

        <Navbar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}

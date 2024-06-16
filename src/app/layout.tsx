import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";

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
    <ClerkProvider>
      <html lang="en">
        <head>
          <link
            rel="icon"
            href="./favicon.ico"
            type="image/x-icon"
            sizes="48x48"
          />
        </head>
        <body className={dm_sans.className}>
          <Navbar />
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}

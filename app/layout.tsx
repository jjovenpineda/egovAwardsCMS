import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { LazyMotion, domAnimation } from "motion/react";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "../public/assets/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../public/assets/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "eGOV Awards",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable}  antialiased`}
      >
        <LazyMotion features={domAnimation}>
          {children}
          <Toaster />
        </LazyMotion>
      </body>
    </html>
  );
}

"use client";
import React, { useEffect, useState } from "react";

import Image from "next/image";

import carousel from "@/public/assets/images/carousel1.webp";
import login from "@/public/assets/images/login.webp";
import egov from "@/public/assets/images/egov.svg";

import lgus from "@/public/assets/images/lgus.webp";

import { AnimatePresence, m } from "motion/react";
import FloatingIcons from "@/components/shared/floating-icons";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen overflow-hidden ">
      <div className="size-full relative  ">
        {children}

        <FloatingIcons />
      </div>
      {/* <Footer /> */}
    </main>
  );
}

"use client";

import SideBar from "@/components/shared/side-bar";
import TopBar from "@/components/shared/top-bar";
import { storage } from "@/utils/useStorage";
import { m } from "motion/react";
import { Suspense, useEffect, useState } from "react";
/* import useInactivityTimeout from "@/hooks/use-inactibe-timeout";
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [hasAnimated, setHasAnimated] = useState(
    JSON.parse(storage.getItem("hasAnimated") || "false")
  );

  useEffect(() => {
    storage.setItem("hasAnimated", JSON.stringify(hasAnimated));
  }, [hasAnimated]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      storage.removeItem("hasAnimated");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  return (
    <main className="flex bg-slate-50">
      <div>
        <SideBar />
      </div>

      <div className="w-full">
        <TopBar />
        <m.div
          initial={!hasAnimated && { y: 100, opacity: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          onAnimationComplete={() => setHasAnimated(true)}
          className="px-16 py-8 "
        >
          {children}
        </m.div>
      </div>
      {/*   {isInactive && (
        <div className="inactivity-dialog">
          <p>Are you still there?</p>
          <button onClick={() => handleUserResponse("yes")}>Yes</button>
          <button onClick={() => handleUserResponse("no")}>No</button>
        </div>
      )} */}
    </main>
  );
}

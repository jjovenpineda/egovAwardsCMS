"use client";

import React, { useEffect, useState } from "react";

import folder from "@/public/assets/images/folder-default.svg";
import folder2 from "@/public/assets/images/folder-find.svg";
import folder3 from "@/public/assets/images/folder-done.svg";
import building from "@/public/assets/images/building.svg";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { m } from "motion/react";
import { storage } from "@/utils/useStorage";

import { Button } from "@/components/ui/button";
import { ChevronDown, Download, Eye } from "lucide-react";
import Loading from "@/components/shared/loading";
import CustomBadge from "@/components/shared/custom-badge";
import { Input } from "@/components/ui/input";
export default function Home() {
  const [entryRange, setEntryRange] = useState([]);
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
    <div className="min-h-screen flex w-full ">
      <m.div
        initial={!hasAnimated && { y: 100, opacity: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        onAnimationComplete={() => setHasAnimated(true)}
        className="space-y-2 h-full w-full"
      >
        <section className="flex flex-wrap lg:justify-between justify-end">
          <h1 className="text-base text-blue-900 max-w-[40%]">
            <strong className="font-semibold">Theme: 11th eGOV Awards: </strong>
            Excellence in Governance Through Information and Communications
            Technology Awards
          </h1>
          <div className="flex flex-wrap gap-4">
            <Popover>
              <PopoverTrigger className="text-slate-900 h-fit border group text-sm  flex items-center gap-2 bg-white p-2 rounded-lg">
                2025
                <ChevronDown
                  size={15}
                  className="transition-transform duration-200 group-data-[state=open]:rotate-180"
                />
              </PopoverTrigger>
              <PopoverContent align="start">
                Place content for the popover here.
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger className="text-slate-50 h-fit group text-sm font-semibold flex items-center gap-2 bg-[#2563EB] py-2 px-3 rounded-lg">
                <Download size={15} /> Download PDF
                <ChevronDown
                  size={15}
                  className="transition-transform duration-200 group-data-[state=open]:rotate-180"
                />
              </PopoverTrigger>
              <PopoverContent align="end">
                {(() => {
                  const downloadOptions = [
                    { label: "All Entries (1-145)" },
                    { label: "Top 10" },
                    { label: "Top 20" },
                    { label: "Top 50" },
                  ];
                  return (
                    <>
                      <div>
                        <ul className="text-sm ">
                          {downloadOptions.map((item, index) => (
                            <li
                              key={index}
                              className="flex items-center p-2 text-slate-900 hover:bg-slate-100 hover:text-blue-700 rounded-md cursor-pointer gap-3"
                            >
                              <Download size={15} /> {item.label}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <hr className="my-2" />
                      <div className="flex items-center gap-4">
                        <h3 className="text-xs text-slate-500">Custom</h3>
                        <div className="flex gap-2 items-center">
                          <Input
                            type="text"
                            maxLength={2}
                            placeholder="1"
                            autoComplete="off"
                            onChange={(e: any) => {
                              e.target.value = e.target.value.replace(
                                /\D/g,
                                ""
                              );
                              if (e.target.value.length > 2) {
                                e.target.value = e.target.value.slice(0, 2);
                              }
                              /*  if (Number(e.target.value > 50)) {
                                setFieldValue("impact", 50);
                              } else {
                                setFieldValue("impact", Number(e.target.value));
                              } */
                            }}
                            className=" border-0 border-b rounded-none border-blue-500 w-11"
                          />
                          -
                          <Input
                            type="text"
                            maxLength={2}
                            placeholder="15"
                            autoComplete="off"
                            onChange={(e: any) => {
                              /*  e.target.value = e.target.value.replace(
                                /\D/g,
                                ""
                              );
                              if (e.target.value.length > 2) {
                                e.target.value = e.target.value.slice(0, 2);
                              }
                              if (Number(e.target.value > 50)) {
                                setEntryRange(entryRange[0][e.target.value]);
                              } else {
                                setEntryRange(entryRange[0][e.target.value]);
                              } */
                            }}
                            className=" border-0 border-b rounded-none border-blue-500 w-11"
                          />
                        </div>
                      </div>
                      <div className="flex text-sm mt-3 items-center p-2 text-slate-900 hover:bg-slate-100 hover:text-blue-700 rounded-md cursor-pointer gap-3">
                        <Download size={15} />
                        Rank {`(15-30)`}
                      </div>
                    </>
                  );
                })()}
              </PopoverContent>
            </Popover>
          </div>
        </section>
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="flex gap-4 w-full rounded-xl bg-white shadow-[0_4px_10px_rgba(0,0,9,0.05)] p-6">
              <Image src={folder} alt="folder icon" />
              <div>
                <h2 className="font-semibold text-xs text-slate-500">
                  TOTAL SUBMISSIONS
                </h2>
                <h2 className="text-blue-700 font-semibold text-2xl">145</h2>
              </div>
            </div>
            <div className="flex gap-4 w-full  rounded-xl bg-white shadow-[0_4px_10px_rgba(0,0,9,0.05)] p-6">
              <Image src={folder2} alt="folder icon" />
              <div>
                <h2 className="font-semibold text-xs text-slate-500">
                  FOR REVIEWS{" "}
                </h2>
                <h2 className="text-orange-400 font-semibold text-2xl">145</h2>
              </div>
            </div>
            <div className="flex gap-4 w-full  rounded-xl bg-white shadow-[0_4px_10px_rgba(0,0,9,0.05)] p-6">
              <Image src={folder3} alt="folder icon" />
              <div>
                <h2 className="font-semibold text-xs text-slate-500">
                  GRADED{" "}
                </h2>
                <h2 className="text-[#14B8A6] font-semibold text-2xl">145</h2>
              </div>
            </div>
            <div className="flex gap-4 w-full  rounded-xl bg-white shadow-[0_4px_10px_rgba(0,0,9,0.05)] p-6">
              <Image src={folder3} alt="folder icon" />
              <div>
                <h2 className="font-semibold text-xs text-slate-500">FINAL </h2>
                <h2 className="text-[#14B8A6] font-semibold text-2xl">32</h2>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex w-full gap-4">
              <div className="flex gap-4 w-full rounded-2xl bg-slate-100  p-5 items-center">
                <Image src={building} alt="folder icon" />
                <div>
                  <h2 className="font-semibold text-xs text-slate-500">
                    LGUs{" "}
                  </h2>
                  <h2 className="text-slate-500 font-semibold text-2xl">85</h2>
                </div>
              </div>
              <div className="flex gap-4 w-full rounded-2xl bg-slate-100  p-5 items-center">
                <Image src={building} alt="folder icon" />
                <div>
                  <h2 className="font-semibold text-xs text-slate-500">
                    PROVINCES
                  </h2>
                  <h2 className="text-slate-500 font-semibold text-2xl">85</h2>
                </div>
              </div>
              <div className="flex gap-4 w-full rounded-2xl bg-slate-100  p-5 items-center">
                <Image src={building} alt="folder icon" />
                <div>
                  <h2 className="font-semibold text-xs text-slate-500">
                    REGIONS
                  </h2>
                  <h2 className="text-slate-500 font-semibold text-2xl">85</h2>
                </div>
              </div>
            </div>

            <ul className="flex items-center  justify-center gap-14 bg-gradient-to-t from-[#EFF6FF] to-[#E4EFFC] w-fit p-4 px-8 rounded-2xl">
              {" "}
              <li className="flex  font-semibold flex-col">
                {" "}
                <h2 className=" text-xs text-slate-500">LGUs </h2>
                <h2 className="text-blue-500  text-2xl">85</h2>
              </li>
              <li className="flex  font-semibold flex-col">
                {" "}
                <h2 className=" text-xs text-slate-500">LGUs </h2>
                <h2 className="text-blue-500  text-2xl">85</h2>
              </li>
              <li className="flex  font-semibold flex-col">
                {" "}
                <h2 className=" text-xs text-slate-500">LGUs </h2>
                <h2 className="text-blue-500  text-2xl">85</h2>
              </li>
              <li className="flex  font-semibold flex-col">
                {" "}
                <h2 className=" text-xs text-slate-500">LGUs </h2>
                <h2 className="text-blue-500  text-2xl">85</h2>
              </li>
              <li className="flex  font-semibold flex-col">
                {" "}
                <h2 className=" text-xs text-slate-500">LGUs </h2>
                <h2 className="text-blue-500  text-2xl">85</h2>
              </li>
            </ul>
          </div>
        </section>

        <div className="text-xs text-blue-900 bg-blue-100 p-1 w-fit rounded-md border-l-[6px] border-blue-400">
          <strong className="text-blue-500 mr-2">NOTE </strong> Application
          process is still ongoing; this is just the INITIAL RANKING.{" "}
        </div>

        <section className="grid grid-cols-[_40%,_60%] gap-16">
          <div className="bg-white rounded-xl h-full">
            <ol className="space-y-4 p-4">
              <div className="flex gap-2 items-center">
                <h2 className="text-blue-900 font-semibold text-base">
                  Overall Ranking
                </h2>
                <CustomBadge
                  color="blue"
                  message="View Details"
                  icon={<Eye size={15} />}
                  className="rounded-full bg-blue-100 hover:bg-blue-200 hover:text-[#1E40AF]  text-[10px] text-[#1E40AF] font-medium"
                />
              </div>
              <li className="space-y-2 text-slate-500 font-semibold text-xl">
                <div className="flex gap-2 items-center">
                  <p className="p-1 px-1.5 text-xs text-yellow-700 rounded-md bg-yellow-100 w-fit">
                    1
                  </p>
                  <p className="text-emerald-800 font-bold text-sm">90.20</p>
                  <p className="text-slate-500 font-medium text-sm">
                    {" "}
                    Calabanga, Camarines Sur
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-sm text-[#1F2937] line-clamp-1">
                    GovLink: Enhancing Business Climate Through Smart Solutions
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="p-1 px-1.5 font-medium  text-xs text-blue-600 rounded-xl bg-slate-100 w-fit">
                      G2B
                    </p>
                    <p className="p-1 px-1.5 font-medium text-xs text-slate-900 rounded-xl bg-slate-100 w-fit">
                      2 SDGs
                    </p>
                  </div>
                </div>
              </li>
              <li className="space-y-2 text-slate-500 font-semibold text-xl">
                <div className="flex gap-2 items-center">
                  <p className="p-1 px-1.5 text-xs text-yellow-700 rounded-md bg-yellow-100 w-fit">
                    2
                  </p>
                  <p className="text-emerald-800 font-bold text-sm">90.20</p>
                  <p className="text-slate-500 font-medium text-sm">
                    {" "}
                    Calabanga, Camarines Sur
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-sm text-[#1F2937] line-clamp-1">
                    GovLink: Enhancing Business Climate Through Smart Solutions
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="p-1 px-1.5 font-medium  text-xs text-blue-600 rounded-xl bg-slate-100 w-fit">
                      G2B
                    </p>
                    <p className="p-1 px-1.5 font-medium text-xs text-slate-900 rounded-xl bg-slate-100 w-fit">
                      2 SDGs
                    </p>
                  </div>
                </div>
              </li>
              <li className="space-y-2 text-slate-500 font-semibold text-xl">
                <div className="flex gap-2 items-center">
                  <p className="p-1 px-1.5 text-xs text-red-700 rounded-md bg-red-100 w-fit">
                    3
                  </p>
                  <p className="text-emerald-800 font-bold text-sm">90.20</p>
                  <p className="text-slate-500 font-medium text-sm">
                    {" "}
                    Calabanga, Camarines Sur
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-sm text-[#1F2937] line-clamp-1">
                    GovLink: Enhancing Business Climate Through Smart Solutions
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="p-1 px-1.5 font-medium  text-xs text-blue-600 rounded-xl bg-slate-100 w-fit">
                      G2B
                    </p>
                    <p className="p-1 px-1.5 font-medium text-xs text-slate-900 rounded-xl bg-slate-100 w-fit">
                      2 SDGs
                    </p>
                  </div>
                </div>
              </li>
            </ol>
          </div>
          <div className="bg-white rounded-xl h-full  w-fit p-4">
            {" "}
            <div>
              <div className="flex gap-2 items-center">
                <h2 className="text-blue-900 font-semibold text-base">
                  G2A Category{" "}
                </h2>
                <CustomBadge
                  color="blue"
                  message="View Details"
                  icon={<Eye size={15} />}
                  className="rounded-full bg-blue-100 hover:bg-blue-200 hover:text-[#1E40AF]  text-[10px] text-[#1E40AF] font-medium"
                />
              </div>
              <p className="text-slate-500 font-medium text-[11px]">
                {" "}
                Government Solutions Providing Access through Interoperability
                to Stakeholders{" "}
              </p>
            </div>
            <ol className="flex gap-6 p-4">
              <li className="space-y-2 text-slate-500 font-semibold text-xl">
                <div className="flex gap-2 items-center">
                  <p className="p-1 px-1.5 text-xs text-yellow-700 rounded-md bg-yellow-100 w-fit">
                    1
                  </p>
                  <p className="text-emerald-800 font-bold text-sm">90.20</p>
                  <p className="text-slate-500 font-medium text-sm">
                    {" "}
                    Calabanga, Camarines Sur
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-sm text-[#1F2937] line-clamp-1">
                    GovLink: Enhancing Business Climate Through Smart Solutions
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="p-1 px-1.5 font-medium  text-xs text-blue-600 rounded-xl bg-slate-100 w-fit">
                      G2B
                    </p>
                    <p className="p-1 px-1.5 font-medium text-xs text-slate-900 rounded-xl bg-slate-100 w-fit">
                      2 SDGs
                    </p>
                  </div>
                </div>
              </li>
              <li className="space-y-2 text-slate-500 font-semibold text-xl">
                <div className="flex gap-2 items-center">
                  <p className="p-1 px-1.5 text-xs text-yellow-700 rounded-md bg-yellow-100 w-fit">
                    2
                  </p>
                  <p className="text-emerald-800 font-bold text-sm">90.20</p>
                  <p className="text-slate-500 font-medium text-sm">
                    {" "}
                    Calabanga, Camarines Sur
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-sm text-[#1F2937] line-clamp-1">
                    GovLink: Enhancing Business Climate Through Smart Solutions
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="p-1 px-1.5 font-medium  text-xs text-blue-600 rounded-xl bg-slate-100 w-fit">
                      G2B
                    </p>
                    <p className="p-1 px-1.5 font-medium text-xs text-slate-900 rounded-xl bg-slate-100 w-fit">
                      2 SDGs
                    </p>
                  </div>
                </div>
              </li>
              <li className="space-y-2 text-slate-500 font-semibold text-xl">
                <div className="flex gap-2 items-center">
                  <p className="p-1 px-1.5 text-xs text-red-700 rounded-md bg-red-100 w-fit">
                    3
                  </p>
                  <p className="text-emerald-800 font-bold text-sm">90.20</p>
                  <p className="text-slate-500 font-medium text-sm">
                    {" "}
                    Calabanga, Camarines Sur
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-sm text-[#1F2937] line-clamp-1">
                    GovLink: Enhancing Business Climate Through Smart Solutions
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="p-1 px-1.5 font-medium  text-xs text-blue-600 rounded-xl bg-slate-100 w-fit">
                      G2B
                    </p>
                    <p className="p-1 px-1.5 font-medium text-xs text-slate-900 rounded-xl bg-slate-100 w-fit">
                      2 SDGs
                    </p>
                  </div>
                </div>
              </li>
            </ol>
          </div>
        </section>
      </m.div>
    </div>
  );
}

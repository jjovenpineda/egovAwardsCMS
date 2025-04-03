import React, { useEffect, useRef } from "react";
import { Label } from "../ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RotateCcw, Sliders, X } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { AnimatePresence, m } from "motion/react";
interface IFilter {
  label: string;
  data: any[];
  reset: () => void;
  selectedFilter: string[];
  setSelectedFilter: (value: string) => void;
}
export default function Filter({
  label,
  data,
  reset,
  selectedFilter,
  setSelectedFilter,
}: IFilter) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    console.log("data :", data);
  }, [data]);
  return (
    <div className="mx-2">
      <Label className="font-semibold text-xs text-slate-500">{label}</Label>
      <m.div
        initial={{ width: "fit-content", opacity: 0.8, paddingRight: 0 }}
        animate={{
          width: selectedFilter.length > 0 ? "auto" : "fit-content",
          opacity: selectedFilter.length > 0 ? 1 : 0.8,
          paddingRight: selectedFilter.length > 0 ? "12px" : "0px",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex items-center gap-4"
      >
        <div
          className={`flex gap-1  items-center transition-all duration-300 w-fit text-slate-900 h-[46px] border group text-sm bg-white  rounded-lg ${
            selectedFilter.length > 0 && "pr-3"
          }`}
        >
          <Popover>
            <PopoverTrigger className="size-full px-4 hover:bg-slate-200 transition-colors duration-300">
              <Sliders size={10} className="text-slate-500 max-h-10" />
            </PopoverTrigger>
            <AnimatePresence>
              {selectedFilter.length < 3 ? (
                selectedFilter.map((item, index) => (
                  <m.div
                    key={item}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="flex gap-1 items-center border p-1 px-1.5 rounded-full text-xs font-medium text-[#6B7280] ml-2"
                  >
                    <div className="whitespace-nowrap">{item}</div>
                    <div className="flex items-center  shrink-0 justify-center bg-[#E5E7EB] cursor-pointer hover:bg-red-400 transition-color duration-200 rounded-full size-3.5 ">
                      <X
                        size={10}
                        onClick={() => setSelectedFilter(item)}
                        className=" text-black "
                      />
                    </div>
                  </m.div>
                ))
              ) : (
                <div className="flex gap-1 items-center border p-1 px-1.5 rounded-full text-xs font-medium text-[#6B7280] ml-2">
                  <div className="whitespace-nowrap">
                    {selectedFilter.length} Roles Selected
                  </div>
                  <div className="flex items-center  shrink-0 justify-center bg-[#E5E7EB] cursor-pointer hover:bg-red-400 transition-color duration-200 rounded-full size-3.5 ">
                    <X
                      size={10}
                      onClick={() => reset()}
                      className=" text-black "
                    />
                  </div>
                </div>
              )}
            </AnimatePresence>
            {Array.isArray(data[0]?.options) ? (
              <PopoverContent
                align="start"
                className="grid grid-cols-2 max-h-[60vh] "
              >
                {data.map((section, index) => (
                  <div key={index} className={`${index > 1 && "col-span-2 "}`}>
                    {index > 1 && <hr className="my-6"></hr>}
                    <h3 className="text-xs text-slate-500 font-semibold mb-3">
                      {section.title}
                    </h3>
                    <div
                      className={`grid gap-y-1 ${
                        index > 1
                          ? "grid-flow-col grid-rows-6 gap-x-6 "
                          : "grid-rows-3 grid-flow-col"
                      }`}
                    >
                      <div className="flex items-start space-x-3 ">
                        <Checkbox id={`check${index}`} className="mt-0.5" />
                        <label
                          htmlFor={`check${index}`}
                          className="text-sm font-medium max-w-[200px] cursor-pointer"
                        >
                          Select All
                        </label>
                      </div>
                      {section.options.map((option: any) => (
                        <>
                          {option != "Select All" && (
                            <div
                              key={option}
                              className="flex items-start space-x-3 "
                            >
                              <Checkbox id={option} className="mt-0.5" />
                              <label
                                htmlFor={option}
                                className="text-sm font-medium max-w-[200px] cursor-pointer"
                              >
                                {option}
                              </label>
                            </div>
                          )}
                        </>
                      ))}
                    </div>
                  </div>
                ))}
              </PopoverContent>
            ) : (
              <PopoverContent
                align="start"
                className="grid grid-cols-2 max-h-[60vh] "
              >
                <div className="flex flex-col gap-2">
                  {" "}
                  {data?.map((role, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 hover:text-blue-500  "
                    >
                      {" "}
                      <Checkbox
                        id={role}
                        checked={selectedFilter.includes(role)}
                        onCheckedChange={() => setSelectedFilter(role)}
                        className="mt-0.5"
                      />
                      <label
                        htmlFor={role}
                        className="text-sm   font-medium max-w-[200px] cursor-pointer"
                      >
                        {role}
                      </label>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            )}
          </Popover>
        </div>
        {selectedFilter.length > 0 && (
          <Button
            variant={"outline"}
            size={"sm"}
            onClick={() =>
              setTimeout(() => {
                reset();
              }, 200)
            }
            className="rounded-full py-3 hover:bg-red-200 text-sm bg-transparent text-slate-500 px-2"
          >
            Reset <RotateCcw size={9} />
          </Button>
        )}
      </m.div>
    </div>
  );
}

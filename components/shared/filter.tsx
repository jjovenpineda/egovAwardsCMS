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
interface IFilter {
  label: string;
  data: string[];
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
      <div className="flex items-center gap-4">
        <div className="flex gap-1 items-center  w-fit text-slate-900 h-[46px] border group text-sm bg-white  rounded-lg ">
          <Popover>
            <PopoverTrigger className="size-full  ">
              <Sliders size={10} className="text-slate-500 max-h-10" />
            </PopoverTrigger>
            {selectedFilter.length > 0 &&
              selectedFilter.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-1 items-center border p-1 px-1.5 rounded-full text-xs font-medium text-[#6B7280] ml-2"
                >
                  <div className="whitespace-nowrap">{item}</div>
                  <div className="flex items-center  shrink-0 justify-center bg-[#E5E7EB] hover:bg-red-400 transition-color duration-200 rounded-full size-3.5 ">
                    <X
                      size={10}
                      onClick={() => setSelectedFilter(item)}
                      className=" text-black "
                    />
                  </div>
                </div>
              ))}
            <PopoverContent
              align="start"
              className="grid grid-cols-2 max-h-[60vh] mt-4 -ml-3"
            >
              <div className="flex flex-col gap-2">
                {" "}
                {data?.map((role, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {" "}
                    <Checkbox
                      id={role}
                      checked={selectedFilter.includes(role)}
                      onCheckedChange={() => setSelectedFilter(role)}
                      className="mt-0.5"
                    />
                    <label
                      htmlFor={role}
                      className="text-sm font-medium max-w-[200px] cursor-pointer"
                    >
                      {role}
                    </label>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
        {selectedFilter.length > 0 && (
          <Button
            variant={"outline"}
            size={"sm"}
            onClick={() => reset()}
            className="rounded-full py-3 hover:bg-red-200 text-sm bg-transparent text-slate-500 px-2"
          >
            Reset <RotateCcw size={9} />
          </Button>
        )}
      </div>
    </div>
  );
}

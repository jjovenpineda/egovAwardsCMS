"use client";

import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import Link from "next/link";
import dayjs from "dayjs";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useSearchParams } from "next/navigation";
import {
  ChevronDown,
  ClipboardCheckIcon,
  Download,
  Eye,
  Lock,
  RotateCcw,
  Search,
  Sliders,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Field, Form, Formik } from "formik";
import { entriesFilterOptions } from "@/constants";
import { DownloadEntries } from "@/components/downloadEntries";
import Loaders from "@/components/loaders";
import { apiGet } from "@/utils/api";
export default function Entries() {
  const searchParams = useSearchParams();
  const filterParams = searchParams.get("filter");
  const downloadRef = useRef<HTMLButtonElement>(null);
  const [entriesList, setEntriesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getEntryList = async () => {
    try {
      const res = await apiGet("/api/entry/view");
      const { data } = res;
      if (!data) return;
      setEntriesList(data);
    } catch (e) {
      console.error("Error fetching participants list:", e);
    }
  };
  useEffect(() => {
    getEntryList();
  }, []);

  const validationSchema = Yup.object().shape({
    impact: Yup.number()
      .typeError("Must be a number")
      .max(50, "Number must not be above 50"),
    relevance: Yup.number()
      .typeError("Must be a number")
      .max(50, "Number must not be above 50"),
    sustainability: Yup.number()
      .typeError("Must be a number")
      .max(50, "Number must not be above 50"),
    innovation: Yup.number()
      .typeError("Must be a number")
      .max(50, "Number must not be above 50"),
    alignment: Yup.number()
      .typeError("Must be a number")
      .max(50, "Number must not be above 50"),
  });
  return (
    <div className="min-h-screen flex w-full">
      <div className="space-y-2 h-full w-full">
        <h1 className="text-slate-600 font-bold text-2xl uppercase">
          {filterParams == "all"
            ? "All Entries"
            : filterParams == "review"
            ? "For Review"
            : filterParams}
        </h1>
        <h2 className="text-blue-900 text-base py-4">
          Theme: 11th eGOV Awards: Excellence in Governance Through Information
          and Communications Technology Awards
        </h2>
        <div className="flex gap-3 pb-4">
          <Popover>
            <PopoverTrigger className="text-slate-900 h-fit border group text-sm  flex items-center gap-2 bg-white p-2 rounded-lg">
              2025
              <ChevronDown
                size={10}
                className="transition-transform duration-200 group-data-[state=open]:rotate-180"
              />
            </PopoverTrigger>
            <PopoverContent align="start">
              Place content for the popover here.
            </PopoverContent>
          </Popover>
          <div className="relative w-full max-w-[350px]">
            {" "}
            <Input
              type="text"
              placeholder="Search by reference number or keyword"
              className="pl-10 "
            />{" "}
            <Search
              size={15}
              className="absolute -translate-y-1/2 top-1/2 left-3 text-slate-500"
            />
          </div>
        </div>
        <div className="text-xs text-slate-500 font-semibold">
          <Label>Filter</Label>
          <div className="flex gap-4 items-center mt-1">
            <Popover>
              <PopoverTrigger className="text-slate-900 h-fit border group text-sm  flex items-center gap-2 bg-white p-2 px-3 rounded-lg">
                <Sliders size={15} className="text-slate-500" />
                {}
                <div className="flex gap-1 items-center border p-2 rounded-full text-xs font-medium text-[#6B7280]">
                  test{" "}
                  <div className="flex items-center justify-center bg-[#E5E7EB] hover:bg-slate-300 transition-color duration-200 rounded-full size-3.5 ">
                    <X size={10} className=" text-black" />
                  </div>
                </div>
                <div className="flex gap-1 items-center border p-2 rounded-full text-xs font-medium text-[#6B7280]">
                  test{" "}
                  <div className="flex items-center justify-center bg-[#E5E7EB] hover:bg-slate-300 transition-color duration-200 rounded-full size-3.5 ">
                    <X size={10} className=" text-black" />
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                className="grid grid-cols-2 max-h-[60vh] overflow-y-scroll"
              >
                {entriesFilterOptions?.map((section, index) => (
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
                      {section.options.map((option) => (
                        <div
                          key={option.id}
                          className="flex items-start space-x-3 "
                        >
                          <Checkbox
                            id={option.id}
                            /*   checked={} */
                            className="mt-0.5"
                          />
                          <label
                            htmlFor={option.id}
                            className="text-sm font-medium max-w-[200px] cursor-pointer"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </PopoverContent>
            </Popover>
            <Button
              variant={"outline"}
              size={"sm"}
              className="rounded-full py-3 text-sm bg-transparent text-slate-500 px-2"
            >
              Reset <RotateCcw size={9} />
            </Button>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              {(() => {
                return [
                  "Application",
                  "LGU",
                  "Project Name",
                  "Category",
                  "Ranking",
                  "Action",
                ].map((th, index) => (
                  <TableHead
                    key={index}
                    className={` font-medium ${
                      th === "Application"
                        ? "w-[167px]"
                        : th == "LGU"
                        ? "w-[208px]"
                        : th === "Project Name"
                        ? "w-[500px]"
                        : th === "Ranking"
                        ? "w-[0px] text-center"
                        : th == "Category"
                        ? "w-0 text-center"
                        : th == "Action"
                        ? "w-20 text-center"
                        : ""
                    }`}
                  >
                    {th}
                  </TableHead>
                ));
              })()}
            </TableRow>
          </TableHeader>
          <TableBody>
            {(() => {
              const [quickScoreList, setQuickScoreList] = useState<string[]>(
                []
              );
              const toggleQuickScore = (number: number) => {
                setQuickScoreList((prev) =>
                  prev.includes(number.toString())
                    ? prev.filter((item) => item !== number.toString())
                    : [...prev, number.toString()]
                );
              };

              return entriesList.map((item: any, index) => (
                <React.Fragment key={index}>
                  <TableRow
                    key={index}
                    className="border-b-0 hover:bg-transparent"
                  >
                    <TableCell className="font-medium">
                      <div className="">
                        <div className="font-semibold flex gap-1 ">
                          <h2 className="text-slate-900 text-base">
                            {item.refNo}
                          </h2>
                          <div className="flex  font-bold gap-0.5 items-center text-emerald-800">
                            <ClipboardCheckIcon size={12} />
                            <h3 className="text-xs">92.10</h3>
                          </div>
                        </div>
                        <h3 className="text-emerald-500 font-bold flex gap-1 items-center whitespace-nowrap">
                          {filterParams === "final" && (
                            <Lock size={12} className="" />
                          )}
                          {item.status} |{" "}
                          {dayjs(item.createdAt).format("MM/DD/YYYY")}
                        </h3>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-base">
                        <h2 className="text-slate-900 line-clamp-2">
                          Calabanga
                        </h2>{" "}
                        <h3 className="line-clamp-1 text-slate-500 ">
                          Camarines Sur{" "}
                        </h3>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-base">
                        <h2 className="text-slate-900 line-clamp-2">
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Nulla libero voluptatem ducimus. Deleniti
                          veritatis qui temporibus alias numquam consectetur hic
                          quasi eius impedit, assumenda itaque vel officia
                          molestiae modi nemo.
                        </h2>{" "}
                        <a href="#" className="line-clamp-1 text-blue-400 ">
                          www.govlinksolutions.com lorem
                        </a>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div>
                        <TooltipProvider delayDuration={0}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <h2 className="font-medium text-base text-slate-900 cursor-pointer ">
                                G2B
                              </h2>
                            </TooltipTrigger>
                            <TooltipContent side="left">
                              <p>Lorem ipsum dolor sit </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <div className="bg-slate-100 text-[10px]  mx-auto px-2 w-fit rounded-full">
                          5 SDGs
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="bg-[#CCFBF1] py-1.5 mx-auto px-2.5 w-fit rounded-full">
                        {item.ranking}
                      </div>
                    </TableCell>
                    <TableCell className="flex flex-col text-center space-y-1">
                      <Link
                        href={{
                          pathname: "/entries/entry",
                          query: { filter: "all", id: index },
                        }}
                        draggable={false}
                        className="bg-[#DBEAFE] h-[24px] whitespace-nowrap hover:bg-[#bcd9ff] w-fit text-xs text-[#1E40AF] px-1.5 rounded-full flex gap-1 items-center p-1"
                      >
                        <Eye size={15} />
                        View Details
                      </Link>
                      <Button
                        onClick={() => toggleQuickScore(index)}
                        variant={"outline"}
                        size={"sm"}
                        className={`${
                          quickScoreList.includes(index.toString())
                            ? "bg-teal-500 hover:bg-teal-500 text-slate-50 hover:text-slate-50"
                            : "bg-[#CCFBF1] hover:bg-[#b0f6e7] text-[#115E59] hover:text-[#115E59]"
                        }      h-[24px] rounded-full w-min px-1.5 p-1`}
                      >
                        <div className="flex gap-1">
                          <ClipboardCheckIcon size={15} />
                          Quickscore
                        </div>
                      </Button>
                      <Button
                        variant={"outline"}
                        size={"sm"}
                        disabled={isLoading}
                        onClick={() => {
                          if (downloadRef.current) {
                            downloadRef.current.click();
                          }
                        }}
                        className="bg-[#F3F4F6]  h-[24px] hover:bg-[#e3e3e3] text-[#1F2937] p-1 px-1.5 rounded-full w-min "
                      >
                        <div className="flex gap-1">
                          {isLoading ? (
                            <div className="px-6 h-4">
                              <Loaders loader={"orbit"} size={25} />
                            </div>
                          ) : (
                            <>
                              {" "}
                              <Download size={15} />
                              Download
                            </>
                          )}
                        </div>
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={6} className="p-0 border-0">
                      <Accordion
                        type="multiple"
                        value={quickScoreList}
                        onValueChange={setQuickScoreList}
                      >
                        <AccordionItem
                          value={index.toString()}
                          className="border-0 "
                        >
                          <Formik
                            initialValues={{
                              impact: 0,
                              relevance: 0,
                              sustainability: 0,
                              innovation: 0,
                              alignment: 0,
                            }}
                            validationSchema={validationSchema}
                            onSubmit={(values, actions) => {
                              console.log(values);
                            }}
                            className="flex gap-16"
                          >
                            {({ values, setFieldValue }) => {
                              return (
                                <Form>
                                  <AccordionContent className="flex w-full justify-around items-center bg-green-100 p-6 ">
                                    {Object.keys(values).map((item, index) => (
                                      <div
                                        key={index}
                                        className="flex flex-col items-center"
                                      >
                                        <h3 className="text-xs font-medium text-green-900">
                                          {item === "alignment"
                                            ? " Alignment with Goals"
                                            : item.charAt(0).toUpperCase() +
                                              item.slice(1)}
                                        </h3>
                                        <div className="flex items-center gap-1">
                                          <Field
                                            type="text"
                                            autoComplete="off"
                                            name={item}
                                            as={Input}
                                            onChange={(e: any) => {
                                              e.target.value =
                                                e.target.value.replace(
                                                  /\D/g,
                                                  ""
                                                );
                                              if (e.target.value.length > 2) {
                                                e.target.value =
                                                  e.target.value.slice(0, 2);
                                              }
                                              if (Number(e.target.value > 50)) {
                                                setFieldValue(item, 50);
                                              } else {
                                                setFieldValue(
                                                  item,
                                                  Number(e.target.value)
                                                );
                                              }
                                            }}
                                            className="w-11"
                                          />

                                          <h3 className="text-base font-medium">
                                            /50
                                          </h3>
                                        </div>
                                      </div>
                                    ))}

                                    <div className="text-center font-bold">
                                      <h2 className="text-xs text-green-900">
                                        Total
                                      </h2>
                                      <h3 className="text-base">
                                        {Object.values(values).reduce(
                                          (accumulator, currentValue) =>
                                            accumulator + currentValue
                                        )}
                                        /250
                                      </h3>
                                    </div>
                                    <div className="flex gap-2">
                                      {" "}
                                      <Button
                                        type="submit"
                                        onClick={() => toggleQuickScore(index)}
                                        className="bg-emerald-500 hover:bg-emerald-400 font-semibold"
                                      >
                                        Save
                                      </Button>
                                      <Button
                                        type="button"
                                        onClick={() => toggleQuickScore(index)}
                                        className="bg-white hover:bg-slate-100 text-emerald-400 hover:text-emerald-700 font-semibold"
                                      >
                                        Cancel
                                      </Button>
                                    </div>
                                  </AccordionContent>
                                </Form>
                              );
                            }}
                          </Formik>
                        </AccordionItem>
                      </Accordion>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ));
            })()}
          </TableBody>
        </Table>
        <Pagination className="text-slate-500">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <DownloadEntries
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        ref={downloadRef}
      />
    </div>
  );
}

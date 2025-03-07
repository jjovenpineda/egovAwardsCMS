"use client";

import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import Link from "next/link";
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
  AccordionTrigger,
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
  RotateCcw,
  Search,
  Sliders,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ErrorMessage, Field, Form, Formik } from "formik";
export default function Entries() {
  const searchParams = useSearchParams();
  const filterParams = searchParams.get("filter");
  const [selected, setSelected] = useState<string[]>([""]);

  const filterChecklist = [
    {
      title: "FILTER BY STATUS",
      options: [
        { id: "status-select-all", label: "Select All" },
        { id: "status-review", label: "For Review" },
        { id: "status-graded", label: "Graded" },
      ],
    },
    {
      title: "FILTER BY CATEGORY",
      options: [
        { id: "category-select-all", label: "Select All" },
        { id: "category-g2a", label: "G2A" },
        { id: "category-g2b", label: "G2B" },
        { id: "category-g2c", label: "G2C" },
        { id: "category-g2d", label: "G2D" },
        { id: "category-g2e", label: "G2E" },
      ],
    },
    {
      title: "FILTER BY SDGs",
      options: [
        { id: "sdg-select-all", label: "Select All" },
        { id: "sdg-no-poverty", label: "No Poverty" },
        { id: "sdg-zero-hunger", label: "Zero Hunger" },
        {
          id: "sdg-good-health",
          label: "Good Health and Well-being",
        },
        {
          id: "sdg-quality-education",
          label: "Quality Education",
        },
        { id: "sdg-gender-equality", label: "Gender Equality" },
        {
          id: "sdg-clean-water",
          label: "Clean Water and Sanitation",
        },
        {
          id: "sdg-affordable-energy",
          label: "Affordable and Clean Energy",
        },
        {
          id: "sdg-decent-work",
          label: "Decent Work and Economic Growth",
        },
        {
          id: "sdg-industry",
          label: "Industry, Innovation, and Infrastructure",
        },
        {
          id: "sdg-reduced-inequalities",
          label: "Reduced Inequalities",
        },
        {
          id: "sdg-sustainable-cities",
          label: "Sustainable Cities and Communities",
        },
        {
          id: "sdg-responsible-consumption",
          label: "Responsible Consumption and Production",
        },
        { id: "sdg-climate-action", label: "Climate Action" },
        {
          id: "sdg-life-below-water",
          label: "Life Below Water",
        },
        { id: "sdg-life-on-land", label: "Life on Land" },
        {
          id: "sdg-peace-justice",
          label: "Peace, Justice, and Strong Institutions",
        },
        {
          id: "sdg-partnerships",
          label: "Partnerships for the Goals",
        },
      ],
    },
    {
      title: "FILTER BY REGIONS",
      options: [
        { id: "region-select-all", label: "Select All" },
        { id: "region-ncr", label: "NCR" },
        { id: "region-car", label: "CAR" },
        { id: "region-1", label: "Region 1" },
        { id: "region-3", label: "Region 3" },
        { id: "region-4a", label: "Region 4A" },
        { id: "region-4b", label: "Region 4B" },
        { id: "region-5", label: "Region 5" },
        { id: "region-6", label: "Region 6" },
        { id: "region-8", label: "Region 8" },
        { id: "region-9", label: "Region 9" },
        { id: "region-11", label: "Region 11" },
        { id: "region-12", label: "Region 12" },
        { id: "region-13", label: "Region 13" },
        { id: "region-barmm", label: "BARMM" },
      ],
    },
  ];
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
          <div className="relative">
            {" "}
            <Input
              type="text"
              placeholder="Search by keyword"
              className="pl-10"
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
                {filterChecklist.map((section, index) => (
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
              className="rounded-full py-3 text-sm text-slate-500 px-2"
            >
              Reset <RotateCcw size={9} />
            </Button>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              {(() => {
                const tableHeader = [
                  "Application",
                  "LGU",
                  "Project Name",
                  "Category",
                  "Ranking",
                  "Action",
                ];
                return tableHeader.map((th, index) => (
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
              const data = [
                {
                  invoice: "INV004",
                  paymentStatus: "Paid",
                  totalAmount: "$450.00",
                  paymentMethod: "Credit Card",
                  ranking: 1,
                },
                {
                  invoice: "INV005",
                  paymentStatus: "Paid",
                  totalAmount: "$450.00",
                  paymentMethod: "Credit Card",
                  ranking: 2,
                },
              ];

              return data.map((item, index) => (
                <React.Fragment key={index}>
                  <TableRow
                    key={index}
                    className="border-b-0 hover:bg-transparent"
                  >
                    <TableCell className="font-medium">
                      <div className="">
                        <div className="font-semibold flex gap-1 ">
                          <h2 className="text-slate-900 text-base">25G2BCAL</h2>
                          <div className="flex  font-bold gap-0.5 items-center text-emerald-800">
                            <ClipboardCheckIcon size={12} />
                            <h3 className="text-xs">92.10</h3>
                          </div>
                        </div>
                        <h3 className="text-emerald-500 font-bold">
                          GRADED | 01/26/2025
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
                          pathname: "entries/entry",
                          query: { filter: "all", id: index },
                        }}
                        draggable={false}
                        className="bg-[#DBEAFE] whitespace-nowrap hover:bg-[#bcd9ff] w-fit text-xs text-[#1E40AF] px-1.5 rounded-full flex gap-2 items-center p-1"
                      >
                        <Eye size={15} />
                        View Details
                      </Link>
                      <Button
                        onClick={() => toggleQuickScore(index)}
                        variant={"outline"}
                        size={"sm"}
                        className="bg-[#CCFBF1] hover:bg-[#b0f6e7] text-[#115E59] h-fit rounded-full w-min px-1.5 p-1"
                      >
                        <ClipboardCheckIcon size={15} />
                        Quickscore
                      </Button>
                      <Button
                        variant={"outline"}
                        size={"sm"}
                        className="bg-[#F3F4F6] hover:bg-[#e3e3e3] text-[#1F2937] h-fit p-1 px-1.5 rounded-full w-min "
                      >
                        <Download size={15} />
                        Download
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
    </div>
  );
}

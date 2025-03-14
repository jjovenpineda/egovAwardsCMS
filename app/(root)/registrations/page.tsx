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
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import pdf from "@/public/assets/images/pdf.svg";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  ChevronDown,
  ClipboardCheckIcon,
  Download,
  Eye,
  MinusCircle,
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
import ModalWrapper from "@/components/shared/modal-wrapper";
import LGUForms from "@/components/lgu-forms";
import { PSGC } from "@/constants";
export default function Page() {
  const searchParams = useSearchParams();
  const filterParams = searchParams.get("filter");
  const [selected, setSelected] = useState<string[]>([""]);
  const [page1Modal, setPage1Modal] = useState(false);
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
          Registrations
        </h1>

        <div className="text-xs text-slate-500 font-semibold">
          <Label>Filter</Label>
          <div className="flex justify-between items-end">
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
                    <div
                      key={index}
                      className={`${index > 1 && "col-span-2 "}`}
                    >
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
                    </>
                  );
                })()}
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              {(() => {
                const tableHeader = [
                  "Authorized Representative",
                  "LGU",
                  "Proof",
                  "Actions",
                ];
                return tableHeader.map((th, index) => (
                  <TableHead
                    key={index}
                    className={` font-medium ${
                      th === "Authorized Representative"
                        ? ""
                        : th == "LGU"
                        ? ""
                        : th === "Proof"
                        ? "w-32"
                        : th === "Actions"
                        ? "w-[0] text-center"
                        : ""
                    }`}
                  >
                    <h3
                      className={`${
                        th === "No. of Entries" && "whitespace-nowrap"
                      }`}
                    >
                      {th}
                    </h3>
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
              const [status, setStatus] = useState("approved");
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
                      <div className="text-base">
                        <h2 className="text-slate-900 line-clamp-1">
                          Lorem ipsum
                        </h2>{" "}
                        <a href="#" className="line-clamp-1 text-blue-400 ">
                          lorem@gmail.com
                        </a>
                      </div>
                    </TableCell>
                    <TableCell>
                      <h2 className="text-slate-500 text-base line-clamp-1">
                        Camarines Sur lorem
                      </h2>{" "}
                      <h2 className="text-slate-500 text-base line-clamp-1">
                        Bicol (Region V)
                      </h2>{" "}
                    </TableCell>
                    <TableCell>
                      <div className="bg-slate-200 transition-colors hover:bg-slate-300 text-xs  text-slate-900 flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap rounded-full  w-full">
                        {" "}
                        <Image src={pdf} alt="PDF Icon" />
                        View PDF <Eye size={10} className=" shrink-0" />
                      </div>
                    </TableCell>
                    <TableCell className="flex flex-col text-center space-y-1">
                      <button
                        onClick={() => setPage1Modal(true)}
                        className="bg-[#DBEAFE] whitespace-nowrap hover:bg-[#bcd9ff] w-fit text-xs text-[#1E40AF]  rounded-full flex gap-2 items-center p-1"
                      >
                        <Eye size={15} />
                        View Details
                      </button>
                      <Dialog open={page1Modal} onOpenChange={setPage1Modal}>
                        <DialogTrigger asChild></DialogTrigger>
                        <DialogContent className="w-full max-w-[887px]">
                          <DialogHeader>
                            <DialogTitle>
                              {" "}
                              <h2 className="font-bold text-lg uppercase text-blue-900 mb-6">
                                Details
                              </h2>
                            </DialogTitle>
                            <DialogDescription></DialogDescription>
                          </DialogHeader>
                          <Details />
                          <div className="flex items-end justify-end gap-4">
                            <DialogClose>
                              <Button variant={"outline"} type="submit">
                                <X size={15} /> Close
                              </Button>
                            </DialogClose>
                          </div>
                        </DialogContent>
                      </Dialog>
                      {status == "approved" && (
                        <Button
                          onClick={() => setStatus("pending")}
                          variant={"outline"}
                          size={"sm"}
                          className={`${
                            quickScoreList.includes(index.toString())
                              ? "bg-teal-500 hover:bg-teal-500 text-slate-50 hover:text-slate-50"
                              : "bg-[#CCFBF1] hover:bg-[#b0f6e7] text-[#115E59] hover:text-[#115E59]"
                          }     h-fit rounded-full w-min px-1.5 p-1`}
                        >
                          <ClipboardCheckIcon size={15} />
                          Approved
                        </Button>
                      )}
                      {status == "pending" && (
                        <Button
                          onClick={() => setStatus("approved")}
                          variant={"outline"}
                          size={"sm"}
                          className={`bg-orange-100 hover:bg-orange-200 text-orange-600 hover:text-orange-700
                              h-fit rounded-full w-min px-1.5 p-1`}
                        >
                          <MinusCircle size={15} />
                          For Approval
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ));
            })()}
          </TableBody>
        </Table>
        <div className="flex justify-between items-center w-full">
          <div className="text-base text-slate-500">
            Showing 1 to 10 of 24 Participants
          </div>
          <div>
            <Pagination className="text-slate-500 w-fit">
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
      </div>
    </div>
  );
}

const Details = () => {
  const aboutTheLguLabels = [
    { label: "Contact Person", value: "contactPerson" },
    { label: "LGU Name", value: "lgu_name" },
    { label: "LGU Abbreviation", value: "lgu_abbr" },
    { label: "Province", value: "lgu_province" },
    { label: "Region", value: "lgu_region" },
    { label: "Name of LCE", value: "lgu_lceName" },
    { label: "Name of Office in LGU", value: "lgu_officeName" },
    { label: "Contact Person", value: "lgu_contactPerson" },
    { label: "Email", value: "lgu_contactPersonEmail" },
    { label: "Mobile Number", value: "lgu_contactPersonMobileNo" },
    { label: "Office Number", value: "lgu_contactPersonOfficeNo" },
    { label: "Facebook Page", value: "lgu_facebook" },
    { label: "Website", value: "lgu_website" },

    {
      label:
        "Number of times in joining eGOV, Digital Cities Awards, Digital Governance Awards from 2012 to 2022",
      value: "joinCount",
    },
  ];
  const values = {
    contactPerson: "juandelacruz@calabanga.com",
    lgu_name: "012801000", // Example LGU ID (should match PSGC IDs)
    lgu_abbr: "LGU Example",
    lgu_province: "Ilocos Norte",
    lgu_region: "Region I - Ilocos Region",
    lgu_lceName: "Juan Dela Cruz",
    lgu_officeName: "Municipal Information Office",
    lgu_contactPerson: "Maria Santos",
    lgu_contactPersonEmail: "info@lgu-example.gov.ph",
    lgu_contactPersonMobileNo: "09171234567",
    lgu_contactPersonOfficeNo: "(077) 123-4567",
    lgu_facebook: "https://www.facebook.com/LGUExample",
    lgu_website: "https://www.lgu-example.gov.ph",
    joinCount: 3, // Number of times LGU joined eGOV awards

    // Additional project-related fields (not in aboutTheLguLabels but kept for reference)
    projectName: "Smart City Initiative",
    projectCategory: "Digital Innovation",
    projectPeriod: "January 2022 - December 2023",
    projectURL: "https://www.smartcity-example.gov.ph",

    // Example documents
    documents: [
      {
        title: "Invoice #001",
        date: "2025-03-05",
        recipient: "John Doe",
        items: [
          {
            description: "Web Development Services",
            quantity: 1,
            price: 500.0,
          },
          {
            description: "Hosting (1 Year)",
            quantity: 1,
            price: 100.0,
          },
        ],
        total: 600.0,
      },
      {
        title: "Report - Q1 2025",
        date: "2025-03-05",
        author: "Jane Smith",
        summary:
          "This report summarizes the financial and operational performance for Q1 2025.",
      },
    ],
  };
  return (
    <>
      <section>
        <div className=" space-y-2 pt-6 lg:pt-0">
          <div className="flex justify-between items-center">
            {/*    <h2 className="font-bold text-lg text-blue-900">Details</h2> */}
          </div>
        </div>
        <div className="grid text-base w-full grid-cols-2 md:grid-cols-[_40%,_60%] md:gap-2">
          {aboutTheLguLabels.map((item, index) => {
            /*  const region = PSGC.regions.find((region) =>
              values.lgu.startsWith(region.id)
            );
            const province = PSGC.regions
              .find((region) => values.lgu.startsWith(region.id))
              ?.provinces.find((province) =>
                values.lgu.startsWith(province.id)
              );
            const lgu = PSGC.regions
              .find((region) => values.lgu.startsWith(region.id))
              ?.provinces.find((province) => values.lgu.startsWith(province.id))
              ?.lgus.find((lgu) => lgu.id === values.lgu); */

            return (
              <React.Fragment key={index}>
                {item.value === "contactPerson" ? (
                  <div className="flex flex-col col-span-2 mb-2">
                    {" "}
                    <div className="flex justify-between">{item.label}</div>
                    <div>
                      <div className=" font-medium text-slate-500">
                        {values[item.value]}
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between">
                      {item.label} <span className="mr-4">:</span>
                    </div>
                    <div>
                      <div className=" font-medium text-slate-500">
                        {values[item.value]}
                      </div>
                    </div>
                  </>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </section>
    </>
  );
};

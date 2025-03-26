"use client";

import React, { useEffect, useState } from "react";
import * as Yup from "yup";
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
  Check,
  ChevronDown,
  Download,
  Eye,
  RotateCcw,
  Sliders,
  X,
} from "lucide-react";
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
import { apiGet } from "@/utils/api";
import CustomBadge from "@/components/shared/custom-badge";
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
export default function Page() {
  const searchParams = useSearchParams();
  const filterParams = searchParams.get("filter");
  const [registrationsList, setRegistrationsList] = useState<any>([]);
  const getRegistrationsList = async () => {
    try {
      const res = await apiGet("/api/lgu/registrations/list");
      const { data } = res;
      if (!data) return;
      setRegistrationsList(data.registrants);
    } catch (e) {
      console.error("Error fetching participants list:", e);
    }
  };
  useEffect(() => {
    getRegistrationsList();
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

              return registrationsList?.map((item: any, index: any) => (
                <React.Fragment key={index}>
                  <TableRow
                    key={index}
                    className="border-b-0 hover:bg-transparent"
                  >
                    <TableCell className="font-medium">
                      <div className="text-base">
                        <h2 className="text-slate-900 line-clamp-1">
                          {item.firstname +
                            " " +
                            item.middlename +
                            " " +
                            item.lastname}
                        </h2>{" "}
                        <a href="#" className="line-clamp-1 text-blue-400 ">
                          {item.email}
                        </a>
                      </div>
                    </TableCell>
                    <TableCell>
                      <h2 className="text-slate-500 text-base line-clamp-1">
                        {item.lgu + " " + item.province}
                      </h2>{" "}
                      <h2 className="text-slate-500 text-base line-clamp-1">
                        {item.region}
                      </h2>{" "}
                    </TableCell>
                    <TableCell>
                      <ViewPDF
                        url={item.authLetter}
                        email={item.email}
                        status={item.isApproved}
                      >
                        <div className="bg-slate-100 transition-colors hover:bg-slate-200 text-xs  text-slate-900 flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap rounded-full py-0.5 w-full">
                          {" "}
                          <Image src={pdf} alt="PDF Icon" />
                          View PDF <Eye size={10} className=" shrink-0" />
                        </div>
                      </ViewPDF>
                    </TableCell>
                    <TableCell className="flex flex-col text-center space-y-2">
                      <Dialog>
                        <DialogTrigger>
                          <Button
                            size={"sm"}
                            className="bg-[#DBEAFE] whitespace-nowrap hover:bg-[#bcd9ff] text-xs text-[#1E40AF]  h-fit rounded-full w-min px-2 py-0.5"
                          >
                            <div className="flex gap-1">
                              <Eye size={13} />
                              View Details
                            </div>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="w-full max-w-[528px]">
                          <DialogHeader>
                            <DialogTitle>
                              {" "}
                              <div className="font-bold text-lg uppercase text-blue-900 mb-6">
                                Details
                              </div>
                            </DialogTitle>
                            <DialogDescription></DialogDescription>
                          </DialogHeader>
                          <div>
                            <h2 className="text-lg  text-gray-900">
                              {item?.lgu + " " + item?.province}
                            </h2>
                            <p className="text-[16px] text-gray-600">
                              {item?.region}
                            </p>

                            <div className="text-blue-500 font-medium text-[16px] mt-4 block">
                              Authorized Representative
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mt-1">
                              {item?.firstname +
                                " " +
                                item?.middlename +
                                " " +
                                item?.lastname}
                            </h3>
                            <p className="text-[16px] text-slate-700">
                              {item?.email}
                            </p>
                            <p className="text-[16px] text-slate-700">
                              {`+63${item?.mobile}`}
                            </p>

                            <div className="mt-8 text-[16px] text-slate-700 space-y-1">
                              <div className="flex">
                                <div className="text-slate-500 w-[200px]">
                                  Name of LCE
                                </div>
                                : {item?.lceName}
                              </div>
                              <div className="flex">
                                <div className="text-slate-500 w-[200px] mb-4">
                                  Name of Office in LGU
                                </div>
                                : {item?.officeName}
                              </div>
                              <div className="flex">
                                <div className="text-slate-500 w-[200px]">
                                  Office Number
                                </div>
                                : {item?.officeNo}
                              </div>
                              <div className="flex">
                                <div className="text-slate-500 w-[200px]">
                                  Website
                                </div>
                                : {item?.website}
                              </div>
                              <div className="flex">
                                <div className="text-slate-500 w-[200px] mb-4">
                                  Facebook Page
                                </div>
                                : {item?.facebook}
                              </div>
                              <div className="flex">
                                <div className="text-slate-500 w-[200px]">
                                  Number of Times Joined
                                </div>
                                : {item?.joinCount}
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      {item.isApproved && (
                        <div className="flex items-start">
                          <CustomBadge
                            color="emerald"
                            message="Verified"
                            icon={<Check size={13} />}
                            className="rounded-full h-[20px] whitespace-nowrap font-medium bg-[#CCFBF1] text-[#115E59]  "
                          />
                        </div>
                      )}

                      {!item.isApproved && (
                        <CustomBadge
                          message="For Verification"
                          className="rounded-full h-[20px] whitespace-nowrap font-medium bg-[#FFF1C2] text-[#BF6A02] "
                        />
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

interface IViewPDF {
  children: React.ReactNode;
  url: string;
  email: string;
  status: string;
}
const ViewPDF = ({ children, url, email, status }: IViewPDF) => {
  const handleApprove = async () => {
    try {
      const res = await apiGet(`/api/lgu/change/approvedState?email=${email}`);
      /*  const { data } = res;
      if (!data) return;
      setEntriesList(data); */
    } catch (e) {
      console.error("Error fetching participants list:", e);
    }
  };

  /*  const getEntryList = async () => {
      
    };
    */

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="h-[100vh] sm:h-[90vh] overflow-auto ">
        {" "}
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-blue-900">
            AUTHORIZATION LETTER
          </DialogTitle>
        </DialogHeader>
        <div className="h-[80vh] sm:h-[70vh] ">
          <iframe src={url} className="size-full" />
        </div>
        <DialogFooter className="">
          <>
            <DialogClose asChild className="">
              <Button
                variant={"outline"}
                className="border-black font-semibold"
                type="button"
              >
                <X />
                Close
              </Button>
            </DialogClose>

            {!status ? (
              <Button
                type="button"
                onClick={handleApprove}
                className="mb-2 hover:bg-[#0f9d8c] bg-[#14B8A6] font-semibold"
              >
                <Check />
                Verify
              </Button>
            ) : (
              <div className="mb-2 h-[37px] flex items-center gap-2 text-sm px-3 rounded-md font-semibold text-[#14B8A6] bg-[#CCFBF1] ">
                <Check />
                Verified
              </div>
            )}
          </>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

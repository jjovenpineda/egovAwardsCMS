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
import { toast } from "@/hooks/use-toast";
import Loaders from "@/components/loaders";
import CustomPagination from "@/components/shared/pagination";
import Filter from "@/components/shared/filter";
const filterChecklist = [
  {
    title: "FILTER BY STATUS",
    options: ["Select All", "For Review", "Graded"],
  },
  {
    title: "FILTER BY CATEGORY",
    options: ["Select All", "G2A", "G2B", "G2C", "G2D", "G2E"],
  },
  {
    title: "FILTER BY SDGs",
    options: [
      "Select All",
      "No Poverty",
      "Zero Hunger",
      "Good Health and Well-being",
      "Quality Education",
      "Gender Equality",
      "Clean Water and Sanitation",
      "Affordable and Clean Energy",
      "Decent Work and Economic Growth",
      "Industry, Innovation, and Infrastructure",
      "Reduced Inequalities",
      "Sustainable Cities and Communities",
      "Responsible Consumption and Production",
      "Climate Action",
      "Life Below Water",
      "Life on Land",
      "Peace, Justice, and Strong Institutions",
      "Partnerships for the Goals",
    ],
  },
  {
    title: "FILTER BY REGIONS",
    options: [
      "Select All",
      "NCR",
      "CAR",
      "Region 1",
      "Region 3",
      "Region 4A",
      "Region 4B",
      "Region 5",
      "Region 6",
      "Region 8",
      "Region 9",
      "Region 11",
      "Region 12",
      "Region 13",
      "BARMM",
    ],
  },
];
export default function Page() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const searchParams = useSearchParams();
  const [selectedFilter, setSelectedFilter] = useState<any>([]);
  const [registrationsList, setRegistrationsList] = useState<any>([]);
  const getRegistrationsList = async () => {
    try {
      const res = await apiGet(
        `/api/lgu/registrations/list?page=${page}&limit=${limit}&order=desc`
      );
      const { data } = res;
      if (!data) return;
      setRegistrationsList(data);
    } catch (e) {
      console.error("Error fetching participants list:", e);
    }
  };

  useEffect(() => {
    getRegistrationsList();
  }, [page]);

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
          <div className="flex justify-between items-end">
            <div className="flex gap-4 items-center mt-1">
              <Filter
                label="Filter"
                data={filterChecklist}
                selectedFilter={selectedFilter}
                setSelectedFilter={(data: string) =>
                  setSelectedFilter((currentData: any) =>
                    currentData.includes(data)
                      ? currentData.filter((item: string) => item !== data)
                      : [...currentData, data]
                  )
                }
                reset={() => setSelectedFilter([])}
              />
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

              return registrationsList?.registrants?.map(
                (item: any, index: any) => (
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
                          fetchData={getRegistrationsList}
                        >
                          <div className="bg-slate-100 transition-colors hover:bg-slate-200 text-xs  text-slate-900 flex h-[20px] w-fit items-center justify-center gap-1 cursor-pointer whitespace-nowrap rounded-full  p-2">
                            {" "}
                            <Image src={pdf} alt="PDF Icon" />
                            <span className="text-[10px]">View PDF</span>{" "}
                            <Eye size={10} className=" shrink-0" />
                          </div>
                        </ViewPDF>
                      </TableCell>
                      <TableCell className="flex flex-col text-center space-y-2">
                        <Dialog>
                          <DialogTrigger>
                            <div className="bg-[#DBEAFE] flex  items-center  gap-1 whitespace-nowrap hover:bg-[#bcd9ff] text-xs text-[#1E40AF]  h-fit rounded-full w-min px-2 py-0.5">
                              <Eye size={10} className=" shrink-0" />
                              <div className="flex gap-1 text-[10px] ">
                                View Details
                              </div>
                            </div>
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
                          <div className="flex items-center justify-center gap-1 text-[#115E59] text-[10px] font-semibold">
                            <Check size={13} /> <span>Verified</span>
                          </div>
                        )}

                        {!item.isApproved && (
                          <div className="text-center text-[#BF6A02] text-[10px] font-semibold">
                            For Verification
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                )
              );
            })()}
          </TableBody>
        </Table>
        <div className="flex justify-between items-center text-base font-medium text-[#6B7280]">
          <div>
            Showing {(page - 1) * limit + 1} to{" "}
            {registrationsList?.pages == page
              ? registrationsList?.totalItems
              : page * limit}{" "}
            of {registrationsList?.totalItems} Participants{" "}
          </div>

          <div>
            <CustomPagination
              page={page}
              setPage={(value: any) => setPage(value)}
              data={registrationsList}
            />
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
  fetchData: () => void;
}
const ViewPDF = ({ children, url, email, status, fetchData }: IViewPDF) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleApprove = async () => {
    setIsLoading(true);
    try {
      const res = await apiGet(`/api/lgu/change/approvedState?email=${email}`);
      const { data } = res;
      if (!data) return;
      if (data.isApproved) {
        fetchData();
        setIsLoading(false);
      } else {
        setIsLoading(false);

        toast({
          title: "Something went wrong",
          description: "Please try again later.",
          variant: "destructive",
          duration: 2000,
        });
      }
    } catch (e) {
      setIsLoading(false);
      console.error("Error fetching participants list:", e);
    }
  };

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

            <>
              {" "}
              {!status ? (
                <Button
                  type="button"
                  onClick={handleApprove}
                  className="mb-2 hover:bg-[#0f9d8c] bg-[#14B8A6] font-semibold"
                >
                  {isLoading ? (
                    <div className="px-5">
                      <Loaders loader={"orbit"} size={25} color="white" />
                    </div>
                  ) : (
                    <>
                      {" "}
                      <Check />
                      Verify
                    </>
                  )}
                </Button>
              ) : (
                <div className="mb-2 h-[37px] flex items-center justify-center gap-2 text-sm px-3 rounded-md font-semibold text-[#14B8A6] bg-[#CCFBF1] ">
                  <Check />
                  Verified
                </div>
              )}
            </>
          </>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

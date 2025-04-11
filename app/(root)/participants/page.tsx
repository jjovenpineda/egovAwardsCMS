"use client";

import React, { use, useEffect, useState } from "react";
import * as Yup from "yup";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import egovLogo from "@/public/assets/images/egovawardslogo.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";

import { ChevronDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Field, Form, Formik } from "formik";
import { apiGet } from "@/utils/api";
import CustomPagination from "@/components/shared/pagination";
import Filter from "@/components/shared/filter";
import { filterChecklist } from "../registrations/page";
import CustomSkeleton from "@/components/shared/custom-skeleton";
import { m } from "motion/react";
export default function Page() {
  const [participantsList, setParticipantsList] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<any>([]);
  const [quickScoreList, setQuickScoreList] = useState<string[]>([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const getParticipantsList = async () => {
    setIsLoading(true);

    try {
      const res = await apiGet(
        `/api/lgu/participants/list?page=${page}&limit=${limit}&order=desc`
      );
      const { data } = res;
      if (!data) return;
      setParticipantsList(data);
    } catch (e) {
      console.error("Error fetching participants list:", e);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 200);
    }
  };
  useEffect(() => {
    getParticipantsList();
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
          List of Participants
        </h1>
        <h2 className="text-blue-900 text-base py-4">
          Theme: 11th eGOV Awards: Excellence in Governance Through Information
          and Communications Technology Awards
        </h2>
        {isLoading ? (
          <CustomSkeleton variant="table" />
        ) : (
          <>
            {participantsList?.participants?.length === 0 ? (
              <>
                {" "}
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="max-w-[185px] text-center mx-auto pt-20"
                >
                  <Image src={egovLogo} alt="egov logo" className="size-full" />
                  <h2 className="font-semibold text-slate-300 text-base">
                    {" "}
                    No Participants Yet
                  </h2>
                </m.div>
              </>
            ) : (
              <>
                {" "}
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="space-y-2"
                >
                  <div className="flex gap-3 ">
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

                  <div className="flex gap-4 items-center mt-1 pb-4">
                    <Filter
                      label="Filter"
                      data={filterChecklist}
                      selectedFilter={selectedFilter}
                      setSelectedFilter={(data: string) =>
                        setSelectedFilter((currentData: any) =>
                          currentData.includes(data)
                            ? currentData.filter(
                                (item: string) => item !== data
                              )
                            : [...currentData, data]
                        )
                      }
                      reset={() => setSelectedFilter([])}
                    />
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        {(() => {
                          const tableHeader = [
                            "LGU",
                            "Province",
                            "Region",
                            "No. of Entries",
                          ];
                          return tableHeader.map((th, index) => (
                            <TableHead
                              key={index}
                              className={` font-medium ${
                                th === "LGU"
                                  ? ""
                                  : th == "Province"
                                  ? ""
                                  : th === "Region"
                                  ? ""
                                  : th === "No. of Entries"
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
                        const toggleQuickScore = (number: number) => {
                          setQuickScoreList((prev) =>
                            prev.includes(number.toString())
                              ? prev.filter(
                                  (item) => item !== number.toString()
                                )
                              : [...prev, number.toString()]
                          );
                        };

                        return participantsList?.participants?.map(
                          (item: any, index: any) => (
                            <React.Fragment key={index}>
                              <TableRow
                                key={index}
                                className="border-b-0 hover:bg-transparent"
                              >
                                <TableCell className="font-medium">
                                  <h2 className="text-slate-900 text-base line-clamp-2">
                                    {item.lgu}
                                  </h2>{" "}
                                </TableCell>
                                <TableCell>
                                  <h2 className="text-slate-500 text-base line-clamp-2">
                                    {item.province !== "" ? item.province : ""}
                                  </h2>{" "}
                                </TableCell>
                                <TableCell>
                                  <h2 className="text-slate-500 text-base line-clamp-2">
                                    {item.region}
                                  </h2>{" "}
                                </TableCell>
                                <TableCell className="text-center">
                                  <h2 className="text-slate-900 text-base line-clamp-2">
                                    {item.no_of_entries}
                                  </h2>{" "}
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
                                                {Object.keys(values).map(
                                                  (item, index) => (
                                                    <div
                                                      key={index}
                                                      className="flex flex-col items-center"
                                                    >
                                                      <h3 className="text-xs font-medium text-green-900">
                                                        {item === "alignment"
                                                          ? " Alignment with Goals"
                                                          : item
                                                              .charAt(0)
                                                              .toUpperCase() +
                                                            item.slice(1)}
                                                      </h3>
                                                      <div className="flex items-center gap-1">
                                                        <Field
                                                          type="text"
                                                          autoComplete="off"
                                                          name={item}
                                                          as={Input}
                                                          onChange={(
                                                            e: any
                                                          ) => {
                                                            e.target.value =
                                                              e.target.value.replace(
                                                                /\D/g,
                                                                ""
                                                              );
                                                            if (
                                                              e.target.value
                                                                .length > 2
                                                            ) {
                                                              e.target.value =
                                                                e.target.value.slice(
                                                                  0,
                                                                  2
                                                                );
                                                            }
                                                            if (
                                                              Number(
                                                                e.target.value >
                                                                  50
                                                              )
                                                            ) {
                                                              setFieldValue(
                                                                item,
                                                                50
                                                              );
                                                            } else {
                                                              setFieldValue(
                                                                item,
                                                                Number(
                                                                  e.target.value
                                                                )
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
                                                  )
                                                )}

                                                <div className="text-center font-bold">
                                                  <h2 className="text-xs text-green-900">
                                                    Total
                                                  </h2>
                                                  <h3 className="text-base">
                                                    {Object.values(
                                                      values
                                                    ).reduce(
                                                      (
                                                        accumulator,
                                                        currentValue
                                                      ) =>
                                                        accumulator +
                                                        currentValue
                                                    )}
                                                    /250
                                                  </h3>
                                                </div>
                                                <div className="flex gap-2">
                                                  {" "}
                                                  <Button
                                                    type="submit"
                                                    onClick={() =>
                                                      toggleQuickScore(index)
                                                    }
                                                    className="bg-emerald-500 hover:bg-emerald-400 font-semibold"
                                                  >
                                                    Save
                                                  </Button>
                                                  <Button
                                                    type="button"
                                                    onClick={() =>
                                                      toggleQuickScore(index)
                                                    }
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
                          )
                        );
                      })()}
                    </TableBody>
                  </Table>
                  <div className="flex justify-between items-center text-base font-medium text-[#6B7280]">
                    <div>
                      Showing {(page - 1) * limit + 1} to{" "}
                      {participantsList?.pages == page
                        ? participantsList?.totalItems
                        : page * limit}{" "}
                      of {participantsList?.totalItems} Participants{" "}
                    </div>

                    <div>
                      <CustomPagination
                        page={page}
                        setPage={(value: any) => setPage(value)}
                        data={participantsList}
                      />
                    </div>
                  </div>
                </m.div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

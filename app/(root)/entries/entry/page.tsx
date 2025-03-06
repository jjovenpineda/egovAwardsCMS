"use client";
import { Button } from "@/components/ui/button";
import { PSGC } from "@/constants";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Image from "next/image";
import pdf from "@/public/assets/images/pdf.svg";
import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useRouter, useSearchParams } from "next/navigation";
import FileViewer from "@/components/shared/file-viewer";
import { Input } from "@/components/ui/input";
import CustomBadge from "@/components/shared/custom-badge";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const aboutTheLguLabels = [
  { label: "LGU Name", value: "lgu" },
  { label: "LGU Abbreviation", value: "lgu" },
  { label: "Province", value: "province" },
  { label: "Region", value: "region" },
  { label: "Name of LCE", value: "nameOfLCE" },
  { label: "Name of Office in LGU", value: "nameOfOffice" },
  { label: "Contact Person", value: "contactPerson" },
  { label: "Email", value: "email" },
  { label: "Mobile Number", value: "mobileNumber" },
  { label: "Office Number", value: "officeNumber" },
  { label: "Facebook Page", value: "facebook" },
  { label: "Website", value: "website" },

  {
    label:
      "Number of times in joining eGOV, Digital Cities Awards, Digital Governance Awards from 2012 to 2022",
    value: "egovAwardsCount",
  },
];
interface AboutTheEntryLabel {
  label: string;
  value: string;
}
const aboutTheEntryLabels: AboutTheEntryLabel[] = [
  { label: "Project/Program Name", value: "projectName" },
  { label: "Choose Category for Project", value: "projectCategory" },
  { label: "Project Period", value: "projectPeriod" },
  { label: "Project URL", value: "projectURL" },
  { label: "Supporting Documents", value: "documents" },
];
const values = {
  lgu: "012801000", // Example LGU ID (should match PSGC IDs)
  province: "Ilocos Norte",
  region: "Region I - Ilocos Region",
  nameOfLCE: "Juan Dela Cruz",
  nameOfOffice: "Municipal Information Office",
  contactPerson: "Maria Santos",
  email: "info@lgu-example.gov.ph",
  mobileNumber: "09171234567",
  officeNumber: "(077) 123-4567",
  facebook: "https://www.facebook.com/LGUExample",
  website: "https://www.lgu-example.gov.ph",
  egovAwardsCount: 3, // Number of times LGU joined eGOV awards
  projectName: "Smart City Initiative",
  projectCategory: "Digital Innovation",
  projectPeriod: "January 2022 - December 2023",
  projectURL: "https://www.smartcity-example.gov.ph",
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
export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [page, setPage] = useState(1);
  return (
    <div className=" max-w-[80%]">
      <Button
        onClick={() => router.push(`/entries?filter=all`)}
        variant={"secondary"}
        className=" bg-slate-100 hover:bg-slate-200 font-semibold"
      >
        <ArrowLeft size={12} /> Back to list
      </Button>
      <h1 className="text-base text-blue-900  my-6">
        <strong className="font-semibold">Theme: 11th eGOV Awards: </strong>
        Excellence in Governance Through Information and Communications
        Technology Awards
      </h1>
      {page == 1 && (
        <div className="space-y-16">
          {" "}
          <div>
            <div className="flex gap-2">
              <div>
                <h2 className="font-bold text-3xl">Entry #25G2BCAL</h2>{" "}
                <h3 className="text-base text-slate-600">
                  Application: January 26, 2025 8:23AM
                </h3>
              </div>{" "}
              <CustomBadge
                color="orange"
                message="FOR REVIEW
"
              />
            </div>
          </div>
          <section>
            <div className=" space-y-2 pt-6 lg:pt-0">
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-lg text-blue-900">
                  ABOUT THE LGU{" "}
                </h2>
              </div>
              <hr className="p-2 "></hr>
            </div>
            <div className="grid text-base w-full grid-cols-2 md:grid-cols-[_40%,_60%] md:gap-2">
              {aboutTheLguLabels.map((item, index) => {
                const region = PSGC.regions.find((region) =>
                  values.lgu.startsWith(region.id)
                );
                const province = PSGC.regions
                  .find((region) => values.lgu.startsWith(region.id))
                  ?.provinces.find((province) =>
                    values.lgu.startsWith(province.id)
                  );
                const lgu = PSGC.regions
                  .find((region) => values.lgu.startsWith(region.id))
                  ?.provinces.find((province) =>
                    values.lgu.startsWith(province.id)
                  )
                  ?.lgus.find((lgu) => lgu.id === values.lgu);

                return (
                  <React.Fragment key={index}>
                    <div className="flex justify-between">
                      {item.label} <span className="mr-4">:</span>
                    </div>
                    <div>
                      <div className=" font-medium text-slate-500">
                        {item.value == "region"
                          ? region?.name
                          : item.value == "province"
                          ? province?.name
                          : item.value == "lgu"
                          ? lgu?.name
                          : values[item.value]}
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </section>
          <section>
            <div className=" space-y-2 pt-6 lg:pt-0">
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-lg text-blue-900">
                  ABOUT THE ENTRY{" "}
                </h2>
              </div>
              <hr className="p-2 "></hr>
            </div>
            <div className="grid w-full grid-cols-2 text-base md:grid-cols-[_40%,_60%] md:gap-2">
              {aboutTheEntryLabels.map((item, index) => {
                /* const category = categories.find(
                (cat) => cat.value === values.projectCategory
              ); */
                return (
                  <React.Fragment key={index}>
                    <div className="flex justify-between">
                      {item.label}{" "}
                      {item.value != "documents" && (
                        <span className="mr-4">:</span>
                      )}
                    </div>

                    {item.value == "documents" ? (
                      <div className="mb-2 font-medium text-slate-500 col-span-2">
                        <div className="flex flex-wrap gap-2 w-full ">
                          {values.documents.length > 0 &&
                            values.documents.map((item: any, index: any) => {
                              const fileURL =
                                item.name && URL.createObjectURL(item);
                              return (
                                <React.Fragment key={index}>
                                  {/*   {item.name != "" && item.name != undefined && ( */}
                                  <div className="flex items-center gap-2 w-fit">
                                    {" "}
                                    <div className="flex justify-between w-full gap-2 items-center bg-slate-500 p-2 rounded-md text-sm text-white font-semibold">
                                      <div className="flex items-center gap-2  ">
                                        <Image src={pdf} alt="" />
                                        <h3 className="max-w-[300px] line-clamp-1">
                                          {item.name} Lorem ipsum dolor sit amet
                                          consectetur adipisicing elit
                                        </h3>
                                      </div>
                                      <FileViewer url={fileURL} />
                                    </div>
                                  </div>
                                  {/*  )} */}
                                </React.Fragment>
                              );
                            })}
                        </div>{" "}
                      </div>
                    ) : item.value == "projectCategory" ? (
                      <div className="mb-2 font-medium text-slate-500"></div>
                    ) : (
                      <div className="mb-2 font-medium text-slate-500">
                        {values[item.value]}
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </section>
        </div>
      )}
      {page == 2 && (
        <Formik
          initialValues={{
            impact: 0,
            relevance: 0,
            sustainability: 0,
            innovation: 0,
            alignment: 0,
          }}
          validationSchema={""}
          onSubmit={(values, actions) => {
            console.log(values);
          }}
        >
          {({ values, setFieldValue }) => {
            return (
              <Form className="space-y-[60px]">
                <section>
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center w-full">
                      <div>
                        <div className="flex gap-4">
                          <h2 className="font-bold text-3xl">
                            Entry #25G2BCAL
                          </h2>{" "}
                          <CustomBadge color="emerald" message="GRADED" />
                        </div>
                        <h3 className="text-base text-slate-600">
                          Application: January 26, 2025 8:23AM
                        </h3>
                        <h3 className="text-base text-slate-600">
                          Graded: January 26, 2025 8:23AM
                        </h3>
                      </div>{" "}
                      <div className="flex items-end gap-8">
                        <div className="font-bold">
                          <h3 className="text-slate-500 ">OVERALL SCORE</h3>
                          <h3 className="text-2xl text-[#14B8A6]">90.00</h3>
                        </div>
                        <div className="bg-[#CCFBF1] size-10 rounded-md flex items-center justify-center">
                          <Lock size={18} className="text-emerald-800" />
                        </div>
                      </div>
                    </div>
                    <div className="flex   font-medium text-xs text-blue-600">
                      {(() => {
                        const labels = [
                          { label: "Impact", value: "impact" },
                          {
                            label: "Relevance",
                            value: "relevance",
                          },
                          {
                            label: "Sustainability",
                            value: "sustainability",
                          },
                          {
                            label: "Innovation",
                            value: "innovation",
                          },
                          {
                            label: "Alignment with Goals",
                            value: "alignment",
                          },
                        ];

                        return labels.map((item, index) => (
                          <div key={index} className="flex w-full gap-2 ">
                            <h3>{item.label}</h3>
                            <h4>
                              <strong>40</strong>/50
                            </h4>
                          </div>
                        ));
                      })()}
                      <div></div>
                    </div>
                  </div>
                </section>
                <section>
                  <div className=" space-y-2 pt-6 lg:pt-0">
                    <div className="flex justify-between items-center">
                      <h2 className="font-bold text-lg text-blue-900">
                        IMPACT OF THE PROJECT
                      </h2>
                      <div className="flex flex-col items-center gap-4">
                        <Label className="text-slate-500 text-xs font-bold">
                          SCORE
                        </Label>
                        <div className="flex items-center gap-1">
                          <Field
                            type="text"
                            maxLength={2}
                            autoComplete="off"
                            name="impact"
                            as={Input}
                            onChange={(e: any) => {
                              e.target.value = e.target.value.replace(
                                /\D/g,
                                ""
                              );
                              if (e.target.value.length > 2) {
                                e.target.value = e.target.value.slice(0, 2);
                              }
                              if (Number(e.target.value > 50)) {
                                setFieldValue("impact", 50);
                              } else {
                                setFieldValue("impact", Number(e.target.value));
                              }
                            }}
                            className="w-11"
                          />

                          <h3 className="text-base font-medium">/50</h3>
                        </div>
                      </div>
                    </div>
                    <hr className="p-2 "></hr>
                  </div>
                  <div className="space-y-3">
                    <h2 className="text-slate-900 text-base">
                      Describe the ways in which the project has enhanced the
                      quality of life for residents or increased effectiveness,
                      transparency and accountability in local governance? (You
                      may cite several major impacts)
                    </h2>
                    {/*      <p
                    className="text-slate-500 text-base font-light leading-normal line-clamp-6"
                    dangerouslySetInnerHTML={{ __html: values.impactText }}
                  /> */}
                    <div className="mb-2 font-medium text-slate-500 col-span-2">
                      <div className="flex flex-wrap gap-2 w-full ">
                        {/*  {values.impactFile &&
                        values.impactFile.name &&
                        (() => {
                          const fileURL = URL.createObjectURL(values.impactFile);
            
                          return (
                            <div className="flex items-center gap-2 w-fit">
                              <div className="flex justify-between w-full gap-2 items-center bg-slate-500 p-2 rounded-md text-sm text-white font-semibold">
                                <div className="flex items-center gap-2">
                                  <Image src={pdf} alt="PDF Icon" />
                                  {values.impactFile.name}
                                </div>
                                <FileViewer url={fileURL} />
                              </div>
                            </div>
                          );
                        })()} */}
                      </div>{" "}
                      {/* <ErrorMessage
                      name="impactCheck"
                      component="div"
                      className=" text-base text-red-500 italic "
                    /> */}
                    </div>
                  </div>
                </section>
                <section>
                  <div className=" space-y-2 pt-6 lg:pt-0">
                    <div className="flex justify-between items-center">
                      <h2 className="font-bold text-lg text-blue-900">
                        RELEVANCE OF THE PROJECT{" "}
                      </h2>
                      <div className="flex flex-col items-center gap-4">
                        <Label className="text-slate-500 text-xs font-bold">
                          SCORE
                        </Label>
                        <div className="flex items-center gap-1">
                          <Field
                            type="text"
                            maxLength={2}
                            autoComplete="off"
                            name="relevance"
                            as={Input}
                            onChange={(e: any) => {
                              e.target.value = e.target.value.replace(
                                /\D/g,
                                ""
                              );
                              if (e.target.value.length > 2) {
                                e.target.value = e.target.value.slice(0, 2);
                              }
                              if (Number(e.target.value > 50)) {
                                setFieldValue("relevance", 50);
                              } else {
                                setFieldValue(
                                  "relevance",
                                  Number(e.target.value)
                                );
                              }
                            }}
                            className="w-11"
                          />

                          <h3 className="text-base font-medium">/50</h3>
                        </div>
                      </div>
                    </div>
                    <hr className="p-2 "></hr>
                  </div>
                  <div className="space-y-3">
                    <h2 className="text-slate-900 text-base">
                      Describe the specific problem or challenge in your local
                      government unit was the project designed to address.
                    </h2>
                    <h2 className="text-slate-900 text-base">
                      How does the project directly address and mitigate the
                      identified problem or challenge?
                    </h2>
                    <h2 className="text-slate-900 text-base">
                      What measurable improvements or outcomes have been
                      observed since the implementation of the project in
                      relation to the problem it aims to solve?
                    </h2>
                    {/* <p
                    className="text-slate-500 text-base font-light leading-normal line-clamp-6"
                    dangerouslySetInnerHTML={{ __html: values.relevanceText }}
                  /> */}
                    <div className="mb-2 font-medium text-slate-500 col-span-2">
                      <div className="flex flex-wrap gap-2 w-full ">
                        {/* {values.relevanceFile &&
                        values.relevanceFile.name &&
                        (() => {
                          const fileURL = URL.createObjectURL(values.relevanceFile);
            
                          return (
                            <div className="flex items-center gap-2 w-fit">
                              <div className="flex justify-between w-full gap-2 items-center bg-slate-500 p-2 rounded-md text-sm text-white font-semibold">
                                <div className="flex items-center gap-2">
                                  <Image src={pdf} alt="PDF Icon" />
                                  {values.relevanceFile.name}
                                </div>
                                <FileViewer url={fileURL} />
                              </div>
                            </div>
                          );
                        })()} */}
                      </div>{" "}
                      {/*   <ErrorMessage
                      name="relevanceCheck"
                      component="div"
                      className=" text-base text-red-500 italic "
                    /> */}
                    </div>
                  </div>
                </section>
                <section>
                  <div className=" space-y-2 pt-6 lg:pt-0">
                    <div className="flex justify-between items-center">
                      <h2 className="font-bold text-lg text-blue-900">
                        SUSTAINABILITY AND REPLICABILITY OF THE PROJECT{" "}
                      </h2>
                      <div className="flex flex-col items-center gap-4">
                        <Label className="text-slate-500 text-xs font-bold">
                          SCORE
                        </Label>
                        <div className="flex items-center gap-1">
                          <Field
                            type="text"
                            maxLength={2}
                            autoComplete="off"
                            name="sustainability"
                            as={Input}
                            onChange={(e: any) => {
                              e.target.value = e.target.value.replace(
                                /\D/g,
                                ""
                              );
                              if (e.target.value.length > 2) {
                                e.target.value = e.target.value.slice(0, 2);
                              }
                              if (Number(e.target.value > 50)) {
                                setFieldValue("sustainability", 50);
                              } else {
                                setFieldValue(
                                  "sustainability",
                                  Number(e.target.value)
                                );
                              }
                            }}
                            className="w-11"
                          />

                          <h3 className="text-base font-medium">/50</h3>
                        </div>
                      </div>
                    </div>
                    <hr className="p-2 "></hr>
                  </div>
                  <div className="space-y-3">
                    <h2 className="text-slate-900 text-base">
                      Describe the specific problem or challenge in your local
                      government unit was the project designed to address.
                    </h2>
                    <h2 className="text-slate-900 text-base">
                      How does the project directly address and mitigate the
                      identified problem or challenge?
                    </h2>
                    <h2 className="text-slate-900 text-base">
                      What measurable improvements or outcomes have been
                      observed since the implementation of the project in
                      relation to the problem it aims to solve?
                    </h2>
                    {/*  <p
                    className="text-slate-500 text-base font-light leading-normal line-clamp-6"
                    dangerouslySetInnerHTML={{ __html: values.sustainabilityText }}
                  /> */}
                    <div className="mb-2 font-medium text-slate-500 col-span-2">
                      <div className="flex flex-wrap gap-2 w-full ">
                        {/* {values.sustainabilityFile &&
                        values.sustainabilityFile.name &&
                        (() => {
                          const fileURL = URL.createObjectURL(
                            values.sustainabilityFile
                          );
            
                          return (
                            <div className="flex items-center gap-2 w-fit">
                              <div className="flex justify-between w-full gap-2 items-center bg-slate-500 p-2 rounded-md text-sm text-white font-semibold">
                                <div className="flex items-center gap-2">
                                  <Image src={pdf} alt="PDF Icon" />
                                  {values.sustainabilityFile.name}
                                </div>
                                <FileViewer url={fileURL} />
                              </div>
                            </div>
                          );
                        })()} */}
                      </div>
                      {/*  <ErrorMessage
                      name="sustainabilityCheck"
                      component="div"
                      className=" text-base text-red-500 italic "
                    /> */}
                    </div>
                  </div>
                </section>
                <section>
                  <div className=" space-y-2 pt-6 lg:pt-0">
                    <div className="flex justify-between items-center">
                      <h2 className="font-bold text-lg text-blue-900">
                        INNOVATION ASPECT OF THE PROJECT
                      </h2>
                      <div className="flex flex-col items-center gap-4">
                        <Label className="text-slate-500 text-xs font-bold">
                          SCORE
                        </Label>
                        <div className="flex items-center gap-1">
                          <Field
                            type="text"
                            maxLength={2}
                            autoComplete="off"
                            name="innovation"
                            as={Input}
                            onChange={(e: any) => {
                              e.target.value = e.target.value.replace(
                                /\D/g,
                                ""
                              );
                              if (e.target.value.length > 2) {
                                e.target.value = e.target.value.slice(0, 2);
                              }
                              if (Number(e.target.value > 50)) {
                                setFieldValue("innovation", 50);
                              } else {
                                setFieldValue(
                                  "innovation",
                                  Number(e.target.value)
                                );
                              }
                            }}
                            className="w-11"
                          />

                          <h3 className="text-base font-medium">/50</h3>
                        </div>
                      </div>
                    </div>
                    <hr className="p-2 "></hr>
                  </div>
                  <div className="space-y-3">
                    <h2 className="text-slate-900 text-base">
                      How has the innovation in your project improved service
                      delivery and operational efficiency within your local
                      government unit?
                    </h2>
                    <h2 className="text-slate-900 text-base">
                      What specific technological advancements or digital
                      solutions were implemented in your project, and how have
                      they contributed to addressing the problems?
                    </h2>

                    {/* <p
                    className="text-slate-500 text-base font-light leading-normal line-clamp-6"
                    dangerouslySetInnerHTML={{ __html: values.innovationText }}
                  /> */}
                    <div className="mb-2 font-medium text-slate-500 col-span-2">
                      {/*     <div className="flex flex-wrap gap-2 w-full ">
                      {values.innovationFile &&
                        values.innovationFile.name &&
                        (() => {
                          const fileURL = URL.createObjectURL(
                            values.innovationFile
                          );
            
                          return (
                            <div className="flex items-center gap-2 w-fit">
                              <div className="flex justify-between w-full gap-2 items-center bg-slate-500 p-2 rounded-md text-sm text-white font-semibold">
                                <div className="flex items-center gap-2">
                                  <Image src={pdf} alt="PDF Icon" />
                                  {values.innovationFile.name}
                                </div>
                                <FileViewer url={fileURL} />
                              </div>
                            </div>
                          );
                        })()}
                    </div>{" "} */}
                      {/*  <ErrorMessage
                      name="innovationCheck"
                      component="div"
                      className=" text-base text-red-500 italic "
                    /> */}
                    </div>
                  </div>
                </section>
                <section>
                  <div className=" space-y-2 pt-6 lg:pt-0">
                    <div className="flex justify-between items-center">
                      <h2 className="font-bold text-lg text-blue-900">
                        ALIGNMENT WITH GOALS
                      </h2>
                      <div className="flex flex-col items-center gap-4">
                        <Label className="text-slate-500 text-xs font-bold">
                          SCORE
                        </Label>
                        <div className="flex items-center gap-1">
                          <Field
                            type="text"
                            maxLength={2}
                            autoComplete="off"
                            name="alignment"
                            as={Input}
                            onChange={(e: any) => {
                              e.target.value = e.target.value.replace(
                                /\D/g,
                                ""
                              );
                              if (e.target.value.length > 2) {
                                e.target.value = e.target.value.slice(0, 2);
                              }
                              if (Number(e.target.value > 50)) {
                                setFieldValue("alignment", 50);
                              } else {
                                setFieldValue(
                                  "alignment",
                                  Number(e.target.value)
                                );
                              }
                            }}
                            className="w-11"
                          />

                          <h3 className="text-base font-medium">/50</h3>
                        </div>
                      </div>
                    </div>
                    <hr className="p-2 "></hr>
                  </div>
                  <div className="space-y-6">
                    <div className="my-4">
                      <p className=" font-semibold text-base text-slate-900">
                        Sustainable Development Goals (SDGs) that your project
                        focuses on.
                      </p>
                      {/* <ul className="list-disc list-inside ml-2 text-slate-600">
                      {values.goals.map((goal: any, index: any) => (
                        <li key={index}>{goal}</li>
                      ))}
                    </ul>
                    <ErrorMessage
                      name="goals"
                      component="div"
                      className=" text-base text-red-500 italic "
                    /> */}
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-slate-900 text-base">
                        Describe how it aligns with 1 or 2 SDGs. (Which specific
                        SDGs does the project primarily target, and why?
                      </h2>
                      <h2 className="text-slate-900 text-base">
                        How does the project's focus on these SDGs address local
                        or global challenges?
                      </h2>
                      <h2 className="text-slate-900 text-base">
                        What measurable outcomes are expected from the project
                        in relation to the selected SDGs?
                      </h2>
                      <h2 className="text-slate-900 text-base">
                        Can you provide examples of how the project contributes
                        to the economic, social, or environmental aspects of the
                        chosen SDGs?){" "}
                      </h2>

                      {/* <p
                      className="text-slate-500 text-base font-light leading-normal line-clamp-6"
                      dangerouslySetInnerHTML={{ __html: values.goalText1 }}
                    /> */}
                      <div className="mb-2 font-medium text-slate-500 col-span-2">
                        {/*       <div className="flex flex-wrap gap-2 w-full ">
                        {values.goalFile1 &&
                          values.goalFile1.name &&
                          (() => {
                            const fileURL = URL.createObjectURL(values.goalFile1);
            
                            return (
                              <div className="flex items-center gap-2 w-fit">
                                <div className="flex justify-between w-full gap-2 items-center bg-slate-500 p-2 rounded-md text-sm text-white font-semibold">
                                  <div className="flex items-center gap-2">
                                    <Image src={pdf} alt="PDF Icon" />
                                    {values.goalFile1.name}
                                  </div>
                                  <FileViewer url={fileURL} />
                                </div>
                              </div>
                            );
                          })()}
                      </div>{" "}
                      <ErrorMessage
                        name="goal1Check"
                        component="div"
                        className=" text-base text-red-500 italic "
                      /> */}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h2 className="text-slate-900 text-base">
                        Describe how the project aligns with or supports the
                        mandate and programs of the Department of Information
                        and Communications Technology (DICT).
                      </h2>

                      {/*  <p
                      className="text-slate-500 text-base font-light leading-normal line-clamp-6"
                      dangerouslySetInnerHTML={{ __html: values.goalText2 }}
                    /> */}
                      <div className="mb-2 font-medium text-slate-500 col-span-2">
                        {/* <div className="flex flex-wrap gap-2 w-full ">
                        {values.goalFile2 &&
                          values.goalFile2.name &&
                          (() => {
                            const fileURL = URL.createObjectURL(values.goalFile2);
            
                            return (
                              <div className="flex items-center gap-2 w-fit">
                                <div className="flex justify-between w-full gap-2 items-center bg-slate-500 p-2 rounded-md text-sm text-white font-semibold">
                                  <div className="flex items-center gap-2">
                                    <Image src={pdf} alt="PDF Icon" />
                                    {values.goalFile2.name}
                                  </div>
                                  <FileViewer url={fileURL} />
                                </div>
                              </div>
                            );
                          })()}
                      </div>{" "}
                      <ErrorMessage
                        name="goal2Check"
                        component="div"
                        className=" text-base text-red-500 italic "
                      /> */}
                      </div>
                    </div>
                  </div>
                </section>
              </Form>
            );
          }}
        </Formik>
      )}

      <div className="flex justify-end mt-14">
        {page == 1 ? (
          <Button
            type="button"
            variant={"default"}
            className=" font-semibold "
            onClick={() => {
              setPage(2);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <ArrowRight size={12} /> Next
          </Button>
        ) : (
          <div className="flex justify-between  items-center w-full">
            <Button
              type="button"
              variant={"secondary"}
              className=" font-semibold outline outline-1 hover:bg-slate-200 "
              onClick={() => {
                setPage(1);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <ArrowLeft size={12} /> Back
            </Button>
            <div className="flex gap-2 items-center">
              <Button
                type="submit"
                variant={"default"}
                className=" font-semibold bg-[#CCFBF1] hover:bg-[#b9f8ec] text-emerald-800 "
                onClick={() => {
                  setPage(2);
                }}
              >
                <Lock size={12} /> Save & Lock
              </Button>
              <Button
                type="button"
                variant={"default"}
                className=" font-semibold bg-[#14B8A6] hover:bg-[#36a195] text-slate-50"
                onClick={() => {
                  setPage(2);
                }}
              >
                Save Score
              </Button>
              <Button
                type="button"
                variant={"outline"}
                className=" font-semibold text-[#14B8A6] hover:text-[#14B8A6] "
                onClick={() => {
                  setPage(2);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

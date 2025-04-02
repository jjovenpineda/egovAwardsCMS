"use client";
import { DownloadEntries } from "@/components/downloadEntries";
import Loaders from "@/components/loaders";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import React, { useRef, useState } from "react";
const data = {
  alignmentSDG: {
    target: ["sddsfds", "dfsdsfs"],
    answer: {
      text: "'alignment SDG answer'",
      file: "https://stg-documents-egovaward.portal.gov.ph/s0a6k6i5le35-samplePDF copy.pdf",
      _id: "67e51e85ca66482692e335e7",
    },
  },
  _id: "67e4b1f3cad4309ded4adb30",
  authRep: "67da20fe0d20892d03382bc8",
  refNo: "QGDULI",
  status: "For Review",
  isReadOnly: false,
  project: "'project'",
  projectURL: "''",
  category: "'category'",
  projectPeriod: "'project period'",
  supportingDoc: [
    "https://stg-documents-egovaward.portal.gov.ph/9midm5nmhdjl-document_uaf.pdf",
  ],
  impactAnswer: {
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit atque dolores voluptatibus quas. Perspiciatis nesciunt temporibus fuga eligendi aperiam omnis similique, cupiditate repellat beatae saepe dolorum, suscipit esse, perferendis nisi.",
    file: "https://stg-documents-egovaward.portal.gov.ph/s0a6k6i5le35-samplePDF copy.pdf",
    score: 0,
  },
  relevanceAnswer: {
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit atque dolores voluptatibus quas. Perspiciatis nesciunt temporibus fuga eligendi aperiam omnis similique, cupiditate repellat beatae saepe dolorum, suscipit esse, perferendis nisi.",
    file: "https://stg-documents-egovaward.portal.gov.ph/s0a6k6i5le35-samplePDF copy.pdf",
    score: 0,
  },
  sustainabilityAnswer: {
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit atque dolores voluptatibus quas. Perspiciatis nesciunt temporibus fuga eligendi aperiam omnis similique, cupiditate repellat beatae saepe dolorum, suscipit esse, perferendis nisi.",
    file: "https://stg-documents-egovaward.portal.gov.ph/s0a6k6i5le35-samplePDF copy.pdf",
    score: 0,
  },
  innovationAnswer: {
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit atque dolores voluptatibus quas. Perspiciatis nesciunt temporibus fuga eligendi aperiam omnis similique, cupiditate repellat beatae saepe dolorum, suscipit esse, perferendis nisi.",
    file: "https://stg-documents-egovaward.portal.gov.ph/s0a6k6i5le35-samplePDF copy.pdf",
    score: 0,
  },
  alignmentAnswerDICT: {
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit atque dolores voluptatibus quas. Perspiciatis nesciunt temporibus fuga eligendi aperiam omnis similique, cupiditate repellat beatae saepe dolorum, suscipit esse, perferendis nisi.",
    file: "https://stg-documents-egovaward.portal.gov.ph/s0a6k6i5le35-samplePDF copy.pdf",

    _id: "67e51e85ca66482692e335e8",
  },
  isActive: true,
  createdAt: "2025-03-27T02:03:31.831Z",
  updatedAt: "2025-03-27T09:46:45.714Z",
  __v: 0,
};

export default function Page() {
  const downloadRef = useRef<HTMLButtonElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
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
      <DownloadEntries
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        ref={downloadRef}
        data={data}
      />
    </div>
  );
}

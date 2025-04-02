"use client";

import { forwardRef, Ref, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import Loaders from "./loaders";
interface DownloadEntriesProps {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  data: any;
}
export const DownloadEntries = forwardRef<
  HTMLButtonElement,
  DownloadEntriesProps
>(({ isLoading, setIsLoading, data }, ref) => {
  const pageRefs = useRef<React.RefObject<HTMLDivElement>[]>(
    Array(7)
      .fill(null)
      .map(() => useRef<HTMLDivElement>(null))
  ).current;
  const A4_WIDTH = 595;
  const A4_HEIGHT = 842;
  const generatePDF = async () => {
    setIsLoading(true);
    const pdf = new jsPDF("p", "mm", "a4");

    for (let i = 0; i < pageRefs.length; i++) {
      if (!pageRefs[i]?.current) continue;

      // Convert page to canvas
      const canvas = await html2canvas(pageRefs[i].current as HTMLElement, {
        scale: 3,
        imageTimeout: 1500,
      });

      const imgData = canvas.toDataURL("image/png");
      const contentHeight = canvas.height * (210 / canvas.width); // Scale height based on width

      // PAGE 1 & 2: FIXED SIZE
      if (i < 2) {
        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, 0, 210, 297, undefined, "SLOW");
      }
      // PAGE 3+: DYNAMIC HEIGHT
      else {
        let currentY = 0;
        const maxPageHeight = 297; // A4 Page height

        while (currentY < contentHeight) {
          if (i > 2 || currentY > 0) pdf.addPage(); // Add a new page for overflow
          pdf.addImage(
            imgData,
            "JPEG",
            0,
            -currentY,
            210,
            contentHeight,
            undefined,
            "SLOW"
          );

          currentY += maxPageHeight;
        }
      }
    }

    pdf.save("entry_download.pdf");
    setIsLoading(false);
  };

  const infoData = [
    {
      label: "LCE",
      value:
        "Eugene S. Severo lorem ipsum awdawdioj a owidjaowi jdawoi jdwoij awdawd  awd ",
    },
    { label: "Contact Person", value: "Juan Dela Cruz" },
    { label: "Mobile No.", value: "09171234567" },
    { label: "Office No.", value: "(02) 123 456" },
    { label: "Email", value: "juan.cruz@lgu.gov.ph" },
    { label: "LGU Website", value: "www.calabanga.gov.ph" },
    { label: "Facebook Page", value: "www.facebook.com/calabanga" },
    { label: "Number of times joining", value: "2" },
  ];

  const programDetails = [
    {
      label: "Project/Program Name",
      value: "GovLink: Enhancing Business Climate Through Smart Solutions",
    },
    {
      label: "Category",
      value: "(G2C) Governments Solutions to Serve Citizens Needs",
    },
    {
      label: "Project/Program Period",
      value: "2 Years",
    },
    {
      label: "Project/Program URL",
      value:
        "https://drive.google.com/drive/folders/17FZ9p8X_C2NlL0eWeDmNylLi220rKY4",
      isLink: true,
      isQR: true,
    },
    {
      label: "Supporting Documents",
      value: "See attached documents for additional information.",
    },
  ];
  return (
    <>
      {" "}
      <div
        style={{
          position: "absolute",
          left: "-9999px",
          opacity: 0,
          pointerEvents: "none",
        }}
      >
        <div className="flex  flex-col items-center justify-center min-h-screen ">
          {/* Page 1 */}
          <div
            className="flex flex-col justify-between bg-white px-10 py-6 max-w-3xl mb-4"
            style={{ width: `${A4_WIDTH}px`, height: `${A4_HEIGHT}px` }}
            ref={pageRefs[0]}
          >
            <div>
              <div className="text-center">
                <img
                  src="/assets/images/egov.svg"
                  alt="egov logo"
                  className="size-full max-w-[168px] mx-auto object-contain "
                />
                <img
                  src="/assets/images/lgus.webp"
                  alt="egov logo"
                  className="size-full max-w-[145px] mt-2 pl-4 mx-auto object-contain"
                />
              </div>

              <div className="max-w-2xl mx-auto mt-6 bg-white">
                <p className="text-slate-900 font-semibold  text-xs">
                  Entry: #LGUG2C001
                </p>
                <p className="text-gray-500  text-xs">
                  Application: January 26, 2025 8:23AM
                </p>

                <h1 className="text-base font-semibold text-center mt-6">
                  GovLink: Enhancing Business Climate Through Smart Solutions
                </h1>
                <p className="text-center text-gray-600 text-xs">
                  Local Government of Calabanga [LGU Name]
                </p>
                <p className="text-center text-gray-600 text-xs">
                  IT Department [Name of Office in LGU]
                </p>
                <p className="text-center text-gray-600 text-xs">
                  Camarines Sur [Province]
                </p>
                <p className="text-center text-gray-600 text-xs">
                  Region V - Bicol [Region]
                </p>

                <h2 className="text-xs font-semibold text-blue-900 mt-6">
                  About the LGU
                </h2>
                <div className="mt-2 ">
                  {infoData.map((item, index) => (
                    <div className="border-b pb-4">
                      <div
                        key={index}
                        className="grid grid-cols-2  text-slate-700 text-xs  items-start justiify-start  "
                      >
                        <span>{item.label}</span>
                        <div className="w-full flex">
                          :<span className="ml-8">{item.value}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-center text-sm text-[#6B7280] gap-x-4">
              <span>1</span>
              <span>of</span>
              <span>7</span>
            </div>{" "}
          </div>
          <div
            className="flex flex-col justify-between bg-white px-10 py-6 max-w-3xl mb-4"
            style={{ width: `${A4_WIDTH}px`, height: `${A4_HEIGHT}px` }}
            ref={pageRefs[1]}
          >
            <div>
              <div className="text-center">
                <img
                  src="/assets/images/egov.svg"
                  alt="egov logo"
                  className="size-full max-w-[168px] mx-auto object-contain "
                />
                <img
                  src="/assets/images/lgus.webp"
                  alt="egov logo"
                  className="size-full max-w-[145px] mt-2 pl-4 mx-auto object-contain"
                />
              </div>

              <div className="max-w-2xl mx-auto mt-6 bg-white">
                <p className="text-slate-900 font-semibold  text-xs">
                  Entry: #LGUG2C001
                </p>
                <p className="text-gray-500  text-xs">
                  Application: January 26, 2025 8:23AM
                </p>

                <h1 className="text-base font-semibold text-center mt-6">
                  GovLink: Enhancing Business Climate Through Smart Solutions
                </h1>
                <p className="text-center text-gray-600 text-xs">
                  Local Government of Calabanga [LGU Name]
                </p>
                <p className="text-center text-gray-600 text-xs">
                  IT Department [Name of Office in LGU]
                </p>
                <p className="text-center text-gray-600 text-xs">
                  Camarines Sur [Province]
                </p>
                <p className="text-center text-gray-600 text-xs">
                  Region V - Bicol [Region]
                </p>

                <h2 className="text-xs font-semibold text-blue-900 mt-6">
                  About the Entry{" "}
                </h2>
                <div className=" text-xs text-gray-800">
                  {programDetails.map((detail, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-2 text-xs border-b border-gray-300 pb-4 items-center"
                    >
                      <span className="">{detail.label}</span>

                      <div className="flex items-center">
                        <span className="pr-6">:</span>
                        {detail.isLink ? (
                          <div>
                            {detail.isQR && (
                              <img
                                src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
                                alt="QR Code"
                                width={200}
                                height={200}
                                className="mb-2"
                              />
                            )}
                            <div className="break-all">{detail.value}</div>
                          </div>
                        ) : (
                          <span
                            className={
                              detail.label === "Supporting Documents"
                                ? "italic "
                                : ""
                            }
                          >
                            {detail.value}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-center text-sm text-[#6B7280] gap-x-4">
              <span>2</span>
              <span>of</span>
              <span>7</span>
            </div>{" "}
          </div>

          <div
            className="flex flex-col justify-between bg-white px-10 py-6 max-w-3xl mb-4"
            style={{ width: `${A4_WIDTH}px`, height: `${A4_HEIGHT}px` }}
            ref={pageRefs[2]}
          >
            <div>
              <div className="text-center">
                <img
                  src="/assets/images/egov.svg"
                  alt="egov logo"
                  className="size-full max-w-[168px] mx-auto object-contain "
                />
                <img
                  src="/assets/images/lgus.webp"
                  alt="egov logo"
                  className="size-full max-w-[145px] mt-2 pl-4 mx-auto object-contain"
                />
              </div>

              <div className="max-w-2xl mx-auto mt-6 bg-white">
                <p className="text-slate-900 font-semibold  text-xs">
                  Entry: #LGUG2C001
                </p>
                <p className="text-gray-500  text-xs">
                  Application: January 26, 2025 8:23AM
                </p>

                <div className="space-y-6 text-gray-800 text-xs">
                  <div>
                    <h2 className="text-xs mt-6 font-semibold text-center text-blue-900">
                      IMPACT OF THE PROJECT
                    </h2>
                    <div className="mt-8 text-xs font-normal">
                      <p className="mt-2 font-semibold">
                        Describe the ways in which the project has enhanced the
                        quality of life for residents or increased
                        effectiveness, transparency, and accountability in local
                        governance? (You may cite several major impacts)
                      </p>
                      <p className="mt-2 ">
                        Forth momentary rice cattle call international nurse
                        ornament loss spring excessive bury pig dream ticket
                        bunch taxi battery rule term plaster east angry stretch
                        then pupil scatter importance examine arch permission
                        board sport wake tin day ready shine salt reasonable
                        ripe repair competition inform eager paper influential
                        railroad male brush reward fit handkerchief from hurt
                        ruin shine bread add strong first effort persuasion
                        ability manage you rock robbery condition car forbid
                        wide whisper castle attend monkey disturb library enter
                        salesman overflow flesh liar jaw raise crop thirst hard
                        rather sir control stamp failure arrange miss care
                        resistance marriage film staple.
                      </p>
                      <p className="italic mt-2">
                        See attached documents for additional information.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xs font-semibold text-center text-blue-900">
                      RELEVANCE OF THE PROJECT
                    </h2>
                    <div className=" text-xs font-semibold mt-8">
                      <p className="mt-3">
                        Describe the specific problem or challenge in your local
                        government unit was the project designed to address.
                      </p>
                      <p className="mt-3">
                        How does the project directly address and mitigate the
                        identified problem or challenge?
                      </p>
                      <p className="mt-3">
                        What measurable improvements or outcomes have been
                        observed since the implementation of the project in
                        relation to the problem it aims to solve?
                      </p>
                      <p className="italic mt-3 font-normal">
                        See attached documents for additional information.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center text-sm text-[#6B7280] gap-x-4">
              <span>3</span>
              <span>of</span>
              <span>7</span>
            </div>{" "}
          </div>
          <div
            className="flex flex-col justify-between bg-white px-10 py-6 max-w-3xl mb-4"
            style={{ width: `${A4_WIDTH}px`, height: `${A4_HEIGHT}px` }}
            ref={pageRefs[3]}
          >
            <div>
              <div className="text-center">
                <img
                  src="/assets/images/egov.svg"
                  alt="egov logo"
                  className="size-full max-w-[168px] mx-auto object-contain "
                />
                <img
                  src="/assets/images/lgus.webp"
                  alt="egov logo"
                  className="size-full max-w-[145px] mt-2 pl-4 mx-auto object-contain"
                />
              </div>

              <div className="max-w-2xl mx-auto mt-6 bg-white">
                <p className="text-slate-900 font-semibold  text-xs">
                  Entry: #LGUG2C001
                </p>
                <p className="text-gray-500  text-xs">
                  Application: January 26, 2025 8:23AM
                </p>

                <div className="space-y-3 text-gray-800 text-xs">
                  <h2 className="text-xs font-semibold text-blue-900 text-center py-6">
                    SUSTAINABILITY AND REPLICABILITY OF THE PROJECT
                  </h2>

                  <div className="space-y-4 font-semibold">
                    <p>
                      Describe how you ensure the project long-term
                      sustainability and the strategies in place to maintain the
                      project over the years.
                    </p>
                    <p>
                      What measures have been implemented to continuously update
                      and improve the project to keep pace with technological
                      advancements?
                    </p>
                    <p>
                      How does the project incorporate community engagement and
                      capacity-building to ensure ongoing local support and
                      ownership?
                    </p>
                  </div>

                  <div>
                    <p>
                      The Calabanga Local Government is committed to leveraging
                      digital technology to enhance public service delivery,
                      improve transparency, and drive citizen engagement. The
                      [Project Name] is a groundbreaking e-government initiative
                      designed to streamline processes, reduce bureaucratic
                      inefficiencies, and ensure seamless access to essential
                      services for citizens. This project exemplifies our
                      commitment to digital transformation, aligning with
                      national objectives to build a more efficient,
                      citizen-centric government.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xs  text-gray-900">Project Overview</h3>
                    <p>
                      Launched in 2023, the project is a comprehensive digital
                      platform that integrates various government services into
                      a unified system. The platform facilitates real-time
                      access to critical services such as [list key services,
                      e.g., tax filing, license renewals, social welfare
                      applications] . Citizens and businesses can access these
                      services online, eliminating the need for in-person visits
                      and lengthy paperwork.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xs  text-gray-900">
                      The project’s key objectives include:{" "}
                    </h3>
                    <ul className=" mt-2 space-y-4">
                      <li>
                        Enhancing accessibility:Through a user-friendly
                        interface and mobile compatibility.
                      </li>
                      <li>
                        Improving service efficiency:With automated workflows
                        and AI-driven decision-making.
                      </li>
                      <li>
                        Increasing transparency and accountability: Through
                        digital tracking and audit trails.
                      </li>
                      <li>
                        Promoting inclusivity:By providing multilingual support
                        and accessibility features for persons with
                        disabilities.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center text-sm text-[#6B7280] gap-x-4">
              <span>4</span>
              <span>of</span>
              <span>7</span>
            </div>{" "}
          </div>
          <div
            className="flex flex-col justify-between bg-white px-10 py-6 max-w-3xl mb-4"
            style={{ width: `${A4_WIDTH}px`, height: `${A4_HEIGHT}px` }}
            ref={pageRefs[4]}
          >
            <div>
              <div className="text-center">
                <img
                  src="/assets/images/egov.svg"
                  alt="egov logo"
                  className="size-full max-w-[168px] mx-auto object-contain "
                />
                <img
                  src="/assets/images/lgus.webp"
                  alt="egov logo"
                  className="size-full max-w-[145px] mt-2 pl-4 mx-auto object-contain"
                />
              </div>

              <div className="max-w-2xl mx-auto mt-6 bg-white">
                <p className="text-slate-900 font-semibold  text-xs">
                  Entry: #LGUG2C001
                </p>
                <p className="text-gray-500  text-xs">
                  Application: January 26, 2025 8:23AM
                </p>

                <div className="space-y-4 text-gray-800 text-xs mt-6">
                  <div className="text-xs">
                    <h2 className="  text-gray-900">
                      Sustainability and Environmental Impact
                    </h2>
                    <p>
                      [Project Name] is designed with sustainability at its
                      core, ensuring long-term viability and environmental
                      responsibility. Key sustainability aspects include:
                    </p>
                    <ul className=" mt-2 space-y-4">
                      <li>
                        Paperless Transactions: The digitization of services has
                        significantly reduced paper consumption, minimizing
                        waste and contributing to sustainability goals.
                      </li>
                      <li>
                        Energy Efficiency: The platform is hosted on
                        energy-efficient cloud servers, leveraging green
                        computing practices to lower carbon emissions.
                      </li>
                      <li>
                        Reduced Carbon Footprint: By eliminating the need for
                        physical visits to government offices, the initiative
                        has significantly cut down on travel-related emissions.
                      </li>
                      <li>
                        Sustainable Resource Allocation: Automation and digital
                        workflows have optimized the use of government
                        resources, reducing inefficiencies and improving service
                        delivery while conserving energy and materials.
                      </li>
                    </ul>
                  </div>

                  <div className="text-xs">
                    <h2 className="  text-gray-900">
                      Replicability and Scalability
                    </h2>
                    <p>
                      One of the most valuable aspects of the project is its
                      ability to be replicated and scaled across different
                      regions and government sectors. The project was designed
                      with modular architecture and interoperability, allowing
                      other agencies to easily adopt and customize it according
                      to their needs. Key replicability features include:
                    </p>
                    <ul className=" mt-2 space-y-4">
                      <li>
                        Open-Source Framework: A flexible, open-source
                        architecture enables easy adoption by other government
                        entities and municipalities.
                      </li>
                      <li>
                        Cloud-Based Infrastructure: The cloud hosting model
                        allows for seamless scalability and integration with
                        other government services.
                      </li>
                      <li>
                        Inter-Agency Collaboration: The platform’s design
                        supports cross-agency functionality, making it a model
                        for unified government service delivery.
                      </li>
                      <li>
                        Training and Capacity Building: A structured training
                        program ensures that government staff can easily
                        implement and manage the system in different
                        jurisdictions.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-xs">Future Roadmap</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center text-sm text-[#6B7280] gap-x-4">
              <span>5</span>
              <span>of</span>
              <span>7</span>
            </div>{" "}
          </div>
          <div
            className="flex flex-col justify-between bg-white px-10 py-6 max-w-3xl mb-4"
            style={{ width: `${A4_WIDTH}px`, height: `${A4_HEIGHT}px` }}
            ref={pageRefs[5]}
          >
            <div>
              <div className="text-center">
                <img
                  src="/assets/images/egov.svg"
                  alt="egov logo"
                  className="size-full max-w-[168px] mx-auto object-contain "
                />
                <img
                  src="/assets/images/lgus.webp"
                  alt="egov logo"
                  className="size-full max-w-[145px] mt-2 pl-4 mx-auto object-contain"
                />
              </div>

              <div className="max-w-2xl mx-auto mt-6 bg-white">
                <p className="text-slate-900 font-semibold  text-xs">
                  Entry: #LGUG2C001
                </p>
                <p className="text-gray-500  text-xs">
                  Application: January 26, 2025 8:23AM
                </p>

                <div className="space-y-4 text-gray-800 text-xs">
                  <h2 className="text-xs py-4 font-semibold text-blue-700 text-center">
                    INNOVATION ASPECT OF THE PROJECT
                  </h2>

                  <div className="space-y-4 font-semibold">
                    <p>
                      How has the innovation in your project improved service
                      delivery and operational efficiency within your local
                      government unit?
                    </p>
                    <p>
                      What specific technological advancements or digital
                      solutions were implemented in your project, and how have
                      they contributed to addressing the problems?
                    </p>
                    <p className="italic font-normal">
                      See attached documents for additional information.
                    </p>
                  </div>

                  <h2 className="text-xs py-4 font-semibold text-blue-700 text-center">
                    ALIGNMENT WITH GOALS
                  </h2>

                  <div className="space-y-4 font-semibold">
                    <p>
                      Describe how it aligns with 1 or 2 SDGs. (Which specific
                      SDGs does the project primarily target, and why?)
                    </p>
                    <p>
                      How does the project's focus on these SDGs address local
                      or global challenges?
                    </p>
                    <p>
                      What measurable outcomes are expected from the project in
                      relation to the selected SDGs?
                    </p>
                    <p>
                      Can you provide examples of how the project contributes to
                      the economic, social, or environmental aspects of the
                      chosen SDGs?
                    </p>
                  </div>

                  <div>
                    <div className="p-2 border rounded-lg">
                      <h3 className="text-xs text-gray-900 mb-2">
                        SDG Targets
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "No Poverty",
                          "Gender Equality",
                          "Industry, Innovation, and Infrastructure",
                          "Climate Action",
                          "Partnerships for the Goals",
                        ].map((sdg) => (
                          <span
                            key={sdg}
                            className="bg-gray-100 flex  px-2 pl-0 pb-3  rounded-full text-xs font-medium text-gray-700"
                          >
                            <span className="pt-1 mt-2 ml-3 mr-2">
                              <img src="/assets/images/dot.svg"></img>
                            </span>{" "}
                            <span className="font-semibold">{sdg}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="mt-2">
                      Forth momentary rice cattle call international nurse
                      ornament loss spring excessive bury pig dream ticket bunch
                      taxi battery rule term plaster east angry stretch then
                      pupil scatter importance examine arch permission board
                      sport wake tin day ready shine salt reasonable ripe repair
                      competition inform eager paper influential railroad male
                      brush reward fit
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center text-sm text-[#6B7280] gap-x-4">
              <span>6</span>
              <span>of</span>
              <span>7</span>
            </div>{" "}
          </div>
          <div
            className="flex flex-col justify-between bg-white px-10 py-6 max-w-3xl mb-4"
            style={{ width: `${A4_WIDTH}px`, height: `${A4_HEIGHT}px` }}
            ref={pageRefs[6]}
          >
            <div>
              <div className="text-center">
                <img
                  src="/assets/images/egov.svg"
                  alt="egov logo"
                  className="size-full max-w-[168px] mx-auto object-contain "
                />
                <img
                  src="/assets/images/lgus.webp"
                  alt="egov logo"
                  className="size-full max-w-[145px] mt-2 pl-4 mx-auto object-contain"
                />
              </div>

              <div className="max-w-2xl mx-auto mt-6 bg-white">
                <p className="text-slate-900 font-semibold  text-xs">
                  Entry: #LGUG2C001
                </p>
                <p className="text-gray-500  text-xs">
                  Application: January 26, 2025 8:23AM
                </p>

                <div className="space-y-4 text-gray-800 text-xs mt-6">
                  <p>
                    handkerchief from hurt ruin shine bread add strong first
                    effort persuasion ability manage you rock robbery condition
                    car forbid wide whisper castle attend monkey disturb library
                    enter salesman overflow flesh liar jaw raise crop thirst
                    hard rather sir control stamp failure arrange miss care
                    resistance marriage film staple.
                  </p>

                  <p className="italic ">
                    See attached documents for additional information.
                  </p>

                  <h2 className="text-xs font-semibold text-gray-900">
                    Describe how the project aligns with or supports the mandate
                    and programs of the Department of Information and
                    Communications Technology (DICT).
                  </h2>

                  <p>
                    Forth momentary rice cattle call international nurse
                    ornament loss spring excessive bury pig dream ticket bunch
                    taxi battery rule term plaster east angry stretch then pupil
                    scatter importance examine arch permission board sport wake
                    tin day ready shine salt reasonable ripe repair competition
                    inform eager paper influential railroad male brush reward
                    fit handkerchief from hurt ruin shine bread add strong first
                    effort persuasion ability manage you rock robbery condition
                    car forbid wide whisper castle attend monkey disturb library
                    enter salesman overflow flesh liar jaw raise crop thirst
                    hard rather sir control stamp failure arrange miss care
                    resistance marriage film staple.
                  </p>

                  <p className="italic ">
                    See attached documents for additional information.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center text-sm text-[#6B7280] gap-x-4">
              <span>7</span>
              <span>of</span>
              <span>7</span>
            </div>{" "}
          </div>
        </div>

        <Button
          variant={"outline"}
          ref={ref}
          size={"sm"}
          disabled={isLoading}
          onClick={generatePDF}
          className="bg-[#F3F4F6] hover:bg-[#e3e3e3] text-[#1F2937] h-fit p-1 px-1.5 rounded-full w-min "
        >
          <div className="flex gap-1">
            {isLoading ? (
              <div className="px-6 h-4">
                <Loaders loader={"orbit"} color="gray" size={25} />
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
      </div>
    </>
  );
});

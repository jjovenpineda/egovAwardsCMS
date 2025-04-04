"use client";
import React, { useEffect, useRef, useState } from "react";
import pdf from "@/public/assets/images/pdf.svg";

import Image from "next/image";

import * as Yup from "yup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  ArrowLeftRightIcon,
  CheckCircle2,
  ChevronDown,
  Globe,
  KeyRoundIcon,
  LandmarkIcon,
  Mail,
  MinusCircle,
  Phone,
  Save,
  Search,
  Trash2,
} from "lucide-react";

import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { apiGet, apiPost, apiPut } from "@/utils/api";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import FileViewer from "@/components/shared/file-viewer";
import Loaders from "@/components/loaders";
import { m } from "motion/react";
import { getUserInfo } from "@/utils/utility";
interface ILGU {
  lgu: string;
  province: string;
  region: string;
  tenDigitCode: string;
}
export default function Page() {
  const [page, setPage] = useState(1);
  const [isLinkSent, setIsLinkSent] = useState(false);
  const [active, setActive] = useState(false);
  const [isloaded, setIsLoaded] = useState(false);
  const [LguList, setLguList] = useState<ILGU[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [lguPopover, setLguPopover] = useState(false);
  const [selectedPage, setSelectedPage] = useState("lgu");
  const [pwdBtnLoading, setPwdBtnLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<any>({});
  const getLGUList = async () => {
    try {
      const res = await apiGet("/api/lgu/list");
      const { data } = res;
      if (!data) return;
      setLguList(data);
    } catch (e) {
      console.error("Error fetching LGU list:", e);
    }
  };
  const getUser = async () => {
    try {
      const { _id } = getUserInfo();
      const res = await apiGet(`/api/auth/fetch/user/${_id}`);
      const { data } = res;
      if (!data) return;
      setUserInfo(data);
    } catch (e) {
      console.error("Error fetching LGU list:", e);
    }
  };
  useEffect(() => {
    getLGUList();
    getUser();
    setIsLoaded(true);
  }, []);

  const validationSchema = Yup.object().shape({
    firstname: Yup.string()
      .trim()
      .min(2, "At least 2 characters")
      .max(50, "Max 50 characters")
      .required("Required"),

    lastname: Yup.string()
      .trim()
      .min(2, "At least 2 characters")
      .max(50, "Max 50 characters")
      .required("Required"),

    middlename: Yup.string().trim().max(50, "Max 50 characters").nullable(),
    suffix: Yup.string().trim().max(10, "Max 10 characters").nullable(),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (values: any, errors: any) => {
    if (errors.length >= 0) return null;
    try {
      setIsLoading(true);

      const { success } = await apiPut(`/api/lgu/add/info`, values);

      if (success) {
        getUser();
        toast({
          title: "Update Successful",
          description: "Your changes have been saved.",
          variant: "default",
          duration: 2000,
        });
      }
    } catch (e) {
      console.error("Error:", e);

      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
        duration: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{
          firstname: userInfo?.firstname || "",
          middlename: userInfo?.middlename || "",
          lastname: userInfo?.lastname || "",
          suffix: userInfo?.suffix || "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          setFieldValue,
          setFieldTouched,
          dirty,
          isValid,
          errors,
        }) => {
          return (
            <Form>
              {isloaded && (
                <>
                  <section className="grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-2 gap-2">
                    <div className="col-span-2 grid md:grid-cols-2 gap-4 lg:gap-8 mt-8 items-start mb-8">
                      <div>
                        <div className="flex relative gap-1 items-center">
                          <Label className="font-semibold absolute -top-6 text-sm text-[#1F2937]">
                            Email
                          </Label>
                        </div>
                        <div className="relative">
                          <Input
                            disabled
                            type="email"
                            value={userInfo?.email}
                            autoComplete="off"
                            className="space-y-8 rounded-md bg-white pl-9  border-gray-300 focus:border-blue-500"
                          />
                          <Mail
                            size={15}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                          />
                        </div>
                      </div>
                      <div className="relative  justify-self-end  md:justify-self-start">
                        <Button
                          type="button"
                          onClick={() => {
                            setPwdBtnLoading(true);
                            setTimeout(async () => {
                              try {
                                const res = await apiGet(
                                  `/api/auth/forgot-password/verify/ven@yopmail.com`
                                );
                                const { success } = res;
                                if (success) {
                                  setIsLinkSent(true);

                                  setPwdBtnLoading(false);
                                  setTimeout(() => setIsLinkSent(false), 5000);
                                }
                              } catch (e) {
                                console.error("Error:", e);
                                setPwdBtnLoading(false);
                                setIsLoading(false);
                                toast({
                                  title: "Invalid Email",
                                  description: "Enter a valid email.",
                                  variant: "destructive",
                                  duration: 2000,
                                });
                              }
                            }, 2000);
                          }}
                          className="font-semibold bg-slate-700 w-fit"
                        >
                          {pwdBtnLoading ? (
                            <div className="px-14">
                              <Loaders
                                loader={"orbit"}
                                size={25}
                                color="white"
                              />
                            </div>
                          ) : (
                            <>
                              <KeyRoundIcon size={15} /> Change Password
                            </>
                          )}
                        </Button>
                        {isLinkSent && (
                          <m.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-xs text-emerald-500 pt-1 max-w-[70%] relative col-span-2 "
                          >
                            Please check your email for the password reset link.
                            If you haven’t received it, ensure that you have
                            entered the correct email address.{" "}
                          </m.p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col-reverse gap-1 pb-2">
                      <Field
                        type="text"
                        autoComplete="off"
                        name="firstname"
                        placeholder="Enter First Name"
                        as={Input}
                        className="peer space-y-8 rounded-md    bg-white "
                      />
                      <Label className="text-sm  font-semibold text-slate-900">
                        First Name{" "}
                      </Label>
                      <ErrorMessage
                        name="firstname"
                        component="div"
                        className=" text-xs text-red-500"
                      />
                    </div>
                    <div className="flex flex-col-reverse gap-1 pb-2">
                      <Field
                        type="text"
                        autoComplete="off"
                        name="middlename"
                        placeholder="Enter Middle Name"
                        as={Input}
                        className="peer space-y-8 rounded-md    bg-white "
                      />
                      <div className="flex justify-between items-center">
                        <Label className="text-sm  font-semibold text-slate-900">
                          Middle Name{" "}
                        </Label>
                        <h2 className="text-slate-500 text-sm">Optional</h2>
                      </div>
                      <ErrorMessage
                        name="middlename"
                        component="div"
                        className=" text-xs text-red-500"
                      />
                    </div>
                    <div className="flex flex-col-reverse gap-1 pb-2">
                      <Field
                        type="text"
                        autoComplete="off"
                        name="lastname"
                        placeholder="Enter Last Name"
                        as={Input}
                        className="peer space-y-8 rounded-md    bg-white "
                      />
                      <Label className="text-sm  font-semibold text-slate-900">
                        Last Name
                      </Label>
                      <ErrorMessage
                        name="lastname"
                        component="div"
                        className=" text-xs text-red-500"
                      />
                    </div>

                    <div className="flex flex-col-reverse gap-1 pb-2">
                      <Field
                        type="text"
                        autoComplete="off"
                        name="suffix"
                        placeholder="Enter Suffix Name"
                        as={Input}
                        className="peer space-y-8 rounded-md    bg-white "
                      />
                      <div className="flex justify-between items-center">
                        <Label className="text-sm  font-semibold text-slate-900">
                          Suffix Name
                        </Label>
                        <h2 className="text-slate-500 text-sm">Optional</h2>
                      </div>
                      <ErrorMessage
                        name="suffix"
                        component="div"
                        className=" text-xs text-red-500"
                      />
                    </div>
                  </section>
                  <div className="flex justify-end pt-16">
                    <Button className="bg-blue-500 text-primary-foreground shadow hover:bg-blue-600">
                      <Save size={15} /> Save Changes
                    </Button>
                  </div>
                </>
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

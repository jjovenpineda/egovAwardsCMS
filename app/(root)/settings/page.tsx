"use client";
import React, { useEffect, useRef, useState } from "react";

import Image from "next/image";
import * as Yup from "yup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  ArrowLeftRight,
  ArrowLeftRightIcon,
  CheckCircle2,
  ChevronDown,
  Globe,
  KeyRoundIcon,
  Mail,
  MinusCircle,
  Phone,
  Save,
  Search,
  Trash2,
  Upload,
  X,
} from "lucide-react";

import {
  ErrorMessage,
  Field,
  Formik,
  FormikHelpers,
  FormikValues,
  useFormikContext,
} from "formik";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { apiGet, apiPost } from "@/utils/api";
import test from "node:test";
import { ScrollArea } from "@/components/ui/scroll-area";
import { encrypt } from "@/utils/utility";
import { toast } from "@/hooks/use-toast";
import { storage } from "@/utils/useStorage";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
interface ILGU {
  lgu: string;
  province: string;
  region: string;
  tenDigitCode: string;
}
export default function Page1() {
  /*   const { values, setFieldValue, setFieldTouched } =
    useFormikContext<FormikValues>(); */
  const [isloaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [LguList, setLguList] = useState<ILGU[]>([]);
  const [lguPopover, setLguPopover] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [active, setActive] = useState(false);

  const [page, setPage] = useState(1);
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

  /*  useEffect(() => {
    const selectedLgu = LguList.find((lgu) => lgu.lgu === values.lgu_name);

    if (selectedLgu) {
      setFieldValue("lgu_province", selectedLgu.province);
      setSelectedProvince(selectedLgu.province);

      setFieldValue("lgu_region", selectedLgu.region);
      setSelectedRegion(selectedLgu.region);
    }
  }, [values.lgu_name]); */

  useEffect(() => {
    getLGUList();

    setIsLoaded(true);
  }, []);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setItem } = storage;
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => setImage(null);
  const handleSubmit = async (
    values: { email: string; password: string },
    { setFieldError }: FormikHelpers<{ email: string; password: string }>
  ) => {
    setIsLoading(true);

    await apiPost("/api/auth/login", values)
      .then((res) => {
        const { success, message, data } = res;
        if (success) {
          setItem("account_data", encrypt(JSON.stringify(data)));

          setTimeout(() => {
            setShowLoading(true);
            setTimeout(() => {
              router.push("/");
            }, 2500);
          }, 2000);
        }
      })
      .catch((e) => {
        console.log(e);
        setFieldError("password", "Please check your credentials");
        setIsLoading(false);
        toast({
          title: "Login failed",
          variant: "destructive",
          description: "Invalid email or password",
          duration: 2000,
        });
      });
  };
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {isloaded && (
        <div>
          <h1 className="text-slate-600 font-bold text-2xl mb-8 ">
            Account Settings
          </h1>
          <h2 className="font-bold text-base text-blue-600 mb-14">
            Profile Settings
          </h2>
          <section className="grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-2 gap-2">
            <div className="col-span-2 grid grid-cols-2 gap-8 items-end mb-8">
              <div>
                <div className="flex gap-1 items-center">
                  <Label className="font-semibold text-sm text-[#1F2937]">
                    Email
                  </Label>
                  <ErrorMessage
                    name="lgu_contactPersonEmail"
                    component="div"
                    className=" text-xs text-red-500 font-semibold"
                  />
                </div>
                <div className="relative">
                  <Field
                    type="email"
                    autoComplete="off"
                    name="lgu_contactPersonEmail"
                    placeholder="Enter Email"
                    as={Input}
                    className=" space-y-8 rounded-md bg-white pl-9"
                  />
                  <Mail
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                </div>
              </div>
              <Button className="font-semibold bg-slate-700 w-fit">
                <KeyRoundIcon size={15} /> Change Password
              </Button>
            </div>
            <div className="flex flex-col-reverse gap-1 pb-2">
              <Field
                type="text"
                autoComplete="off"
                name="province"
                placeholder="Enter First Name"
                as={Input}
                className="peer space-y-8 rounded-md    bg-white "
              />
              <Label className="text-sm  font-semibold text-slate-900">
                First Name{" "}
              </Label>
              <ErrorMessage
                name="province"
                component="div"
                className=" text-xs text-red-500"
              />
            </div>
            <div className="flex flex-col-reverse gap-1 pb-2">
              <Field
                type="text"
                autoComplete="off"
                name="province"
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
                name="province"
                component="div"
                className=" text-xs text-red-500"
              />
            </div>
            <div className="flex flex-col-reverse gap-1 pb-2">
              <Field
                type="text"
                autoComplete="off"
                name="province"
                placeholder="Enter Last Name"
                as={Input}
                className="peer space-y-8 rounded-md    bg-white "
              />
              <Label className="text-sm  font-semibold text-slate-900">
                Last Name
              </Label>
              <ErrorMessage
                name="province"
                component="div"
                className=" text-xs text-red-500"
              />
            </div>

            <div className="flex flex-col-reverse gap-1 pb-2">
              <Field
                type="text"
                autoComplete="off"
                name="province"
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
                name="province"
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
        </div>
      )}
    </Formik>
  );
}

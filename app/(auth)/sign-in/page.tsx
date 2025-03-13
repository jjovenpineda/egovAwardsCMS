"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { Eye, EyeOffIcon, Loader2, LogIn, Mail, Lock } from "lucide-react";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AnimatePresence, m } from "motion/react";
import { encrypt, setCookie } from "@/utils/utility";
import { apiGet, apiPost } from "@/utils/api";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";
import carousel from "@/public/assets/images/carousel1.webp";
import login from "@/public/assets/images/login.webp";
import egov from "@/public/assets/images/egov.svg";

import lgus from "@/public/assets/images/lgus.webp";

import dict from "@/public/assets/images/dict2.webp";
import { Label } from "@/components/ui/label";
import Loading from "@/components/shared/loading";
import { storage } from "@/utils/useStorage";
import FloatingIcons from "@/components/shared/floating-icons";

export default function SignInPage() {
  const slides = [
    { id: 1, content: "Slide 1" },
    { id: 2, content: "Slide 2" },
    { id: 3, content: "Slide 3" },
  ];
  const [index, setIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const { setItem } = storage;
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordVisible2, setIsPasswordVisible2] = useState(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showLoading, setShowLoading] = useState(false);
  const [action, setAction] = useState("login");
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);
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
    <div>
      {showLoading && <Loading />}

      <div className="min-h-screen overflow-hidden grid lg:grid-cols-[_60%,_40%] items-center justify-center">
        <div className="flex flex-col items-center  justify-end h-full ">
          <div className="relative  size-full flex flex-col">
            <div className="p-16 flex flex-col justify-end gap-4 z-10 0 h-full">
              <div className="w-full max-w-[300px]">
                <Image src={egov} alt="bg" className="z-10 object-contain" />
              </div>
              <div className="w-full max-w-[320px]">
                <Image src={lgus} alt="bg" className="z-10  object-contain" />
              </div>
            </div>
            <div className=" z-20 bg-gradient-to-l from-[#1F293700] to-[#1E3A77]  top-0 left-0 right-0 h-full max-h-[160px]">
              <div className="max-w-[65%] px-16 py-2">
                <h2 className="font-bold drop-shadow-2xl text-[40px] text-white">
                  11th eGOV Awards
                </h2>
                <h2 className="text-xl text-white drop-shadow-2xl">
                  Excellence in Governance Through Information and
                  Communications Technology Awards{" "}
                </h2>
              </div>
            </div>
            <div className="absolute z-10 bg-gradient-to-l from-white to-red-500"></div>
            <Image
              src={login}
              alt="bg"
              fill
              className=" bg-cover pointer-events-none  object-cover object-right  bg-right bg-fixed absolute"
            />{" "}
            <div className="absolute inset-0 bg-gradient-to-r from-[#F4F7FFE5] via-[#B1C6FC73] to-[#6E94F900]"></div>
          </div>{" "}
          <div className="size-full relative  right-0 block max-h-[213px]  h-full overflow-hidden">
            <AnimatePresence mode="wait">
              <div
                key={slides[index].id}
                className={`absolute w-full h-full  flex items-center justify-center rounded-xl shadow-md `}
              >
                <div className="size-full">
                  {index == 0 && (
                    <div className="flex px-16 size-full items-center gap-2 ">
                      <m.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        className=""
                      >
                        <svg
                          className=""
                          width="88"
                          height="129"
                          viewBox="0 0 88 129"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M75.4443 28.1172L50.7221 -0.000593057L26 28.1172L38.0719 28.1172L50.3863 14.1113L62.7008 28.1172L75.4443 28.1172Z"
                            fill="#BFDBFE"
                          />
                          <path
                            d="M34 123C56.6437 123 75 105.091 75 83C75 60.9086 56.6437 43 34 43"
                            stroke="#93C5FD"
                            strokeWidth="9"
                          />
                          <mask id="path-3-inside-1_171823_2591" fill="white">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M14 110.444L42.1178 85.7221L14 61L14 73.0727L28.006 85.3872L14 97.7018L14 110.444Z"
                            />
                          </mask>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M14 110.444L42.1178 85.7221L14 61L14 73.0727L28.006 85.3872L14 97.7018L14 110.444Z"
                            fill="#93C5FD"
                          />
                          <path
                            d="M42.1178 85.7221L42.7781 86.4731L43.6322 85.7221L42.7781 84.9711L42.1178 85.7221ZM14 110.444L13 110.444L13 112.655L14.6603 111.195L14 110.444ZM14 61L14.6603 60.249L13 58.7892L13 61L14 61ZM14 73.0727L13 73.0727L13 73.525L13.3397 73.8237L14 73.0727ZM28.006 85.3872L28.6663 86.1382L29.5204 85.3872L28.6663 84.6362L28.006 85.3872ZM14 97.7018L13.3397 96.9508L13 97.2494L13 97.7018L14 97.7018ZM41.4575 84.9711L13.3397 109.693L14.6603 111.195L42.7781 86.4731L41.4575 84.9711ZM13.3397 61.751L41.4575 86.4731L42.7781 84.9711L14.6603 60.249L13.3397 61.751ZM15 73.0727L15 61L13 61L13 73.0727L15 73.0727ZM13.3397 73.8237L27.3457 86.1382L28.6663 84.6362L14.6603 72.3217L13.3397 73.8237ZM27.3457 84.6362L13.3397 96.9508L14.6603 98.4528L28.6663 86.1382L27.3457 84.6362ZM15 110.444L15 97.7018L13 97.7018L13 110.444L15 110.444Z"
                            fill="#93C5FD"
                            mask="url(#path-3-inside-1_171823_2591)"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M-2.41789e-06 84.4443L28.1178 59.7221L0 35L-5.9037e-07 47.0727L14.006 59.3872L-1.79476e-06 71.7018L-2.41789e-06 84.4443Z"
                            fill="#60A5FA"
                          />
                          <mask id="path-6-inside-2_171823_2591" fill="white">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M69.0371 129.001L87.2687 112.971L69.0371 96.9414L69.0371 105.783L77.2464 112.78L69.0371 119.776L69.0371 129.001Z"
                            />
                          </mask>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M69.0371 129.001L87.2687 112.971L69.0371 96.9414L69.0371 105.783L77.2464 112.78L69.0371 119.776L69.0371 129.001Z"
                            fill="#93C5FD"
                          />
                          <path
                            d="M87.2687 112.971L87.929 113.722L88.7831 112.971L87.929 112.22L87.2687 112.971ZM69.0371 129.001L68.0371 129.001L68.0371 131.212L69.6974 129.752L69.0371 129.001ZM69.0371 96.9414L69.6974 96.1904L68.0371 94.7306L68.0371 96.9414L69.0371 96.9414ZM69.0371 105.783L68.0371 105.783L68.0371 106.245L68.3885 106.544L69.0371 105.783ZM77.2464 112.78L77.8951 113.541L78.7881 112.78L77.8951 112.018L77.2464 112.78ZM69.0371 119.776L68.3885 119.015L68.0371 119.314L68.0371 119.776L69.0371 119.776ZM86.6084 112.22L68.3768 128.25L69.6974 129.752L87.929 113.722L86.6084 112.22ZM68.3768 97.6924L86.6084 113.722L87.929 112.22L69.6974 96.1904L68.3768 97.6924ZM70.0371 105.783L70.0371 96.9414L68.0371 96.9414L68.0371 105.783L70.0371 105.783ZM68.3885 106.544L76.5977 113.541L77.8951 112.018L69.6858 105.022L68.3885 106.544ZM76.5977 112.018L68.3885 119.015L69.6858 120.537L77.8951 113.541L76.5977 112.018ZM70.0371 129.001L70.0371 119.776L68.0371 119.776L68.0371 129.001L70.0371 129.001Z"
                            fill="#93C5FD"
                            mask="url(#path-6-inside-2_171823_2591)"
                          />
                        </svg>
                      </m.div>
                      <m.div
                        initial={{ x: "100%", opacity: 0 }}
                        animate={{ x: "0%", opacity: 1 }}
                        exit={{ x: "-100%", opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-[50%] ml-6 my-auto"
                      >
                        <h2 className="font-bold text-2xl text-[#EB4335] ">
                          <span className="text-[#2563EB]">
                            Smart Solutions,
                          </span>{" "}
                          Smarter Governance
                        </h2>
                        <p className="font-medium text-base text-slate-600">
                          Acknowledging digital advancements that enhance public
                          service efficiency.
                        </p>
                      </m.div>
                    </div>
                  )}
                  {index == 1 && (
                    <div className="flex px-16 size-full items-center gap-2">
                      <m.div
                        initial={{ x: "100%", opacity: 0 }}
                        animate={{ x: "0%", opacity: 1 }}
                        exit={{ x: "-100%", opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        className=" relative z-10"
                      >
                        <h2 className="max-w-[50%] font-bold text-2xl text-[#EB4335] ">
                          <span className="text-[#2563EB]">
                            Bridging Innovation and
                          </span>{" "}
                          Public Service{" "}
                        </h2>
                        <p className="max-w-[60%] font-medium text-base text-slate-600">
                          Celebrating digital tools and strategies that enhance
                          governance and transparency.
                        </p>
                      </m.div>
                      <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        className=""
                      >
                        <Image
                          src={carousel}
                          alt="egov"
                          className="object-cover h-full   absolute top-0 -right-4 "
                          style={{
                            WebkitMaskImage:
                              "linear-gradient(to right, transparent, black 100%, transparent 100%)",
                            maskImage:
                              "linear-gradient(to right, transparent, black 80%, transparent 95%)",
                          }}
                        />
                      </m.div>
                    </div>
                  )}
                  {index == 2 && (
                    <div className="flex size-full items-center gap-2">
                      <m.div
                        initial={{ x: "100%", opacity: 0 }}
                        animate={{ x: "0%", opacity: 1 }}
                        exit={{ x: "-100%", opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        className=" px-16 z-10"
                      >
                        <p className="max-w-[65%] font-medium text-base text-slate-600">
                          Recognizing forward-thinking solutions shaping the
                          future of governance.
                        </p>
                        <h2 className="max-w-[50%] font-bold text-2xl text-[#EB4335] ">
                          <span className="text-[#2563EB]">
                            Pioneering a Digital Tomorrow,{" "}
                          </span>{" "}
                          Today{" "}
                        </h2>
                      </m.div>
                      <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        className="absolute top-0 opacity-70 max-w-[80%] right-16 "
                      >
                        <svg
                          width="351"
                          height="213"
                          viewBox="0 0 351 213"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="77.7686"
                            y="46.1566"
                            width="98.9547"
                            height="104.981"
                            transform="rotate(45 77.7686 46.1566)"
                            stroke="#DBEAFE"
                            strokeWidth="5"
                          />
                          <rect
                            x="225.184"
                            y="-39.4449"
                            width="98.9547"
                            height="104.981"
                            transform="rotate(45 225.184 -39.4449)"
                            stroke="#DBEAFE"
                            strokeWidth="5"
                          />
                          <rect
                            x="225.184"
                            y="122.243"
                            width="98.9547"
                            height="104.981"
                            transform="rotate(45 225.184 122.243)"
                            stroke="#DBEAFE"
                            strokeWidth="5"
                          />
                          <rect
                            x="130.078"
                            y="46.1566"
                            width="98.9547"
                            height="104.981"
                            transform="rotate(45 130.078 46.1566)"
                            stroke="#DBEAFE"
                            strokeWidth="5"
                          />
                          <rect
                            x="277.493"
                            y="-39.4449"
                            width="98.9547"
                            height="104.981"
                            transform="rotate(45 277.493 -39.4449)"
                            stroke="#DBEAFE"
                            strokeWidth="5"
                          />
                          <rect
                            x="277.493"
                            y="122.243"
                            width="98.9547"
                            height="104.981"
                            transform="rotate(45 277.493 122.243)"
                            stroke="#DBEAFE"
                            strokeWidth="5"
                          />
                        </svg>
                      </m.div>
                    </div>
                  )}
                </div>
              </div>
            </AnimatePresence>
          </div>
        </div>
        <div className="relative">
          <div className="z-30 flex size-full relative items-center justify-center">
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {() => {
                const animation = {
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  exit: { opacity: 0, y: 20 },
                  transition: {
                    duration: 0.2,
                    ease: "easeInOut",
                  },
                };
                return (
                  <Form className="max-w-[380px]  mx-auto lg:mx-0 max-h-screen overflow-hidden w-full">
                    {" "}
                    <h2 className="font-bold text-base uppercase mb-4 text-center text-blue-600">
                      {action == "login"
                        ? "Login Account"
                        : action == "email"
                        ? "FORGOT PASSWORD"
                        : "Set up password"}
                    </h2>{" "}
                    <AnimatePresence mode="wait">
                      {action == "login" && (
                        <m.div
                          {...animation}
                          key="login"
                          className="min-h-[300px]"
                        >
                          <Card className=" p-4">
                            <CardContent className="grid gap-4">
                              <div className=" flex w-full flex-col gap-4">
                                <div className="flex w-full flex-col gap-4">
                                  <div className="space-y-3">
                                    <div className="flex flex-col gap-1 py-2">
                                      {" "}
                                      <h1 className="text-sm font-medium text-slate-900">
                                        Email
                                      </h1>
                                      <Field
                                        type="email"
                                        name="email"
                                        autoComplete="off"
                                        placeholder="johndoe@egovawards.com"
                                        as={Input}
                                        className="space-y-8 rounded-md bg-white"
                                      />
                                      <ErrorMessage
                                        name="email"
                                        component="div"
                                        className=" text-xs text-red-500"
                                      />
                                    </div>

                                    <div className="flex flex-col gap-1">
                                      <h1 className="text-sm font-medium text-slate-900">
                                        Password
                                      </h1>
                                      <div className=" relative">
                                        <Field
                                          type={
                                            isPasswordVisible
                                              ? "text"
                                              : "password"
                                          }
                                          autoComplete="off"
                                          name="password"
                                          placeholder="••••••••"
                                          as={Input}
                                          className="space-y-8 rounded-md bg-white"
                                        />

                                        <div
                                          className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                                          onClick={togglePasswordVisibility}
                                        >
                                          <AnimatePresence
                                            mode="wait"
                                            initial={false}
                                          >
                                            {isPasswordVisible ? (
                                              <m.span
                                                key="eyeOff"
                                                initial={{
                                                  clipPath:
                                                    "circle(0% at 50% 50%)",
                                                }}
                                                animate={{
                                                  clipPath:
                                                    "circle(100% at 50% 50%)",
                                                }}
                                                transition={{
                                                  duration: 0.3,
                                                  ease: "easeOut",
                                                }}
                                              >
                                                <EyeOffIcon
                                                  size={15}
                                                  className="text-slate-500"
                                                />
                                              </m.span>
                                            ) : (
                                              <m.span
                                                key="eye"
                                                initial={{
                                                  clipPath:
                                                    "circle(0% at 50% 50%)",
                                                }}
                                                animate={{
                                                  clipPath:
                                                    "circle(100% at 50% 50%)",
                                                }}
                                                transition={{
                                                  duration: 0.3,
                                                  ease: "easeOut",
                                                }}
                                              >
                                                <Eye
                                                  size={15}
                                                  className="text-slate-500"
                                                />
                                              </m.span>
                                            )}
                                          </AnimatePresence>
                                        </div>
                                      </div>
                                      <ErrorMessage
                                        name="password"
                                        component="div"
                                        className=" text-xs text-red-500"
                                      />
                                    </div>
                                    <p
                                      onClick={() => setAction("email")}
                                      className=" text-blue-600  w-fit cursor-pointer hover:text-blue-800 text-palette-neutral-primary text-xs"
                                    >
                                      Forgot Password?
                                    </p>
                                  </div>
                                </div>
                              </div>

                              {/*  <div className="relative mt-8 flex items-center justify-center">
                         <Image alt="" src={""} className="animate-spin-custom" />
                       </div> */}
                            </CardContent>
                            <Button
                              disabled={isLoading}
                              className={`bg-white-900 mt-8 w-full mx-auto transition-all duration-300 ease-out bg-slate-900 normal-case text-white  hover:bg-slate-500 `}
                              type="submit"
                            >
                              {isLoading ? (
                                <Loader2 size={18} className=" animate-spin" />
                              ) : (
                                <span>Login</span>
                              )}
                            </Button>
                          </Card>
                        </m.div>
                      )}

                      {action == "email" && (
                        <m.div
                          key="email"
                          {...animation}
                          className="min-h-[300px]"
                        >
                          <Card className="w-full p-8">
                            <CardContent className="p-0">
                              <div className="flex w-full flex-col gap-3 pb-8">
                                <div className="flex flex-col gap-1 py-2">
                                  {" "}
                                  <h1 className="text-sm font-semibold text-slate-900">
                                    Email
                                  </h1>
                                  <div className="relative">
                                    <Field
                                      type="email"
                                      name="email"
                                      autoComplete="off"
                                      placeholder="Enter Email"
                                      as={Input}
                                      className="space-y-8 rounded-md bg-white pl-10"
                                    />
                                    <Mail
                                      size={18}
                                      color="#6B7280"
                                      className="absolute top-1/2 -translate-y-1/2 left-3"
                                    />
                                  </div>
                                  <ErrorMessage
                                    name="email"
                                    component="div"
                                    className=" text-xs text-red-500"
                                  />
                                </div>
                              </div>

                              {/*  <div className="relative mt-8 flex items-center justify-center">
                   <Image alt="" src={""} className="animate-spin-custom" />
                 </div> */}
                            </CardContent>
                            <div className="flex gap-4 justify-center">
                              <Button
                                type="button"
                                onClick={() => setAction("login")}
                                className={`text-slate-900 flex justify-center  w-full  gap-2 text-sm font-semibold items-center hover:bg-slate-200 bg-[#F3F4F6] p-2.5 px-6 rounded-md transition-colors duration-300`}
                              >
                                Cancel
                              </Button>
                              <Button
                                type="button"
                                onClick={() => setAction("setup")}
                                className={`bg-[#1F2937] flex justify-center w-full gap-2 text-sm font-semibold items-center transition-colors duration-300  hover:bg-slate-700 text-white p-2.5 px-6 rounded-md`}
                              >
                                Submit
                              </Button>
                            </div>
                          </Card>
                        </m.div>
                      )}

                      {action == "setup" && (
                        <m.div
                          key="setup"
                          {...animation}
                          className="min-h-[300px]"
                        >
                          <Card className="w-full p-8">
                            <CardContent className="p-0">
                              <div className="flex w-full flex-col gap-3 pb-8">
                                <div className="flex w-full flex-col gap-3">
                                  <div className="flex flex-col gap-1 ">
                                    <Label className="text-sm font-semibold text-slate-900">
                                      Create Password
                                    </Label>
                                    <div className=" relative">
                                      <Field
                                        type={
                                          isPasswordVisible
                                            ? "text"
                                            : "password"
                                        }
                                        autoComplete="off"
                                        name="password"
                                        placeholder="Enter Password"
                                        as={Input}
                                        className="space-y-8  rounded-md bg-white px-10"
                                      />
                                      <Lock
                                        size={18}
                                        color="#6B7280"
                                        className="top-1/2 -translate-y-1/2 left-3 absolute"
                                      />
                                      <div
                                        className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                                        onClick={() =>
                                          setIsPasswordVisible(
                                            !isPasswordVisible
                                          )
                                        }
                                      >
                                        <AnimatePresence
                                          mode="wait"
                                          initial={false}
                                        >
                                          {isPasswordVisible ? (
                                            <m.span
                                              key="eyeOff"
                                              initial={{
                                                clipPath:
                                                  "circle(0% at 50% 50%)",
                                              }}
                                              animate={{
                                                clipPath:
                                                  "circle(100% at 50% 50%)",
                                              }}
                                              transition={{
                                                duration: 0.3,
                                                ease: "easeOut",
                                              }}
                                            >
                                              <EyeOffIcon
                                                size={18}
                                                color="#6B7280"
                                              />
                                            </m.span>
                                          ) : (
                                            <m.span
                                              key="eye"
                                              initial={{
                                                clipPath:
                                                  "circle(0% at 50% 50%)",
                                              }}
                                              animate={{
                                                clipPath:
                                                  "circle(100% at 50% 50%)",
                                              }}
                                              transition={{
                                                duration: 0.3,
                                                ease: "easeOut",
                                              }}
                                            >
                                              <Eye size={18} color="#6B7280" />
                                            </m.span>
                                          )}
                                        </AnimatePresence>
                                      </div>
                                    </div>
                                    <p className="text-sm font-medium text-slate-400">
                                      Must be a minimum of 8 characters, A
                                      combination of alphabetic, numeric, and
                                      special characters.
                                    </p>
                                    <ErrorMessage
                                      name="password"
                                      component="div"
                                      className=" text-xs text-red-500"
                                    />
                                  </div>
                                  <div className="flex flex-col gap-1 pb-2">
                                    <Label className="text-sm font-semibold text-slate-900">
                                      Confirm Password
                                    </Label>
                                    <div className=" relative">
                                      <Field
                                        type={
                                          isPasswordVisible2
                                            ? "text"
                                            : "password"
                                        }
                                        autoComplete="off"
                                        name="password"
                                        placeholder="Enter Password"
                                        as={Input}
                                        className="space-y-8  rounded-md bg-white px-10"
                                      />
                                      <Lock
                                        size={15}
                                        color="#6B7280"
                                        className="top-1/2 -translate-y-1/2 left-3 absolute"
                                      />
                                      <div
                                        className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                                        onClick={() =>
                                          setIsPasswordVisible2(
                                            !isPasswordVisible2
                                          )
                                        }
                                      >
                                        <AnimatePresence
                                          mode="wait"
                                          initial={false}
                                        >
                                          {isPasswordVisible2 ? (
                                            <m.span
                                              key="eyeOff"
                                              initial={{
                                                clipPath:
                                                  "circle(0% at 50% 50%)",
                                              }}
                                              animate={{
                                                clipPath:
                                                  "circle(100% at 50% 50%)",
                                              }}
                                              transition={{
                                                duration: 0.3,
                                                ease: "easeOut",
                                              }}
                                            >
                                              <EyeOffIcon
                                                size={18}
                                                color="#6B7280"
                                              />
                                            </m.span>
                                          ) : (
                                            <m.span
                                              key="eye"
                                              initial={{
                                                clipPath:
                                                  "circle(0% at 50% 50%)",
                                              }}
                                              animate={{
                                                clipPath:
                                                  "circle(100% at 50% 50%)",
                                              }}
                                              transition={{
                                                duration: 0.3,
                                                ease: "easeOut",
                                              }}
                                            >
                                              <Eye size={18} color="#6B7280" />
                                            </m.span>
                                          )}
                                        </AnimatePresence>
                                      </div>
                                    </div>
                                    <ErrorMessage
                                      name="password"
                                      component="div"
                                      className=" text-xs text-red-500"
                                    />
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                            <div className="flex gap-4 justify-center">
                              <Button
                                onClick={() => setAction("login")}
                                className={`bg-[#1F2937] flex justify-center w-full gap-2 text-sm font-semibold items-center transition-colors duration-300  hover:bg-slate-700 text-white p-2 px-6 rounded-md`}
                              >
                                Submit
                              </Button>
                            </div>
                          </Card>
                        </m.div>
                      )}
                    </AnimatePresence>
                    <div className="flex flex-col gap-2 mt-9 items-center justify-end">
                      <h2 className="text-xs text-slate-400">DEVELOPED BY </h2>
                      <Image
                        src={dict}
                        alt="logo"
                        className="max-w-[186px] w-full mx-auto"
                      />
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
          <div className="">
            <FloatingIcons />
          </div>
        </div>
      </div>
    </div>
  );
}

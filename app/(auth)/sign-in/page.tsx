"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useState } from "react";
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
import egov2 from "@/public/assets/images/egov2.webp";
import dict from "@/public/assets/images/dict2.webp";
import { Label } from "@/components/ui/label";
import Loading from "@/components/shared/loading";
import { storage } from "@/utils/useStorage";

export default function SignInPage() {
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
      <div className="min-h-[80vh] grid lg:grid-cols-2 items-center justify-center">
        <div className="flex items-center justify-end mx-10">
          <Image src={egov2} alt="logo" className="w-full max-w-[651.32px]" />
        </div>
        <div className="flex ">
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
                                        isPasswordVisible ? "text" : "password"
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
                                        setIsPasswordVisible(!isPasswordVisible)
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
                                              clipPath: "circle(0% at 50% 50%)",
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
                                              clipPath: "circle(0% at 50% 50%)",
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
                                        isPasswordVisible2 ? "text" : "password"
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
                                              clipPath: "circle(0% at 50% 50%)",
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
                                              clipPath: "circle(0% at 50% 50%)",
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
      </div>
    </div>
  );
}

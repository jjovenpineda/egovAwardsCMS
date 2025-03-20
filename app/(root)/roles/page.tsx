"use client";
import { Input } from "@/components/ui/input";

import { Switch } from "@/components/ui/switch";
import * as Yup from "yup";

import { ChevronDown, Edit, Plus, Save, Search, Trash2, X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { ReactNode, useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import CustomBadge from "@/components/shared/custom-badge";
import { toast } from "@/hooks/use-toast";
import { apiGet } from "@/utils/api";
import { permissions } from "@/constants";
const data = [
  {
    role: "Super Admin",
    status: true,
  },
  {
    role: "Secretariat",
    status: true,
  },
];
export default function Page() {
  const [rolesList, setRolesList] = useState<any>([]);
  const getRolesList = async () => {
    try {
      const res = await apiGet("/api/auth/roles/list");
      const { data } = res;
      if (!data) return;
      setRolesList(data);
    } catch (e) {
      console.error("Error fetching LGU list:", e);
    }
  };
  useEffect(() => {
    getRolesList();
  }, []);
  return (
    <div className="max-w-[90%] flex flex-col gap-4">
      {" "}
      <h1 className="text-slate-600 font-bold text-2xl uppercase mb-4">
        Roles
      </h1>
      <div className="flex justify-between items-end">
        <div className="flex w-full items-end gap-4 flex-wrap lg:flex-nowrap">
          <div className="relative  w-full max-w-[343px]  ">
            {" "}
            <Input
              type="text"
              placeholder="Search User"
              className="pl-10 h-[46px]   rounded-lg"
            />{" "}
            <Search
              size={15}
              className="absolute -translate-y-1/2 top-1/2 left-3 text-slate-500"
            />
          </div>
        </div>
        <ManageRoleModal action="add">
          <Button variant={"primary"} size={"default"}>
            <Plus size={15} />
            Add Role
          </Button>
        </ManageRoleModal>{" "}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            {(() => {
              const tableHeader = ["Role Name", "Status", "Action"];
              return tableHeader.map((th, index) => (
                <TableHead
                  key={index}
                  className={` font-medium ${
                    th === "Role Name"
                      ? "w-[400px]"
                      : th == "Status"
                      ? "w-[0px] text-center"
                      : th === "Action"
                      ? "w-[0px] text-center"
                      : ""
                  }`}
                >
                  {th}
                </TableHead>
              ));
            })()}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rolesList.map((item: any, index: any) => (
            <React.Fragment key={index}>
              <TableRow key={index} className="border-b-0 hover:bg-transparent">
                <TableCell className="font-medium text-base text-slate-900">
                  {item.role}
                </TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    <Switch color="green" className="" />
                  </div>
                </TableCell>

                <TableCell className="">
                  <div className="flex justify-center gap-0.5 mx-auto">
                    <ManageRoleModal action="edit">
                      <Button variant="ghost" size={"icon"}>
                        {" "}
                        <Edit size={15} className="text-slate-500" />
                      </Button>
                    </ManageRoleModal>{" "}
                    <ManageRoleModal action="delete">
                      <Button variant="ghost" size={"icon"}>
                        {" "}
                        <Trash2 size={15} className="text-red-500" />
                      </Button>
                    </ManageRoleModal>{" "}
                  </div>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
      <Pagination className="text-slate-500">
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
  );
}
interface IManageRoleModal {
  children: ReactNode;
  action: string;
}
const ManageRoleModal = ({ children, action }: IManageRoleModal) => {
  const validationSchema = Yup.object().shape({
    lastName: Yup.string().required("This field is required"),
    firstName: Yup.string().required("This field is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("This field is required"),
    role: Yup.string().required("This field is required"),
    judgeChoice: Yup.array()
      .of(Yup.string()) // No `required()` here, to allow an empty array initially
      .test(
        "judge-choice-required",
        "This field is required",
        function (value) {
          const { role } = this.parent;
          if (role === "judge") {
            return value && value.length > 0;
          }
          return true;
        }
      ),
  });
  const handleSubmit = async (values: any, resetForm: any) => {
    console.log("values :", values);
    toast({
      variant: "success",
      title: "User Deleted",
      description: "The user has been successfully deleted.",
      duration: 2500,
    });
    resetForm();
    /*  const filteredValues = {
        ...values,
        supportingDoc: values.supportingDoc.filter(
          (key: any) => typeof key === "string"
        ),
      };
  
      console.log("filteredValues :", filteredValues); */

    /*  await apiPost("/api/entry/create", filteredValues)
        .then((res) => {
          const { success, message, data } = res;
          if (success) {
          }
          toast({
            title: " Success!",
            description: message,
            duration: 2000,
          });
        })
        .catch((e) => {
          console.log(e);
  
          toast({
            title: " failed",
  
            description: "Invalid email or password",
            duration: 2000,
          });
        }); */
  };
  return (
    <Formik
      initialValues={{
        name: "",
        entries: [] as string[],
        users: [] as string[],
        roles: [] as string[],
        content: [] as string[],
      }}
      validationSchema={/* validationSchema */ ""}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ values, setFieldValue, resetForm, isValid, dirty, errors }) => {
        const [open, setOpen] = useState(false);

        return (
          <Form>
            <div className="flex justify-center gap-0.5 mx-auto">
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild onClick={() => setOpen(true)}>
                  {children}
                </DialogTrigger>
                <DialogContent
                  className={`${
                    action == "delete" ? "sm:max-w-sm" : "sm:max-w-3xl"
                  }  px-10 py-6`}
                >
                  <DialogTitle className="text-blue-900 uppercase gont-bold text-[18px]">
                    {action == "edit" && " Edit Role"}
                    {action == "add" && " Add Role"}
                    {action == "delete" && " Delete Role"}
                  </DialogTitle>
                  {action == "delete" && (
                    <div className="flex flex-col gap-4 pt-4 pb-6">
                      <h2 className="text-sm font-semibold ">
                        Are you sure you want to delete this role?{" "}
                      </h2>
                    </div>
                  )}
                  {["edit", "add"].includes(action) && (
                    <div className="flex flex-col gap-4 gap-y-8 pt-8 pb-6">
                      <div>
                        <div className="flex gap-1 items-center">
                          <Label className="font-semibold text-sm text-[#1F2937]">
                            Role Name{" "}
                          </Label>
                          <ErrorMessage
                            name="name"
                            component="div"
                            className=" text-xs text-red-500 font-semibold"
                          />
                        </div>
                        <Field
                          type="text"
                          autoComplete="off"
                          name="name"
                          placeholder="Enter Role Name"
                          as={Input}
                          className=" space-y-8 rounded-md lg:w-1/2 bg-white "
                        />
                      </div>
                      <div>
                        <Label className="font-semibold text-sm text-[#1F2937]">
                          Permissions
                        </Label>
                        {permissions.map((role: any, index) => (
                          <FieldArray
                            name={role.name}
                            render={(arrayHelpers) => (
                              <Accordion
                                type="single"
                                collapsible
                                className="w-full"
                                key={index}
                              >
                                <AccordionItem
                                  value="item-1"
                                  className="border-0"
                                >
                                  <AccordionTrigger chevron className="group">
                                    <div className="flex items-center gap-2 ">
                                      <ChevronDown
                                        size={15}
                                        className="transition-transform duration-200 group-data-[state=open]:rotate-180 "
                                      />
                                      <span className=" text-blue-600 font-semibold text-base">
                                        {role.name}
                                      </span>
                                      <CustomBadge
                                        color={"blue"}
                                        message={`${role.options.length} / ${role.options.length}`}
                                        className="rounded-full text-[10px]"
                                      />
                                    </div>
                                  </AccordionTrigger>
                                  <AccordionContent>
                                    {role.options.map(
                                      (option: any, index: any) => (
                                        <div
                                          key={index}
                                          className="flex items-center gap-2"
                                        >
                                          <Field
                                            type="checkbox"
                                            name={role.name}
                                            id={option.toLowerCase()}
                                            value={option}
                                          />
                                          {/*  <Field
                                            type="checkbox"
                                            name={role.name}
                                            id={option.toLowerCase()}
                                            value={option}
                                            checked={(
                                              values as Record<string, string[]>
                                            )[
                                              role.name.toLowerCase()
                                            ]?.includes(option)}
                                            onChange={(e: any) => {
                                              if (e.target.checked) {
                                                arrayHelpers.push(option);
                                              } else {
                                                const idx =
                                                  values[
                                                    role.name.toLowerCase()
                                                  ].indexOf(option);
                                                arrayHelpers.remove(idx);
                                              }
                                            }}
                                          /> */}
                                          <label
                                            htmlFor={option.toLowerCase()}
                                            className="font-semibold text-base  cursor-pointer"
                                          >
                                            {option}
                                          </label>
                                        </div>
                                      )
                                    )}
                                  </AccordionContent>
                                </AccordionItem>
                              </Accordion>
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  {action == "delete" ? (
                    <DialogFooter className="flex gap-2">
                      <DialogClose className="w-full flex text-[15px] items-center gap-2 justify-center rounded-md bg-transparent outline outline-black outline-1 hover:bg-slate-100">
                        <X size={15} /> Cancel
                      </DialogClose>
                      <Button
                        type="button"
                        onClick={() => {
                          setOpen(false);
                          toast({
                            variant: "success",
                            title: "Role Deleted",
                            description:
                              "The role has been successfully deleted.",
                            duration: 2500,
                          });
                        }}
                        className="w-full flex text-[15px] items-center gap-2 justify-center rounded-md bg-transparent outline outline-red-500 outline-1 text-red-500  hover:bg-slate-100"
                      >
                        <Trash2 size={13} className="mb-1" /> Delete
                      </Button>
                    </DialogFooter>
                  ) : (
                    <DialogFooter className="flex justify-end gap-2">
                      <DialogClose
                        onClick={() => {
                          resetForm();
                        }}
                        type="button"
                        className="w-fit rounded-md  hover:bg-slate-100 flex justify-center t gap-2 text-sm font-semibold items-center transition-colors duration-300  outline outline-1 text-slate-900 p-2 px-4"
                      >
                        <X size={13} className="mt-0.5" /> Close
                      </DialogClose>
                      <Button
                        type="submit"
                        onClick={() => {
                          handleSubmit(values, resetForm);

                          setOpen(false);
                          /*  toast({
                            variant: "success",
                            title: `Role ${
                              action == "edit" ? "updated" : "created"
                            }`,
                            description: `The role has been successfully ${
                              action == "edit" ? "updated" : "created"
                            }.`,
                            duration: 2500,
                          }); */
                        }}
                        className={`bg-[#1F2937] flex justify-center w-fit gap-2 text-sm font-semibold items-center transition-colors duration-300  hover:bg-slate-700 text-white p-2.5 px-4 rounded-md`}
                      >
                        <Save size={10} /> {action == "edit" && "Update"}
                        {action == "add" && "Save"}
                      </Button>
                    </DialogFooter>
                  )}{" "}
                </DialogContent>
              </Dialog>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ClipboardCheckIcon,
  Download,
  Edit,
  Eye,
  Plus,
  RotateCcw,
  Save,
  Search,
  Sliders,
  Trash2,
  X,
} from "lucide-react";
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
import React, { ReactNode, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { ErrorMessage, Field, Form, Formik } from "formik";
import CustomBadge from "@/components/shared/custom-badge";
import { toast } from "@/hooks/use-toast";
const data = [
  {
    name: "John Doe",
    email: "johndoe@example.com",
    role: ["Super Admin", "Secretariat"],
    action: "Edit",
  },
  {
    name: "Jane Smith",
    email: "janesmith@example.com",
    role: ["Secretariat"],
    action: "Edit",
  },
  {
    name: "Michael Johnson",
    email: "michaelj@example.com",
    role: ["Secretariat", "Super Admin"],
    action: "Edit",
  },
];
export default function Page() {
  return (
    <div className="max-w-[90%] flex flex-col gap-4">
      {" "}
      <h1 className="text-slate-600 font-bold text-2xl uppercase mb-4">
        Users
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
          <div>
            <Label className="font-semibold text-xs text-slate-500">
              Filter by Role
            </Label>
            <div className="flex gap-4 items-center">
              <Popover>
                <PopoverTrigger className="text-slate-900 h-[46px] border group text-sm  flex items-center gap-2 bg-white p-2 px-3 rounded-lg">
                  <Sliders size={15} className="text-slate-500" />
                  {}
                  <div className="flex gap-1 items-center border p-2 rounded-full text-xs font-medium text-[#6B7280]">
                    test{" "}
                    <div className="flex items-center justify-center bg-[#E5E7EB] hover:bg-slate-300 transition-color duration-200 rounded-full size-3.5 ">
                      <X size={10} className=" text-black" />
                    </div>
                  </div>
                  <div className="flex gap-1 items-center border p-2 rounded-full text-xs font-medium text-[#6B7280]">
                    test{" "}
                    <div className="flex items-center justify-center bg-[#E5E7EB] hover:bg-slate-300 transition-color duration-200 rounded-full size-3.5 ">
                      <X size={10} className=" text-black" />
                    </div>
                  </div>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  className="grid grid-cols-2 max-h-[60vh] "
                >
                  {(() => {
                    const usersRoles = ["Super Admin", "Admin", "Applicant"];
                    return (
                      <div className="flex flex-col gap-2">
                        {" "}
                        {usersRoles.map((role, index) => (
                          <div key={index} className="flex items-center gap-2">
                            {" "}
                            <Checkbox
                              id={role}
                              /*   checked={} */
                              className="mt-0.5"
                            />
                            <label
                              htmlFor={role}
                              className="text-sm font-medium max-w-[200px] cursor-pointer"
                            >
                              {role}
                            </label>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </PopoverContent>
              </Popover>
              <Button
                variant={"outline"}
                size={"sm"}
                className="rounded-full py-3 text-sm bg-transparent text-slate-500 px-2"
              >
                Reset <RotateCcw size={9} />
              </Button>
            </div>
          </div>
        </div>
        <ManageUserModal action="add">
          <Button variant={"primary"} size={"default"}>
            <Plus size={15} />
            Add User
          </Button>
        </ManageUserModal>{" "}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            {(() => {
              const tableHeader = ["Name", "Email", "Role", "Action"];
              return tableHeader.map((th, index) => (
                <TableHead
                  key={index}
                  className={` font-medium ${
                    th === "Name"
                      ? "w-[167px]"
                      : th == "Email"
                      ? "w-[230px]"
                      : th === "Role"
                      ? "w-[500px]"
                      : th === "Action"
                      ? "w-[120px] text-center"
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
          {data.map((item, index) => (
            <React.Fragment key={index}>
              <TableRow key={index} className="border-b-0 hover:bg-transparent">
                <TableCell className="font-medium text-base text-slate-900">
                  {item.name}
                </TableCell>
                <TableCell className="text-blue-500 text-base font-normal">
                  {item.email}
                </TableCell>
                <TableCell className="flex gap-2">
                  {item.role.map((role, index) => (
                    <div key={index}>
                      <CustomBadge
                        color="gray"
                        key={index}
                        message={role}
                        className="text-[10px] rounded-full py-0 font-medium"
                      />
                    </div>
                  ))}
                </TableCell>
                <TableCell className="">
                  <div className="flex justify-center gap-0.5 mx-auto">
                    <ManageUserModal action="edit">
                      <Button variant="ghost" size={"icon"}>
                        {" "}
                        <Edit size={15} className="text-slate-500" />
                      </Button>
                    </ManageUserModal>{" "}
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
interface IManageUserModal {
  children: ReactNode;
  action: string;
}
const ManageUserModal = ({ children, action }: IManageUserModal) => {
  return (
    <Formik
      initialValues={{
        lastName: "",
        firstName: "",
        email: "",
        role: "",
      }}
      validationSchema={/* validationSchema */ ""}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ values, setFieldValue, resetForm }) => {
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
                    {action == "edit" && " Edit User"}
                    {action == "add" && " Add User"}
                    {action == "delete" && " Delete User"}
                  </DialogTitle>
                  {action == "delete" && (
                    <div className="flex flex-col gap-4 pt-4 pb-6">
                      <h2 className="text-sm font-semibold ">
                        Are you sure you want to delete this user?{" "}
                      </h2>
                    </div>
                  )}
                  {["edit", "add"].includes(action) && (
                    <div className="grid-cols-2 grid gap-4 gap-y-8 pt-8 pb-6">
                      <div>
                        <div className="flex gap-1 items-center">
                          <Label className="font-semibold text-sm text-[#1F2937]">
                            Last Name
                          </Label>
                          <ErrorMessage
                            name="lastName"
                            component="div"
                            className=" text-xs text-red-500 font-semibold"
                          />
                        </div>
                        <Field
                          type="text"
                          autoComplete="off"
                          name="lastName"
                          placeholder="Enter Last Name"
                          as={Input}
                          className=" space-y-8 rounded-md bg-white "
                        />
                      </div>
                      <div>
                        <div className="flex gap-1 items-center">
                          <Label className="font-semibold text-sm text-[#1F2937]">
                            First Name
                          </Label>
                          <ErrorMessage
                            name="firstName"
                            component="div"
                            className=" text-xs text-red-500 font-semibold"
                          />
                        </div>
                        <Field
                          type="text"
                          autoComplete="off"
                          name="firstName"
                          placeholder="Enter First Name"
                          as={Input}
                          className=" space-y-8 rounded-md bg-white "
                        />
                      </div>
                      <div>
                        <div className="flex gap-1 items-center">
                          <Label className="font-semibold text-sm text-[#1F2937]">
                            Email
                          </Label>
                          <ErrorMessage
                            name="email"
                            component="div"
                            className=" text-xs text-red-500 font-semibold"
                          />
                        </div>
                        <Field
                          type="text"
                          autoComplete="off"
                          name="email"
                          placeholder="Enter Email"
                          as={Input}
                          className=" space-y-8 rounded-md bg-white "
                        />
                      </div>
                      <div className=" ">
                        <div className="flex gap-1 items-center">
                          <Label className="font-semibold text-sm text-[#1F2937]">
                            Select Role
                          </Label>
                          <ErrorMessage
                            name="lgu.name"
                            component="div"
                            className=" text-xs text-red-500 font-semibold"
                          />
                        </div>
                        <Select
                          onValueChange={(e) => {
                            setFieldValue("role", e);
                          }}
                          defaultValue={values.role}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="superAdmin">
                                Super Admin
                              </SelectItem>
                              <SelectItem value="secretariat">
                                Secretariat
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
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
                            title: "User Deleted",
                            description:
                              "The user has been successfully deleted.",
                            duration: 2500,
                          });
                        }}
                        className="w-full flex text-[15px] items-center gap-2 justify-center rounded-md bg-transparent outline outline-red-500 outline-1 text-red-500  hover:bg-slate-100"
                      >
                        <Trash2 size={13} className="mb-1" /> Delete
                      </Button>
                    </DialogFooter>
                  ) : (
                    <DialogFooter>
                      <div
                        className={`flex w-full justify-end ${
                          action == "edit" && "justify-between"
                        }`}
                      >
                        {action == "edit" && (
                          <Button
                            variant={"ghost"}
                            className="outline outline-1 outline-red-500 text-red-500 hover:bg-slate-100 hover:text-red-500"
                          >
                            Deactivate Account
                          </Button>
                        )}
                        <div className="flex gap-4">
                          <DialogClose
                            type="button"
                            className="w-fit rounded-md  hover:bg-slate-100 flex justify-center t gap-2 text-sm font-semibold items-center transition-colors duration-300  outline outline-1 text-slate-900 p-2 px-4"
                          >
                            <X size={13} className="mt-0.5" /> Close
                          </DialogClose>
                          <Button
                            type="submit"
                            onClick={() => {
                              setOpen(false);
                              toast({
                                variant: "success",
                                title: `User ${
                                  action == "edit" ? "updated" : "created"
                                }`,
                                description: `The user has been successfully ${
                                  action == "edit" ? "updated" : "created"
                                }.`,
                                duration: 2500,
                              });
                            }}
                            className={`bg-[#1F2937] flex justify-center w-fit gap-2 text-sm font-semibold items-center transition-colors duration-300  hover:bg-slate-700 text-white p-2.5 px-4 rounded-md`}
                          >
                            <Save size={10} /> {action == "edit" && "Update"}
                            {action == "add" && "Save"}
                          </Button>
                        </div>
                      </div>
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

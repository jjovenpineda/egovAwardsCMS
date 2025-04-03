"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Edit, Plus, Save, Search, Trash2, X } from "lucide-react";
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
import * as Yup from "yup";

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
import { Label } from "@/components/ui/label";

import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import CustomBadge from "@/components/shared/custom-badge";
import { toast } from "@/hooks/use-toast";
import { apiGet, apiPost, apiPut } from "@/utils/api";
import { Switch } from "@/components/ui/switch";
import Loaders from "@/components/loaders";
import Filter from "@/components/shared/filter";
import CustomPagination from "@/components/shared/pagination";

export default function Page() {
  const [selectedFilter, setSelectedFilter] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debounceQuery, setDebounceQuery] = useState<any>(null);
  const [userlist, setUserList] = useState<any>([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceQuery(searchQuery);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);
  const getUserList = async () => {
    try {
      const res = await apiGet(
        `/api/auth/users/list?page=${page}&limit=${limit}&order=desc&roles=${selectedFilter}&search=${debounceQuery}`
      );
      const { data } = res;
      if (!data) return;
      setUserList(data);
    } catch (e) {
      console.error("Error fetching users list:", e);
    }
  };
  useEffect(() => {
    getUserList();
  }, [page, selectedFilter, debounceQuery]);

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
              onChange={(e) => {
                setTimeout(() => {
                  setSearchQuery(e.target.value);
                }, 500);
              }}
              className="pl-10 h-[46px]   rounded-lg"
            />{" "}
            <Search
              size={15}
              className="absolute -translate-y-1/2 top-1/2 left-3 text-slate-500"
            />
          </div>
          <div>
            <Filter
              label="Filter By Role"
              data={userlist?.roleList?.map((item: any) => item.name)}
              selectedFilter={selectedFilter}
              setSelectedFilter={(data: string) =>
                setSelectedFilter((currentData) =>
                  currentData.includes(data)
                    ? currentData.filter((item: string) => item !== data)
                    : [...currentData, data]
                )
              }
              reset={() => setSelectedFilter([])}
            />
          </div>
        </div>
        <ManageUserModal
          action="add"
          data={userlist}
          refresh={() => getUserList()}
        >
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
              const tableHeader = ["Name", "Email", "Role", "Status", "Action"];
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
                      : th === "Status"
                      ? "w-[120px] text-center"
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
          {userlist?.users?.map((item: any, index: any) => (
            <React.Fragment key={index}>
              <TableRow
                key={index}
                className="border-b-0  hover:bg-transparent"
              >
                <TableCell className="font-medium text-base text-slate-900">
                  {item.firstname} {item.lastname}
                </TableCell>
                <TableCell className="text-blue-500 text-base  font-normal">
                  {item.email}
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    <CustomBadge
                      color="gray"
                      key={index}
                      message={item?.roleName}
                      className="text-[10px] rounded-full py-0 font-medium"
                    />
                  </div>
                </TableCell>
                <TableCell className="text-blue-500 text-base  font-normal">
                  <div className="flex gap-1 items-center justify-start">
                    <Switch
                      color="green"
                      className=""
                      checked={item.isActive}
                    />
                    <div
                      className={`text-[10px] font-medium ${
                        item.isActive ? "text-slate-500" : "text-red-500"
                      }`}
                    >
                      {item.isActive ? "Activated" : "Deactivated"}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="">
                  <div className="flex justify-center gap-0.5 mx-auto">
                    <ManageUserModal
                      action="edit"
                      data={userlist}
                      selectedUserInfo={userlist.users.find(
                        (user: any) => user._id === item._id
                      )}
                      refresh={() => getUserList()}
                    >
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
      <div className="flex justify-between items-center text-base font-medium text-[#6B7280]">
        <div>
          Showing {(page - 1) * limit + 1} to{" "}
          {userlist?.pages == page ? userlist?.totalItems : page * limit} of{" "}
          {userlist?.totalItems} Users{" "}
        </div>
        <div>
          <CustomPagination page={page} setPage={setPage} data={userlist} />
        </div>
      </div>
    </div>
  );
}
interface IManageUserModal {
  children: ReactNode;
  action: string;
  data: any;
  refresh: () => void;
  selectedUserInfo?: any;
}
const ManageUserModal = ({
  children,
  action,
  data,
  refresh,
  selectedUserInfo,
}: IManageUserModal) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {}, [selectedUserInfo]);
  const validationSchema = Yup.object().shape({
    lastname: Yup.string().required("This field is required"),
    firstname: Yup.string().required("This field is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("This field is required"),
    role: Yup.string().required("This field is required"),
    judgeCategory: Yup.array()
      .of(Yup.string())
      .test(
        "judge-choice-required",
        "This field is required",
        function (value) {
          const { role } = this.parent;
          if (role === "67dbb942509373eb845a0e1d") {
            return value && value.length > 0;
          }
          return true;
        }
      ),
  });
  const handleSubmit = async (values: any, resetForm: any) => {
    let newValues = values;
    setIsLoading(true);
    if (values?.role != "67dbb942509373eb845a0e1d") {
      const { judgeCategory, ...cleanedValues } = values;
      newValues = cleanedValues;
    }
    try {
      if (action === "add") {
        const res = await apiPost("/api/auth/create", newValues);
        const { success, message } = res;
        if (success) {
          resetForm();
          setOpen(false);
          refresh();
          toast({
            variant: "success",
            title: "User Created",
            description: "The user has been successfully created.",
            duration: 2500,
          });
        }
        if (message.includes("duplicate")) {
          toast({
            variant: "destructive",
            title: "Duplicate Email",
            description: "A user with this email already exists.",
            duration: 2500,
          });
        } else if (message.includes("Invalid email.")) {
          toast({
            variant: "destructive",
            title: "Invalid Email",
            description: "Please enter a valid email address.",
            duration: 2500,
          });
        }
      } else if (action === "edit") {
        const res = await apiPut(
          `/api/role/add/permissions/${selectedUserInfo._id}`,
          values
        );
        const { success, message } = res;
        if (success) {
          resetForm();
          setOpen(false);
          refresh();
          toast({
            variant: "success",
            title: "User Updated",
            description: "The user has been successfully updated.",
            duration: 2500,
          });
        }
        if (message.includes("duplicate")) {
          toast({
            variant: "destructive",
            title: "Duplicate Email",
            description: "A user with this email already exists.",
            duration: 2500,
          });
        }
      }
    } catch (e) {
      console.error("Error:", e);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
        duration: 2000,
      });
    }
    setIsLoading(false);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        lastname: selectedUserInfo?.lastname || "",
        firstname: selectedUserInfo?.firstname || "",
        judgeCategory: selectedUserInfo?.judgeCategory || ([] as string[]),
        email: selectedUserInfo?.email || "",
        role: selectedUserInfo?.role || "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, resetForm, isValid, dirty }) => {
        return (
          <Form>
            <div className="flex justify-center gap-0.5 mx-auto">
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild onClick={() => setOpen(true)}>
                  {children}
                </DialogTrigger>
                <DialogContent
                  onInteractOutside={(e) => {
                    e.preventDefault();
                  }}
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
                            name="lastname"
                            component="div"
                            className=" text-xs text-red-500 font-semibold"
                          />
                        </div>
                        <Field
                          type="text"
                          autoComplete="off"
                          name="lastname"
                          placeholder="Last Name"
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
                            name="firstname"
                            component="div"
                            className=" text-xs text-red-500 font-semibold"
                          />
                        </div>
                        <Field
                          type="text"
                          autoComplete="off"
                          name="firstname"
                          placeholder="First Name"
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
                          placeholder="Email"
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
                          defaultValue={selectedUserInfo?.role}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <>
                                {data?.roleList?.map(
                                  (item: any, index: any) => (
                                    <SelectItem key={index} value={item._id}>
                                      {item.name}
                                    </SelectItem>
                                  )
                                )}
                              </>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <FieldArray
                        name="judgeCategory"
                        render={(arrayHelpers) => (
                          <>
                            {" "}
                            {values.role == "67dbb942509373eb845a0e1d" && (
                              <div className="">
                                <div className="flex gap-1 items-center">
                                  <h2 className="text-[#1F2937] font-semibold text-sm">
                                    Select Judge Category
                                  </h2>
                                  <ErrorMessage
                                    name="judgeCategory"
                                    component="div"
                                    className=" text-xs text-red-500 font-semibold"
                                  />
                                </div>{" "}
                                {(() => {
                                  const items = [
                                    "G2A",
                                    "G2B",
                                    "G2C",
                                    "G2D",
                                    "G2E",
                                  ];

                                  return (
                                    <div className="flex items-center gap-8">
                                      {items.map((category, index) => (
                                        <div
                                          key={index}
                                          className="flex gap-4 items-center"
                                        >
                                          <Field
                                            type="checkbox"
                                            name="judgeCategory"
                                            id={category}
                                            value={category}
                                            checked={values.judgeCategory.includes(
                                              category
                                            )}
                                            onChange={(e: any) => {
                                              if (e.target.checked) {
                                                arrayHelpers.push(category);
                                              } else {
                                                const idx =
                                                  values.judgeCategory.indexOf(
                                                    category
                                                  );
                                                arrayHelpers.remove(idx);
                                              }
                                            }}
                                          />
                                          <label htmlFor={category}>
                                            {category}
                                          </label>
                                        </div>
                                      ))}
                                    </div>
                                  );
                                })()}
                              </div>
                            )}
                            {/* {Object.keys(errors).map((key) => {
                              return (
                                <div
                                  key={key}
                                  className="text-xs text-red-500 font-semibold"
                                >
                                  {errors[key]}
                                </div>
                              );
                            })} */}
                          </>
                        )}
                      />
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
                            onClick={() => {
                              resetForm();
                            }}
                            className="w-fit rounded-md  hover:bg-slate-100 flex justify-center t gap-2 text-sm font-semibold items-center transition-colors duration-300  outline outline-1 text-slate-900 p-2 px-4"
                          >
                            <X size={13} className="mt-0.5" /> Close
                          </DialogClose>
                          <Button
                            type="submit"
                            disabled={!isValid || !dirty}
                            onClick={() => {
                              handleSubmit(values, resetForm);
                            }}
                            className={`bg-[#1F2937] flex justify-center w-fit gap-2 text-sm font-semibold items-center transition-colors duration-300  hover:bg-slate-700 text-white p-2.5 px-4 rounded-md`}
                          >
                            {isLoading ? (
                              <Loaders
                                loader={"wobble"}
                                color="white"
                                size={30}
                              />
                            ) : (
                              <>
                                <Save size={10} />{" "}
                                {action == "edit" && "Update"}
                                {action == "add" && "Save"}
                              </>
                            )}
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

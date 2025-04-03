"use client";
import { Input } from "@/components/ui/input";

import { Switch } from "@/components/ui/switch";
import * as Yup from "yup";

import {
  ChevronDown,
  Edit,
  Loader2,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";
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

import { Button } from "@/components/ui/button";
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
import { apiGet, apiPost, apiPut } from "@/utils/api";
import { ScrollArea } from "@/components/ui/scroll-area";
import Loaders from "@/components/loaders";
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
      const res = await apiGet("/api/role/list");
      const { data } = res;
      if (!data) return;
      setRolesList(data);
    } catch (e) {
      console.error("Error fetching role list:", e);
    }
  };
  useEffect(() => {
    getRolesList();
  }, []);

  return (
    <div className="max-w-[90%] flex flex-col gap-4">
      {" "}
      <h1 className="text-slate-600 font-bold text-2xl uppercase mb-4">
        Roles & Permissions
      </h1>
      <div className="flex justify-end items-end">
        <ManageRoleModal
          action="add"
          data={rolesList.permissions}
          refresh={() => getRolesList()}
        >
          <Button variant={"primary"} size={"default"}>
            <Plus size={15} />
            Add Role
          </Button>
        </ManageRoleModal>
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
          {rolesList?.roles?.map((item: any, index: any) => (
            <React.Fragment key={index}>
              <TableRow key={index} className="border-b-0 hover:bg-transparent">
                <TableCell className="font-medium text-base text-slate-900">
                  {item.name}
                </TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    <Switch
                      color="green"
                      className=""
                      checked={item.isActive}
                      /*                       onCheckedChange={field.onChange}
                       */
                    />
                  </div>
                </TableCell>

                <TableCell className="">
                  <div className="flex justify-center gap-0.5 mx-auto">
                    <ManageRoleModal
                      action="edit"
                      data={rolesList.permissions}
                      selectedRoleInfo={rolesList.roles.find(
                        (role: any) => role._id === item._id
                      )}
                      refresh={() => getRolesList()}
                    >
                      <Button variant="ghost" size={"icon"}>
                        {" "}
                        <Edit size={15} className="text-slate-500" />
                      </Button>
                    </ManageRoleModal>{" "}
                    {/*   <ManageRoleModal
                      action="delete"
                      data={rolesList.permissions}
                      selectedRoleInfo={rolesList.roles.find(
                        (role: any) => role._id === item._id
                      )}
                      refresh={() => getRolesList()}
                    >
                      <Button variant="ghost" size={"icon"}>
                        {" "}
                        <Trash2 size={15} className="text-red-500" />
                      </Button>
                    </ManageRoleModal>{" "} */}
                  </div>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
interface IManageRoleModal {
  children: ReactNode;
  action: string;
  data: any;
  refresh: () => void;
  selectedRoleInfo?: any;
}
const ManageRoleModal = ({
  children,
  action,
  data,
  refresh,
  selectedRoleInfo,
}: IManageRoleModal) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("This field is required"),
    permissions: Yup.array()
      .min(1, "This field is required")
      .required("This field is required"),
  });
  const handleSubmit = async (values: any, resetForm: any) => {
    setIsLoading(true);

    try {
      if (action === "add") {
        const res = await apiPost("/api/role/create", values);
        const { success, message } = res;
        if (success) {
          resetForm();
          setOpen(false);
          refresh();
          toast({
            variant: "success",
            title: "Role Created",
            description: "The role has been successfully created.",
            duration: 2500,
          });
        }
        if (message.includes("duplicate")) {
          toast({
            variant: "destructive",
            title: "Duplicate Role",
            description: "A role with this name already exists.",
            duration: 2500,
          });
        }
      } else if (action === "edit") {
        const res = await apiPut(
          `/api/role/add/permissions/${selectedRoleInfo._id}`,
          values
        );
        const { success, message } = res;
        if (success) {
          resetForm();
          setOpen(false);
          refresh();
          toast({
            variant: "success",
            title: "Role Updated",
            description: "The role has been successfully updated.",
            duration: 2500,
          });
        }
        if (message.includes("duplicate")) {
          toast({
            variant: "destructive",
            title: "Duplicate Role",
            description: "A role with this name already exists.",
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
        name: selectedRoleInfo?.name || "",
        permissions: selectedRoleInfo?.permissions || ([] as string[]),
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values.toString());
      }}
    >
      {({
        values,
        resetForm,
        isValid,
        dirty,
        setFieldTouched,
        validateField,
      }) => {
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
                            Role Name {selectedRoleInfo?.name}
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
                          placeholder="Role Name"
                          as={Input}
                          className=" space-y-8 rounded-md lg:w-1/2 bg-white "
                        />
                      </div>
                      <div>
                        <div className="flex gap-1 items-center">
                          <Label className="font-semibold text-sm text-[#1F2937]">
                            Permissions
                          </Label>
                          <ErrorMessage
                            name="permissions"
                            component="div"
                            className=" text-xs text-red-500 font-semibold"
                          />
                        </div>
                        {data && (
                          <>
                            <ScrollArea
                              className="h-full max-h-[500px]"
                              onBlur={() => {
                                setFieldTouched("permissions", true),
                                  validateField("permissions");
                              }}
                            >
                              {" "}
                              <FieldArray
                                name="permissions"
                                render={(arrayHelpers) => (
                                  <>
                                    {Object.entries(data).map(
                                      ([key, value]: any) => (
                                        <Accordion
                                          type="single"
                                          collapsible
                                          className="w-full"
                                          key={key}
                                        >
                                          <AccordionItem
                                            value="item-1"
                                            className="border-0"
                                          >
                                            <AccordionTrigger
                                              chevron
                                              className="group"
                                            >
                                              <div className="flex items-center gap-2 ">
                                                <ChevronDown
                                                  size={15}
                                                  className="transition-transform duration-200 group-data-[state=open]:rotate-180 "
                                                />
                                                <span className=" text-blue-600 font-semibold text-base">
                                                  {" "}
                                                  {key.charAt(0).toUpperCase() +
                                                    key.slice(1)}
                                                </span>
                                                <CustomBadge
                                                  color={"blue"}
                                                  message={`${
                                                    values.permissions.filter(
                                                      (e: any) =>
                                                        e.includes(
                                                          key == "entry"
                                                            ? "entries"
                                                            : key
                                                        )
                                                    )?.length
                                                  } / ${value.length}`}
                                                  className="rounded-full text-[10px]"
                                                />
                                              </div>
                                            </AccordionTrigger>

                                            <AccordionContent>
                                              {value.map(
                                                (item: any, index: any) => (
                                                  <div
                                                    key={index}
                                                    className="flex items-center gap-2"
                                                  >
                                                    <Field
                                                      type="checkbox"
                                                      name="permissions"
                                                      value={item.name}
                                                      id={item.name}
                                                      onChange={(
                                                        e: React.ChangeEvent<HTMLInputElement>
                                                      ) => {
                                                        if (e.target.checked) {
                                                          arrayHelpers.push(
                                                            item.name
                                                          );
                                                        } else {
                                                          const idx =
                                                            values.permissions.indexOf(
                                                              item.name
                                                            );
                                                          if (idx !== -1) {
                                                            arrayHelpers.remove(
                                                              idx
                                                            );
                                                          }
                                                        }
                                                      }}
                                                    />

                                                    <label
                                                      htmlFor={item.name}
                                                      className="font-semibold text-base  cursor-pointer"
                                                    >
                                                      {/* {item.name.split(":")[1]} */}
                                                      {item.desc}
                                                    </label>
                                                  </div>
                                                )
                                              )}
                                            </AccordionContent>
                                          </AccordionItem>
                                        </Accordion>
                                      )
                                    )}
                                  </>
                                )}
                              />
                            </ScrollArea>
                          </>
                        )}
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
                        disabled={!isValid || !dirty || isLoading}
                        onClick={() => {
                          handleSubmit(values, resetForm);

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
                        className={`bg-[#1F2937] flex justify-center w-fit gap-2 text-sm font-semibold items-center transition-all duration-300  hover:bg-slate-700 text-white p-2.5 px-4 rounded-md`}
                      >
                        {isLoading ? (
                          <Loaders loader={"wobble"} color="white" size={30} />
                        ) : (
                          <>
                            {" "}
                            <Save size={10} /> {action == "edit" && "Update"}
                            {action == "add" && "Save"}
                          </>
                        )}
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

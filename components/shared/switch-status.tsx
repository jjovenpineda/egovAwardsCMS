"use client";
import React, { useEffect } from "react";
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
import { Button } from "../ui/button";
import { apiPut } from "@/utils/api";
import { Switch } from "../ui/switch";
interface ISwitchStatus {
  open: boolean;
  userData: any;
  setOpen: (value: boolean) => void;
  callBack: (value: boolean) => void;
}
export default function SwitchStatus({
  open,
  setOpen,
  userData,
  callBack,
}: ISwitchStatus) {
  useEffect(() => {
    console.log("userData :", userData);
  }, [userData]);

  const handleUserStatus = async (id: string) => {
    try {
      const res = await apiPut(`/api/auth/toggle/userStatus/${id}`, "");
      const { data } = res;
      callBack(false);
    } catch (e) {
      console.error("Error updating user status:", e);
    }
  };
  return (
    <div>
      {" "}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className=""></DialogTrigger>
        <DialogContent className="sm:max-w-[425px] text-center">
          <DialogHeader>
            <DialogTitle>
              {userData?.isActive ? "Deactivate User" : "Activate User"}
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to{" "}
              {userData?.isActive ? "deactivate" : "activate"}
              <span className=" px-1 font-semibold">
                {userData?.firstname + "" + userData?.lastname}
              </span>
              ?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex justify-center pt-6">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <DialogClose asChild>
              <Button
                type="button"
                variant={"default"}
                onClick={() => handleUserStatus(userData?._id)}
                className={`transition-colors duration-300 ease-in-out ${
                  !userData?.isActive
                    ? "bg-teal-500 hover:bg-teal-600"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                {userData?.isActive ? "Deactivate" : "Activate"}
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

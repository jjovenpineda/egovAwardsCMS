"use client";
import React from "react";
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
  id: string;
  name: string;
  isActive: boolean;
  buttonRef: React.RefObject<HTMLButtonElement>;

  callBack: (value: boolean) => void;
}
export default function SwitchStatus({
  id,
  name,
  isActive,
  buttonRef,
  callBack,
}: ISwitchStatus) {
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
      <Dialog>
        <DialogTrigger ref={buttonRef} asChild className="">
          <div>
            <Switch color="green" className="" checked={isActive} />
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] text-center">
          <DialogHeader>
            <DialogTitle>
              {isActive ? "Deactivate User" : "Activate User"}
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to {isActive ? "deactivate" : "activate"}
              <span className=" px-1 font-semibold">{name}</span>?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex justify-center pt-6">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <DialogClose asChild>
              <Button
                type="button"
                variant={isActive ? "destructive" : "default"}
                onClick={() => handleUserStatus(id)}
              >
                {isActive ? "Deactivate" : "Activate"}
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

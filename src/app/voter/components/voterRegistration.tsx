"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import { useConnectHook } from "@/hooks/connectHook";
import { config } from "@/utils/contants";
import { ethers } from "ethers";
import { toast } from "sonner";

export default function VoterRegistrationForm() {
  const { form, onSubmit } = useUpdateHook();
  return (
    <div className="mt-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 flex space-x-5 items-center"
        >
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="">
                <Label>Invite Role (Options: REGULAR | VIP | EXECUTIVE)</Label>
                <FormControl>
                  <Input placeholder="Enter Role" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Register</Button>
        </form>
      </Form>
    </div>
  );
}

enum Role {
  REGULAR,
  VIP,
  EXECUTIVE,
  CHAIRMAN,
}

enum RoleType {
  REGULAR = "REGULAR",
  VIP = "VIP",
  EXECUTIVE = "EXECUTIVE",
  CHAIRMAN = "CHAIRMAN",
}
const roleTypeSchema = z.nativeEnum(RoleType);

const formSchema = z.object({
  role: roleTypeSchema,
});

export function useUpdateHook() {
  const { getSigner } = useConnectHook();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: RoleType.REGULAR,
    },
  });

  // 2. Define a submit handler.

  async function voterRegistration(role: Role) {
    const signer = await getSigner();
    const { ABI, CONTRACT_ADDRESS } = config;
    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      const tx = await contract.voterRegistration(role);
      console.log("vote candidate", tx);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.shortMessage, error);
        toast(error.shortMessage);
      }
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    try {
      let role: Role;
      if (values.role.toLocaleUpperCase() === "VIP") {
        role = Role.VIP;
      } else if (values.role.toLocaleUpperCase() === "EXECUTIVE") {
        role = Role.EXECUTIVE;
      } else {
        role = Role.REGULAR;
      }
      const tx = await voterRegistration(role);
      console.log(tx);
      toast("You are now eligible to vote");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.shortMessage);
        toast(error.shortMessage);
      }
    }

    form.reset();
  }

  return { form, onSubmit };
}

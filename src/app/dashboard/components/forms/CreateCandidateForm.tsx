"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useConnectHook } from "@/hooks/connectHook";
import { config } from "@/utils/contants";
import { ethers } from "ethers";
import { toast } from "sonner";

export default function CreateCandidateForm() {
  const { form, onSubmit } = useCandidateHook();

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="candidate_name"
            render={({ field }) => (
              <FormItem>
                <Label>Candidate Name</Label>
                <FormControl>
                  <Input placeholder="candidate name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

const formSchema = z.object({
  candidate_name: z.string().min(2, {
    message: "Candidate must be at least 2 characters.",
  }),
});

export function useCandidateHook() {
  const { getSigner } = useConnectHook();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      candidate_name: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    const signer = await getSigner();
    const { ABI, CONTRACT_ADDRESS } = config;
    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      const tx = await contract.createCandidate(values.candidate_name);
      console.log("creating candidate", tx);
      if (tx.data) {
        toast("Candidate successfully created!");
        form.reset();
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.shortMessage, error);
        toast(error.shortMessage);
      }
    }
  }

  return { form, onSubmit };
}

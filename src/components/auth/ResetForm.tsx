"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState, useFormStatus } from "react-dom";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormError } from "../Form-error";
import { LoginSchema } from "@/schemas/index";
import { CardFooter } from "@/components/ui/card";
import { FormSuccess } from "../Form-success";
import { reset } from "@/actions/reset";
import { ReactNode } from "react";
import Social from "./Social";
import Link from "next/link";

export function ResetForm() {
  const [formState, formAction] = useFormState(reset, null);
  const { pending } = useFormStatus();
  return (
    <form action={formAction} className=" space-y-6">
      {/* Email */}
      <div className="grid w-full max-w-sm items-center gap-2">
        <Label htmlFor="uid">Email Address</Label>
        <Input
          id="email"
          disabled={pending}
          placeholder="Enter Email Address"
          name="email"
          required
        />
      </div>

      {/* {formState?.error ? (
        <FormErrorMessage>{formState?.error}</FormErrorMessage>
      ) : null} */}

      {formState?.error && <FormError message={formState?.error} />}
      {formState?.success && <FormSuccess message={formState?.success} />}
      <Button
        type="submit"
        disabled={pending}
        className="w-full bg-black text-white"
      >
        {" "}
        {!pending ? <p>Send Reset Email</p> : <p>Sending ...</p>}
      </Button>
    </form>
  );
}

function FormErrorMessage({ children }: { children: ReactNode }) {
  return <p className="text-sm font-medium text-destructive">{children}</p>;
}

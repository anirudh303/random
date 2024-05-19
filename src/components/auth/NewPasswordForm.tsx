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
import { newPassword } from "@/actions/new-password";
import { useSearchParams } from "next/navigation";

export function NewPasswordForm() {
  const searchParams = useSearchParams();
  const newPasswordtoken = searchParams.get("token") || "";

  const updateWithToken = newPassword.bind(null, newPasswordtoken);
  const [formState, formAction] = useFormState(updateWithToken, null);
  const { pending } = useFormStatus();

  return (
    <form action={formAction} className=" space-y-6">
      {/* Password */}
      <div className="grid w-full max-w-sm items-center gap-2">
        <Label htmlFor="uid">Password</Label>
        <Input
          id="password"
          disabled={pending}
          placeholder="Enter new password"
          name="password"
          required
        />
      </div>

      {formState?.zodError?.password ? (
        <FormErrorMessage>{formState?.zodError?.password}</FormErrorMessage>
      ) : null}

      {/* Repeat Pass */}
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Repeat Password</Label>
        <Input
          id="repeatPassword"
          name="repeatPassword"
          disabled={pending}
          placeholder="Repeat your password"
          required
        />
      </div>
      {formState?.zodError?.repeatPassword ? (
        <FormErrorMessage>
          {formState?.zodError?.repeatPassword}
        </FormErrorMessage>
      ) : null}

      {formState?.error && <FormError message={formState?.error} />}
      {formState?.success && <FormSuccess message={formState?.success} />}
      <Button
        type="submit"
        disabled={pending}
        className="w-full bg-black text-white"
      >
        {" "}
        {!pending ? <p>Reset Password</p> : <p>Updating ...</p>}
      </Button>
    </form>
  );
}

function FormErrorMessage({ children }: { children: ReactNode }) {
  return <p className="text-sm font-medium text-destructive">{children}</p>;
}

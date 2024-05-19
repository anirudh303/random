"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState, useFormStatus } from "react-dom";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { login, State } from "@/actions/login";
import { ReactNode } from "react";
import Social from "./Social";
import Link from "next/link";

export function LoginForm() {
  const [formState, formAction] = useFormState(login, null);
  const { pending } = useFormStatus();
  return (
    <form action={formAction} className=" space-y-3">
      {/* username */}
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="uid">Username</Label>
        <Input
          id="uid"
          disabled={pending}
          placeholder="Enter your Username / Email"
          name="uid"
          required
        />
      </div>

      {formState?.error?.uid ? (
        <FormErrorMessage>{formState?.error.uid}</FormErrorMessage>
      ) : null}

      {/* //password */}
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          disabled={pending}
          name="password"
          placeholder="Enter your password"
          required
        />
      </div>

      {/* forgot password */}
      <Button
        className=" text-sm text-muted-foreground px-0"
        variant="link"
        asChild
      >
        <Link href="/auth/reset">Forgot Password</Link>
      </Button>

      {formState?.error?.password ? (
        <FormErrorMessage>{formState?.error.password}</FormErrorMessage>
      ) : null}

      {!formState?.isSuccess && <FormError message={formState?.message} />}
      {formState?.isSuccess && <FormSuccess message={formState?.message} />}
      <Button
        type="submit"
        disabled={pending}
        className="w-full bg-black text-white"
      >
        {" "}
        {!pending || !formState?.isPending ? (
          <p>Login</p>
        ) : (
          <p>LoggingIn ...</p>
        )}
      </Button>
    </form>
  );
}

function FormErrorMessage({ children }: { children: ReactNode }) {
  return <p className="text-sm font-medium text-destructive">{children}</p>;
}

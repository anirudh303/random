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
import { LoginSchema } from "@/schemas/index";
import { CardFooter } from "@/components/ui/card";
import { FormError } from "../Form-error";
import { FormSuccess } from "../Form-success";
import { login, State } from "@/actions/login";
import { ReactNode } from "react";
import Social from "./Social";

export function LoginForm() {
  const [formState, formAction] = useFormState(login, null);
  const { pending } = useFormStatus();
  return (
    <form action={formAction} className=" space-y-3">
      {/* username */}
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          disabled={pending}
          placeholder="Enter your Username"
          name="username"
        />
      </div>

      {formState?.error?.username ? (
        <FormErrorMessage>{formState?.error.username}</FormErrorMessage>
      ) : null}

      {/* //password */}
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="password">password</Label>
        <Input
          id="password"
          disabled={pending}
          name="password"
          placeholder="Enter your password"
        />
      </div>
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
        {!pending ? <p>Login</p> : <p>LoggingIn ...</p>}
      </Button>
    </form>
  );
}

function FormErrorMessage({ children }: { children: ReactNode }) {
  return <p className="text-sm font-medium text-destructive">{children}</p>;
}

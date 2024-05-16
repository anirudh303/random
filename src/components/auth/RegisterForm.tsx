"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormStatus } from "react-dom";
import { FaGithub, FaGoogle } from "react-icons/fa";
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
import { RegisterSchema } from "@/schemas/index";
import { CardFooter } from "../ui/card";
import { register, State } from "@/actions/register";
import { useFormState } from "react-dom";
import { FormError } from "../Form-error";
import { FormSuccess } from "../Form-success";
import { ReactNode } from "react";

export function RegisterForm() {
  const [formState, formAction] = useFormState(register, null);
  const { pending } = useFormStatus();
  return (
    <form action={formAction} className="space-y-2 ">
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

      {/* name */}
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          disabled={pending}
          name="name"
          placeholder="Enter your Name"
        />
      </div>
      {formState?.error?.name ? (
        <FormErrorMessage>{formState?.error.name}</FormErrorMessage>
      ) : null}

      {/* email */}
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          disabled={pending}
          name="email"
          placeholder="Enter your Email"
        />
      </div>
      {formState?.error?.email ? (
        <FormErrorMessage>{formState?.error.email}</FormErrorMessage>
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

      {/* Repeat Pass */}
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">repeatPassword</Label>
        <Input
          id="repeatPassword"
          name="repeatPassword"
          disabled={pending}
          placeholder="Enter your repeatPassword"
        />
      </div>
      {formState?.error?.repeatPassword ? (
        <FormErrorMessage>{formState?.error.repeatPassword}</FormErrorMessage>
      ) : null}

      {/* age  */}
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">age</Label>
        <Input
          id="age"
          name="age"
          type="number"
          disabled={pending}
          placeholder="Enter your age"
        />
      </div>
      {formState?.error?.age ? (
        <FormErrorMessage>{formState?.error.age}</FormErrorMessage>
      ) : null}

      <CardFooter className="flex flex-col space-y-6 ">
        <div className=" flex flex-shrink-0 justify-between  mt-6 gap-20">
          <Button variant="outline" className="px-10">
            {" "}
            <FaGoogle />
          </Button>
          <Button variant="outline" className="px-10">
            {" "}
            <FaGithub />
          </Button>
        </div>
      </CardFooter>

      {!formState?.isSuccess && <FormError message={formState?.message} />}
      {formState?.isSuccess && <FormSuccess message={formState?.message} />}
      <Button
        type="submit"
        disabled={pending}
        className="w-full bg-black text-white"
      >
        {" "}
        {!pending ? <p>Register</p> : <p>Registering...</p>}
      </Button>
    </form>
  );
}

function FormErrorMessage({ children }: { children: ReactNode }) {
  return <p className="text-sm font-medium text-destructive">{children}</p>;
}

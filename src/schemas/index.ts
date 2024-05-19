import { z } from "zod";

export const emailSchema = z
  .string()
  .email({ message: "Invalid email address" });
const usernameSchema = z
  .string()
  .min(4, { message: "Username must be 4 or more characters" })
  .max(30, { message: "Username must be 30 or fewer characters" });
const uidSchema = z.union([emailSchema, usernameSchema]);
export const LoginSchema = z.object({
  uid: uidSchema,
  password: z.string().min(1, { message: "Password is required" }),
});

export const RegisterSchema = z
  .object({
    username: z
      .string()
      .min(4, { message: "Please enter 4 or more characters" }),
    name: z.string().min(1, { message: "Please enter your name" }),
    email: z.string().email({ message: "please enter valid email" }),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(6, { message: "Password should be greater than 6 characters" }),
    repeatPassword: z
      .string()
      .min(1, { message: "This field is required" })
      .min(6, { message: "Password should be greater than 6 characters" }),
    age: z.coerce
      .number({ message: "please enter a number" })
      .nonnegative({ message: "age should be positive" }),
  })
  .refine(
    (data) => {
      return data.password === data.repeatPassword;
    },
    {
      message: "Passwords dont match",
      path: ["repeatPassword"],
    }
  );

export const ResetSchema = z.object({
  email: emailSchema,
});

export const NewPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(6, { message: "Password should be greater than 6 characters" }),
    repeatPassword: z
      .string()
      .min(1, { message: "This field is required" })
      .min(6, { message: "Password should be greater than 6 characters" }),
  })
  .refine(
    (data) => {
      return data.password === data.repeatPassword;
    },
    {
      message: "Passwords dont match",
      path: ["repeatPassword"],
    }
  );

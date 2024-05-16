"use server";
import { z } from "zod";
import { RegisterSchema } from "@/schemas/index";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

interface StateProps {
  status: string;
  isSuccess: boolean;
  error: z.SafeParseError<z.ZodError<z.infer<typeof RegisterSchema>>>;
  message: string;
}

export type State = StateProps | null;

export const register = async (prevState: unknown, formData: FormData) => {
  const result = RegisterSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (result.success === false) {
    console.log(result.error.formErrors.fieldErrors.repeatPassword);
    return {
      status: "failed",
      isSuccess: false,
      error: result.error.formErrors.fieldErrors,
      message: "Invalid Credentials",
    };
  }

  const { username, name, email, password, repeatPassword, age } = result.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {
      status: "failed",
      isSuccess: false,
      error: null,
      message: "Email already in use",
    };
  }

  await db.user.create({
    data: {
      username,
      name,
      email,
      password: hashedPassword,
      age,
    },
  });

  // todo: send verificatin token mail
  return {
    status: "success",
    isSuccess: true,
    error: null,
    message: "Registered Successfully",
  };
};

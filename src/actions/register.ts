"use server";
import { z } from "zod";
import { RegisterSchema } from "@/schemas/index";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/data/tokens";
import { sendVerificationLinkEmail } from "@/data/resend";

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
  // input alidation by zod at server side
  if (result.success === false) {
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
  // checking if user exists
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

  const VerificationToken = await generateVerificationToken(email);

  //  send verificatin token mail
  await sendVerificationLinkEmail(
    VerificationToken.email,
    VerificationToken.token
  );

  return {
    status: "success",
    isSuccess: true,
    error: null,
    message: "Confirmation Email Sent",
  };
};

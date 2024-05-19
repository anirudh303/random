"use server";
import { z } from "zod";
import { LoginSchema, emailSchema } from "@/schemas/index";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByUserNameOrEmail } from "@/data/user";
import { generateVerificationToken } from "@/data/tokens";
import { sendVerificationLinkEmail } from "@/data/resend";

interface StateProps {
  status: string;
  isSuccess: boolean;
  isPending?: boolean;
  message: string;
}

export type State = StateProps | null;

//  this action is used only for credentials provider
export const login = async (prevState: unknown, formData: FormData) => {
  const result = LoginSchema.safeParse(Object.fromEntries(formData.entries()));

  if (result.success === false) {
    console.log(result.error.formErrors.fieldErrors);
    return {
      status: "failed",
      isSuccess: false,
      error: result.error.formErrors.fieldErrors,
      message: "Invalid Credentials",
    };
  }

  const { uid, password } = result.data;

  // checking if user input is email or username
  const existingUser = await getUserByUserNameOrEmail(uid);
  // some checks for safety  and also  if  email not verified yet generating token
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return {
      status: "failed",
      isSuccess: false,
      error: null,
      message: "Email does not exist",
    };
  }
  if (!existingUser.emailVerified) {
    const VerificationToken = await generateVerificationToken(
      existingUser.email
    );

    await sendVerificationLinkEmail(
      VerificationToken.email,
      VerificationToken.token
    );
    return {
      status: "pending",
      isPending: true,
      isSuccess: true,
      error: null,
      message: "Confirmation Email Sent",
    };
  }

  try {
    // using signIn from next-auth in server side
    console.log(" entered credentiasls provider");
    await signIn("credentials", {
      uid,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            status: "failed",
            isSuccess: false,
            error: null,
            message: "Invalid Credentials",
          };
        default:
          return {
            status: "failed",
            isSuccess: false,
            error: null,
            message: "Something went wrong!",
          };
      }
    }

    throw error;
  }
};

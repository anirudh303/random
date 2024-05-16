"use server";
import { z } from "zod";
import { LoginSchema } from "@/schemas/index";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

interface StateProps {
  status: string;
  isSuccess: boolean;
  message: string;
}

export type State = StateProps | null;

export const login = async (prevState: unknown, formData: FormData) => {
  const result = LoginSchema.safeParse(Object.fromEntries(formData.entries()));

  if (result.success === false) {
    return {
      status: "failed",
      isSuccess: false,
      error: result.error.formErrors.fieldErrors,
      message: "Invalid Credentials",
    };
  }

  const { username, password } = result.data;

  try {
    await signIn("credentials", {
      username,
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
  return {
    status: "success",
    isSuccess: true,
    error: null,
    message: "Login Success",
  };
};

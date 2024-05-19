"use server";
import { z } from "zod";
import { NewPasswordSchema } from "@/schemas/index";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/user";
import { getResetTokenByToken } from "@/data/reset-token";
import { db } from "@/lib/db";

enum ErrorType {
  INVALID_TOKEN,
  INVALID_CREDENTIALS,
  HASH_FAILED,
}
export const newPassword = async (
  newPasswordtoken: string,
  prevState: unknown,
  formData: FormData
) => {
  // checking if token is valid or not
  console.log(" entered action");
  if (!newPasswordtoken) {
    return {
      type: ErrorType.INVALID_CREDENTIALS,
      error: "Something went wrong",
    };
  }

  console.log(" valdiatuing fields");
  // validating fields
  const ValidatedFields = NewPasswordSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!ValidatedFields.success)
    return {
      type: ErrorType.INVALID_TOKEN,
      zodError: ValidatedFields.error.formErrors.fieldErrors,
    };

  console.log(" validate cred");

  const { password } = ValidatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  if (!hashedPassword)
    return { type: ErrorType.HASH_FAILED, error: "Something went wrong" };

  // deleting token if expired
  const existingToken = await getResetTokenByToken(newPasswordtoken);

  if (!existingToken) return { error: "token doesnt exist" };

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) return { error: "token has expired" };

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) return { error: "Email doesn't exist " };

  try {
    await db.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    await db.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
    return {
      success: "Password Successfully Updated",
    };
  } catch (error) {
    return { error: `db fail ${error}` };
  }
};

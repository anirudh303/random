"use server";
import { z } from "zod";
import { ResetSchema, emailSchema } from "@/schemas/index";
import { getUserByEmail } from "@/data/user";
import { generateResetToken } from "@/data/tokens";
import { sendPasswordResetEmail } from "@/data/resend";

export const reset = async (prevState: unknown, formData: FormData) => {
  const ValidatedFields = ResetSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!ValidatedFields.success) return { error: "Invalid Email Address" };
  const { email } = ValidatedFields.data;

  const existingEmail = await getUserByEmail(email);

  if (!existingEmail) return { error: "Email doesn't exist" };

  const resetToken = await generateResetToken(email);
  if (!resetToken)
    return { error: "Something went wrong, not able to send Email" };
  try {
    await sendPasswordResetEmail(resetToken?.email, resetToken?.token);
    return { success: "Reset email sent successfully" };
  } catch {
    return { error: "Unable to send Reset-Email" };
  }
};

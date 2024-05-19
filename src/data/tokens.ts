import { db } from "@/lib/db";
import { v4 as uuid } from "uuid";
import { getVerificationTokenByEmail } from "./verification-token";
import { getResetTokenByEmail } from "./reset-token";

export const generateResetToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const existingToken = await getResetTokenByEmail(email);

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }

  try {
    const resetToken = await db.passwordResetToken.create({
      data: {
        email,
        token,
        expires,
      },
    });

    return resetToken;
  } catch {
    return null;
  }
};
export const generateVerificationToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationtoken.delete({
      where: { id: existingToken.id },
    });
  }

  const VerififcationToken = await db.verificationtoken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return VerififcationToken;
};

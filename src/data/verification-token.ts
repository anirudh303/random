import { db } from "@/lib/db";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificatinToken = await db.verificationtoken.findFirst({
      where: {
        email,
      },
    });
    return verificatinToken;
  } catch (error) {
    return null;
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificatinToken = await db.verificationtoken.findUnique({
      where: {
        token,
      },
    });
    return verificatinToken;
  } catch (error) {
    return null;
  }
};

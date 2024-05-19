import { db } from "@/lib/db";
import { LoginSchema, emailSchema } from "@/schemas";
export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  } catch {
    return null;
  }
};
const getUserByUserName = async (username: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        username,
      },
    });

    return user;
  } catch {
    return null;
  }
};

export const getUserByUserNameOrEmail = async (uid: string) => {
  try {
    const user = emailSchema.safeParse(uid).success
      ? await getUserByEmail(uid)
      : await getUserByUserName(uid);
    return user;
  } catch (error) {
    return null;
  }
};

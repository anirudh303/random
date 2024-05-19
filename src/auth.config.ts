import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { LoginSchema, emailSchema } from "@/schemas";
import { db } from "./lib/db";
import { getUserByUserNameOrEmail } from "./data/user";
import google from "next-auth/providers/google";

export default {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        console.log(" enetered authorize function");
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { uid, password } = validatedFields.data;
          const user = await getUserByUserNameOrEmail(uid);

          if (!user || !user.password) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          console.log("check of last", passwordsMatch);
          if (passwordsMatch) return user;
        }
        console.log(" failed at authorize ");
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;

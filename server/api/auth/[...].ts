import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";

import { NuxtAuthHandler } from "#auth";
import Credentials from "next-auth/providers/credentials";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type TCredentials = {
  email: string;
  password: string;
};

export default NuxtAuthHandler({
  secret: useRuntimeConfig().authSecret,
  providers: [
    GoogleProvider.default({
      clientId: useRuntimeConfig().auth.google.clientId,
      clientSecret: useRuntimeConfig().auth.google.clientSecret,
    }),
    Credentials.default({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: TCredentials, req: any) {
        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials?.email },
          });

          if (user && !user.emailVerified) {
            throw createError({
              statusCode: 500,
              statusMessage: "Email not verified",
            });
          }

          if (
            user &&
            user.password &&
            (await bcrypt.compare(credentials.password, user.password))
          ) {
            return { id: user.id, email: user.email };
          }

          throw createError({
            statusCode: 500,
            statusMessage: "Invalid credentials",
          });
        } catch (error) {
          console.error("Validation error:", error);
          throw createError({
            statusCode: 500,
            statusMessage: error?.statusMessage,
          });
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email || "" },
      });

      if (!existingUser) {
        await prisma.user.create({
          data: {
            email: user.email || "",
            provider: account?.provider,
            providerAccountId: account?.providerAccountId,
            emailVerificationCode: "",
          },
        });
      }
      return { id: user.id, email: user.email };
    },
    async session({ session, user }) {
      const dbUser = await prisma.user.findUnique({
        where: { email: session.user?.email || "" },
      });

      if (dbUser && session.user) {
        session.user.provider = dbUser.provider || "";
        session.user.id = dbUser?.id || "";
      }

      return { ...session };
    },
  },
  pages: {
    signIn: "/auth/login",
  },
});

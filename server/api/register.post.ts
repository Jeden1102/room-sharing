import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const existingUser = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (existingUser) {
    if (existingUser.password !== null) {
      throw createError({ statusMessage: "Email already in use" });
    } else {
      // User previously registered without a password - provider.
      const hashedPassword = await bcrypt.hash(body.password, 10);

      try {
        const updatedUser = await prisma.user.update({
          where: { email: body.email },
          data: {
            password: hashedPassword,
            emailVerified: true,
            emailVerificationCode: new Date().toISOString(),
          },
        });

        return {
          success: true,
          message: "Account created successfully",
        };
      } catch (error) {
        throw createError({
          statusCode: 500,
          statusMessage: "Failed to create account",
        });
      }
    }
  }

  const hashedPassword = await bcrypt.hash(body.password, 10);

  try {
    const newUser = await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPassword,
        emailVerified: true,
        emailVerificationCode: new Date().toISOString(),
      },
    });
    return {
      success: true,
      statusMessage:
        "Account created successfully. Please check your email for verification.",
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to create account",
    });
  }
});

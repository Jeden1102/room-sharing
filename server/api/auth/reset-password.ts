import prisma from "~~/lib/prisma";
import bcrypt from "bcrypt";
import { passwordResetSchema } from "~/schemas/auth";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.code) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing code",
    });
  }

  const validation = passwordResetSchema.safeParse(body);

  if (!validation.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Validation failed",
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { passwordResetCode: body.code },
    });

    if (!user) {
      throw createError({
        statusCode: 500,
        statusMessage: "Failed to set new password",
      });
    }
    const hashedPassword = await bcrypt.hash(body.password, 10);
    await prisma.user.update({
      where: { passwordResetCode: body.code },
      data: {
        password: hashedPassword,
        passwordResetCode: null,
      },
    });

    return {
      success: true,
      message: "New password set successfully",
    };
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to set new password",
    });
  }
});

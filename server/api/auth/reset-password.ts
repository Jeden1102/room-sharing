import prisma from "~~/lib/prisma";
import bcrypt from "bcrypt";
import { passwordResetSchema } from "~/schemas/auth";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.code) {
    throw createError({
      statusCode: 400,
      statusMessage: "api.resetPassword.missingCode",
    });
  }

  const validation = passwordResetSchema.safeParse(body);

  if (!validation.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "api.resetPassword.validationFailed",
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { passwordResetCode: body.code },
    });

    if (!user) {
      throw createError({
        statusCode: 400,
        statusMessage: "api.resetPassword.invalidCode",
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
      message: "api.resetPassword.success",
    };
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      statusMessage: "api.resetPassword.failed",
    });
  }
});
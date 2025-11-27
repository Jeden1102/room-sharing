import prisma from "~~/lib/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.code) {
    throw createError({
      statusCode: 400,
      statusMessage: "api.confirmEmail.missingCode",
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { emailVerificationCode: body.code, emailVerified: true },
    });

    if (user) {
      return {
        success: true,
        message: "api.confirmEmail.alreadyConfirmed",
      };
    }

    await prisma.user.update({
      where: { emailVerificationCode: body.code },
      data: {
        emailVerified: true,
      },
    });

    return {
      success: true,
      message: "api.confirmEmail.success",
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "api.confirmEmail.failed",
    });
  }
});
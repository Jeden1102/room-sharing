import prisma from "~~/lib/prisma";
import { requireAuth } from "../middleware/auth";
import bcrypt from "bcrypt";

export default requireAuth(defineEventHandler(async (event) => {
  const body = await readBody(event);
  const userId = event.context.user.id;
  const { passwordConfirmation } = body;

  if (!passwordConfirmation) {
    throw createError({
      statusCode: 400,
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { password: true },
    });

    if(!user || !user.password) {
      throw createError({
        statusCode: 401,
      });
    }

    const isPasswordValid = await bcrypt.compare(passwordConfirmation, user.password);

    if (!isPasswordValid) {
      throw createError({
        statusCode: 401,
      });
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    return { success: true};
  } catch (error: any) {
    console.error(error);
    if (error.statusCode) throw error;
    throw createError({
      statusCode: 500,
    });
  }
}));
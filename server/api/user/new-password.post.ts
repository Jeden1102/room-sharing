import prisma from "~~/lib/prisma";
import { requireAuth } from "../middleware/auth";
import bcrypt from "bcrypt";

export default requireAuth(
  defineEventHandler(async (event) => {
    const body = await readBody(event);
    const userId = event.context.user.id;
    const { oldPassword, password } = body;

    if (!oldPassword || !password) {
      throw createError({
        statusCode: 400,
      });
    }

    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { password: true },
      });

      if (!user) {
        throw createError({
          statusCode: 404,
        });
      }

      if (!user.password) {
        throw createError({
          statusCode: 401,
        });
      }

      const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

      if (!isPasswordValid) {
        throw createError({
          statusCode: 401,
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await prisma.user.update({
        where: { id: userId },
        data: {
          password: hashedPassword,
        },
      });

      return { success: true};
    } catch (error: any) {
      if (error.statusCode) throw error;
      throw createError({
        statusCode: 500,
      });
    }
  }),
);

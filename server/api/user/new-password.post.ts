import prisma from "~~/lib/prisma";
import { requireAuth } from "../middleware/auth";
import bcrypt from "bcrypt";
import { newPasswordSchema } from "~/schemas/auth";

export default requireAuth(
  defineEventHandler(async (event) => {
    const body = await readBody(event);

    const validation = newPasswordSchema.safeParse(body);
  
    if (!validation.success) {
      throw createError({
        statusCode: 400,
        statusMessage: "api.register.validationFailed",
      });
    }

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

      // If user doesn't have a password yet, no need to check password.
      const isPasswordValid = !user.password ? true : await bcrypt.compare(oldPassword, user.password);

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

      const cacheStorage = useStorage("cache:users:user");
      await cacheStorage.removeItem(
        `${userId}.json`.replaceAll("-", ""),
      );

      return { success: true};
    } catch (error: any) {
      if (error.statusCode) throw error;
      throw createError({
        statusCode: 500,
      });
    }
  }),
);

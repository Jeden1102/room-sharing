import prisma from "~~/lib/prisma";
import { requireAuth } from "../middleware/auth";
import bcrypt from "bcrypt";
import { del } from "@vercel/blob";

export default requireAuth(
  defineEventHandler(async (event) => {
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
        select: {
          password: true,
          profileImage: true,
          bgImage: true,
          moodboardImages: true,
        },
      });

      if (!user || !user.password) {
        throw createError({
          statusCode: 401,
        });
      }

      const isPasswordValid = await bcrypt.compare(
        passwordConfirmation,
        user.password,
      );

      if (!isPasswordValid) {
        throw createError({
          statusCode: 401,
        });
      }

      user.profileImage && del(user.profileImage);
      user.bgImage && del(user.bgImage);
      user.moodboardImages.forEach((uri) => {
        if (uri) {
          del(uri);
        }
      });

      await prisma.user.delete({
        where: { id: userId },
      });

      return { success: true };
    } catch (error: any) {
      console.error(error);
      if (error.statusCode) throw error;
      throw createError({
        statusCode: 500,
      });
    }
  }),
);

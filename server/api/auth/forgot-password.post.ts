import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { render } from "@vue-email/render";
import SimpleAction from "~/components/email/SimpleAction.vue";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const user = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (!user) {
    return {
      success: true,
      message: "Mail sent successfully",
    };
  }

  try {
    const code = await sendVerificationEmail(body.email);
    await prisma.user.update({
      where: { email: body.email },
      data: {
        passwordResetCode: code,
      },
    });

    return {
      success: true,
      message: "Mail sent successfully",
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to send reset password mail",
    });
  }
});

const sendVerificationEmail = async (email: string) => {
  try {
    const { sendMail } = useNodeMailer();
    const config = useRuntimeConfig();

    const emailVerificationCode = await bcrypt.hash(Date.now().toString(), 10);

    const resetUrl = `${config.public.APP_BASE_URI}/auth/reset-password?code=${emailVerificationCode}`;

    const html = await render(
      SimpleAction,
      {
        actionUrl: resetUrl,
        actionText: "Reset password",
        title: "To reset your password, click the button below.",
      },
      {
        pretty: true,
      },
    );

    await sendMail({
      subject: "Password reset",
      to: email,
      html,
    });

    return emailVerificationCode;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "apiResponses.failedToSendVerificationEmail",
    });
  }
};

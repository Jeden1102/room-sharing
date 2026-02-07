import bcrypt from "bcrypt";
import { render } from "@vue-email/render";
import SimpleAction from "~/components/email/SimpleAction.vue";
import prisma from "~~/lib/prisma";
import { forgotPasswordSchema } from "~/schemas/auth";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const validation = forgotPasswordSchema.safeParse(body);

  if (!validation.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "api.forgotPassword.validationFailed",
    });
  }

  const user = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (!user) {
    return {
      success: true,
      message: "api.forgotPassword.mailSent",
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
      message: "api.forgotPassword.mailSent",
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "api.forgotPassword.failed",
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

    const res = await sendMail({
      subject: "Password reset",
      to: email,
      html,
    });

    console.log(res, "here");

    return emailVerificationCode;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "api.forgotPassword.failedToSendEmail",
    });
  }
};

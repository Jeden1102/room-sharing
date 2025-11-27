import bcrypt from "bcrypt";
import prisma from "~~/lib/prisma";
import { render } from "@vue-email/render";
import SimpleAction from "~/components/email/SimpleAction.vue";
import { registerSchema } from "~/schemas/auth";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const validation = registerSchema.safeParse(body);

  if (!validation.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "api.register.validationFailed",
    });
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (existingUser) {
    if (existingUser.password !== null) {
      throw createError({ 
        statusCode: 400,
        statusMessage: "api.register.emailInUse" 
      });
    } else {
      // User previously registered without a password - provider.
      const hashedPassword = await bcrypt.hash(body.password, 10);

      try {
        const code = await sendVerificationEmail(body.email);

        await prisma.user.update({
          where: { email: body.email },
          data: {
            password: hashedPassword,
            emailVerified: false,
            emailVerificationCode: code,
          },
        });

        return {
          success: true,
          message: "api.register.successWithVerification",
        };
      } catch (error) {
        throw createError({
          statusCode: 500,
          statusMessage: "api.register.failed",
        });
      }
    }
  }

  const hashedPassword = await bcrypt.hash(body.password, 10);

  try {
    const code = await sendVerificationEmail(body.email);

    const newUser = await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPassword,
        emailVerified: false,
        emailVerificationCode: code,
      },
    });
    return {
      success: true,
      statusMessage: "api.register.successWithVerification",
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "api.register.failed",
    });
  }
});

const sendVerificationEmail = async (email: string) => {
  try {
    const { sendMail } = useNodeMailer();
    const config = useRuntimeConfig();

    const emailVerificationCode = await bcrypt.hash(Date.now().toString(), 10);

    const confirmationUrl = `${config.public.APP_BASE_URI}/auth/confirm-email?code=${emailVerificationCode}`;

    const html = await render(
      SimpleAction,
      {
        actionUrl: confirmationUrl,
        actionText: "Confirm email",
        title: "To confirm your email, click the button below.",
      },
      {
        pretty: true,
      },
    );

    await sendMail({
      subject: "Account confirmation",
      to: email,
      html,
    });

    return emailVerificationCode;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "api.register.failedToSendEmail",
    });
  }
};
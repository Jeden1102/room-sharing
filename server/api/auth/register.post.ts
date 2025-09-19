import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { render } from "@vue-email/render";
import SimpleAction from "~/components/email/SimpleAction.vue";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const existingUser = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (existingUser) {
    if (existingUser.password !== null) {
      throw createError({ statusMessage: "Email already in use" });
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
          message: "Account created successfully",
        };
      } catch (error) {
        throw createError({
          statusCode: 500,
          statusMessage: "Failed to create account",
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
      statusMessage:
        "Account created successfully. Please check your email for verification.",
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to create account",
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
      statusMessage: "apiResponses.failedToSendVerificationEmail",
    });
  }
};

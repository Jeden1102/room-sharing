import { render } from "@vue-email/render";
import Contact from "~/components/email/Contact.vue";
import ContactConfirmation from "~/components/email/ContactConfirmation.vue";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    await sendContactMail(body);

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

const sendContactMail = async (body: {
  email: string;
  name: string;
  description: string;
  reason: string;
}) => {
  try {
    console.log("body", body);
    const { sendMail } = useNodeMailer();

    const contactHtml = await render(
      Contact,
      {
        from: body.name,
        fromEmail: body.email,
        reason: body.reason,
        text: body.description,
      },
      {
        pretty: true,
      },
    );

    const confirmationHtml = await render(
      ContactConfirmation,
      {
        from: body.name,
      },
      {
        pretty: true,
      },
    );

    await sendMail({
      subject: "New contact message",
      to: useRuntimeConfig().adminEmail,
      html: contactHtml,
    });

    await sendMail({
      subject: "Contact confirmation",
      to: body.email,
      html: confirmationHtml,
    });
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "apiResponses.failedTosendContactMail",
    });
  }
};

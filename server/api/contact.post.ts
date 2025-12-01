import { render } from "@vue-email/render";
import Contact from "~/components/email/Contact.vue";
import ContactConfirmation from "~/components/email/ContactConfirmation.vue";
import { contactSchema } from "~/schemas/contact";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const validation = contactSchema.safeParse(body);

  if (!validation.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "api.contact.validationFailed",
    });
  }

  try {
    await sendContactMail(body, event);

    return {
      success: true,
      message: "api.contact.success",
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "api.contact.failed",
    });
  }
});

const sendContactMail = async (body: {
  email: string;
  name: string;
  description: string;
  reason: string;
}, event: any) => {
  try {
    const { sendMail } = useNodeMailer();
    const lang = getCookie(event, "i18n_redirected");
    const t = {
      pl: {
        prefix: "Nowa wiadomość od",
        greeting: "Dzień dobry",
        confirmation: "Dziękujemy za konktakt, w razie pytania skontaktujemy się z Tobą",
      },
      en: {
        prefix: "New message from",
        greeting: "Hello",
        confirmation: "Thank you for your contact, we will contact you as soon as possible",
      }
    }

    const contactHtml = await render(
      Contact,
      {
        prefix: t[lang as keyof typeof t].prefix,
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
        greeting: t[lang as keyof typeof t].greeting,
        confirmation: t[lang as keyof typeof t].confirmation,
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
      statusMessage: "api.contact.failedToSendEmail",
    });
  }
};
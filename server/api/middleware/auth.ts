import { getServerSession } from "#auth";

export function requireAuth(handler: any) {
  return defineEventHandler(async (event) => {
    const session = await getServerSession(event);

    if (!session || !session.user) {
      throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
    }

    event.context.user = session.user;

    return handler(event);
  });
}

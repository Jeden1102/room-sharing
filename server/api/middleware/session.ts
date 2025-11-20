import { getServerSession } from "#auth";

export function session(handler: any) {
  return defineEventHandler(async (event) => {
    const session = await getServerSession(event);

    event.context.user = session?.user;

    return handler(event);
  });
}

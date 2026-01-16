import prisma from "~~/lib/prisma";
import { requireAuth } from "../../../middleware/auth";

export default requireAuth(async (event) => {
  const currentUserId = event.context.user.id;
  const conversationId = event.context.params?.id as string;
  const { cursor: cursorId } = getQuery(event) as { cursor?: string };

  if (!conversationId) {
    throw createError({ statusCode: 400, message: "Missing conversationId." });
  }

  const TAKE_COUNT = 11;

  const messagesConfig: Record<string, object | number> = {
    orderBy: { createdAt: "desc" },
    take: TAKE_COUNT,
  };

  if (cursorId) {
    messagesConfig.skip = 1;
    messagesConfig.cursor = { id: cursorId };
  }

  const conversation = await prisma.conversation.findUnique({
    where: { id: conversationId },
    include: {
      messages: messagesConfig,
      participants: {
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              profileImage: true,
              companyName: true,
            },
          },
        },
      },
    },
  });

  if (!conversation) {
    throw createError({ statusCode: 404, message: "Conversation not found." });
  }

  const isParticipant = conversation.participants.some(
    (p) => p.userId === currentUserId,
  );
  if (!isParticipant) {
    throw createError({ statusCode: 403, message: "Access denied." });
  }

  await prisma.conversationParticipant.updateMany({
    where: {
      conversationId: conversation.id,
      userId: currentUserId,
    },
    data: {
      unreadCount: 0,
    },
  });

  const allMessages = conversation.messages;
  const hasMore = allMessages.length === TAKE_COUNT;

  const messagesToReturn = hasMore
    ? allMessages.slice(0, TAKE_COUNT - 1)
    : allMessages;
  messagesToReturn.reverse();

  const responseConversation = {
    ...conversation,
    messages: messagesToReturn,
  };

  return {
    success: true,
    conversationId: conversation.id,
    conversation: responseConversation,
    hasMore,
  };
});

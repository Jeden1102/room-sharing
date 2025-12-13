import prisma from "~~/lib/prisma";
import { requireAuth } from "../../middleware/auth";

function getSortedUserIds(userId1: string, userId2: string): { userAId: string, userBId: string } {
  return userId1 < userId2
    ? { userAId: userId1, userBId: userId2 }
    : { userAId: userId2, userBId: userId1 };
}

export default requireAuth(
  defineEventHandler(async (event) => {
    const currentUserId = event.context.user.id;
    const targetId = event.context.params?.targetId as string;

    if (!targetId) {
      throw createError({
        statusCode: 400,
        message: "Missing targetId in request parameters.",
      });
    }

    if (currentUserId === targetId) {
      throw createError({
        statusCode: 400,
        message: "Cannot start a conversation with yourself.",
      });
    }

    const { userAId, userBId } = getSortedUserIds(currentUserId, targetId);

    let conversation = await prisma.conversation.findUnique({
      where: {
        UniqueConversationPair: {
          userAId: userAId,
          userBId: userBId,
        },
      },
    });

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          userAId: userAId,
          userBId: userBId,
          participants: {
            create: [
              { userId: currentUserId },
              { userId: targetId },
            ],
          },
        },
        include: {
          messages: true,
          participants: {
             include: { user: { select: { id: true, firstName: true, profileImage: true } } }
          }
        }
      });
    }

    return {
      success: true,
      conversationId: conversation.id,
      conversation,
    };
  }),
);
import prisma from "~~/lib/prisma";
import { requireAuth } from "../../../middleware/auth";

export default requireAuth(
  async (event) => {
    const currentUserId = event.context.user.id;
    const conversationId = event.context.params?.id as string;

    if (!conversationId) {
      throw createError({ statusCode: 400, message: "Missing conversationId." });
    }
    
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: {
        messages: true,
        participants: true,
      },
    });

    if (!conversation) {
      throw createError({ statusCode: 404, message: "Conversation not found." });
    }
    
    const isParticipant = conversation.participants.some(p => p.userId === currentUserId);
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

    return {
      success: true,
      conversationId: conversation.id,
      conversation,
    };
  },
);
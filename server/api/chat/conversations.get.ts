import prisma from "~~/lib/prisma";
import { requireAuth } from "../middleware/auth";

export default requireAuth(
  defineEventHandler(async (event) => {
    const userId = event.context.user.id;

    const userParticipants = await prisma.conversationParticipant.findMany({
      where: {
        userId: userId,
      },
      select: {
        conversationId: true,
        unreadCount: true,
        
        conversation: {
          select: {
            id: true,
            updatedAt: true,
            
            participants: {
              where: {
                userId: { not: userId },
              },
              select: {
                user: {
                  select: {
                    id: true,
                    firstName: true,
                    profileImage: true,
                  },
                },
              },
            },
            
            messages: {
              orderBy: { createdAt: 'desc' },
              take: 1,
              select: {
                content: true,
                createdAt: true,
              },
            },
          },
        },
      },
      orderBy: { 
        conversation: { 
          updatedAt: 'desc'
        }
      },
    });

    const conversations = userParticipants.map(p => {
        const otherParticipant = p.conversation.participants[0]?.user;
        const lastMessage = p.conversation.messages[0];

        return {
            conversationId: p.conversation.id,
            unreadCount: p.unreadCount,
            updatedAt: p.conversation.updatedAt,
            
            otherUser: {
                id: otherParticipant?.id,
                firstName: otherParticipant?.firstName,
                profileImage: otherParticipant?.profileImage,
            },
            lastMessage: lastMessage ? {
                content: lastMessage.content,
                createdAt: lastMessage.createdAt,
            } : null,
        };
    });


    return {
      success: true,
      conversations: conversations,
    };
  }),
);
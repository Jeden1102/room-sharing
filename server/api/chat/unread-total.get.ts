import prisma from '~~/lib/prisma'
import { requireAuth } from "../middleware/auth";

export default requireAuth(defineEventHandler(async (event) => {
  const userId = event.context.user.id;

  if (!userId) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const result = await prisma.conversationParticipant.aggregate({
    where: {
      userId: userId
    },
    _sum: {
      unreadCount: true
    }
  })

  return {
    count: result._sum.unreadCount || 0
  }
}))
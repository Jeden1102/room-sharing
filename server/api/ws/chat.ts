import prisma from '~~/lib/prisma'

const activeUsersInConversations = new Map<string, Set<string>>()

export default defineWebSocketHandler({
  async open(peer) {
    const url = new URL(peer.request.url!, 'http://localhost')
    const conversationId = url.searchParams.get('conversationId')
    const userId = url.searchParams.get('userId')

    if (!conversationId || !userId) {
      peer.close()
      return
    }

    peer.data = { conversationId, userId }
    peer.subscribe(conversationId)

    if (!activeUsersInConversations.has(conversationId)) {
      activeUsersInConversations.set(conversationId, new Set())
    }
    activeUsersInConversations.get(conversationId)!.add(userId)

    await prisma.conversationParticipant.updateMany({
      where: { conversationId, userId },
      data: { unreadCount: 0 }
    })
  },

  async message(peer, message) {
    const { conversationId, userId } = peer.data
    const text = message.text()
    
    if (conversationId) {
      const newMessage = await prisma.message.create({
        data: {
          content: text,
          senderId: userId,
          conversationId: conversationId,
        },
        include: {
          sender: { select: { id: true, firstName: true, profileImage: true } }
        }
      })

      peer.publish(conversationId, JSON.stringify(newMessage))

      const onlineInChat = activeUsersInConversations.get(conversationId) || new Set()

      await prisma.conversationParticipant.updateMany({
        where: {
          conversationId,
          userId: { 
            notIn: [userId, ...Array.from(onlineInChat)] 
          },
        },
        data: { unreadCount: { increment: 1 } },
      })
    }
  },

  close(peer) {
    const { conversationId, userId } = peer.data
    if (conversationId && userId) {
      const users = activeUsersInConversations.get(conversationId)
      if (users) {
        users.delete(userId)
        if (users.size === 0) {
          activeUsersInConversations.delete(conversationId)
        }
      }
    }
  },

  error(peer, error) {
    console.error('WS ERROR:', error)
  }
})
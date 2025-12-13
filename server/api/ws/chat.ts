import prisma from '~~/lib/prisma'
import { getWsSession } from '~~/server/utils/ws-auth'

const activeUsersInConversations = new Map<string, Set<string>>()

export default defineWebSocketHandler({
  async open(peer) {
    const url = new URL(peer.request.url!)
    const conversationId = url.searchParams.get('conversationId')

    if (!conversationId) {
      peer.close(1008, 'Missing conversationId')
      return
    }

    const session = await getWsSession(peer)
    const userId = session?.user?.id

    if (!userId) {
      peer.close(1008, 'Unauthorized')
      return
    }

    const isParticipant = await prisma.conversationParticipant.findFirst({
      where: { conversationId, userId }
    })

    if (!isParticipant) {
      peer.close(1008, 'Forbidden')
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
    const rawMessage = message.text()

    let parsed;
    try {
      parsed = JSON.parse(rawMessage)
    } catch (e) {
      parsed = { type: 'text', content: rawMessage }
    }

    if (parsed.type === 'typing') {
      peer.publish(conversationId, JSON.stringify({
        type: 'typing',
        userId: userId,
        isTyping: parsed.isTyping
      }))
      return
    }

    if (parsed.type === 'text' && conversationId) {
      const newMessage = await prisma.message.create({
        data: {
          content: parsed.content,
          senderId: userId,
          conversationId: conversationId,
        },
        include: {
          sender: { select: { id: true, firstName: true, profileImage: true } }
        }
      })

      peer.publish(conversationId, JSON.stringify({
        type: 'message',
        ...newMessage
      }))

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
      
      peer.publish(conversationId, JSON.stringify({
        type: 'typing',
        userId: userId,
        isTyping: false
      }))
    }
  },

  error(peer, error) {
    console.error('WS ERROR:', error)
  }
})
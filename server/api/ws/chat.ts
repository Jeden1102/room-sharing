import type { Peer, Message } from 'crossws'
import prisma from '~~/lib/prisma'

export default defineWebSocketHandler({
  async open(peer) {
    const url = new URL(peer.request.url!)
    const conversationId = url.searchParams.get('conversationId')
    const userId = url.searchParams.get('userId')

    if (!conversationId || !userId) {
      peer.send('Missing conversationId')
      peer.close()
      return
    }

    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: {
        participants: true,
      },
    })

    peer.data = { conversationId, userId }

    peer.subscribe(conversationId)
    peer.publish(conversationId, 'Another user joined the chat')
  },

  close(peer) {
    console.log('WS closed', peer.data)
  },

  error(peer, error) {
    console.log('WS error', error)
  },

  async message(peer, message) {
    const {conversationId, userId } = peer.data

    if (conversationId) {

      const newMessage = await prisma.message.create({
        data: {
          content: message.text(),
          senderId: userId,
          conversationId: conversationId,
        },
        include: {
          sender: { select: { id: true, firstName: true, profileImage: true } }
        }
      })

      peer.publish(conversationId, JSON.stringify(newMessage))

      await prisma.conversationParticipant.updateMany({
        where: {
          conversationId: conversationId,
          userId: { not: userId },
        },
        data: {
          unreadCount: { increment: 1 },
        },
      })
    }
  },
})

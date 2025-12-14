import { getWsSession } from '~~/server/utils/ws-auth'

export default defineWebSocketHandler({
  async open(peer) {
    const session = await getWsSession(peer)
    const userId = session?.user?.id

    if (!userId) {
      peer.close(1008, 'Unauthorized')
      return
    }

    peer.data = { userId }
    peer.subscribe(`user_${userId}`)
  },
})
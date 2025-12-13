import { Peer } from 'crossws'

export const getWsSession = async (peer: Peer) => {
  const cookie = peer.request.headers.get('cookie')
  if (!cookie) return null

  try {
    const session = await $fetch('/api/auth/session', {
      headers: { cookie }
    })
    return session?.user ? session : null
  } catch (e) {
    console.error('WS Auth Utils Error:', e)
    return null
  }
}
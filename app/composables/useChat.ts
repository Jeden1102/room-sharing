type HistoryItem = {
  senderId?: string
  content: string
  createdAt: string
  id?: string
}

type OtherUser = {
  id: string
  firstName: string
  profileImage: string
}

export const useChat = (conversationId: string) => {
    const { data: userData } = useAuth()
    const userId = userData.value?.user?.id

    const history = ref<HistoryItem[]>([])
    const otherUser = ref<OtherUser|null>(null)
    const isOtherUserTyping = ref(false)
    const cursorId = ref<string | null>(null)
    const hasMore = ref(true)
    const loadingMore = ref(false)
  
    const wsProtocol = window.location.protocol === "https:" ? "wss:" : "ws:"
    const wsHost = window.location.host
    const wsUrl = `${wsProtocol}//${wsHost}/api/ws/chat?conversationId=${conversationId}`
    
    const { send, data } = useWebSocket(wsUrl, {
      autoReconnect: true
    })
  
    watch(data, (newValue) => {
      try {
        const payload = JSON.parse(newValue)

        console.log(payload)
        
        if (payload.type === 'typing') {
          if (payload.userId !== userId) {
            isOtherUserTyping.value = payload.isTyping
          }
        } else if (payload.type === 'message') {
          if (payload.senderId !== userId) {
            history.value.push(payload)
          }
        }
      } catch (e) {
        console.error("WS Parse Error:", e)
      }
    })
  
    const sendMessage = (text: string) => {
      if (!text.trim()) return
      
      history.value.push({
        senderId: userId,
        content: text,
        createdAt: new Date().toISOString(),
      })
  
      send(JSON.stringify({ type: 'text', content: text }))
    }
  
    const sendTypingStatus = (isTyping: boolean) => {
      send(JSON.stringify({ type: 'typing', isTyping }))
    }
  
    return {
      userId,
      history,
      otherUser,
      isOtherUserTyping,
      loadingMore,
      hasMore,
      cursorId,
      sendMessage,
      sendTypingStatus
    }
  }
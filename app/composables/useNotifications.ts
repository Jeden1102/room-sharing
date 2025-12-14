export const useNotifications = () => {
    const unreadCount = useState<number>('unread-count', () => 0)
    const { data: session } = useAuth()
    
    const fetchInitialCount = async () => {
      if (!session.value) return
      const data = await $fetch<{ count: number }>('/api/chat/unread-total')
      unreadCount.value = data.count
    }
  
    if (process.client && session.value) {
      const wsProtocol = window.location.protocol === "https:" ? "wss:" : "ws:"
      const wsUrl = `${wsProtocol}//${window.location.host}/api/ws/notifications`
      
      useWebSocket(wsUrl, {
        autoReconnect: true,
        onMessage: (ws, event) => {
          try {
            const payload = JSON.parse(event.data)
            if (payload.type === 'notification') {
              unreadCount.value++
            }
          } catch (e) {
            console.error("Notification WS Error", e)
          }
        }
      })
    }
  
    return {
      unreadCount,
      fetchInitialCount
    }
  }
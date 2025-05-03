import { useState, useEffect } from 'react'
import { io, Socket } from 'socket.io-client'

interface Message {
  id: string
  content: string
  sender: string
  timestamp: string
}

interface Group {
  id: string
  name: string
  topic: string
  memberCount: number
}

export default function SupportGroups() {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [groups, setGroups] = useState<Group[]>([
    { id: '1', name: 'Anxiety Support', topic: 'Anxiety', memberCount: 12 },
    { id: '2', name: 'Depression Support', topic: 'Depression', memberCount: 8 },
    { id: '3', name: 'Stress Management', topic: 'Stress', memberCount: 15 },
  ])
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [username, setUsername] = useState('')

  useEffect(() => {
    const newSocket = io('http://localhost:3001')
    setSocket(newSocket)

    return () => {
      newSocket.close()
    }
  }, [])

  useEffect(() => {
    if (!socket) return

    socket.on('message', (message: Message) => {
      setMessages(prev => [...prev, message])
    })

    return () => {
      socket.off('message')
    }
  }, [socket])

  const handleJoinGroup = (group: Group) => {
    setSelectedGroup(group)
    // In a real app, we would emit a 'join' event to the server
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !selectedGroup || !socket) return

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: username || 'Anonymous',
      timestamp: new Date().toISOString()
    }

    socket.emit('message', {
      groupId: selectedGroup.id,
      message
    })

    setNewMessage('')
  }

  return (
    <div className="flex h-screen">
      {/* Groups List */}
      <div className="w-1/4 bg-gray-100 p-4">
        <h2 className="text-xl font-bold mb-4">Support Groups</h2>
        <div className="space-y-2">
          {groups.map(group => (
            <button
              key={group.id}
              onClick={() => handleJoinGroup(group)}
              className={`w-full p-3 text-left rounded-lg ${
                selectedGroup?.id === group.id ? 'bg-blue-100' : 'bg-white'
              }`}
            >
              <h3 className="font-semibold">{group.name}</h3>
              <p className="text-sm text-gray-600">{group.topic}</p>
              <p className="text-xs text-gray-500">{group.memberCount} members</p>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedGroup ? (
          <>
            <div className="p-4 border-b">
              <h2 className="text-xl font-bold">{selectedGroup.name}</h2>
              <p className="text-gray-600">{selectedGroup.topic}</p>
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
              {messages.map(message => (
                <div key={message.id} className="mb-4">
                  <div className="flex items-center mb-1">
                    <span className="font-semibold">{message.sender}</span>
                    <span className="text-xs text-gray-500 ml-2">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="bg-white p-3 rounded-lg shadow-sm">
                    {message.content}
                  </p>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="p-4 border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Your name (optional)"
                  className="flex-1 p-2 border rounded"
                />
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border rounded"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Send
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a group to start chatting
          </div>
        )}
      </div>
    </div>
  )
} 
import { useState } from 'react'

interface MeditationSession {
  id: string
  title: string
  duration: string
  description: string
  audioUrl: string
  category: string
}

export default function Meditation() {
  const [selectedSession, setSelectedSession] = useState<MeditationSession | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const meditationSessions: MeditationSession[] = [
    {
      id: '1',
      title: 'Deep Breathing Exercise',
      duration: '5 minutes',
      description: 'A simple breathing exercise to help calm your mind and body',
      audioUrl: '/meditation/breathing.mp3',
      category: 'Beginner'
    },
    {
      id: '2',
      title: 'Body Scan Meditation',
      duration: '10 minutes',
      description: 'Progressive relaxation technique to release tension',
      audioUrl: '/meditation/body-scan.mp3',
      category: 'Intermediate'
    },
    {
      id: '3',
      title: 'Mindfulness Meditation',
      duration: '15 minutes',
      description: 'Focus on the present moment and observe your thoughts',
      audioUrl: '/meditation/mindfulness.mp3',
      category: 'Advanced'
    },
    {
      id: '4',
      title: 'Sleep Meditation',
      duration: '20 minutes',
      description: 'Guided meditation to help you fall asleep',
      audioUrl: '/meditation/sleep.mp3',
      category: 'Sleep'
    }
  ]

  const handlePlay = (session: MeditationSession) => {
    setSelectedSession(session)
    setIsPlaying(true)
    // In a real app, we would play the audio here
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Guided Meditation</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {meditationSessions.map(session => (
          <div
            key={session.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold">{session.title}</h3>
                <p className="text-gray-600">{session.duration}</p>
              </div>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                {session.category}
              </span>
            </div>
            
            <p className="text-gray-700 mb-4">{session.description}</p>
            
            <button
              onClick={() => handlePlay(session)}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
            >
              {selectedSession?.id === session.id && isPlaying ? 'Pause' : 'Start Session'}
            </button>
          </div>
        ))}
      </div>

      {selectedSession && (
        <div className="mt-8 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Now Playing: {selectedSession.title}</h3>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
            >
              {isPlaying ? '⏸️' : '▶️'}
            </button>
            <div className="flex-1">
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-blue-600 rounded-full w-1/3"></div>
              </div>
            </div>
            <span className="text-gray-600">{selectedSession.duration}</span>
          </div>
        </div>
      )}

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Tips for Meditation</h3>
        <ul className="space-y-2 text-gray-700">
          <li>• Find a quiet, comfortable place to sit or lie down</li>
          <li>• Wear comfortable clothing</li>
          <li>• Try to meditate at the same time each day</li>
          <li>• Don't worry if your mind wanders - it's normal</li>
          <li>• Be patient with yourself</li>
        </ul>
      </div>
    </div>
  )
} 
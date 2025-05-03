import { useState } from 'react'

interface Therapist {
  id: string
  name: string
  specialization: string
  experience: string
  imageUrl: string
  availableSlots: string[]
}

interface AISession {
  id: string
  title: string
  description: string
  duration: string
}

export default function Therapy() {
  const [selectedTab, setSelectedTab] = useState<'therapists' | 'ai'>('therapists')
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<string>('')

  const therapists: Therapist[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialization: 'Anxiety & Depression',
      experience: '10 years',
      imageUrl: '/therapists/sarah.jpg',
      availableSlots: ['Mon 10:00 AM', 'Wed 2:00 PM', 'Fri 11:00 AM']
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialization: 'Trauma & PTSD',
      experience: '8 years',
      imageUrl: '/therapists/michael.jpg',
      availableSlots: ['Tue 3:00 PM', 'Thu 10:00 AM', 'Sat 1:00 PM']
    }
  ]

  const aiSessions: AISession[] = [
    {
      id: '1',
      title: 'Cognitive Behavioral Therapy',
      description: 'AI-guided CBT session focusing on thought patterns and behaviors',
      duration: '30 minutes'
    },
    {
      id: '2',
      title: 'Mindfulness Practice',
      description: 'Guided mindfulness exercises with AI support',
      duration: '20 minutes'
    },
    {
      id: '3',
      title: 'Stress Management',
      description: 'AI-assisted stress reduction techniques',
      duration: '25 minutes'
    }
  ]

  const handleBookSession = () => {
    if (selectedTherapist && selectedSlot) {
      // In a real app, we would handle the booking here
      alert(`Session booked with ${selectedTherapist.name} for ${selectedSlot}`)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Therapy Sessions</h2>

      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setSelectedTab('therapists')}
          className={`px-4 py-2 rounded ${
            selectedTab === 'therapists'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Professional Therapists
        </button>
        <button
          onClick={() => setSelectedTab('ai')}
          className={`px-4 py-2 rounded ${
            selectedTab === 'ai'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          AI Support
        </button>
      </div>

      {selectedTab === 'therapists' ? (
        <div className="space-y-6">
          {therapists.map(therapist => (
            <div
              key={therapist.id}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-start space-x-4">
                <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{therapist.name}</h3>
                  <p className="text-gray-600">{therapist.specialization}</p>
                  <p className="text-sm text-gray-500">{therapist.experience} experience</p>
                  
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Available Slots:</h4>
                    <div className="flex flex-wrap gap-2">
                      {therapist.availableSlots.map(slot => (
                        <button
                          key={slot}
                          onClick={() => {
                            setSelectedTherapist(therapist)
                            setSelectedSlot(slot)
                          }}
                          className={`px-3 py-1 rounded ${
                            selectedTherapist?.id === therapist.id && selectedSlot === slot
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {selectedTherapist && selectedSlot && (
            <button
              onClick={handleBookSession}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Book Session
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {aiSessions.map(session => (
            <div
              key={session.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2">{session.title}</h3>
              <p className="text-gray-600 mb-4">{session.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{session.duration}</span>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Start Session
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 
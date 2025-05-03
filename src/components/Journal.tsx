import { useState } from 'react'
import { format } from 'date-fns'

interface JournalEntry {
  id: string
  date: string
  content: string
  mood: string
}

export default function Journal() {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [currentEntry, setCurrentEntry] = useState('')
  const [selectedMood, setSelectedMood] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentEntry.trim()) return

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: format(new Date(), 'yyyy-MM-dd'),
      content: currentEntry,
      mood: selectedMood
    }

    setEntries(prev => [newEntry, ...prev])
    setCurrentEntry('')
    setSelectedMood('')
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Daily Journal</h2>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label htmlFor="mood" className="block text-sm font-medium text-gray-700 mb-2">
            How are you feeling today?
          </label>
          <select
            id="mood"
            value={selectedMood}
            onChange={(e) => setSelectedMood(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="">Select a mood</option>
            <option value="happy">😊 Happy</option>
            <option value="good">🙂 Good</option>
            <option value="neutral">😐 Neutral</option>
            <option value="sad">😕 Sad</option>
            <option value="anxious">😰 Anxious</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="entry" className="block text-sm font-medium text-gray-700 mb-2">
            Write your thoughts
          </label>
          <textarea
            id="entry"
            value={currentEntry}
            onChange={(e) => setCurrentEntry(e.target.value)}
            className="w-full p-2 border rounded-md h-40"
            placeholder="How was your day? What's on your mind?"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Save Entry
        </button>
      </form>

      <div className="space-y-4">
        {entries.map(entry => (
          <div key={entry.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">{entry.date}</span>
              <span className="text-2xl">
                {entry.mood === 'happy' && '😊'}
                {entry.mood === 'good' && '🙂'}
                {entry.mood === 'neutral' && '😐'}
                {entry.mood === 'sad' && '😕'}
                {entry.mood === 'anxious' && '😰'}
              </span>
            </div>
            <p className="text-gray-800 whitespace-pre-wrap">{entry.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
} 
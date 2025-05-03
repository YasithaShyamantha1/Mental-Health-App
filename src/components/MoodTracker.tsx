import { useState } from 'react'
import { format } from 'date-fns'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const moods = [
  { emoji: '😊', label: 'Happy', value: 5 },
  { emoji: '🙂', label: 'Good', value: 4 },
  { emoji: '😐', label: 'Neutral', value: 3 },
  { emoji: '😕', label: 'Sad', value: 2 },
  { emoji: '😢', label: 'Very Sad', value: 1 },
]

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [moodHistory, setMoodHistory] = useState<{ date: string; mood: number }[]>([])

  const handleMoodSelect = (value: number) => {
    setSelectedMood(value)
    const today = format(new Date(), 'yyyy-MM-dd')
    setMoodHistory(prev => [...prev, { date: today, mood: value }])
  }

  const chartData = {
    labels: moodHistory.map(entry => entry.date),
    datasets: [
      {
        label: 'Mood Level',
        data: moodHistory.map(entry => entry.mood),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">How are you feeling today?</h2>
      
      <div className="flex justify-center space-x-4 mb-8">
        {moods.map(({ emoji, label, value }) => (
          <button
            key={value}
            onClick={() => handleMoodSelect(value)}
            className={`p-4 rounded-full text-2xl hover:scale-110 transition-transform ${
              selectedMood === value ? 'bg-blue-100' : 'bg-gray-100'
            }`}
            title={label}
          >
            {emoji}
          </button>
        ))}
      </div>

      {moodHistory.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Your Mood History</h3>
          <div className="bg-white p-4 rounded-lg shadow">
            <Line data={chartData} />
          </div>
        </div>
      )}
    </div>
  )
} 
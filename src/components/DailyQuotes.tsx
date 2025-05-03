import { useState, useEffect } from 'react'

interface Quote {
  id: string
  text: string
  author: string
  category: string
}

export default function DailyQuotes() {
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null)
  const [favoriteQuotes, setFavoriteQuotes] = useState<Quote[]>([])

  const quotes: Quote[] = [
    {
      id: '1',
      text: "You are stronger than you think, braver than you believe, and smarter than you know.",
      author: "A.A. Milne",
      category: "Motivation"
    },
    {
      id: '2',
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
      category: "Inspiration"
    },
    {
      id: '3',
      text: "Happiness is not something ready made. It comes from your own actions.",
      author: "Dalai Lama",
      category: "Happiness"
    },
    {
      id: '4',
      text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
      author: "Nelson Mandela",
      category: "Resilience"
    }
  ]

  useEffect(() => {
    // Set a random quote when component mounts
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
    setCurrentQuote(randomQuote)

    // Change quote every 24 hours
    const interval = setInterval(() => {
      const newRandomQuote = quotes[Math.floor(Math.random() * quotes.length)]
      setCurrentQuote(newRandomQuote)
    }, 24 * 60 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  const handleNewQuote = () => {
    const newQuote = quotes[Math.floor(Math.random() * quotes.length)]
    setCurrentQuote(newQuote)
  }

  const handleFavorite = () => {
    if (currentQuote && !favoriteQuotes.some(q => q.id === currentQuote.id)) {
      setFavoriteQuotes(prev => [...prev, currentQuote])
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Daily Quote</h2>

      {currentQuote && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <blockquote className="text-xl italic text-gray-700 mb-4">
            "{currentQuote.text}"
          </blockquote>
          <p className="text-right text-gray-600">- {currentQuote.author}</p>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-sm text-gray-500">{currentQuote.category}</span>
            <div className="flex space-x-2">
              <button
                onClick={handleNewQuote}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                New Quote
              </button>
              <button
                onClick={handleFavorite}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {favoriteQuotes.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Saved Quotes</h3>
          <div className="space-y-4">
            {favoriteQuotes.map(quote => (
              <div
                key={quote.id}
                className="bg-gray-50 p-4 rounded-lg"
              >
                <p className="text-gray-700">"{quote.text}"</p>
                <p className="text-right text-sm text-gray-600">- {quote.author}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 
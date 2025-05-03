import Link from 'next/link'

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">Mental Health Support</h1>
        <p className="text-gray-600">Your safe space for mental well-being</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Support Groups */}
        <Link href="/support-groups" className="block">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">Support Groups</h2>
            <p className="text-gray-600">Join anonymous chat rooms for various mental health topics</p>
          </div>
        </Link>

        {/* Journaling */}
        <Link href="/journal" className="block">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-purple-700 mb-2">Daily Journal</h2>
            <p className="text-gray-600">Private space for your thoughts and mood tracking</p>
          </div>
        </Link>

        {/* Mood Tracker */}
        <Link href="/mood-tracker" className="block">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-green-700 mb-2">Mood Tracker</h2>
            <p className="text-gray-600">Track your daily mood and see patterns</p>
          </div>
        </Link>

        {/* Meditation */}
        <Link href="/meditation" className="block">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-indigo-700 mb-2">Meditation</h2>
            <p className="text-gray-600">Guided meditation and relaxation exercises</p>
          </div>
        </Link>

        {/* Therapy Sessions */}
        <Link href="/therapy" className="block">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-pink-700 mb-2">Therapy Sessions</h2>
            <p className="text-gray-600">Book sessions with professionals or try our AI support</p>
          </div>
        </Link>

        {/* Emergency Help */}
        <Link href="/emergency" className="block">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-red-700 mb-2">Emergency Help</h2>
            <p className="text-gray-600">Quick access to emergency resources and hotlines</p>
          </div>
        </Link>
      </div>

      {/* Daily Quote Section */}
      <div className="mt-12 text-center">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Daily Quote</h2>
          <p className="text-gray-700 italic">"You are stronger than you think, braver than you believe, and smarter than you know."</p>
        </div>
      </div>
    </main>
  )
} 
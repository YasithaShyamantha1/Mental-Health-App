import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-blue-800">
            Mental Health Support
          </Link>
          
          <div className="hidden md:flex space-x-4">
            <Link href="/support-groups" className="text-gray-600 hover:text-blue-700">
              Support Groups
            </Link>
            <Link href="/journal" className="text-gray-600 hover:text-purple-700">
              Journal
            </Link>
            <Link href="/mood-tracker" className="text-gray-600 hover:text-green-700">
              Mood Tracker
            </Link>
            <Link href="/meditation" className="text-gray-600 hover:text-indigo-700">
              Meditation
            </Link>
            <Link href="/therapy" className="text-gray-600 hover:text-pink-700">
              Therapy
            </Link>
            <Link href="/emergency" className="text-red-600 hover:text-red-700">
              Emergency
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
} 
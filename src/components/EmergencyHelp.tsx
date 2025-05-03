import { useState, ChangeEvent } from 'react'

interface EmergencyContact {
  id: string
  name: string
  number: string
  description: string
}

export default function EmergencyHelp() {
  const [location, setLocation] = useState('US') // Default to US

  const emergencyContacts: Record<string, EmergencyContact[]> = {
    US: [
      {
        id: '1',
        name: 'National Suicide Prevention Lifeline',
        number: '988',
        description: '24/7 support for people in suicidal crisis or emotional distress'
      },
      {
        id: '2',
        name: 'Crisis Text Line',
        number: '741741',
        description: 'Text HOME to connect with a crisis counselor'
      },
      {
        id: '3',
        name: 'SAMHSA National Helpline',
        number: '1-800-662-4357',
        description: 'Treatment referral and information service'
      }
    ],
    UK: [
      {
        id: '1',
        name: 'Samaritans',
        number: '116 123',
        description: '24/7 emotional support'
      },
      {
        id: '2',
        name: 'Mind Infoline',
        number: '0300 123 3393',
        description: 'Information and support for mental health'
      }
    ],
    Canada: [
      {
        id: '1',
        name: 'Crisis Services Canada',
        number: '1-833-456-4566',
        description: '24/7 support for people in crisis'
      }
    ]
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Emergency Help</h2>
      
      <div className="mb-8">
        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
          Select your location
        </label>
        <select
          id="location"
          value={location}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setLocation(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="US">United States</option>
          <option value="UK">United Kingdom</option>
          <option value="Canada">Canada</option>
        </select>
      </div>

      <div className="space-y-4">
        {emergencyContacts[location].map(contact => (
          <div key={contact.id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-red-600">{contact.name}</h3>
            <p className="text-2xl font-bold my-2">{contact.number}</p>
            <p className="text-gray-600">{contact.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-yellow-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Note</h3>
        <p className="text-yellow-700">
          If you or someone you know is in immediate danger, please call your local emergency services number (911 in the US, 999 in the UK, 112 in Europe).
        </p>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Additional Resources</h3>
        <ul className="space-y-2">
          <li>
            <a
              href="https://www.who.int/mental_health/emergency/en/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              World Health Organization - Mental Health Resources
            </a>
          </li>
          <li>
            <a
              href="https://www.mentalhealth.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              MentalHealth.gov
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
} 
'use client';

import { useState, useEffect } from 'react';

interface Mood {
  emoji: string;
  label: string;
}

interface DiaryEntry {
  id: string;
  date: Date;
  mood: string;
  text: string;
}

const moods: Mood[] = [
  { emoji: '😊', label: 'Happy' },
  { emoji: '😐', label: 'Neutral' },
  { emoji: '😔', label: 'Sad' },
  { emoji: '😡', label: 'Angry' },
  { emoji: '😰', label: 'Anxious' },
  { emoji: '😴', label: 'Tired' },
];

export default function Diary() {
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [diaryText, setDiaryText] = useState('');
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [editingEntry, setEditingEntry] = useState<DiaryEntry | null>(null);

  // Load entries from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('diaryEntries');
    if (savedEntries) {
      const parsedEntries = JSON.parse(savedEntries).map((entry: any) => ({
        ...entry,
        date: new Date(entry.date)
      }));
      setEntries(parsedEntries);
    }
  }, []);

  // Save entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('diaryEntries', JSON.stringify(entries));
  }, [entries]);

  const saveEntry = () => {
    if (diaryText.trim() && selectedMood) {
      if (editingEntry) {
        // Update existing entry
        setEntries(entries.map(entry => 
          entry.id === editingEntry.id 
            ? { ...entry, mood: selectedMood, text: diaryText.trim() }
            : entry
        ));
        setEditingEntry(null);
      } else {
        // Create new entry
        setEntries([
          ...entries,
          {
            id: Date.now().toString(),
            date: new Date(),
            mood: selectedMood,
            text: diaryText.trim(),
          },
        ]);
      }
      setDiaryText('');
      setSelectedMood('');
    }
  };

  const editEntry = (entry: DiaryEntry) => {
    setEditingEntry(entry);
    setSelectedMood(entry.mood);
    setDiaryText(entry.text);
  };

  const deleteEntry = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const cancelEdit = () => {
    setEditingEntry(null);
    setDiaryText('');
    setSelectedMood('');
  };

  const formatDate = (date: Date) => {
    try {
      return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Daily Journal</h2>
      
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">How are you feeling today?</h3>
        <div className="flex gap-4 mb-4">
          {moods.map((mood) => (
            <button
              key={mood.label}
              onClick={() => setSelectedMood(mood.emoji)}
              className={`p-2 rounded-full text-2xl ${
                selectedMood === mood.emoji
                  ? 'bg-blue-100 ring-2 ring-blue-500'
                  : 'hover:bg-gray-100'
              }`}
            >
              {mood.emoji}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <textarea
          value={diaryText}
          onChange={(e) => setDiaryText(e.target.value)}
          placeholder="Write about your day..."
          className="w-full p-3 border rounded-md h-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={saveEntry}
          disabled={!selectedMood || !diaryText.trim()}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {editingEntry ? 'Update Entry' : 'Save Entry'}
        </button>
        {editingEntry && (
          <button
            onClick={cancelEdit}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>

      {entries.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Previous Entries</h3>
          <div className="space-y-4">
            {entries.map((entry) => (
              <div key={entry.id} className="border rounded-md p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{entry.mood}</span>
                    <span className="text-sm text-gray-500">
                      {formatDate(entry.date)}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => editEntry(entry)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteEntry(entry.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="text-gray-700">{entry.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 
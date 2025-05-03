'use client';

import TodoList from '@/components/TodoList';
import Diary from '@/components/Diary';

export default function JournalPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Daily Journal</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <TodoList />
          </div>
          <div>
            <Diary />
          </div>
        </div>
      </div>
    </div>
  );
} 
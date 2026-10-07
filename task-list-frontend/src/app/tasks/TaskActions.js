'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteTask } from '@/lib/api';

export default function TaskActions({ task }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = confirm(`Are you sure you want to delete the task? "${task.title}"?`);
    if (!confirmed) return;

    setLoading(true);
    try {
      await deleteTask(task.id);
      router.refresh();
    } catch (error) {
      console.error('Failed To Delete Task:', error);
      alert('Failed To Delete Task. Try Again Later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2 shrink-0">
      {/* Delete Button */}
      <button
        type="button"
        onClick={handleDelete}
        disabled={loading}
        className="px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50"
      >
        {loading ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  );
}

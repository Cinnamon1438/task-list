'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateTask } from '@/lib/api';

export default function ToggleStatusButton({ task }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleToggle = async () => {
    setLoading(true);
    try {
      // Toggle status completed
      await updateTask(task.id, { completed: !task.completed });
      router.refresh();
    } catch (error) {
      console.error('Gagal memperbarui status tugas:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={loading}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        task.completed
          ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
          : 'bg-green-600 text-white hover:bg-green-700'
      } disabled:opacity-50`}
    >
      {loading ? (
        'Memproses...'
      ) : task.completed ? (
        <>
          <span>↺</span> Mark as Not Completed
        </>
      ) : (
        <>
          <span>✓</span> Mark as Completed
        </>
      )}
    </button>
  );
}

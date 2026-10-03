'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';

export default function ToggleStatusButton({ task }) {
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(task.completed);
  const router = useRouter();

  const handleToggle = async () => {
    setLoading(true);
    const nextStatus = !completed;
    setCompleted(nextStatus);

    try {
      const res = await apiFetch(`/tasks/${task.id}/toggle-complete`, {
        method: 'PUT',
      });

      if (res.ok) {
        router.refresh();
      } else {
        setCompleted(!nextStatus);
        alert('Gagal memperbarui status');
      }
    } catch (error) {
      setCompleted(!nextStatus);
      console.error('Toggle status error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50 ${
        completed
          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-300'
          : 'bg-amber-100 text-amber-800 hover:bg-amber-200 border border-amber-300'
      }`}
    >
      {completed ? '✓ Tandai Belum Selesai' : '⏳ Tandai Selesai'}
    </button>
  );
}

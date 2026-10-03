'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteTask } from '@/lib/api';

export default function TaskActions({ task }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = confirm(`Apakah kamu yakin ingin menghapus tugas "${task.title}"?`);
    if (!confirmed) return;

    setLoading(true);
    try {
      await deleteTask(task.id);
      router.refresh();
    } catch (error) {
      console.error('Gagal menghapus task:', error);
      alert('Gagal menghapus tugas. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2 shrink-0">
      {/* Tombol Hapus */}
      <button
        type="button"
        onClick={handleDelete}
        disabled={loading}
        className="px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50"
      >
        {loading ? 'Menghapus...' : 'Hapus'}
      </button>
    </div>
  );
}

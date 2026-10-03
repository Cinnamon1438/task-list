'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';

export default function TaskActions({ task }) {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [longDescription, setLongDescription] = useState(task.long_description || '');

  const router = useRouter();

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await apiFetch(`/tasks/${task.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title,
          description,
          long_description: longDescription,
        }),
      });

      if (res.ok) {
        setIsEditing(false);
        router.refresh();
      } else {
        alert('Gagal mengedit task');
      }
    } catch (error) {
      console.error('Edit error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Apakah kamu yakin ingin menghapus task ini?')) return;

    setLoading(true);
    try {
      const res = await apiFetch(`/tasks/${task.id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        router.refresh();
      } else {
        alert('Gagal menghapus task');
      }
    } catch (error) {
      console.error('Delete error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center space-x-1.5">
        <button
          onClick={() => setIsEditing(true)}
          disabled={loading}
          className="px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 rounded-lg transition-colors"
        >
          Edit
        </button>

        <button
          onClick={handleDelete}
          disabled={loading}
          className="px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 rounded-lg transition-colors"
          title="Hapus Task"
        >
          Hapus
        </button>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-2xl max-w-md w-full shadow-xl space-y-4 border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800">Edit Task</h3>

            <form onSubmit={handleEditSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1 block">Judul</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-slate-800 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1 block">Deskripsi Singkat</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-slate-800 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1 block">Deskripsi Lengkap</label>
                <textarea
                  value={longDescription}
                  onChange={(e) => setLongDescription(e.target.value)}
                  rows="3"
                  className="w-full px-3 py-2 text-slate-800 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-lg transition-colors font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 text-xs bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

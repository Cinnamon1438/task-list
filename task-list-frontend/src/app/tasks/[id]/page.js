'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getTask, updateTask } from '@/lib/api';

export default function TaskDetailPage({ params }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [completed, setCompleted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    async function loadTask() {
      const data = await getTask(id);
      if (data) {
        setTask(data);
        setTitle(data.title || '');
        setDescription(data.description || '');
        setLongDescription(data.long_description || '');
        setCompleted(data.completed || false);
      }
      setLoading(false);
    }
    loadTask();
  }, [id]);

  // Toggle Status 
  const handleToggleStatus = async () => {
    try {
      const updated = await updateTask(id, { completed: !completed });
      setCompleted(!completed);
      setTask({ ...task, completed: !completed });
      router.refresh();
    } catch (error) {
      console.error('Gagal memperbarui status:', error);
    }
  };

  // Simpan Edit
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await updateTask(id, {
        title,
        description,
        long_description: longDescription,
        completed,
      });

      setTask({
        ...task,
        title,
        description,
        long_description: longDescription,
        completed,
      });

      setIsEditing(false);
      router.refresh();
    } catch (error) {
      console.error('Gagal menyimpan perubahan:', error);
      alert('Gagal menyimpan perubahan.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-sm text-gray-500">Memuat detail tugas...</p>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center bg-white p-8 rounded-xl border shadow-sm max-w-md w-full">
          <h2 className="text-lg font-bold text-gray-800 mb-2">Tugas tidak ditemukan</h2>
          <Link href="/tasks" className="text-sm text-blue-600 hover:underline">
            &larr; Kembali ke Daftar Tugas
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 space-y-6">
        
        {/* Header Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
          <Link href="/tasks" className="text-sm font-medium text-gray-500 hover:text-gray-800">
            &larr; Kembali ke Daftar
          </Link>

          <div className="flex items-center gap-2">
            {!isEditing  (
              <>
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="px-3.5 py-2 rounded-lg text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors"
                >
                  ✏️ Edit
                </button>
                <button
                  type="button"
                  onClick={handleToggleStatus}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    completed
                      ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {completed ? '↺ Tandai Belum Selesai' : '✓ Tandai Selesai'}
                </button>
              </>
            )}
          </div>
        </div>

        {/* --- TAMPILAN MODE EDIT --- */}
        {isEditing ? (
          <form onSubmit={handleSaveEdit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Judul Tugas</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ringkasan Singkat</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Detail</label>
              <textarea
                rows={5}
                value={longDescription}
                onChange={(e) => setLongDescription(e.target.value)}
                className="w-full px-3.5 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                id="completed-edit"
                type="checkbox"
                checked={completed}
                onChange={(e) => setCompleted(e.target.checked)}
                className="h-4 w-4 text-blue-600 rounded border-gray-300"
              />
              <label htmlFor="completed-edit" className="text-sm text-gray-700">
                Tandai sebagai selesai
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
            </div>
          </form>
        ) : (
          /* --- TAMPILAN MODE DETAIL --- */
          <div className="space-y-6">
            <div className="space-y-3">
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full inline-block ${
                  completed
                    ? 'bg-green-100 text-green-800 border border-green-200'
                    : 'bg-amber-100 text-amber-800 border border-amber-200'
                }`}
              >
                {completed ? 'Selesai' : 'Belum Selesai'}
              </span>
              <h1 className={`text-2xl font-bold ${completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                {task.title}
              </h1>
            </div>

            {task.description && (
              <div className="text-gray-600 bg-gray-50 p-4 rounded-lg text-sm border border-gray-100">
                <h4 className="font-semibold text-gray-700 mb-1">Ringkasan</h4>
                <p>{task.description}</p>
              </div>
            )}

            {task.long_description && (
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-gray-700">Deskripsi Detail</h4>
                <p className="text-gray-800 text-sm whitespace-pre-line leading-relaxed">
                  {task.long_description}
                </p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

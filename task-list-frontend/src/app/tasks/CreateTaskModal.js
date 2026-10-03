'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';

export default function CreateTaskModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) return;

    setIsSubmitting(true);
    try {
      const res = await apiFetch('/tasks', {
        method: 'POST',
        body: JSON.stringify({
          title,
          description,
          long_description: longDescription,
        }),
      });

      if (res.ok) {
        setTitle('');
        setDescription('');
        setLongDescription('');
        setIsOpen(false);
        router.refresh();
      } else {
        alert('Gagal menyimpan task baru');
      }
    } catch (error) {
      console.error('Create task error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-xs sm:text-sm transition-colors shadow-sm"
      >
        + Tambah Task Baru
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-2xl max-w-md w-full shadow-xl space-y-4 border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800">Tambah Task Baru</h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1 block">Judul</label>
                <input
                  type="text"
                  placeholder="Judul task..."
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
                  placeholder="Deskripsi singkat..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-slate-800 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1 block">Deskripsi Lengkap (Opsional)</label>
                <textarea
                  placeholder="Detail penjelasan..."
                  value={longDescription}
                  onChange={(e) => setLongDescription(e.target.value)}
                  rows="3"
                  className="w-full px-3 py-2 text-slate-800 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-lg transition-colors font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 text-xs bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

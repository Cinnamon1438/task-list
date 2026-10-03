'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TaskForm() {
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
      const res = await fetch('http://localhost:8000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
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
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-6 bg-white border border-slate-200 rounded-xl shadow-sm space-y-4">
      <h3 className="text-lg font-bold text-slate-800">Tambah Task Baru</h3>

      {/* Title */}
      <input
        type="text"
        placeholder="Judul Task (Title)..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full px-4 py-2 text-slate-800 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-400"
      />

      {/* Description */}
      <input
        type="text"
        placeholder="Deskripsi Singkat (Description)..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="w-full px-4 py-2 text-slate-800 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-400"
      />

      {/* Long Description */}
      <textarea
        placeholder="Deskripsi Detail (Long Description)..."
        value={longDescription}
        onChange={(e) => setLongDescription(e.target.value)}
        rows="3"
        className="w-full px-4 py-2 text-slate-800 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-400"
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:bg-slate-400"
      >
        {isSubmitting ? 'Menyimpan...' : 'Tambah Task'}
      </button>
    </form>
  );
}

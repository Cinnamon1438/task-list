import Link from 'next/link';
import { notFound } from 'next/navigation';
import ToggleStatusButton from './ToggleStatusButton';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

async function getTask(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      cache: 'no-store',
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    return null;
  }
}

export default async function TaskDetailPage({ params }) {
  const { id } = await params;
  const task = await getTask(id);

  if (!task) {
    notFound();
  }

  return (
    <main className="max-w-2xl mx-auto py-10 px-4">
      <Link
        href="/tasks"
        className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 mb-6 transition-colors"
      >
        ← Kembali ke Daftar Task
      </Link>

      <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${
                task.completed
                  ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                  : 'bg-amber-100 text-amber-700 border border-amber-200'
              }`}
            >
              {task.completed ? '✓ Selesai' : '⏳ Belum Selesai'}
            </span>
            <h1 className="text-2xl font-bold text-slate-900">{task.title}</h1>
          </div>

          <ToggleStatusButton task={task} />
        </div>

        <div>
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Deskripsi Singkat
          </h4>
          <p className="text-slate-700 text-base">{task.description}</p>
        </div>

        {task.long_description && (
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Deskripsi Lengkap
            </h4>
            <p className="text-slate-600 text-sm whitespace-pre-line bg-slate-50 p-4 rounded-lg border border-slate-100">
              {task.long_description}
            </p>
          </div>
        )}

        <div className="border-t border-slate-100 pt-4 flex flex-col sm:flex-row justify-between text-xs text-slate-400 gap-2">
          <span>
            Dibuat pada:{' '}
            {new Date(task.created_at).toLocaleString('id-ID', {
              dateStyle: 'full',
              timeStyle: 'short',
            })}
          </span>
          <span>
            Terakhir diubah:{' '}
            {new Date(task.updated_at).toLocaleString('id-ID', {
              dateStyle: 'full',
              timeStyle: 'short',
            })}
          </span>
        </div>
      </div>
    </main>
  );
}

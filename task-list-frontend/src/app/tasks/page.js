import Link from 'next/link';
import CreateTaskModal from './CreateTaskModal';
import TaskActions from './TaskActions';
import Pagination from './Pagination';
import { apiFetch } from '@/lib/api';

async function getTasks(page = 1) {
  try {
    const res = await apiFetch(`/tasks?page=${page}`);
    if (!res.ok) return { data: [], meta: null };

    const result = await res.json();

    if (result && result.data) {
      return {
        data: result.data,
        meta: result,
      };
    }

    return { data: Array.isArray(result) ? result : [], meta: null };
  } catch (error) {
    console.error('Failed fetching tasks:', error);
    return { data: [], meta: null };
  }
}

export default async function TasksPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const page = resolvedParams?.page ? parseInt(resolvedParams.page) : 1;

  const { data: tasks, meta } = await getTasks(page);

  return (
    <main className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
      {/* Header Utama & Tombol Tambah Task */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Daftar Tugas
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Kelola dan pantau seluruh progres tugas harianmu
          </p>
        </div>
        <CreateTaskModal />
      </div>

      {/* List Task / State Kosong */}
      {tasks.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300 p-8 shadow-sm">
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
            📝
          </div>
          <h3 className="text-sm font-semibold text-slate-800">Belum ada tugas</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Daftar tugas kamu masih kosong. Klik tombol di atas untuk membuat tugas baru!
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm divide-y divide-slate-100 overflow-hidden">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="p-4 sm:p-5 flex items-center justify-between hover:bg-slate-50/80 transition-colors group"
            >
              <div className="space-y-1.5 max-w-md pr-4">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-block w-2 h-2 rounded-full ${
                      task.completed ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}
                  />
                  <Link
                    href={`/tasks/${task.id}`}
                    className={`text-sm sm:text-base font-medium transition-colors block truncate ${
                      task.completed
                        ? 'line-through text-slate-400 group-hover:text-slate-500'
                        : 'text-slate-800 group-hover:text-blue-600'
                    }`}
                  >
                    {task.title}
                  </Link>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-400 pl-4">
                  <span>
                    {new Date(task.created_at).toLocaleString('id-ID', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </span>
                  {task.description && (
                    <>
                      <span>•</span>
                      <span className="truncate max-w-50">{task.description}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Tombol Aksi Edit & Hapus */}
              <TaskActions task={task} />
            </div>
          ))}
        </div>
      )}

      {/* Navigasi Pagination */}
      <Pagination meta={meta} />
    </main>
  );
}

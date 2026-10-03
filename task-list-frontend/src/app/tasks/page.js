import Link from 'next/link';
import CreateTaskModal from './CreateTaskModal';
import TaskActions from './TaskActions';
import { getTasks } from '@/lib/api';

export default async function TasksPage() {
  const { data: tasks } = await getTasks();

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Daftar Tugas</h1>
            <p className="text-sm text-gray-500 mt-1">
              Kelola dan pantau seluruh progres tugas harianmu.
            </p>
          </div>
          <CreateTaskModal />
        </div>

        {/* Task List Section */}
        {!tasks || tasks.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-200">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 002 0h2a2 2 0 002 0"
              />
            </svg>
            <h3 className="mt-2 text-sm font-semibold text-gray-900">Belum Ada Tugas</h3>
            <p className="mt-1 text-sm text-gray-500">
              Mulai buat tugas baru dengan menekan tombol di atas.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Link 
                      href={`/tasks/${task.id}`}
                      className="group inline-block cursor-pointer"
                    >
                      <h3
                        className={`text-lg font-semibold transition-all duration-150 ${
                          task.completed 
                            ? 'line-through text-gray-400 group-hover:text-gray-600' 
                            : 'text-gray-900 group-hover:text-blue-600'
                        }`}
                      >
                        {task.title}
                      </h3>
                    </Link>
                    <span
                      className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${
                        task.completed
                          ? 'bg-green-50 text-green-700 border border-green-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {task.completed ? 'Selesai' : 'Pending'}
                    </span>
                  </div>
                  {task.description && (
                    <p className="text-sm text-gray-600 line-clamp-2">{task.description}</p>
                  )}
                </div>

                {/* Komponen Tombol Aksi */}
                <TaskActions task={task} />
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

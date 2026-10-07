'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function Pagination({ meta }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (!meta || meta.total === undefined) return null;

  const currentPage = meta.current_page || 1;
  const lastPage = meta.last_page || 1;

  const handlePageChange = (page) => {
    if (page < 1 || page > lastPage) return;
    const params = new URLSearchParams(searchParams);
    params.set('page', page);
    router.push(`/tasks?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-between border-t border-slate-200 pt-4 mt-6">
      <p className="text-xs text-slate-500">
        Show <span className="font-semibold text-slate-700">{meta.from || 0}</span> -{' '}
        <span className="font-semibold text-slate-700">{meta.to || 0}</span> From{' '}
        <span className="font-semibold text-slate-700">{meta.total || 0}</span> Data
      </p>

      {/* Tombol Navigasi Halaman */}
      {lastPage > 1 && (
        <div className="flex space-x-1">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1.5 text-xs font-medium border border-slate-300 rounded-md bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700"
          >
            ← Prev
          </button>

          {Array.from({ length: lastPage }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md border ${
                page === currentPage
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === lastPage}
            className="px-3 py-1.5 text-xs font-medium border border-slate-300 rounded-md bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

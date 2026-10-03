import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="text-center space-y-5 max-w-md bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div className="text-6xl font-black text-blue-600">404</div>
        <h1 className="text-2xl font-bold text-slate-800">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-slate-500 text-sm">
          Maaf, task atau halaman yang kamu cari tidak ditemukan atau ID yang dimasukkan pada URL salah.
        </p>
        <div>
          <Link
            href="/tasks"
            className="inline-block px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition-colors"
          >
            ← Kembali ke Daftar Task
          </Link>
        </div>
      </div>
    </main>
  );
}

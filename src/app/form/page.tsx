import { requireAuth } from "./auth";

function Navbar() {
  return (
    <header className="bg-blue-600 text-white py-4 shadow">
      <div className="px-6 flex justify-between items-center">
        <h1 className="text-xl font-bold">📚 Perpustakaan Digital</h1>
      </div>
    </header>
  );
}

export default async function Home() {
  await requireAuth();
  // You can add server-side logic here, or render the form as before (but without client-side state)
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <section className="max-w-3xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Form Peminjaman Buku
        </h2>
        <p className="text-gray-600 mb-8">
          Silakan isi data di bawah ini untuk melakukan peminjaman buku.
        </p>
        {/* You can add a server-action form here, or convert this to a client component if you need interactivity */}
        <div className="bg-white p-6 rounded-lg shadow text-gray-700">
          <p>Formulir hanya dapat diakses oleh user yang sudah login.</p>
        </div>
      </section>
    </main>
  );
}

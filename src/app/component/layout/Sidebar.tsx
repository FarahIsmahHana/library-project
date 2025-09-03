export default function Sidebar({
  activeTab,
  setActiveTab,
}: {
  activeTab: "loan" | "book";
  setActiveTab: React.Dispatch<React.SetStateAction<"loan" | "book">>;
}) {
  return (
    <div
      style={{
        position: "fixed",
        top: 80,
        left: 0,
        height: "calc(100vh - 80px)",
        width: "240px",
        borderRight: "1px solid #d1d5db",
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        className={`p-4 cursor-pointer flex items-center gap-2 ${
          activeTab === "loan"
            ? "bg-blue-500 text-white font-semibold"
            : "text-gray-700 hover:bg-gray-200"
        }`}
        onClick={() => setActiveTab("loan")}
      >
        📋 Daftar Peminjaman & Pengembalian
      </div>
      <div
        className={`p-4 cursor-pointer flex items-center gap-2 ${
          activeTab === "book"
            ? "bg-blue-500 text-white font-semibold"
            : "text-gray-700 hover:bg-gray-200"
        }`}
        onClick={() => setActiveTab("book")}
      >
        📚 Daftar Buku
      </div>
    </div>
  );
}

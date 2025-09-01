"use client";

import { useEffect, useState } from "react";
import { Button, Heading, Input } from "../../component/StyledComponent";

interface Loan {
  id: string;
  nama: string;
  noBuku: string;
  judulBuku: string;
  pengarang?: string;
  tglPinjam?: string;
  tglKembali?: string;
  createdAt?: string;
  status?: string;
  returned?: boolean;
}

interface LoanHistoryTableProps {
  data?: Loan[];
  onEdit?: (loan: Loan) => void;
  onMessage?: (msg: { type: "success" | "error"; text: string }) => void;
}

export default function LoanHistoryTable({
  data: propLoans,
  onEdit,
  onMessage,
}: LoanHistoryTableProps) {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState<string | null>(null);
  const [popupPosition, setPopupPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const filteredLoans = loans.filter((loan) =>
    loan.nama.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch("/api/loan/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        setLoans((prev) => prev.filter((loan) => loan.id !== id));
        onMessage?.({ type: "success", text: "✅ Data berhasil dihapus!" });
      } else {
        onMessage?.({
          type: "error",
          text: data.message ?? "❌ Gagal menghapus data",
        });
      }
    } catch (err) {
      console.error("Error delete:", err);
      onMessage?.({
        type: "error",
        text: "❌ Terjadi kesalahan saat menghapus data",
      });
    } finally {
      setPopupOpen(null);
    }
  };

  const handleReturn = async (loanId: string) => {
    try {
      const res = await fetch("/api/loan/return", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: loanId }),
      });

      const data = await res.json();
      if (data.success) {
        // hapus dari state lokal agar hilang dari daftar
        setLoans((prev) => prev.filter((l) => l.id !== loanId));
        onMessage?.({ type: "success", text: "✅ Buku telah dikembalikan" });
      } else {
        onMessage?.({
          type: "error",
          text: data.message ?? "❌ Gagal menandai buku dikembalikan",
        });
      }
    } catch (err) {
      console.error("Error return:", err);
      onMessage?.({
        type: "error",
        text: "❌ Terjadi kesalahan saat mengembalikan buku",
      });
    }
  };

  const handlePopupOpen = (
    loanId: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPopupPosition({ x: rect.left + rect.width / 2, y: rect.bottom + 8 });
    setPopupOpen(popupOpen === loanId ? null : loanId);
  };

  const fetchLoans = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/loan/list");
      const data = await res.json();
      if (data.success) setLoans(data.data ?? []);
    } catch (err) {
      console.error(err);
      setLoans([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  useEffect(() => {
    if (propLoans) setLoans(propLoans);
  }, [propLoans]);

  return (
    <section style={{ width: "100%", position: "relative" }}>
      <Heading
        as="h3"
        style={{ fontSize: 20, marginBottom: 16, marginLeft: 24 }}
      >
        Daftar Peminjaman & Pengembalian Buku
      </Heading>
      <div style={{ width: "100%", overflowX: "auto", padding: "0 24px" }}>
        <table
          style={{
            width: "100%",
            minWidth: 900,
            borderCollapse: "separate",
            borderSpacing: 0,
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
            overflow: "hidden",
          }}
        >
          <thead>
            <tr style={{ background: "#2563eb" }}>
              <th
                style={{
                  padding: 12,
                  border: "1px solid #e5e7eb",
                  color: "#fff",
                }}
              >
                No
              </th>
              <th
                style={{
                  padding: 12,
                  border: "1px solid #e5e7eb",
                  color: "#fff",
                  verticalAlign: "top",
                  minWidth: 150,
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ fontWeight: 500 }}>Nama</span>

                  <Button
                    onClick={() => setShowSearch((prev) => !prev)}
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      fontSize: 14,
                      color: "#fff",
                      padding: 0,
                    }}
                    title="Cari nama"
                  >
                    🔍
                  </Button>
                </div>

                {showSearch && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      marginTop: 4,
                      background: "#fff",
                      border: "1px solid #d1d5db",
                      borderRadius: 6,
                      padding: 6,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                      zIndex: 10,
                    }}
                  >
                    <Input
                      type="text"
                      placeholder="Cari nama..."
                      value={searchQuery}
                      autoFocus
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{
                        fontSize: 12,
                        padding: "6px 8px",
                        width: 160,
                        borderRadius: 4,
                        border: "1px solid #d1d5db",
                        outline: "none",
                      }}
                    />
                  </div>
                )}
              </th>
              <th
                style={{
                  padding: 12,
                  border: "1px solid #e5e7eb",
                  color: "#fff",
                }}
              >
                Tempat Rak Buku
              </th>
              <th
                style={{
                  padding: 12,
                  border: "1px solid #e5e7eb",
                  color: "#fff",
                }}
              >
                Judul Buku
              </th>
              <th
                style={{
                  padding: 12,
                  border: "1px solid #e5e7eb",
                  color: "#fff",
                }}
              >
                Nama Pengarang
              </th>
              <th
                style={{
                  padding: 12,
                  border: "1px solid #e5e7eb",
                  color: "#fff",
                }}
              >
                Tgl Pinjam
              </th>
              <th
                style={{
                  padding: 12,
                  border: "1px solid #e5e7eb",
                  color: "#fff",
                }}
              >
                Tgl Kembali
              </th>
              <th
                style={{
                  padding: 12,
                  border: "1px solid #e5e7eb",
                  color: "#fff",
                }}
              >
                Created
              </th>
              <th
                style={{
                  padding: 12,
                  border: "1px solid #e5e7eb",
                  color: "#fff",
                }}
              >
                Status
              </th>
              <th
                style={{
                  padding: 12,
                  border: "1px solid #e5e7eb",
                  color: "#fff",
                }}
              >
                Delete
              </th>
              <th
                style={{
                  padding: 12,
                  border: "1px solid #e5e7eb",
                  color: "#fff",
                }}
              >
                Returned
              </th>{" "}
              {/* kolom baru */}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={9} style={{ textAlign: "center", padding: 24 }}>
                  Loading...
                </td>
              </tr>
            ) : loans.length === 0 ? (
              <tr>
                <td colSpan={9} style={{ textAlign: "center", padding: 24 }}>
                  Belum ada data peminjaman
                </td>
              </tr>
            ) : (
              filteredLoans.map((loan, idx) => (
                <tr
                  key={loan.id}
                  style={{ background: idx % 2 === 0 ? "#f9fafb" : "#fff" }}
                >
                  <td
                    style={{
                      padding: 12,
                      border: "1px solid #e5e7eb",
                      color: "#222",
                    }}
                  >
                    {idx + 1}
                  </td>
                  <td
                    style={{
                      padding: 12,
                      border: "1px solid #e5e7eb",
                      color: onEdit ? "#2563eb" : "#222",
                      cursor: onEdit ? "pointer" : "default",
                      textDecoration: onEdit ? "underline" : undefined,
                      fontWeight: 500,
                    }}
                    onClick={onEdit ? () => onEdit(loan) : undefined}
                    title={onEdit ? "Edit data" : undefined}
                  >
                    {loan.nama}
                  </td>
                  <td
                    style={{
                      padding: 12,
                      border: "1px solid #e5e7eb",
                      color: "#222",
                    }}
                  >
                    {loan.noBuku}
                  </td>
                  <td
                    style={{
                      padding: 12,
                      border: "1px solid #e5e7eb",
                      color: "#222",
                    }}
                  >
                    {loan.judulBuku}
                  </td>
                  <td
                    style={{
                      padding: 12,
                      border: "1px solid #e5e7eb",
                      color: "#222",
                    }}
                  >
                    {loan.pengarang}
                  </td>
                  <td
                    style={{
                      padding: 12,
                      border: "1px solid #e5e7eb",
                      color: "#222",
                    }}
                  >
                    {loan.tglPinjam
                      ? new Date(loan.tglPinjam).toLocaleDateString("id-ID")
                      : ""}
                  </td>
                  <td
                    style={{
                      padding: 12,
                      border: "1px solid #e5e7eb",
                      color: "#222",
                    }}
                  >
                    {loan.tglKembali
                      ? new Date(loan.tglKembali).toLocaleDateString("id-ID")
                      : ""}
                  </td>
                  <td
                    style={{
                      padding: 12,
                      border: "1px solid #e5e7eb",
                      color: "#222",
                    }}
                  >
                    {loan.createdAt
                      ? new Date(loan.createdAt).toLocaleDateString("id-ID")
                      : ""}
                  </td>
                  <td
                    style={{
                      padding: 12,
                      border: "1px solid #e5e7eb",
                      color: loan.status === "Terlambat" ? "red" : "#222",
                      fontWeight: loan.status === "Terlambat" ? 700 : 400,
                    }}
                  >
                    {loan.status}
                  </td>
                  <td
                    style={{
                      padding: 12,
                      border: "1px solid #e5e7eb",
                      textAlign: "center",
                    }}
                  >
                    <Button
                      onClick={(e) => handlePopupOpen(loan.id, e)}
                      style={{ background: "transparent", cursor: "pointer" }}
                    >
                      🗑️
                    </Button>
                  </td>
                  <td
                    style={{
                      padding: 12,
                      border: "1px solid #e5e7eb",
                      textAlign: "center",
                    }}
                  >
                    <Input
                      type="checkbox"
                      checked={loan.returned ?? false}
                      onChange={() => handleReturn(loan.id)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {popupOpen && (
          <div
            style={{
              position: "fixed",
              top: popupPosition.y,
              left: popupPosition.x,
              transform: "translateX(-50%)",
              background: "#fff",
              border: "1px solid #ccc",
              borderRadius: 8,
              padding: 12,
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              zIndex: 9999,
              width: 250,
            }}
          >
            <span style={{ color: "#222", fontWeight: 600 }}>
              Yakin ingin menghapus data ini?
            </span>
            <div
              style={{
                marginTop: 8,
                display: "flex",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <Button
                onClick={() => setPopupOpen(null)}
                style={{
                  background: "#e5e7eb",
                  color: "#222",
                  fontSize: 12,
                  padding: "2px 6px",
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleDelete(popupOpen)}
                style={{
                  background: "#2563eb",
                  color: "#fff",
                  fontSize: 12,
                  padding: "2px 6px",
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

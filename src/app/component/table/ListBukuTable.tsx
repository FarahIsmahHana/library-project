"use client";

import { useState } from "react";
import { Heading, Input, Button } from "../StyledComponent";

interface Book {
  id: string;
  namaBuku: string;
  judulBuku: string;
  rak: string;
}

interface ListBukuTableProps {
  books: Book[];
}

export default function ListBukuTable({ books }: ListBukuTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  // filter berdasarkan judul buku
  const filteredBooks = books.filter((book) =>
    book.judulBuku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section style={{ width: "100%", position: "relative" }}>
      <Heading as="h3" style={{ fontSize: 20, marginBottom: 16 }}>
        Daftar Buku
      </Heading>

      <div style={{ width: "100%", overflowX: "auto" }}>
        {books.length === 0 ? (
          <tr>
            <td colSpan={4} style={{ textAlign: "center", padding: 24 }}>
              Belum ada data buku
            </td>
          </tr>
        ) : (
          <table
            style={{
              width: "100%",
              minWidth: 600,
              borderCollapse: "separate",
              borderSpacing: 0,
              background: "#fff",
              borderRadius: 12,
              boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
              overflow: "hidden",
            }}
          >
            <thead>
              <tr style={{ background: "#2563eb", color: "#fff" }}>
                <th style={{ padding: 12, border: "1px solid #e5e7eb" }}>No</th>
                <th style={{ padding: 12, border: "1px solid #e5e7eb" }}>
                  Nama Buku
                </th>
                <th
                  style={{
                    padding: 12,
                    border: "1px solid #e5e7eb",
                    minWidth: 200,
                    position: "relative",
                    verticalAlign: "top",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span style={{ fontWeight: 500 }}>Judul Buku</span>
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
                      title="Cari judul buku"
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
                        placeholder="Cari judul..."
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
                <th style={{ padding: 12, border: "1px solid #e5e7eb" }}>
                  Tempat Rak
                </th>
              </tr>
            </thead>
            <tbody style={{ color: "#111827" }}>
              {filteredBooks.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center", padding: 24 }}>
                    Tidak ada buku dengan judul tersebut
                  </td>
                </tr>
              ) : (
                filteredBooks.map((book, idx) => (
                  <tr
                    key={book.id}
                    style={{ background: idx % 2 === 0 ? "#f9fafb" : "#fff" }}
                  >
                    <td style={{ padding: 12, border: "1px solid #e5e7eb" }}>
                      {idx + 1}
                    </td>
                    <td style={{ padding: 12, border: "1px solid #e5e7eb" }}>
                      {book.namaBuku}
                    </td>
                    <td style={{ padding: 12, border: "1px solid #e5e7eb" }}>
                      {book.judulBuku}
                    </td>
                    <td style={{ padding: 12, border: "1px solid #e5e7eb" }}>
                      {book.rak}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}

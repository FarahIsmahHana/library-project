"use client";

import { useEffect, useState } from "react";
import { Button, ContentWrapper, Message } from "../component/StyledComponent";

import LoanModal from "../component/modal/LoanModal";
import BookModal from "../component/modal/BookModal";
import Navbar from "../component/layout/Navbar";
import AddButton from "../component/layout/AddButton";
import ContentArea from "../component/layout/ContentArea";
import { Book, Loan } from "../component/types";
import Sidebar from "../component/layout/Sidebar";

export default function FormClient() {
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [loans, setLoans] = useState<Loan[]>([]);
  const [activeTab, setActiveTab] = useState<"loan" | "book">("loan");
  const [books, setBooks] = useState<Book[]>([]);
  const [editLoan, setEditLoan] = useState<Loan | null>(null);
  const [form, setForm] = useState({
    nama: "",
    noBuku: "",
    judulBuku: "",
    pengarang: "",
    tglPinjam: "",
    tglKembali: "",
  });
  const [showBookModal, setShowBookModal] = useState(false);
  const [bookForm, setBookForm] = useState({
    namaBuku: "",
    judulBuku: "",
    rak: "",
  });

  // --- Fetch books ---
  const fetchBooks = async () => {
    try {
      const res = await fetch("/api/book/list");
      const data = await res.json();
      if (data.success) setBooks(data.data ?? []);
    } catch (err) {
      console.error("Gagal fetch buku:", err);
    }
  };

  const fetchLoanList = async () => {
    try {
      const res = await fetch("/api/loan/list");
      const data = await res.json();
      if (data.success) setLoans(data.data ?? []);
    } catch (err) {
      console.error("Gagal fetch buku:", err);
    }
  };

  // --- Handle Add / Edit ---
  const handleAdd = () => {
    setForm({
      nama: "",
      noBuku: "",
      judulBuku: "",
      pengarang: "",
      tglPinjam: "",
      tglKembali: "",
    });
    setIsEdit(false);
    setEditLoan(null);
    setShowModal(true);
  };

  const handleEdit = (loan: Loan) => {
    setForm({
      nama: loan.nama || "",
      noBuku: loan.noBuku || "",
      judulBuku: loan.judulBuku || "",
      pengarang: loan.pengarang || "",
      tglPinjam: loan.tglPinjam?.slice(0, 10) || "",
      tglKembali: loan.tglKembali?.slice(0, 10) || "",
    });
    setIsEdit(true);
    setEditLoan(loan);
    setShowModal(true);
  };

  const handleBookAdd = () => {
    setBookForm({ namaBuku: "", judulBuku: "", rak: "" });
    setShowBookModal(true);
  };

  // --- Handle Submit Loan / Book ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    const url = isEdit ? "/api/loan/edit" : "/api/loan";
    const body = isEdit && editLoan?.id ? { id: editLoan.id, ...form } : form;

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();

    if (data.success) {
      setMessage({
        type: "success",
        text: isEdit
          ? "✅ Data berhasil diupdate!"
          : "✅ Peminjaman berhasil disimpan!",
      });
      await fetchLoanList();
      setForm({
        nama: "",
        noBuku: "",
        judulBuku: "",
        pengarang: "",
        tglPinjam: "",
        tglKembali: "",
      });
      setShowModal(false);
      setIsEdit(false);
      setEditLoan(null);
    } else {
      setMessage({ type: "error", text: data.message });
    }
  };

  const handleBookSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    const res = await fetch("/api/book/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookForm),
    });
    const data = await res.json();
    if (data.success) {
      setMessage({ type: "success", text: "✅ Buku berhasil ditambahkan!" });
      await fetchBooks();
      setBookForm({ namaBuku: "", judulBuku: "", rak: "" });
      setShowBookModal(false);
    } else {
      setMessage({ type: "error", text: data.message });
    }
  };

  useEffect(() => {
    if (activeTab === "book") fetchBooks();
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === "loan") fetchLoanList();
  }, [activeTab]);

  return (
    <ContentWrapper>
      {message && (
        <Message
          type={message.type}
          style={{
            position: "fixed",
            top: 70,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 110,
            minWidth: 320,
            maxWidth: "90vw",
            pointerEvents: "auto",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span style={{ flex: 1 }}>{message.text}</span>
          <Button
            className="close-btn"
            onClick={() => setMessage(null)}
            aria-label="Tutup notifikasi"
          >
            ×
          </Button>
        </Message>
      )}

      <Navbar />

      <div className="flex h-screen">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 flex flex-col">
          <AddButton
            activeTab={activeTab}
            handleAdd={handleAdd}
            handleBookAdd={handleBookAdd}
          />
          <ContentArea
            activeTab={activeTab}
            loans={loans}
            books={books}
            onEdit={handleEdit}
            onMessage={(msg) => setMessage(msg)}
          />
        </div>
      </div>

      {/* Modals */}
      <LoanModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        form={form}
        setForm={setForm}
        isEdit={isEdit}
      />

      <BookModal
        open={showBookModal}
        onClose={() => setShowBookModal(false)}
        onSubmit={handleBookSubmit}
        form={bookForm}
        setForm={setBookForm}
      />
    </ContentWrapper>
  );
}

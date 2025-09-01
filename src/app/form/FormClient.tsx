"use client";

import { useState } from "react";
import {
  Button,
  ContentWrapper,
  Message,
  NavbarTitle,
  NavbarWrapper,
} from "../component/StyledComponent";
import LoanHistoryTable from "./table/LoanHistoryTable";
import LoanModal from "./modal/LoanModal";

function Navbar() {
  return (
    <NavbarWrapper>
      <div className="px-6 flex justify-between items-center">
        <NavbarTitle>📚 Perpustakaan Digital</NavbarTitle>
      </div>
    </NavbarWrapper>
  );
}

function FormClient() {
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [loans, setLoans] = useState<Loan[]>([]);

  interface Loan {
    id: string;
    nama: string;
    noBuku: string;
    judulBuku: string;
    pengarang?: string;
    tglPinjam?: string;
    tglKembali?: string;
    createdAt?: string;
  }

  const [editLoan, setEditLoan] = useState<Loan | null>(null);
  const [form, setForm] = useState({
    nama: "",
    noBuku: "",
    judulBuku: "",
    pengarang: "",
    tglPinjam: "",
    tglKembali: "",
  });

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

      // Ambil data terbaru
      try {
        const listRes = await fetch("/api/loan/list");
        const result = await listRes.json();
        const updatedLoans = result.data ?? [];
        setLoans(updatedLoans); // update state di sini
      } catch (err) {
        console.error("Gagal refresh data:", err);
      }

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
      tglPinjam: loan.tglPinjam ? loan.tglPinjam.slice(0, 10) : "",
      tglKembali: loan.tglKembali ? loan.tglKembali.slice(0, 10) : "",
    });
    setIsEdit(true);
    setEditLoan(loan);
    setShowModal(true);
  };

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

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "0 2rem 8px 2rem",
        }}
      >
        <Button
          style={{
            background: "#2563eb",
            color: "#fff",
            fontWeight: 700,
            fontSize: 15,
            borderRadius: 20,
            padding: "8px 24px",
            boxShadow: "0 2px 8px rgba(37,99,235,0.08)",
          }}
          onClick={handleAdd}
        >
          Add
        </Button>
      </div>

      <main
        style={{
          flex: 1,
          padding: "0 2rem 2rem 2rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            maxHeight: "calc(100vh - 200px)",
            background: "transparent",
          }}
        >
          <LoanHistoryTable
            data={loans}
            onEdit={handleEdit}
            onMessage={(msg) => setMessage(msg)}
          />
        </div>
      </main>

      <LoanModal
        open={showModal}
        onClose={() => {
          setShowModal(false);
          setIsEdit(false);
          setEditLoan(null);
        }}
        onSubmit={handleSubmit}
        form={form}
        setForm={setForm}
        isEdit={isEdit}
      />
    </ContentWrapper>
  );
}

export default FormClient;

"use client";
import { useEffect } from "react";
import {
  Button,
  Heading,
  Input,
  Label,
  Form,
} from "../../component/StyledComponent";

interface LoanModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  form: {
    nama: string;
    noBuku: string;
    judulBuku: string;
    pengarang: string;
    tglPinjam: string;
    tglKembali: string;
  };
  setForm: React.Dispatch<
    React.SetStateAction<{
      nama: string;
      noBuku: string;
      judulBuku: string;
      pengarang: string;
      tglPinjam: string;
      tglKembali: string;
    }>
  >;
  isEdit?: boolean;
}

export default function LoanModal({
  open,
  onClose,
  onSubmit,
  form,
  setForm,
  isEdit,
}: LoanModalProps) {
  useEffect(() => {
    if (!open) return;
    // Focus first input, dll
  }, [open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return open ? (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.25)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <section
        className="max-w-3xl mx-auto px-6 py-12"
        style={{
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 4px 32px rgba(0,0,0,0.12)",
          minWidth: 400,
          minHeight: 300,
          position: "relative",
        }}
      >
        <Button
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            fontSize: 22,
            background: "transparent",
            color: "#333",
            border: "none",
            boxShadow: "none",
          }}
          onClick={onClose}
        >
          &times;
        </Button>
        <Heading>Form Peminjaman Buku</Heading>
        <Label style={{ marginBottom: 30 }}>
          Silakan isi data di bawah ini untuk{" "}
          {isEdit ? "mengedit" : "melakukan"} peminjaman buku.
        </Label>
        <Form onSubmit={onSubmit}>
          <div>
            <Label>Nama Peminjam</Label>
            <Input
              type="text"
              id="nama"
              name="nama"
              placeholder="Masukkan nama lengkap"
              required
              value={form.nama}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Tempat Rak Buku</Label>
            <Input
              type="text"
              id="noBuku"
              name="noBuku"
              placeholder="Masukkan tempat rak buku"
              required
              value={form.noBuku}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Judul Buku</Label>
            <Input
              type="text"
              id="judulBuku"
              name="judulBuku"
              placeholder="Masukkan judul buku"
              required
              value={form.judulBuku}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Nama Pengarang</Label>
            <Input
              type="text"
              id="pengarang"
              name="pengarang"
              placeholder="Masukkan nama pengarang"
              required
              value={form.pengarang}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Tanggal Peminjaman</Label>
            <Input
              type="date"
              id="tglPinjam"
              name="tglPinjam"
              required
              value={form.tglPinjam}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Tanggal Pengembalian</Label>
            <Input
              type="date"
              id="tglKembali"
              name="tglKembali"
              required
              value={form.tglKembali}
              onChange={handleChange}
            />
          </div>

          <div style={{ marginTop: 24 }}>
            <div style={{ textAlign: "right" }}>
              <Button type="submit">
                {isEdit ? "Simpan Perubahan" : "Simpan Peminjaman"}
              </Button>
            </div>
          </div>
        </Form>
      </section>
    </div>
  ) : null;
}

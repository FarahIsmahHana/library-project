"use client";

import { useEffect } from "react";
import { Button, Form, Heading, Input, Label } from "../StyledComponent";

interface BookForm {
  namaBuku: string;
  judulBuku: string;
  rak: string;
}

interface BookModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  form: BookForm;
  setForm: React.Dispatch<React.SetStateAction<BookForm>>;
}

export default function BookModal({
  open,
  onClose,
  onSubmit,
  form,
  setForm,
}: BookModalProps) {
  useEffect(() => {
    if (!open) return;
    // Bisa tambahin auto focus di input pertama di sini
  }, [open]);

  if (!open) return null;

  return (
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
        <Heading style={{ margin: 0 }}>Daftar Buku</Heading>

        <Form onSubmit={onSubmit}>
          <div>
            <Label>Nama Buku</Label>
            <Input
              type="text"
              placeholder="Masukkan nama buku"
              value={form.namaBuku}
              onChange={(e) => setForm({ ...form, namaBuku: e.target.value })}
              required
            />
          </div>
          <div>
            <Label>Judul Buku</Label>
            <Input
              type="text"
              placeholder="Masukkan judul buku"
              value={form.judulBuku}
              onChange={(e) => setForm({ ...form, judulBuku: e.target.value })}
              required
            />
          </div>
          <div>
            <Label>Tempat Rak Buku</Label>
            <Input
              placeholder="Masukkan tempat rak buku"
              type="text"
              value={form.rak}
              onChange={(e) => setForm({ ...form, rak: e.target.value })}
              required
            />
          </div>

          <div
            style={{
              marginTop: 24,
              display: "flex",
              gap: 8,
              justifyContent: "flex-end",
            }}
          >
            <Button
              type="button"
              onClick={onClose}
              style={{ background: "#9ca3af" }}
            >
              Batal
            </Button>
            <Button type="submit">Simpan Buku</Button>
          </div>
        </Form>
      </section>
    </div>
  );
}

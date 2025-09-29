import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nama, noBuku, judulBuku, pengarang, tglPinjam, tglKembali } = body;

    if (!nama || !noBuku || !judulBuku || !pengarang || !tglPinjam || !tglKembali) {
      return NextResponse.json({ success: false, message: "Semua field wajib diisi" }, { status: 400 });
    }

    // Simpan data peminjaman ke database (contoh: tabel Loan)
    const loan = await prisma.loan.create({
      data: {
        nama,
        noBuku,
        judulBuku,
        pengarang,
        tglPinjam: new Date(tglPinjam),
        tglKembali: new Date(tglKembali),
      },
    });

    return NextResponse.json({ success: true, message: "Peminjaman berhasil disimpan", data: loan });
    } catch {
      return NextResponse.json({ success: false, message: "Terjadi kesalahan server" }, { status: 500 });
  }
}

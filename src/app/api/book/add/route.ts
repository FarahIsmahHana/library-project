// src/app/api/book/add/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { namaBuku, judulBuku, rak } = body;

    if (!namaBuku || !judulBuku || !rak) {
      return NextResponse.json(
        { success: false, message: "Semua field wajib diisi!" },
        { status: 400 }
      );
    }

    const newBook = await prisma.book.create({
      data: { namaBuku, judulBuku, rak },
    });

    return NextResponse.json({ success: true, data: newBook });
  } catch (err) {
    console.error("Error create book:", err);
    return NextResponse.json(
      { success: false, message: "Gagal menambahkan buku" },
      { status: 500 }
    );
  }
}

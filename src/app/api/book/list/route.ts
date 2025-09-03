import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const books = await prisma.book.findMany({
      orderBy: { createdAt: "desc" }, // biar urut terbaru dulu
    });

    return NextResponse.json({ success: true, data: books });
  } catch (err) {
    console.error("Error ambil list buku:", err);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data buku" },
      { status: 500 }
    );
  }
}

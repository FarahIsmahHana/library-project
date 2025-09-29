import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const loans = await prisma.loan.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, data: loans });
  } catch {
    return NextResponse.json({ success: false, message: "Gagal mengambil data peminjaman" }, { status: 500 });
  }
}

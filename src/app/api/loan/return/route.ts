import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({
        success: false,
        message: "ID tidak ditemukan",
      });
    }

    const updatedLoan = await prisma.loan.update({
      where: { id: Number(id) },
      data: { returned: true },
    });

    return NextResponse.json({
      success: true,
      message: "Buku berhasil dikembalikan!",
      data: updatedLoan,
    });
  } catch (err: unknown) {
    console.error("Error return loan:", err);
    return NextResponse.json({
      success: false,
      message: "Gagal mengembalikan buku",
    });
  }
}

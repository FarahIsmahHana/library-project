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

    const deletedLoan = await prisma.loan.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({
      success: true,
      message: "Data berhasil dihapus!",
      data: deletedLoan,
    });
  } catch (err: unknown) {
    // type narrowing biar aman
    if (err instanceof Error) {
      console.error("Error delete loan:", err.message);
    } else {
      console.error("Error delete loan:", err);
    }

    return NextResponse.json({
      success: false,
      message: "Gagal menghapus data",
    });
  }
}

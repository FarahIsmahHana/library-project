import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, tglPinjam, tglKembali, ...updateData } = body;

    if (!id) {
      return NextResponse.json({
        success: false,
        message: "ID tidak ditemukan",
      });
    }

    const updatedLoan = await prisma.loan.update({
      where: { id: Number(id) },
      data: {
        ...updateData,
        tglPinjam: tglPinjam ? new Date(tglPinjam) : undefined,
        tglKembali: tglKembali ? new Date(tglKembali) : undefined,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Data berhasil diupdate!",
      data: updatedLoan,
    });
  } catch (err: any) {
    console.error("Error update loan:", err.message);
    return NextResponse.json({
      success: false,
      message: "Gagal mengupdate data",
    });
  }
}

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Ambil hanya yang belum dikembalikan
    const loans = await prisma.loan.findMany({
      where: { returned: false },
      orderBy: { createdAt: "desc" },
    });

    const now = new Date();
    now.setHours(0, 0, 0, 0); 
    
    const loansWithStatus = loans.map((loan) => {
      let status = "On Time";
      if (loan.tglKembali) {
        const returnDate = new Date(loan.tglKembali);
        if (returnDate.getTime() < now.getTime()) {
          status = "Terlambat";
        }
      }
      return { ...loan, status };
    });

    return NextResponse.json({ success: true, data: loansWithStatus });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data peminjaman" },
      { status: 500 }
    );
  }
}

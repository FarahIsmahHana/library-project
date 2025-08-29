import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  // validasi
  if (!email || !password) {
    return NextResponse.json(
      { success: false, message: "Semua field wajib diisi" },
      { status: 400 }
    );
  }


  // Cari user di database
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return NextResponse.json(
      { success: false, message: "Email tidak ditemukan" },
      { status: 401 }
    );
  }

  // NOTE: Untuk produksi, hash password! Ini hanya contoh sederhana.
  // Misal: if (!await bcrypt.compare(password, user.password)) { ... }
  if (user.password !== password) {
    return NextResponse.json(
      { success: false, message: "Password salah" },
      { status: 401 }
    );
  }

  // Generate JWT
  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    "123", // Ganti secret di env untuk produksi
    {
      expiresIn: 600,
    }
  );

  // Simpan token ke tabel Token
  await prisma.token.create({
    data: {
      user_id: user.id,
      token,
    },
  });

  // Set JWT as HTTP-only cookie
  const response = NextResponse.json({
    success: true,
    message: "Login berhasil",
    data: {
      id: user.id,
      email: user.email,
      token,
    },
  });
  response.headers.set(
    "Set-Cookie",
    `token=${token}; HttpOnly; Path=/; Max-Age=600; SameSite=Strict` // Adjust as needed
  );
  return response;
}

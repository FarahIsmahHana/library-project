import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 });
  }
  try {
    const decoded = jwt.verify(token, "123"); // Use your secret
    return NextResponse.json({ success: true, user: decoded });
  } catch {
    return NextResponse.json({ success: false, message: "Invalid or expired token" }, { status: 401 });
  }
}

"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RegisterPage() {
  const router = useRouter();

  useEffect(() => {
    // Access cookies on the client side
    const getTokenFromCookies = () => {
      const match = document.cookie.match(new RegExp("(^| )token=([^;]+)"));
      return match ? match[2] : null;
    };

    const token = getTokenFromCookies();
    if (token) {
      // If token exists, redirect to /form
      router.replace("/form");
    } else {
      // If no token, redirect to /login
      router.replace("/login");
    }
  }, [router]);

  return null;
}

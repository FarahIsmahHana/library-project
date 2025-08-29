"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Main, Card, Title, Form, Label, Input, Button, Message } from "../component/StyledComponent";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.success) {
      setMessage({ type: "success", text: "✅ Login berhasil!" });
      setFormData({ email: "", password: "" });

      setTimeout(() => router.push("/form"), 1500);
    } else {
      setMessage({ type: "error", text: data.message });
    }
  };

  return (
    <Main>
      {message && <Message type={message.type}>{message.text}</Message>}

      <Card>
        <Title>Form Login</Title>
        <Form onSubmit={handleSubmit}>
          <div>
            <Label>Email</Label>
            <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Masukkan email" required />
          </div>
          <div>
            <Label>Password</Label>
            <Input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Masukkan password" required />
          </div>
          <Button type="submit">Login</Button>
        </Form>
      </Card>
    </Main>
  );
}

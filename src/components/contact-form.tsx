"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json() as { message?: string };
      if (!response.ok) throw new Error(result.message || "Pesan belum dapat dikirim.");
      setStatus("success");
      setMessage("Pesan sudah diterima. Saya akan membalas melalui email yang Anda cantumkan.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Terjadi masalah saat mengirim pesan.");
    }
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="field-row">
        <label>Nama<input name="name" autoComplete="name" minLength={2} maxLength={80} required /></label>
        <label>Email<input name="email" type="email" autoComplete="email" maxLength={160} required /></label>
      </div>
      <label>Perusahaan atau organisasi<input name="organization" autoComplete="organization" maxLength={120} /></label>
      <label>Apa yang ingin dibuat?<textarea name="message" rows={6} minLength={20} maxLength={2000} required /></label>
      <label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <button className="button-primary" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Mengirim..." : "Kirim pesan"}
      </button>
      {message && <p className={`form-status ${status}`} role="status">{message}</p>}
    </form>
  );
}

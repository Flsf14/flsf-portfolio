import { NextResponse } from "next/server";
import { createPublicSupabaseClient } from "@/lib/supabase";

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json() as Record<string, unknown>;
  } catch {
    return NextResponse.json({ message: "Format permintaan tidak valid." }, { status: 400 });
  }

  if (clean(body.website, 200)) return NextResponse.json({ message: "Pesan diterima." });

  const name = clean(body.name, 80);
  const email = clean(body.email, 160).toLowerCase();
  const organization = clean(body.organization, 120);
  const message = clean(body.message, 2000);
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (name.length < 2 || !emailPattern.test(email) || message.length < 20) {
    return NextResponse.json({ message: "Periksa nama, email, dan isi pesan. Pesan minimal 20 karakter." }, { status: 422 });
  }

  const supabase = createPublicSupabaseClient();
  if (!supabase) {
    return NextResponse.json(
      { message: "Form belum terhubung ke database. Silakan kirim langsung ke aaffilosof@gmail.com." },
      { status: 503 },
    );
  }

  const { error } = await supabase.from("contact_messages").insert({ name, email, organization, message });
  if (error) {
    return NextResponse.json({ message: "Pesan belum dapat disimpan. Silakan gunakan email langsung." }, { status: 500 });
  }

  return NextResponse.json({ message: "Pesan diterima." }, { status: 201 });
}

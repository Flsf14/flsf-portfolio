import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata: Metadata = { title: "Contact", description: "Hubungi Afsun Filosof untuk proyek kreatif atau peluang kerja." };

export default function ContactPage() {
  return (
    <div className="page-shell public-page contact-page">
      <header className="page-intro">
        <h1>Mari membuat sesuatu yang jelas, berguna, dan layak diingat.</h1>
        <p>Ceritakan konteks, tujuan, dan ruang lingkupnya. Saya akan membalas dengan pertanyaan atau langkah berikutnya yang paling relevan.</p>
      </header>
      <div className="contact-layout">
        <ContactForm />
        <aside>
          <p>Email</p><a href="mailto:aaffilosof@gmail.com">aaffilosof@gmail.com</a>
          <p>Lokasi</p><span>Surabaya, Indonesia</span>
          <p>Terbuka untuk</p><span>Freelance, kontrak, kolaborasi, dan peluang full-time.</span>
        </aside>
      </div>
    </div>
  );
}

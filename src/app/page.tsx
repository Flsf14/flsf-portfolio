import Link from "next/link";
import { Hero } from "@/components/hero";
import { CapabilityCarousel } from "@/components/capability-carousel";
import { ShelterLogos } from "@/components/shelter-logos";
import { SelectedWorkCarousel } from "@/components/selected-work-carousel";
import { projects } from "@/lib/projects";
import "./home.css";
import "./home-editorial.css";
import "@fontsource/playfair-display/latin-500-italic.css";

export default function HomePage() {
  const featured = projects.filter((project) => project.featured);

  return (
    <div className="home-page">
      <Hero />
      <CapabilityCarousel />
      <section className="proof-strip" aria-label="Ringkasan pencapaian">
        <div><strong>1,7 juta+</strong><span>Tayangan dalam 77 hari<br />Blue Ocean Heart</span></div>
        <div><strong>180+</strong><span>Aset lintas format<br />Blue Ocean Heart</span></div>
        <div><strong>8 sub-brand</strong><span>Identitas visual dikelola<br />CV Berlian Mandiri Perkasa</span></div>
      </section>

      <section id="selected-work" className="selected-work section-shell" aria-labelledby="selected-work-title">
        <div className="section-heading">
          <h2 id="selected-work-title">Karya pilihan.</h2>
          <p>Identitas visual, konten, dan publikasi yang pernah saya kerjakan. Buka proyek untuk melihat konteks dan prosesnya.</p>
        </div>
        <SelectedWorkCarousel projects={featured} />
        <Link className="text-link" href="/work">Lihat seluruh karya <span aria-hidden="true">→</span></Link>
      </section>

      <ShelterLogos />

      <section className="home-close section-shell">
        <h2>Mari kerjakan<br />proyek berikutnya.</h2>
        <p>Saya terbuka untuk proyek desain, produksi konten, dan peluang kerja kreatif. Ceritakan kebutuhan Anda, kita mulai dari sana.</p>
        <div className="cta-row">
          <Link className="button-primary" href="/contact">Bicarakan proyek Anda</Link>
        </div>
      </section>
    </div>
  );
}

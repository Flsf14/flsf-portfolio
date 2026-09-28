import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = { title: "About", description: "Pengalaman, keahlian, dan cara kerja Afsun Filosof." };

const experience = [
  ["2026", "Content Creator", "Blue Ocean Heart", "Strategi dan produksi konten untuk tiga akun TikTok, 180+ aset, serta sistem pelaporan performa."],
  ["2025–2026", "Creative Specialist", "CV Berlian Mandiri Perkasa", "Mengelola operasi desain dan identitas visual delapan sub-brand lintas industri."],
  ["2024", "Airport Technology Intern", "PT Angkasa Pura Indonesia", "Dokumentasi video operasi bandara dan template pelaporan visual yang dapat digunakan kembali."],
  ["2023–2024", "Editorial Designer", "Avian Brands", "Layout majalah korporat bulanan dan pembaruan sistem visual editorial."],
  ["2022–2025", "Graphic Designer & Media Information Lead", "ENT Official Campus Press", "Memimpin pipeline editorial dan tim desain peraih penghargaan tingkat nasional."],
];

export default function AboutPage() {
  return (
    <div className="page-shell public-page about-page">
      <header className="about-hero">
        <div>
          <h1>Ide yang jelas.<br />Eksekusi yang disiplin.</h1>
          <p>Saya adalah creative &amp; content specialist dengan latar teknik. Saya menikmati pekerjaan yang menuntut strategi, sistem visual, produksi, dan kemampuan beradaptasi dalam satu proses.</p>
        </div>
        <div className="about-portrait"><Image src="/afsun.webp" alt="Portrait Afsun Filosof" fill sizes="(max-width: 760px) 100vw, 38vw" /></div>
      </header>

      <section className="about-summary">
        <h2>Cara saya bekerja</h2>
        <p>Saya mencari hubungan antara kebutuhan bisnis, kebiasaan audiens, dan bentuk komunikasi. Hasil akhirnya bisa berupa identitas, konten, video, layout, atau website, tetapi keputusan dasarnya tetap sama: buat pesan lebih mudah dipahami dan bentuknya lebih mudah diingat.</p>
      </section>

      <section className="experience-section">
        <h2>Pengalaman terpilih</h2>
        <div className="experience-list">
          {experience.map(([year, role, company, description]) => (
            <article key={`${year}-${company}`}>
              <p>{year}</p><h3>{role}</h3><p>{company}</p><p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-details">
        <div><h2>Pendidikan</h2><p>D3 Teknik Telekomunikasi</p><p>Politeknik Elektronika Negeri Surabaya</p><p>GPA 3.47 / 4.00</p></div>
        <div><h2>Penghargaan</h2><p>Juara 3 Kompetisi Majalah Kampus</p><p>Polytechnic Creative Festival 2023</p><p>Tingkat nasional</p></div>
        <div><h2>Tools</h2><p>Adobe Illustrator, Photoshop, CorelDRAW, Figma, Canva, CapCut, dan workflow web berbantuan AI.</p></div>
      </section>

      <Link className="button-primary" href="/contact">Bicarakan peluang kerja</Link>
    </div>
  );
}

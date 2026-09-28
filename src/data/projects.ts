export type Project = {
  slug: string;
  title: string;
  client: string;
  year: string;
  disciplines: string[];
  formats: string[];
  summary: string;
  challenge: string;
  approach: string;
  outcome: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  assetStatus: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "blue-ocean-heart",
    title: "Content System for Vivo Retail",
    client: "Blue Ocean Heart",
    year: "2026",
    disciplines: ["Content Strategy", "Social Media", "Video"],
    formats: ["Video", "Campaign"],
    summary: "Sistem konten multi-akun yang mengubah fitur produk menjadi percakapan, ulasan, dan format edukasi yang konsisten.",
    challenge: "Tiga akun TikTok membutuhkan suara dan format berbeda tanpa kehilangan kejelasan nilai jual produk.",
    approach: "Menyusun format on-camera, full voice-over, Q&A, dan pelaporan performa untuk evaluasi mingguan.",
    outcome: "180+ aset lintas format dan lebih dari 1,7 juta tayangan dalam 77 hari.",
    image: "/work/identity-preview.webp",
    imageAlt: "Kumpulan desain social media Vivo dan Blue Ocean Heart",
    imagePosition: "center 15%",
    assetStatus: "Preview referensi dari dokumen CV. Source asset resolusi penuh belum dimasukkan.",
    featured: true,
  },
  {
    slug: "delapan-ayam",
    title: "Delapan Ayam Brand Identity",
    client: "Delapan Ayam",
    year: "2025",
    disciplines: ["Brand Identity", "Art Direction"],
    formats: ["Identity", "Print"],
    summary: "Identitas F&B yang hangat dan mudah dikenali, dibangun untuk bergerak konsisten dari kemasan hingga materi promosi.",
    challenge: "Memodernisasi identitas tanpa menghilangkan pengenalan merek yang telah dimiliki pelanggan.",
    approach: "Mengembangkan logo, sistem tipografi, warna, maskot, kemasan, dan aturan penggunaan visual.",
    outcome: "Sistem identitas siap produksi untuk kebutuhan digital dan fisik.",
    image: "/work/about-preview.webp",
    imageAlt: "Logo dan penerapan identitas merek Delapan Ayam",
    imagePosition: "center bottom",
    assetStatus: "Preview referensi dari dokumen CV. Source asset resolusi penuh belum dimasukkan.",
    featured: true,
  },
  {
    slug: "avian-editorial",
    title: "Corporate Magazine System",
    client: "Avian Brands",
    year: "2023–2024",
    disciplines: ["Editorial Design", "Layout"],
    formats: ["Editorial", "Print"],
    summary: "Pembaruan sistem layout majalah korporat agar lebih segar, teratur, dan tetap efisien untuk produksi bulanan.",
    challenge: "Menjaga konsistensi editorial selama enam bulan sambil memberi identitas baru pada tahun publikasi berikutnya.",
    approach: "Menyusun hierarki tipografi, grid editorial, ritme halaman, dan pola visual yang dapat digunakan kembali.",
    outcome: "Enam edisi bulanan dengan sistem layout yang lebih kohesif.",
    image: "",
    imageAlt: "",
    assetStatus: "Dokumentasi visual proyek ini belum tersedia.",
    featured: true,
  },
  {
    slug: "ent-campus-press",
    title: "Editorial Direction & Media System",
    client: "ENT Official Campus Press",
    year: "2022–2025",
    disciplines: ["Creative Direction", "Editorial", "Leadership"],
    formats: ["Editorial", "Social Media"],
    summary: "Sistem produksi editorial dan media informasi untuk organisasi pers kampus dengan ritme publikasi tinggi.",
    challenge: "Mengelola alur kerja dari penugasan hingga publikasi sambil menjaga kualitas visual lintas anggota tim.",
    approach: "Mengarahkan tema visual, membangun pipeline produksi, dan membimbing desainer junior.",
    outcome: "Tim meraih Juara 3 Kompetisi Majalah Politeknik Nasional 2023.",
    image: "/work/identity-preview.webp",
    imageAlt: "Tampilan akun Instagram dan desain konten EEPIS News and Network Team (ENT)",
    imagePosition: "center bottom",
    assetStatus: "Preview referensi dari dokumen CV. Source asset resolusi penuh belum dimasukkan.",
    featured: false,
  },
  {
    slug: "video-content-formats",
    title: "Video Formats That Perform",
    client: "Selected Content Work",
    year: "2024–2026",
    disciplines: ["Video Editing", "Content Production"],
    formats: ["Video", "Social Media"],
    summary: "Rangkaian format video dari conversation, review, tutorial, hingga dokumentasi korporat.",
    challenge: "Membuat informasi teknis tetap mudah dipahami dalam durasi pendek dan lingkungan feed yang cepat.",
    approach: "Menggabungkan struktur hook, voice-over, overlay informasi, ritme edit, dan evaluasi metrik.",
    outcome: "Format yang dapat diulang untuk kebutuhan retail, organisasi, dan pelaporan korporat.",
    image: "/work/video-preview.webp",
    imageAlt: "Contoh video editing dan metrik performa konten",
    assetStatus: "Preview referensi dari dokumen CV. Source asset resolusi penuh belum dimasukkan.",
    featured: true,
  },
];

export const disciplines = Array.from(
  new Set(projects.flatMap((project) => project.disciplines)),
).sort();

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

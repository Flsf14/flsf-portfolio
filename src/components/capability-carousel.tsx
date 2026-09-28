import { LoopCarousel, type LoopSlide } from "@/components/ui/loop-carousel";
import "./capability-carousel.css";

const capabilities: LoopSlide[] = [
  {
    id: "identity",
    title: "Delapan Ayam · Identitas visual",
    image: "/work/about-preview.webp",
    position: "center bottom",
    alt: "Logo, warna, kemasan, dan penerapan identitas Delapan Ayam",
    href: "/work/delapan-ayam",
    action: "Lihat proyek",
  },
  {
    id: "content",
    title: "Blue Ocean Heart · Konten media sosial",
    image: "/work/identity-preview.webp",
    position: "center top",
    alt: "Cuplikan desain konten Vivo untuk Blue Ocean Heart",
    href: "/work/blue-ocean-heart",
    action: "Lihat proyek",
  },
  {
    id: "digital",
    title: "Eksplorasi antarmuka & web",
    plate: ["Ide.", "Layout.", "Interaksi."],
    href: "/about",
    action: "Kenali kemampuan saya",
  },
  {
    id: "video",
    title: "Vivo · Video & penyampaian cerita",
    image: "/work/video-preview.webp",
    position: "center 18%",
    alt: "Cuplikan format video dan akun TikTok Vivo dari portfolio Afsun",
    href: "/work/video-content-formats",
    action: "Lihat proyek",
  },
];

export function CapabilityCarousel() {
  return (
    <section id="capabilities" className="capability" aria-labelledby="capabilities-title">
      <header className="capability-intro section-shell">
        <h2 id="capabilities-title">Dari ide hingga karya.</h2>
      </header>
      <div className="capability-layout section-shell">
        <div className="capability-copy">
          <h3>Membangun identitas, konten, dan pengalaman digital sebagai satu cerita.</h3>
          <p>Dari strategi visual hingga eksekusi lintas format, saya membantu brand menyampaikan pesannya secara konsisten, relevan, dan mudah dipahami.</p>
        </div>
        <div className="orbit-stage">
          <LoopCarousel slides={capabilities} mode="orbit" label="Eksplorasi karya dan kemampuan" />
        </div>
      </div>
    </section>
  );
}

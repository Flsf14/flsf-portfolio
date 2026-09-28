"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState } from "react";

export const panels = [
  {
    title: "Tentang Saya",
    body: "Saya membantu brand menerjemahkan ide menjadi identitas, konten, dan pengalaman digital yang mudah dikenali.",
  },
  {
    title: "Cara Saya Bekerja",
    body: "Berangkat dari strategi, membangun sistem visual, lalu menyesuaikannya ke berbagai format tanpa kehilangan karakter merek.",
  },
  {
    title: "Dampak Terukur",
    body: "1,7 juta lebih tayangan dalam 77 hari, 180 lebih aset konten, serta pengalaman menangani delapan sub-brand dari industri yang berbeda.",
  },
  {
    title: "Cakupan Keahlian",
    body: "Brand identity, editorial, social media, video, UI/UX, hingga pengembangan web berbantuan AI.",
  },
  {
    title: "Latar Belakang",
    body: "Lulusan Teknik Telekomunikasi yang berkembang menjadi creative specialist, content creator, dan pemimpin tim editorial peraih penghargaan nasional.",
  },
];

export function StickyProfile() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.min(panels.length - 1, Math.floor(value * panels.length));
    setActive(next);
  });

  return (
    <section id="profile-story" ref={ref} className="profile-story" aria-label="Tentang Afsun Filosof">
      <div className="profile-sticky">
        <div className="portrait-column">
          <div className="portrait-stripe" aria-hidden="true" />
          <Image src="/afsun.webp" alt="Afsun Filosof mengenakan seragam ENT" fill sizes="(max-width: 760px) 88vw, 42vw" priority />
          <p className="portrait-note">Creative mind<br />disciplined process</p>
        </div>
        <div className="profile-copy desktop-story" aria-live="polite">
          <div className="story-progress" aria-hidden="true">
            {panels.map((_, index) => <span key={index} className={index === active ? "current" : ""} />)}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -24, filter: "blur(6px)" }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="story-count">{String(active + 1).padStart(2, "0")} / {String(panels.length).padStart(2, "0")}</p>
              <h2>{panels[active].title}</h2>
              <p>{panels[active].body}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className="story-mobile">
        {panels.map((panel, index) => (
          <article key={panel.title}>
            <p className="story-count">{String(index + 1).padStart(2, "0")}</p>
            <h2>{panel.title}</h2>
            <p>{panel.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

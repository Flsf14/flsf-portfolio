"use client";

import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import { TextScramble } from "@/components/ui/text-scramble";
import "./hero-story.css";

const chapters = [
  { label: "Summary", stop: 34, enter: 30, exit: 38 },
  { label: "Pengalaman Kerja", stop: 53, enter: 48, exit: 59 },
  { label: "Organisasi", stop: 75, enter: 69, exit: 81 },
  { label: "Skill & Software", stop: 95, enter: 90, exit: 100 },
];
const DESKTOP_QUERY = "(min-width: 901px) and (min-height: 620px) and (prefers-reduced-motion: no-preference)";

type Entry = { role: string; org: string; period: string; note?: string };

type Segment =
  | { kind: "summary"; name: string; role: string; body: string; education: string }
  | { kind: "entries"; entries: Entry[] }
  | { kind: "skills"; groups: { label: string; items: string }[] };

const segments: Segment[] = [
  {
    kind: "summary",
    name: "Afsun Filosof",
    role: "Creative & Content Specialist",
    body: "Versatile creative dengan fondasi kuat di brand identity, strategi kampanye digital, dan produksi konten multi-platform. Terbiasa membangun identitas visual end-to-end lintas industri — F&B, retail, fashion, beauty, hingga education.",
    education: "D3 Telecommunication Engineering — PENS (2022–2025)",
  },
  {
    kind: "entries",
    entries: [
      {
        role: "Content Creator",
        org: "Blue Ocean Heart (Official Vivo Reseller)",
        period: "Apr – Jul 2026",
        note: "Produksi 60+ konten/bulan lintas 3 akun TikTok, menghasilkan 1.7M+ views dalam 77 hari.",
      },
      {
        role: "Creative Specialist",
        org: "CV Berlian Mandiri Perkasa",
        period: "Okt 2025 – Mar 2026",
        note: "Mengelola identitas visual 8 sub-brand F&B, Fashion, Beauty & Education — 90–110+ aset desain/bulan.",
      },
      {
        role: "Content & Video Documentation",
        org: "PT Angkasa Pura Indonesia (Injourney Airports)",
        period: "Intern, 2024",
        note: "Skor evaluasi magang: 93.4.",
      },
    ],
  },
  {
    kind: "entries",
    entries: [
      {
        role: "Graphic Design Lead",
        org: "ENT — Official Campus Press",
        period: "2022–2025",
        note: "Membawa tim ke Juara 3 Nasional — Polytechnic Creative Festival (Campus Magazine Competition).",
      },
      { role: "Staff Media & Informasi", org: "Badan Eksekutif Mahasiswa (BEM) PENS", period: "2023–2025" },
      { role: "Merchandise Designer", org: "Trensains Official Merchandise", period: "2021–2022" },
    ],
  },
  {
    kind: "skills",
    groups: [
      { label: "Design", items: "Brand Identity · Typography · UI/UX · Social Media Campaign · Print Design · Infographics" },
      { label: "Tools", items: "Adobe Illustrator · Photoshop · CorelDRAW · Figma · Canva · CapCut" },
      { label: "Technical", items: "AI-Assisted Web Development · Basic UI Prototyping (Vercel deployment)" },
    ],
  },
];

function chapterIndexFor(time: number) {
  if (time < chapters[0].enter) return -1;
  return chapters.slice(1).reduce((active, chapter, index) =>
    time >= (chapters[index].exit + chapter.enter) / 2 ? index + 1 : active, 0);
}

function SegmentBody({ segment }: { segment: Segment }) {
  if (segment.kind === "summary") {
    return (
      <>
        <h2 className="segment-name">{segment.name}</h2>
        <p className="segment-role">{segment.role}</p>
        <p className="segment-body">{segment.body}</p>
        <p className="segment-meta">{segment.education}</p>
      </>
    );
  }
  if (segment.kind === "entries") {
    return (
      <ol className="segment-entries">
        {segment.entries.map((entry) => (
          <li key={entry.role + entry.period}>
            <h2 className="entry-role">{entry.role}</h2>
            <p className="entry-meta">
              <span>{entry.org}</span>
              <span>{entry.period}</span>
            </p>
            {entry.note ? <p className="entry-note">{entry.note}</p> : null}
          </li>
        ))}
      </ol>
    );
  }
  return (
    <dl className="segment-skills">
      {segment.groups.map((group) => (
        <div key={group.label}>
          <dt>{group.label}</dt>
          <dd>{group.items}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const introTopRef = useRef<HTMLDivElement>(null);
  const introBottomRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const profileRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const segmentRefs = useRef<Array<HTMLElement | null>>([]);
  const contentRefs = useRef<Array<HTMLDivElement | null>>([]);
  const chapterRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const section = ref.current;
    const stage = stageRef.current;
    const intro = introRef.current;
    const profile = profileRef.current;
    const portrait = portraitRef.current;
    const panels = panelsRef.current;
    const progress = progressRef.current;
    if (!section || !stage || !intro || !profile || !portrait || !panels || !progress) return;
    const scope: HTMLElement = section;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();

    media.add(DESKTOP_QUERY, () => {
      let animationContext: gsap.Context | undefined;
      let resizeTimer: ReturnType<typeof setTimeout> | undefined;
      let disposed = false;
      let lastChapter = -2;

      function setAvailable(node: HTMLElement, available: boolean) {
        node.inert = !available;
        if (available) node.removeAttribute("aria-hidden");
        else node.setAttribute("aria-hidden", "true");
      }

      function restoreReadingOrder() {
        setAvailable(intro!, true);
        if (introBottomRef.current) setAvailable(introBottomRef.current, true);
        setAvailable(profile!, true);
        segmentRefs.current.forEach((node) => node && setAvailable(node, true));
        chapterRefs.current.forEach((node) => node?.removeAttribute("aria-current"));
        if (counterRef.current) counterRef.current.textContent = `01 / ${String(chapters.length).padStart(2, "0")}`;
        lastChapter = -2;
      }

      function syncReadingOrder(time: number) {
        // An invisible link or chapter must never remain in keyboard navigation.
        setAvailable(intro!, time < 20);
        if (introBottomRef.current) setAvailable(introBottomRef.current, time < 12);
        setAvailable(profile!, time >= chapters[0].enter);
        const chapter = chapterIndexFor(time);
        if (lastChapter === chapter) return;
        lastChapter = chapter;
        segmentRefs.current.forEach((node, index) => node && setAvailable(node, index === chapter));
        chapterRefs.current.forEach((node, index) => {
          if (index === chapter) node?.setAttribute("aria-current", "step");
          else node?.removeAttribute("aria-current");
        });
        if (counterRef.current) counterRef.current.textContent = `${String(Math.max(0, chapter) + 1).padStart(2, "0")} / ${String(chapters.length).padStart(2, "0")}`;
      }

      function configure() {
        if (disposed) return;
        animationContext?.revert();
        animationContext = undefined;
        timelineRef.current = null;
        restoreReadingOrder();
        section!.dataset.cinematic = "true";

        // Larger fonts, browser zoom, or a short window can exceed a fixed panel.
        // In that case every CV group returns to the normal document flow.
        const availableHeight = panels!.clientHeight;
        const contentFits = contentRefs.current.every((node) => !node || node.scrollHeight <= availableHeight - 8);
        if (availableHeight < 1 || !contentFits) {
          section!.dataset.cinematic = "false";
          ScrollTrigger.refresh();
          return;
        }

        animationContext = gsap.context(() => {
          const letters = letterRefs.current.filter((node): node is HTMLSpanElement => node !== null);
          gsap.set(profile, { autoAlpha: 0 });
          gsap.set(portrait, { y: 36, scale: 0.97, autoAlpha: 0, transformOrigin: "50% 100%" });
          const panelNodes = segmentRefs.current.filter((node): node is HTMLElement => node !== null);
          gsap.set(panelNodes, { yPercent: 100, autoAlpha: 0 });
          gsap.set(panelNodes[0], { yPercent: 0, autoAlpha: 1 });
          gsap.set(progress, { scaleX: 0 });

          const timeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              id: "home-hero",
              trigger: section,
              pin: stage,
              start: "top top",
              end: () => `+=${Math.round(window.innerHeight * (segments.length + 1))}`,
              scrub: 0.4,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              refreshPriority: 1,
              snap: {
                // Only settle incomplete transitions; reading holds never move.
                snapTo: (value: number) => {
                  const time = value * 100;
                  for (let index = 0; index < chapters.length - 1; index++) {
                    const start = chapters[index].exit;
                    const end = chapters[index + 1].enter;
                    if (time > start && time < end) return (time < (start + end) / 2 ? start : end) / 100;
                  }
                  return value;
                },
                delay: 0.22,
                duration: { min: 0.18, max: 0.38 },
                inertia: false,
                ease: "power2.out",
              },
            },
          });

          timeline
            .to(letters, { autoAlpha: 0, duration: 20 / letters.length, stagger: 20 / letters.length }, 0)
            .to([introTopRef.current, introBottomRef.current], { autoAlpha: 0, duration: 12 }, 0)
            .to(profile, { autoAlpha: 1, duration: 2 }, 20)
            // The portrait settles once; it stays fixed throughout the CV panels.
            .to(portrait, { y: 0, scale: 1, autoAlpha: 1, duration: 8, ease: "power3.out" }, 20)
            .fromTo(contentRefs.current[0]!.children,
              { y: 22, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 5.6, stagger: 0.8, ease: "power3.out" }, 22);

          chapters.slice(1).forEach((chapter, index) => {
            const start = chapters[index].exit;
            const duration = chapter.enter - start;
            timeline
              .to(panelNodes[index], { yPercent: -100, autoAlpha: 0, duration: duration * 0.85, ease: "power2.in" }, start)
              .to(panelNodes[index + 1], { yPercent: 0, autoAlpha: 1, duration: duration * 0.85, ease: "power2.out" }, start + duration * 0.15)
              .fromTo(contentRefs.current[index + 1]!.children, { y: 18 }, { y: 0, stagger: 0.25, duration: duration * 0.65, ease: "power2.out" }, start + duration * 0.25);
          });

          // This also reserves the final ten units as a fully visible last panel.
          timeline.to(progress, { scaleX: 1, duration: 100 }, 0);
          timeline.eventCallback("onUpdate", () => syncReadingOrder(timeline.time()));
          timelineRef.current = timeline;
          syncReadingOrder(timeline.time());
        }, scope);
        ScrollTrigger.refresh();
      }

      const onResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(configure, 160);
      };

      configure();
      window.addEventListener("resize", onResize);
      // Self-hosted fonts may finish after the first layout measurement.
      void document.fonts.ready.then(() => {
        if (!disposed) onResize();
      });

      return () => {
        disposed = true;
        clearTimeout(resizeTimer);
        window.removeEventListener("resize", onResize);
        animationContext?.revert();
        timelineRef.current = null;
        section.dataset.cinematic = "false";
        restoreReadingOrder();
        if (introBottomRef.current) setAvailable(introBottomRef.current, true);
      };
    });

    return () => media.revert();
  }, []);

  function goToSegment(index: number) {
    const trigger = timelineRef.current?.scrollTrigger;
    if (!trigger) {
      segmentRefs.current[index]?.scrollIntoView({ block: "start", behavior: "instant" });
      return;
    }
    window.scrollTo({
      top: trigger.start + (trigger.end - trigger.start) * chapters[index].stop / 100,
      behavior: "smooth",
    });
  }

  return (
    <section id="hero-section" ref={ref} className="hero-sequence" data-cinematic="false" aria-label="Portfolio dan perkenalan Afsun Filosof">
      <div className="sequence-stage" ref={stageRef}>
        <div className="sequence-intro" ref={introRef}>
          <div className="intro-identity" ref={introTopRef}>
            <p>Afsun Filosof</p>
            <p>Creative &amp; Content Specialist</p>
          </div>
          <h1 className="sequence-title" aria-label="Portfolio">
            <TextScramble className="title-arrival" characterSet="abcdefghijklmnopqrstuvwxyz" registerCharacter={(index, node) => { letterRefs.current[index] = node; }}>Portfolio</TextScramble>
          </h1>
          <div className="intro-bottom" ref={introBottomRef}>
            <p>Scroll untuk membaca perkenalan</p>
            <a href="#selected-work">
              Lihat karya pilihan <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        <div id="profile-story" className="sequence-profile" ref={profileRef}>
          <figure className="sequence-portrait">
            <div className="sequence-portrait-media" ref={portraitRef}>
              <Image src="/my.webp" alt="Afsun Filosof mengenakan jas almamater PENS" fill sizes="(max-width: 900px) 93vw, 50vw" priority />
            </div>
            <figcaption>Afsun Filosof</figcaption>
          </figure>

          <div className="sequence-about">
            <header className="about-head">
              <span>Perkenalan</span>
              <span ref={counterRef} aria-hidden="true">01 / {String(chapters.length).padStart(2, "0")}</span>
            </header>
            <div className="about-panels" ref={panelsRef}>
                {segments.map((segment, index) => (
                  <article
                    id={`profile-chapter-${index + 1}`}
                    key={index}
                    data-index={index}
                    className="about-segment"
                    aria-label={chapters[index].label}
                    ref={(node) => { segmentRefs.current[index] = node; }}
                  >
                    <div className="segment-content" ref={(node) => { contentRefs.current[index] = node; }}>
                      <SegmentBody segment={segment} />
                    </div>
                  </article>
                ))}
            </div>
            <nav className="sequence-chapters" aria-label="Bagian perkenalan">
              {chapters.map(({ label }, index) => (
                <button
                  type="button"
                  key={label}
                  ref={(node) => { chapterRefs.current[index] = node; }}
                  onClick={() => goToSegment(index)}
                  aria-controls={`profile-chapter-${index + 1}`}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="sequence-track" aria-hidden="true"><div ref={progressRef} /></div>
      </div>
    </section>
  );
}

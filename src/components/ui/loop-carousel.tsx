"use client";

import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { useLayoutEffect, useRef } from "react";
import { circularSplitRollPosition } from "./circular-split-roll-geometry";
import "./loop-carousel.css";

export type LoopSlide = {
  id: string;
  title: string;
  image?: string;
  alt?: string;
  position?: string;
  href: string;
  action: string;
  description?: string;
  meta?: string;
  plate?: string[];
};

const wrap = (value: number, count: number) => ((value % count) + count) % count;
const COVERFLOW_PITCH = 1.08;
const LOOP_MS_PER_ITEM = 7500;
const SETTLE_SECONDS = .55;

/** Circular and coverflow projections share one clock and interaction lifecycle. */
export function LoopCarousel({ slides, mode, label }: {
  slides: LoopSlide[];
  mode: "orbit" | "coverflow";
  label: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const count = slides.length;
  // The reference uses ten cards. Repeat existing artwork around the wheel;
  // captions/navigation still describe only the real, unique projects.
  const ringCount = mode === "orbit" && count > 1 ? count * 2 : count;
  const visualSlides = Array.from({ length: ringCount }, (_, index) => slides[index % count]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const frame = frameRef.current;
    if (!root || !frame || count < 1) return;
    const cards = Array.from(frame.querySelectorAll<HTMLElement>(".loop-card"));
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const state = { position: 0 };
    let target = 0;
    let selected = -1;
    let width = 0;
    let orbitRadius = 500;
    let cardWidth = 0;
    let visible = false;
    let focused = false;
    let running = false;
    let disposed = false;
    let settling: gsap.core.Tween | undefined;

    root.dataset.ready = "true";
    cards.forEach((card) => { card.inert = true; card.setAttribute("aria-hidden", "true"); });
    const context = gsap.context(() => {
      gsap.set(cards, { x: 0, y: 0, z: 0, scale: 1, rotationY: 0, opacity: 1 });
    }, root);
    const setters = cards.map((card) => ({
      x: gsap.quickSetter(card, "x", "px"),
      y: gsap.quickSetter(card, "y", "px"),
      z: gsap.quickSetter(card, "z", "px"),
      rotate: gsap.quickSetter(card, "rotationY", "deg"),
      scale: gsap.quickSetter(card, "scale"),
      opacity: gsap.quickSetter(card, "opacity"),
      order: gsap.quickSetter(card, "zIndex"),
    }));

    function paint() {
      if (disposed) return;
      setters.forEach((set, index) => {
        let offset = wrap(index - state.position, count);
        if (offset > count / 2) offset -= count;
        if (preference.matches || count === 1) {
          set.x(0); set.y(0); set.z(0); set.rotate(0); set.scale(1);
          set.opacity(index === wrap(Math.round(state.position), count) ? 1 : 0);
          set.order(index === wrap(Math.round(state.position), count) ? 10 : 0);
        } else if (mode === "orbit") {
          const point = circularSplitRollPosition(index, state.position, ringCount, orbitRadius);
          // Put the wheel center beyond the right edge, exposing its focus arc.
          set.x(point.x + orbitRadius - width * .08);
          set.y(point.y);
          set.z(0); set.rotate(0);
          set.scale(point.scale);
          set.opacity(point.opacity);
          set.order(point.zIndex);
        } else {
          const distance = Math.abs(offset);
          const ramp = Math.pow(distance, .6);
          // At the ring's seam the wrapping card is fully invisible.
          const edge = Math.min(1, Math.max(0, count / 2 - distance));
          set.x(offset * cardWidth * COVERFLOW_PITCH);
          set.y(0); set.z(-cardWidth * .48 * ramp);
          set.rotate(-Math.sign(offset) * Math.min(38 * ramp, 72));
          set.scale(1); set.opacity(Math.max(0, 1 - .14 * distance) * edge);
          set.order(100 - Math.round(distance * 20));
        }
      });
      const next = wrap(Math.round(state.position), count);
      if (next !== selected) {
        selected = next;
        cards.forEach((card, index) => {
          const accessible = mode === "coverflow" && index === next;
          card.inert = !accessible;
          card.setAttribute("aria-hidden", String(!accessible));
        });
      }
    }

    function tick(_time: number, delta: number) {
      state.position = wrap(state.position + Math.min(delta, 64) / LOOP_MS_PER_ITEM, ringCount);
      target = state.position;
      paint();
    }

    function syncClock() {
      const shouldRun = !disposed && count > 1 && visible && !document.hidden
        && !preference.matches && !focused && !settling;
      if (shouldRun === running) return;
      running = shouldRun;
      root!.dataset.running = String(running);
      if (running) gsap.ticker.add(tick);
      else gsap.ticker.remove(tick);
    }

    function stopSettle() { settling?.kill(); settling = undefined; }
    function settle(next: number) {
      stopSettle();
      target = next;
      if (preference.matches) {
        state.position = wrap(next, ringCount);
        target = state.position;
        paint(); syncClock();
        return;
      }
      settling = gsap.to(state, {
        position: next, duration: SETTLE_SECONDS, ease: "power3.out", onUpdate: paint,
        onComplete: () => {
          settling = undefined;
          state.position = wrap(state.position, ringCount);
          target = state.position;
          paint(); syncClock();
        },
      });
      syncClock();
    }

    const step = (by: number) => { settle(Math.round(target) + by); };

    function measure() {
      width = frame!.clientWidth;
      orbitRadius = 500 * Math.min(1, window.innerWidth / 1200);
      cardWidth = cards[0]?.offsetWidth ?? 0;
      paint();
    }
    const onPreference = () => {
      stopSettle();
      state.position = Math.round(state.position);
      target = state.position;
      paint(); syncClock();
    };
    const onFocus = () => { focused = true; syncClock(); };
    const onBlur = (event: FocusEvent) => {
      focused = !!event.relatedTarget && root!.contains(event.relatedTarget as Node);
      syncClock();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight" || (mode === "orbit" && (event.key === "ArrowUp" || event.key === "ArrowDown"))) {
        event.preventDefault(); step(event.key === "ArrowLeft" || event.key === "ArrowDown" ? -1 : 1);
      }
    };
    const onVisibility = () => {
      if (document.hidden) { stopSettle(); state.position = Math.round(state.position); target = state.position; paint(); }
      syncClock();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= .35;
      syncClock();
    }, { threshold: [0, .35, .7] });
    const resize = new ResizeObserver(measure);
    resize.observe(frame);
    observer.observe(frame);
    preference.addEventListener("change", onPreference);
    document.addEventListener("visibilitychange", onVisibility);
    root.addEventListener("focusin", onFocus);
    root.addEventListener("focusout", onBlur);
    frame.addEventListener("keydown", onKey);
    measure(); onPreference();

    return () => {
      disposed = true;
      gsap.ticker.remove(tick);
      stopSettle();
      observer.disconnect(); resize.disconnect();
      preference.removeEventListener("change", onPreference);
      document.removeEventListener("visibilitychange", onVisibility);
      root.removeEventListener("focusin", onFocus);
      root.removeEventListener("focusout", onBlur);
      frame.removeEventListener("keydown", onKey);
      context.revert();
      cards.forEach((card) => { card.inert = false; card.removeAttribute("aria-hidden"); });
      delete root.dataset.ready; delete root.dataset.running;
    };
  }, [count, mode, ringCount]);

  if (!count) return null;
  return (
    <div ref={rootRef} className={`loop-carousel loop-${mode}`} role="region" aria-roledescription="carousel" aria-label={label}>
      <div ref={frameRef} className="loop-frame" tabIndex={0} role="group" aria-label={mode === "orbit" ? "Carousel vertikal; gunakan panah atas dan bawah" : "Carousel karya; gunakan panah kiri dan kanan"}>
        <div className="loop-track">
          {visualSlides.map((slide, index) => (
            <figure className="loop-card" key={`${slide.id}-${index}`} data-copy={index >= count ? "true" : undefined}>
              {mode === "coverflow" ? <Link className="loop-card-link" href={slide.href} aria-label={`${slide.title}. ${slide.action}`}>
                <div className={`loop-image${slide.image ? "" : " loop-type"}`}>
                  {slide.image ? <Image src={slide.image} alt={slide.alt ?? slide.title} fill sizes="(max-width: 600px) 72vw, (max-width: 1200px) 38vw, 420px" style={{ objectPosition: slide.position ?? "center" }} draggable={false} />
                    : <div className="loop-type-content"><span>{slide.meta ?? "Eksplorasi digital"}</span><p>{(slide.plate ?? [slide.title]).map((line) => <span key={line}>{line}</span>)}</p><span>{slide.image === "" ? "Catatan proyek" : "Konsep & prototipe"}</span></div>}
                </div>
              </Link> : <div className={`loop-image${slide.image ? "" : " loop-type"}`}>
                {slide.image ? <Image src={slide.image} alt={slide.alt ?? slide.title} fill sizes="(max-width: 600px) 72vw, (max-width: 1200px) 38vw, 420px" style={{ objectPosition: slide.position ?? "center" }} draggable={false} />
                  : <div className="loop-type-content"><span>{slide.meta ?? "Eksplorasi digital"}</span><p>{(slide.plate ?? [slide.title]).map((line) => <span key={line}>{line}</span>)}</p><span>{slide.image === "" ? "Catatan proyek" : "Konsep & prototipe"}</span></div>}
              </div>}
              <figcaption className="loop-fallback-caption"><Link href={slide.href}>{slide.title}</Link></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";

type TextScrambleProps = {
  children: string;
  duration?: number;
  characterSet?: string;
  className?: string;
  registerCharacter?: (index: number, node: HTMLSpanElement | null) => void;
};

export function TextScramble({
  children,
  duration = 0.8,
  characterSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  className,
  registerCharacter,
}: TextScrambleProps) {
  const glyphs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let stopped = false;
    let previousTick = -1;
    const started = performance.now();

    function finish() {
      stopped = true;
      cancelAnimationFrame(frame);
      glyphs.current.forEach((node, index) => {
        if (node) node.textContent = children[index];
      });
    }

    function draw(now: number) {
      if (stopped) return;
      const progress = Math.min(1, (now - started) / Math.max(1, duration * 1000));
      const tick = Math.floor((now - started) / 40);
      if (tick !== previousTick) {
        previousTick = tick;
        glyphs.current.forEach((node, index) => {
          if (!node) return;
          node.textContent = children[index] === " " || index < progress * children.length
            ? children[index]
            : characterSet[Math.floor(Math.random() * characterSet.length)] || children[index];
        });
      }
      if (progress === 1) finish();
      else frame = requestAnimationFrame(draw);
    }

    // Scroll owns the exit. Restore literal characters before it erases them.
    const onScroll = () => { if (window.scrollY > 2) finish(); };
    const onPreference = () => { if (preference.matches) finish(); };
    if (preference.matches || window.scrollY > 2 || !characterSet) finish();
    else frame = requestAnimationFrame(draw);
    window.addEventListener("scroll", onScroll, { passive: true });
    preference.addEventListener("change", onPreference);
    return () => {
      finish();
      window.removeEventListener("scroll", onScroll);
      preference.removeEventListener("change", onPreference);
    };
  }, [children, duration, characterSet]);

  return (
    <span className={className} aria-hidden="true">
      {children.split("").map((letter, index) => (
        <span className="letter-window" key={index} ref={(node) => registerCharacter?.(index, node)}>
          <span className="scramble-measure">{letter}</span>
          <span className="scramble-glyph" ref={(node) => { glyphs.current[index] = node; }}>{letter}</span>
        </span>
      ))}
    </span>
  );
}

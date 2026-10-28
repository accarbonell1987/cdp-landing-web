"use client";

import { useEffect, useRef, useState } from "react";
import { type MilestoneStatus, milestones } from "@/data/company";
import { cn } from "@/lib/utils";

const statusLabel: Record<MilestoneStatus, string> = {
  hecho: "Hecho",
  "en-curso": "En curso",
  proximo: "Próximo",
};

// Line that draws itself as the section crosses the middle of the screen, based on
// "Scroll animated timeline" (21st.dev). Horizontal from lg, vertical below. Each
// milestone lights up when the line reaches it. Without JS or with reduced motion
// the line is drawn in full.
export function MilestoneTrack() {
  const ref = useRef<HTMLOListElement>(null);
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const read = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const start = window.innerHeight * 0.85;
      const span = Math.max(rect.height, window.innerHeight * 0.35);
      setProgress(Math.min(1, Math.max(0, (start - rect.top) / span)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const last = milestones.length - 1 || 1;

  return (
    <ol ref={ref} className="relative grid gap-y-10 pl-8 lg:grid-cols-4 lg:pl-0">
      <span
        aria-hidden="true"
        className="absolute top-0 bottom-0 left-[3px] w-1 bg-navy-soft lg:inset-x-0 lg:bottom-auto lg:h-1 lg:w-auto"
      />
      <span
        aria-hidden="true"
        className="absolute top-0 bottom-0 left-[3px] w-1 origin-top bg-white transition-transform duration-150 ease-out lg:inset-x-0 lg:bottom-auto lg:h-1 lg:w-auto lg:origin-left max-lg:[transform:scaleY(var(--p))] lg:[transform:scaleX(var(--p))]"
        style={{ "--p": progress } as React.CSSProperties}
      />
      {milestones.map((m, i) => {
        const active = progress >= i / last - 0.02;
        return (
          <li
            key={m.title}
            className={cn(
              "relative flex flex-col gap-3 pr-6 transition-[opacity,translate] duration-500 lg:pt-6",
              active ? "translate-y-0 opacity-100" : "translate-y-3 opacity-60",
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "absolute top-1.5 -left-8 size-3 -translate-x-[3px] rounded-full border-2 transition-colors lg:-top-1 lg:left-0 lg:translate-x-0",
                active ? "border-white bg-red" : "border-navy-soft bg-navy",
              )}
            />
            <span
              className={cn(
                "self-start rounded-full text-[15px] font-bold",
                m.status === "hecho" && "bg-white px-3 py-0.5 text-navy",
                m.status === "en-curso" && "px-3 py-0.5 text-white shadow-[inset_0_0_0_1.5px_#fff]",
                m.status === "proximo" && "py-0.5 text-[#d5dcea]",
              )}
            >
              {statusLabel[m.status]}
            </span>
            <span className="display text-[32px]">{m.year}</span>
            <h3 className="text-[21px] font-bold">{m.title}</h3>
            <p className="text-[17px] text-[#d5dcea]">{m.text}</p>
          </li>
        );
      })}
    </ol>
  );
}

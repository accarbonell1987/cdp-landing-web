"use client";

import { Check, Clock } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { type MilestoneStatus, milestones } from "@/data/company";
import { cn } from "@/lib/utils";

const statusLabel: Record<MilestoneStatus, string> = {
  hecho: "Hecho",
  "en-curso": "En curso",
  proximo: "Próximo",
};

// Milestone cards on a rail that fills in red as the section scrolls into view,
// based on "Scroll animated timeline" (21st.dev). Horizontal from lg, vertical
// below. Each marker lights up when the rail reaches it; the stage in progress
// gets the white card. Without JS or with reduced motion the rail is drawn in full.
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
    <ol ref={ref} className="relative grid gap-6 pl-14 lg:grid-cols-4 lg:gap-5 lg:pt-14 lg:pl-0">
      {/* Horizontal rail through the centre of the markers, from lg. */}
      <span
        aria-hidden="true"
        className="absolute top-[18px] right-[12.5%] left-[12.5%] h-1 rounded-full bg-white/15 max-lg:hidden"
      />
      <span
        aria-hidden="true"
        className="absolute top-[18px] right-[12.5%] left-[12.5%] h-1 origin-left rounded-full bg-red transition-transform duration-150 ease-out [transform:scaleX(var(--p))] max-lg:hidden"
        style={{ "--p": progress } as React.CSSProperties}
      />
      {milestones.map((m, i) => {
        const active = progress >= i / last - 0.02;
        return (
          <li
            key={m.title}
            className={cn(
              "relative transition-[opacity,translate] duration-500",
              active ? "translate-y-0" : "translate-y-3",
            )}
          >
            {/* Below lg each stage draws its own piece of rail down to the next marker. */}
            {i < last && (
              <span aria-hidden="true" className="absolute top-10 -bottom-6 -left-[38px] w-1 bg-white/15 lg:hidden">
                <span
                  className="block size-full origin-top bg-red transition-transform duration-150 ease-out [transform:scaleY(var(--s))]"
                  style={{ "--s": Math.min(1, Math.max(0, progress * last - i)) } as React.CSSProperties}
                />
              </span>
            )}
            <span
              aria-hidden="true"
              className={cn(
                "absolute top-0 -left-14 grid size-10 place-items-center rounded-full border-4 border-navy transition-colors duration-500 lg:-top-14 lg:left-1/2 lg:-translate-x-1/2",
                !active && "bg-navy-soft text-white",
                active && m.status === "hecho" && "bg-white text-navy",
                active && m.status === "en-curso" && "bg-red text-white",
                active && m.status === "proximo" && "bg-white/20 text-white",
              )}
            >
              {m.status === "hecho" && <Check className="size-4" strokeWidth={3} />}
              {m.status === "en-curso" && (
                <span className="relative flex size-2.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-white opacity-75 motion-reduce:animate-none" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-white" />
                </span>
              )}
              {m.status === "proximo" && <Clock className="size-4" strokeWidth={2.5} />}
            </span>
            <div
              className={cn(
                "flex h-full flex-col gap-2 rounded-[20px] p-6 transition-colors duration-500",
                m.status === "en-curso" ? "bg-white text-ink" : "bg-white/[0.07] text-white",
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="display text-[30px]">{m.year}</span>
                <span
                  className={cn(
                    "rounded-full px-3 py-0.5 text-[14px] font-bold",
                    m.status === "hecho" && "bg-white text-navy",
                    m.status === "en-curso" && "bg-red text-white",
                    m.status === "proximo" && "text-[#d5dcea] shadow-[inset_0_0_0_1.5px_rgba(213,220,234,0.6)]",
                  )}
                >
                  {statusLabel[m.status]}
                </span>
              </div>
              <h3 className="text-[21px] font-bold">{m.title}</h3>
              <p className={cn("text-[17px]", m.status === "en-curso" ? "text-ink-soft" : "text-[#d5dcea]")}>
                {m.text}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

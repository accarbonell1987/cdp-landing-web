"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef } from "react";

type Props = {
  src: StaticImageData;
  alt: string;
  labelStart: string;
  labelEnd: string;
};

const ease = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
const sizes = "(min-width: 1180px) 1100px, 100vw";

// Tall block with a sticky 16:9 frame: scrolling through it reveals the color
// render over a blueprint version, bottom to top, with a scan line on the edge.
// Based on "PlanosScrub" (cdp-animaciones). Writes styles straight to the DOM so
// scrolling does not re-render React. With reduced motion it shows the render.
export function PlanosScrub({ src, alt, labelStart, labelEnd }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const obraRef = useRef<HTMLDivElement>(null);
  const scanRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const obra = obraRef.current;
    const scan = scanRef.current;
    const stage = stageRef.current;
    if (!el || !obra || !scan || !stage) return;
    const percents = el.querySelectorAll<HTMLElement>("[data-percent]");

    const paint = (p: number) => {
      const e = ease(p);
      const top = `${((1 - e) * 100).toFixed(2)}%`;
      obra.style.clipPath = `inset(${top} 0 0 0)`;
      scan.style.top = top;
      scan.style.opacity = p > 0.02 && p < 0.98 ? "1" : "0";
      percents.forEach((node) => (node.textContent = `${Math.round(e * 100)} %`));
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      paint(1);
      return;
    }

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        // The stage fills the viewport on desktop; on phones it is only as tall
        // as the frame, so measure it instead of assuming innerHeight.
        const stickyTop = parseFloat(getComputedStyle(stage).top) || 0;
        const total = el.offsetHeight - stage.offsetHeight;
        const p = (stickyTop - el.getBoundingClientRect().top) / total;
        paint(total > 0 ? Math.min(1, Math.max(0, p)) : 1);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const label = "whitespace-nowrap rounded-[3px] bg-[rgba(5,12,28,0.55)] px-2.5 py-1.5 tabular-nums backdrop-blur-[4px]";

  return (
    <div ref={ref} className="relative motion-safe:sm:h-[260svh]">
      {/* Phones: the stage hugs the frame (no empty band after the scrub) and a spacer adds the scroll run. */}
      <div
        ref={stageRef}
        className="sticky top-[max(16px,calc(50svh-28vw-48px))] flex flex-col items-center justify-center gap-3 overflow-hidden sm:top-0 motion-safe:sm:h-svh motion-reduce:static"
      >
        <div className="relative aspect-video w-[min(100%,1100px,calc(84svh*16/9))] overflow-hidden rounded-2xl">
          <div aria-hidden="true" className="cdp-scrub-plano absolute inset-0">
            <Image src={src} alt="" fill sizes={sizes} className="object-cover" />
          </div>
          <div aria-hidden="true" className="cdp-scrub-grid absolute inset-0" />
          <div ref={obraRef} className="absolute inset-0" style={{ clipPath: "inset(100% 0 0 0)" }}>
            <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
          </div>
          <div
            ref={scanRef}
            aria-hidden="true"
            className="cdp-scrub-scan absolute inset-x-0 h-0.5 bg-white"
            style={{ top: "100%", opacity: 0 }}
          />
          <div className="absolute inset-x-0 bottom-0 hidden justify-between p-[16px_18px] text-[12px] tracking-[0.12em] text-white uppercase sm:flex">
            <span className={label}>{labelStart}</span>
            <span className={label} aria-hidden="true" data-percent>
              0 %
            </span>
            <span className={label}>{labelEnd}</span>
          </div>
        </div>
        <div className="flex w-full items-start justify-between gap-2 text-[11px] tracking-[0.08em] text-white uppercase sm:hidden">
          <span className={`${label} whitespace-normal`}>{labelStart}</span>
          <span className={label} aria-hidden="true" data-percent>
            0 %
          </span>
          <span className={`${label} whitespace-normal text-right`}>{labelEnd}</span>
        </div>
      </div>
      <div aria-hidden="true" className="h-[160svh] sm:hidden motion-reduce:hidden" />
    </div>
  );
}

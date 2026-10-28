"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  /** Stagger in ms, for items in a row. */
  delay?: number;
  className?: string;
  as?: "div" | "li";
  /** "fade" un-blurs into view; "rise" is the gallery's 28px rise (cdp-animaciones). */
  variant?: "fade" | "rise";
};

// Fade + un-blur into view, based on "Reveal" (21st.dev). Content is visible by
// default: it is only hidden once JS runs, motion is allowed and the element is
// still below the fold, so nothing stays invisible without JavaScript.
export function Reveal({ children, delay = 0, className, as: Tag = "div", variant = "fade" }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    const rise = variant === "rise";
    if (rise) el.classList.add("cdp-wait");
    else el.dataset.reveal = "hidden";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (rise) el.classList.remove("cdp-wait");
        else el.dataset.reveal = "shown";
        observer.disconnect();
      },
      rise ? { threshold: 0.2 } : { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [variant]);

  const delayVar = variant === "rise" ? "transitionDelay" : "--reveal-delay";
  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement & HTMLLIElement>}
      className={cn(variant === "rise" ? "cdp-rise-in" : "reveal", className)}
      style={delay ? ({ [delayVar]: `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}

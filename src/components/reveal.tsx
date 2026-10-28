"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  /** Stagger in ms, for items in a row. */
  delay?: number;
  className?: string;
  as?: "div" | "li";
};

// Fade + un-blur into view, based on "Reveal" (21st.dev). Content is visible by
// default: it is only hidden once JS runs, motion is allowed and the element is
// still below the fold, so nothing stays invisible without JavaScript.
export function Reveal({ children, delay = 0, className, as: Tag = "div" }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    el.dataset.reveal = "hidden";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.reveal = "shown";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement & HTMLLIElement>}
      className={cn("reveal", className)}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}

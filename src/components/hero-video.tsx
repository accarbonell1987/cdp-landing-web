"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Silent loop of the project tour over the hero image. The image stays the
// LCP: the video only starts loading after the page has loaded, fades in once
// it plays and pauses while the hero is off screen. With reduced motion or
// data saver on, it never loads and the still image (with Ken Burns off) stays.
export function HeroVideo({ src, className }: { src: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (saveData || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const start = () => {
      video.src = src;
      video.play().catch(() => {});
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });

    const observer = new IntersectionObserver(([entry]) => {
      if (!video.src) return;
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    observer.observe(video);
    return () => {
      window.removeEventListener("load", start);
      observer.disconnect();
    };
  }, [src]);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
      onPlaying={() => setPlaying(true)}
      className={cn("object-cover opacity-0 transition-opacity duration-1000", playing && "opacity-100", className)}
    />
  );
}

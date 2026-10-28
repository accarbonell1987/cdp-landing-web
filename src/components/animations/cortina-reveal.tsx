"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  src: StaticImageData;
  alt: string;
  sizes: string;
  className?: string;
};

// A navy panel covers the image and slides off to the right when it enters the
// viewport, while the image settles its zoom. Fires once. Based on
// "CortinaReveal" (cdp-animaciones). The panel only exists once JS arms it, so
// without JavaScript or with reduced motion the image is simply visible.
export function CortinaReveal({ src, alt, sizes, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "armed" | "in">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setState("armed");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setState("in");
        observer.disconnect();
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", state !== "idle" && "cdp-mask", className)}
      data-in={state === "in" ? "" : undefined}
    >
      <Image src={src} alt={alt} placeholder="blur" fill sizes={sizes} className="object-cover" />
    </div>
  );
}

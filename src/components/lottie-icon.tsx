"use client";

import type { AnimationItem } from "lottie-web";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  /** Lottie JSON under public/, e.g. "/lottie/fabrica.json". */
  src: string;
  className?: string;
  loop?: boolean;
};

// Decorative Lottie animation (LottieFiles, SVG renderer). The player and the JSON
// load only when the box nears the viewport. It plays once on entry and again on
// hover of the closest `.group`; with reduced motion it shows the last frame still.
export function LottieIcon({ src, className, loop = false }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let anim: AnimationItem | undefined;
    let cancelled = false;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const group = el.closest<HTMLElement>(".group") ?? el;
    const replay = () => {
      if (still || !anim) return;
      anim.goToAndPlay(0, true);
    };

    const load = async () => {
      const [{ default: lottie }, data] = await Promise.all([
        import("lottie-web/build/player/lottie_light"),
        fetch(src).then((res) => res.json()),
      ]);
      if (cancelled) return;
      anim = lottie.loadAnimation({
        container: el,
        renderer: "svg",
        loop: loop && !still,
        autoplay: !still,
        animationData: data,
        rendererSettings: { preserveAspectRatio: "xMidYMid meet" },
      });
      if (still) anim.addEventListener("DOMLoaded", () => anim?.goToAndStop(anim.totalFrames - 1, true));
      group.addEventListener("mouseenter", replay);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        load().catch(() => {});
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(el);

    return () => {
      cancelled = true;
      observer.disconnect();
      group.removeEventListener("mouseenter", replay);
      anim?.destroy();
    };
  }, [src, loop]);

  return <span ref={ref} aria-hidden="true" className={cn("inline-block", className)} />;
}

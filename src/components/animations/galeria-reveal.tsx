"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { GalleryItem } from "@/data/renders";

// Delay within the visual row: the first row holds the wide card and one more.
const stagger = (i: number) => (i < 2 ? i : (i - 2) % 3) * 120;

// Cards rise in staggered as they enter the viewport and the image drifts with
// a soft parallax while scrolling. Based on "GaleriaReveal" (cdp-animaciones).
// Cards are only hidden once JS runs; with reduced motion nothing moves.
export function GaleriaReveal({ items }: { items: GalleryItem[] }) {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const figs = Array.from(root.querySelectorAll<HTMLElement>(":scope > li"));

    figs.forEach((f) => f.classList.add("cdp-wait"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.remove("cdp-wait");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2 },
    );
    figs.forEach((f) => observer.observe(f));

    let raf = 0;
    const parallax = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        figs.forEach((f) => {
          const r = f.getBoundingClientRect();
          if (r.bottom < 0 || r.top > window.innerHeight) return;
          // Clamped so the 120% image never uncovers the card edges.
          const c = Math.max(-0.8, Math.min(0.8, (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight));
          const img = f.querySelector<HTMLElement>("img");
          if (img) img.style.transform = `translateY(${(c * -10).toFixed(2)}%)`;
        });
      });
    };
    window.addEventListener("scroll", parallax, { passive: true });
    parallax();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", parallax);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <ul ref={ref} className="cdp-gal grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-[18px]">
      {items.map((item, i) => (
        <li
          key={item.caption}
          className="cdp-rise-in relative aspect-[4/3] overflow-hidden rounded-2xl bg-white/10"
          style={{ transitionDelay: `${stagger(i)}ms` }}
        >
          <figure className="absolute inset-0 m-0">
            <Image
              src={item.src}
              alt={item.alt}
              placeholder="blur"
              fill
              sizes={i === 0 ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 50vw"}
              className="object-cover"
              style={{ height: "120%", top: "-10%" }}
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-[rgba(5,12,28,0.75)] to-transparent px-4 pt-8 pb-3.5 text-[14px] text-white">
              {item.caption}
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}

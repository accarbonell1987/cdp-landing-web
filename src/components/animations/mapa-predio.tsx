"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import type { Hotspot } from "@/data/renders";

type Props = {
  aerial: StaticImageData;
  aerialAlt: string;
  hotspots: Hotspot[];
};

const sizes = "(min-width: 1400px) 1320px, 100vw";

// Aerial view with hotspots: picking one zooms toward that point and crossfades
// to the street-level render of the place. Based on "MapaPredio"
// (cdp-animaciones). Focus moves to "Volver" on open and back to the hotspot on
// close. With reduced motion the views switch without zoom (see globals.css).
export function MapaPredio({ aerial, aerialAlt, hotspots }: Props) {
  const [active, setActive] = useState<Hotspot | null>(null);
  const [shown, setShown] = useState<string | null>(null);
  const backRef = useRef<HTMLButtonElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number>(undefined);

  const open = (h: Hotspot) => {
    window.clearTimeout(timer.current);
    setActive(h);
    setShown(h.id);
    window.setTimeout(() => backRef.current?.focus({ preventScroll: true }), 0);
  };
  const close = () => {
    const id = active?.id;
    setActive(null);
    timer.current = window.setTimeout(() => setShown(null), 900);
    window.setTimeout(
      () => rootRef.current?.querySelector<HTMLElement>(`[data-hotspot="${id}"]`)?.focus({ preventScroll: true }),
      0,
    );
  };

  const style = active
    ? ({ "--z": active.zoom, "--tx": `${50 - active.x}%`, "--ty": `${50 - active.y}%` } as CSSProperties)
    : undefined;

  return (
    <div className="flex flex-col gap-4">
      <div
        ref={rootRef}
        className="cdp-map group relative isolate aspect-video overflow-hidden rounded-2xl bg-[#1b2a1a]"
        style={style}
        data-open={active ? "" : undefined}
        onKeyDown={(e) => {
          if (e.key === "Escape" && active) close();
        }}
      >
        <div className="cdp-map-aerial absolute inset-0">
          <Image src={aerial} alt={aerialAlt} placeholder="blur" fill sizes={sizes} className="object-cover" />
        </div>

        {hotspots.map((h) => (
          <button
            key={h.id}
            type="button"
            data-hotspot={h.id}
            className="cdp-map-hot absolute grid size-11 -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center rounded-full focus-visible:outline-white"
            style={{ left: `${h.x}%`, top: `${h.y}%` }}
            onClick={() => open(h)}
            tabIndex={active ? -1 : 0}
            aria-label={`Ver ${h.label}`}
          >
            <i aria-hidden="true" className="relative size-3.5 rounded-full bg-white shadow-[0_0_0_3px_rgba(11,42,91,0.9)]" />
            <span
              aria-hidden="true"
              className={cn(
                "absolute top-1/2 hidden -translate-y-1/2 rounded-[3px] bg-navy/85 px-[9px] py-[5px] text-[12px] font-semibold tracking-[0.06em] whitespace-nowrap text-white uppercase sm:block",
                h.labelSide === "left" ? "right-[calc(100%-8px)]" : "left-[calc(100%-8px)]",
              )}
            >
              {h.label}
            </span>
          </button>
        ))}

        {hotspots.map((h) => (
          <figure
            key={h.id}
            className="cdp-map-scene absolute inset-0 m-0"
            data-on={shown === h.id ? "" : undefined}
            aria-hidden={shown !== h.id}
          >
            <Image src={h.src} alt={h.alt} placeholder="blur" fill sizes={sizes} className="object-cover" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-[rgba(5,12,28,0.8)] to-transparent px-5 pt-10 pb-[18px] text-white">
              <b className="display block text-[clamp(18px,2vw,24px)]">{h.label}</b>
              <small className="text-[14px] text-[#cfe0ff]">{h.caption}</small>
            </figcaption>
          </figure>
        ))}

        <button
          ref={backRef}
          type="button"
          className="cdp-map-back absolute top-3.5 left-3.5 z-10 min-h-11 cursor-pointer rounded-[4px] bg-white px-3.5 text-[15px] font-semibold text-navy"
          onClick={close}
          tabIndex={active ? 0 : -1}
          aria-hidden={!active}
        >
          ← Volver a la vista aérea
        </button>
        <p className="pointer-events-none absolute top-3.5 right-3.5 hidden rounded-full sm:block sm:group-data-open:hidden bg-white/90 px-3 py-1 text-[13px] text-ink-soft">
          Visualización del proyecto
        </p>
      </div>

      {/* On phones the labels don't fit on the aerial view: list the places below it. */}
      <ul aria-label="Partes del predio" className="flex flex-wrap gap-2 sm:hidden">
        {hotspots.map((h) => (
          <li key={h.id}>
            <button
              type="button"
              onClick={() => open(h)}
              aria-pressed={active?.id === h.id}
              className="min-h-11 rounded-full bg-mist px-4 text-[15px] font-semibold text-navy aria-pressed:bg-navy aria-pressed:text-white"
            >
              {h.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

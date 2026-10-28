"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { tour } from "@/data/company";
import { useMediaQuery, useReducedMotion } from "@/hooks/use-media-query";

const FPS = 24;
// Share of the scroll that scrubs the video; the rest is the hand-off to the next section.
const VIDEO_SHARE = 0.88;
// Fade windows per caption: [fade-in start, fully in, fade-out start, gone].
const CAPTION_WINDOWS = [
  [-1, 0, 0.04, 0.1],
  [0.1, 0.16, 0.3, 0.36],
  [0.36, 0.42, 0.56, 0.62],
  [0.62, 0.68, 0.84, 0.9],
] as const;

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

function captionOpacity(p: number, [a, b, c, d]: readonly number[]) {
  if (p <= a || p >= d) return 0;
  if (p < b) return (p - a) / (b - a);
  if (p > c) return 1 - (p - c) / (d - c);
  return 1;
}

// Critically damped chase with a speed cap, from "Magic Hour" (21st.dev): it is
// what keeps the scrub smooth when the visitor flicks the scroll wheel.
function smoothDamp(
  current: number,
  target: number,
  velocity: number,
  smoothTime: number,
  maxSpeed: number,
  dt: number,
) {
  const omega = 2 / smoothTime;
  const x = omega * dt;
  const decay = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);
  const maxChange = maxSpeed * smoothTime;
  const change = clamp(current - target, -maxChange, maxChange);
  const temp = (velocity + omega * change) * dt;
  let nextVelocity = (velocity - omega * temp) * decay;
  let next = current - change + (change + temp) * decay;
  if (target - current > 0 === next > target) {
    next = target;
    nextVelocity = 0;
  }
  return [next, nextVelocity] as const;
}

export function PlantTour() {
  const reduced = useReducedMotion();
  return reduced ? <StaticTour /> : <ScrollTour />;
}

// Scroll owns the timeline: the section is several screens tall, the frame stays
// pinned, and progress through the section picks the video frame, the caption and
// the closing fade into the navy of "Avance de obra".
function ScrollTour() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const captionRefs = useRef<(HTMLElement | null)[]>([]);
  const [ready, setReady] = useState(false);
  // Known only after mount, so only one cut is downloaded.
  const small = useMediaQuery("(max-width: 640px)");
  const src = small === null ? null : small ? "/media/recorrido-scrub-movil.mp4" : "/media/recorrido-scrub.mp4";

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video || !src) return;

    let frames = 0;
    let position = 0;
    let target = 0;
    let velocity = 0;
    let lastFrame = -1;
    let lastTime = 0;
    let chase = 0;
    let pending: number | null = null;

    // Seeks are serialized: while the decoder is busy the latest frame waits for "seeked".
    const seek = (time: number) => {
      if (video.seeking) {
        pending = time;
        return;
      }
      pending = null;
      video.currentTime = time;
    };
    const onSeeked = () => {
      if (pending !== null) seek(pending);
    };

    const loop = (now: number) => {
      chase = 0;
      const dt = lastTime ? Math.min((now - lastTime) / 1000, 1 / 30) : 1 / 60;
      lastTime = now;
      [position, velocity] = smoothDamp(position, target, velocity, 0.11, FPS * 4, dt);
      const frame = Math.round(clamp(position, 0, frames - 1));
      if (frame !== lastFrame) {
        lastFrame = frame;
        seek(Math.min(frame / FPS, video.duration - 0.001));
      }
      if (Math.abs(target - position) > 0.002 || Math.abs(velocity) > 0.002) chase = requestAnimationFrame(loop);
      else lastTime = 0;
    };

    let tick = 0;
    const update = () => {
      tick = 0;
      const rect = section.getBoundingClientRect();
      const stick = Math.min(window.innerHeight, 860);
      const p = clamp(-rect.top / (rect.height - stick));

      captionRefs.current.forEach((el, i) => {
        if (el) el.style.opacity = String(captionOpacity(p, CAPTION_WINDOWS[i]));
      });
      const end = clamp((p - VIDEO_SHARE) / (1 - VIDEO_SHARE));
      if (frameRef.current) frameRef.current.style.transform = `scale(${1 - end * 0.06})`;
      if (veilRef.current) veilRef.current.style.opacity = String(end);
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;

      if (frames) {
        target = clamp(p / VIDEO_SHARE) * (frames - 1);
        if (!chase) chase = requestAnimationFrame(loop);
      }
    };
    const onScroll = () => {
      if (!tick) tick = requestAnimationFrame(update);
    };

    const onLoaded = () => {
      frames = Math.max(1, Math.round(video.duration * FPS));
      setReady(true);
      update();
    };

    video.muted = true;
    video.addEventListener("seeked", onSeeked);
    if (video.readyState >= 2) onLoaded();
    else video.addEventListener("loadeddata", onLoaded, { once: true });
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("loadeddata", onLoaded);
      cancelAnimationFrame(tick);
      cancelAnimationFrame(chase);
    };
  }, [src]);

  return (
    <section
      ref={sectionRef}
      id="recorrido"
      aria-labelledby="recorrido-title"
      className="relative h-[2800px] bg-navy text-white max-sm:h-[2200px]"
    >
      <div className="sticky top-0 h-[min(100svh,860px)] overflow-hidden">
        <div ref={frameRef} className="absolute inset-0 origin-[50%_60%] will-change-transform">
          <Image src="/media/recorrido-poster.jpg" alt="" fill preload sizes="100vw" className="object-cover" />
          {src && (
            <video
              ref={videoRef}
              src={src}
              poster="/media/recorrido-poster.jpg"
              muted
              playsInline
              preload="auto"
              disablePictureInPicture
              aria-hidden="true"
              className="absolute inset-0 size-full object-cover transition-opacity duration-300"
              style={{ opacity: ready ? 1 : 0 }}
            />
          )}
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(11,42,91,0.35)_0%,rgba(11,42,91,0)_30%,rgba(11,42,91,0)_45%,rgba(11,42,91,0.85)_100%)]"
        />
        <div ref={veilRef} aria-hidden="true" className="absolute inset-0 bg-navy opacity-0" />

        <p className="absolute top-5 right-[var(--gutter)] text-[14px] text-[#e4e9f2]">Visualización del proyecto</p>

        <div className="wrap relative h-full">
          <div
            ref={(el) => {
              captionRefs.current[0] = el;
            }}
            className="absolute inset-x-[var(--gutter)] bottom-[15%] flex flex-col gap-3.5"
          >
            <p className="kicker text-white">Recorrido</p>
            <h2 id="recorrido-title" className="display max-w-[16ch] text-[clamp(36px,4.6vw,68px)]">
              {tour.title}
            </h2>
            <p className="text-[19px] text-[#e4e9f2]">{tour.intro}</p>
          </div>
          {tour.captions.map((caption, i) => (
            <p
              key={caption}
              ref={(el) => {
                captionRefs.current[i + 1] = el;
              }}
              className="display absolute inset-x-[var(--gutter)] bottom-[15%] max-w-[22ch] text-[clamp(30px,3.6vw,54px)] opacity-0"
            >
              {caption}
            </p>
          ))}
        </div>

        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1 bg-white/20">
          <div ref={barRef} className="h-full origin-left scale-x-0 bg-red" />
        </div>
      </div>
    </section>
  );
}

// Reduced motion: no video and no pinned scroll, just the poster and all captions.
function StaticTour() {
  return (
    <section id="recorrido" aria-labelledby="recorrido-title" className="relative bg-navy text-white">
      <div className="relative h-[min(100vh,860px)] min-h-[520px] overflow-hidden">
        <Image src="/media/recorrido-poster.jpg" alt="" fill sizes="100vw" className="object-cover" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(11,42,91,0.35)_0%,rgba(11,42,91,0)_22%,rgba(11,42,91,0.55)_50%,rgba(11,42,91,0.92)_75%)]"
        />
        <p className="absolute top-5 right-[var(--gutter)] text-[14px] text-[#e4e9f2]">Visualización del proyecto</p>
        <div className="wrap relative flex h-full flex-col justify-end gap-6 pb-[10%]">
          <p className="kicker text-white">Recorrido</p>
          <h2 id="recorrido-title" className="display max-w-[16ch] text-[clamp(36px,4.6vw,68px)]">
            {tour.title}
          </h2>
          <ol className="grid max-w-[1100px] gap-x-8 gap-y-3 text-[19px] text-[#e4e9f2] md:grid-cols-3">
            {tour.captions.map((caption) => (
              <li key={caption} className="border-t-2 border-white/40 pt-3">
                {caption}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

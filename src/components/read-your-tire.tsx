"use client";

import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { tireCodeExample, tireCodeParts } from "@/data/tires";
import { cn } from "@/lib/utils";

// Which dimension of the diagram each part of the code points at.
const highlight: Record<string, "width" | "profile" | "rim" | undefined> = {
  "205": "width",
  "/55": "profile",
  "16": "rim",
};

export function ReadYourTire() {
  const [selected, setSelected] = useState(0);
  const part = tireCodeParts[selected];
  const focus = highlight[part.code];

  return (
    <section id="lee-tu-neumatico" aria-labelledby="lee-title" className="pb-24">
      <div className="wrap">
        <Reveal className="flex flex-col gap-8 rounded-3xl bg-white p-[clamp(24px,4vw,56px)]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="flex max-w-[640px] flex-col gap-4">
              <p className="kicker">Guía</p>
              <h2 id="lee-title" className="display text-[clamp(34px,3.8vw,56px)]">
                Leé tu neumático.
              </h2>
              <p className="text-ink-soft">
                El flanco de cada neumático lleva un código. Tocá cada parte para saber qué significa.
              </p>
            </div>
            <p className="text-[15px] text-muted-foreground">Ejemplo: {tireCodeExample}</p>
          </div>

          <div
            role="group"
            aria-label={`Partes del código ${tireCodeExample}`}
            className="flex flex-wrap items-baseline gap-1"
          >
            {tireCodeParts.map((p, i) => (
              <button
                key={p.code}
                type="button"
                aria-pressed={i === selected}
                aria-label={`${p.code}: ${p.title}`}
                onClick={() => setSelected(i)}
                className={cn(
                  "display min-h-11 rounded-[14px] px-3.5 py-2.5 text-[clamp(40px,7vw,104px)] leading-none font-extrabold tracking-[-0.02em] transition-colors",
                  i === selected ? "bg-navy text-white" : "text-navy hover:bg-mist",
                )}
              >
                {p.code}
              </button>
            ))}
          </div>

          <div className="grid items-center gap-8 border-t-[3px] border-red pt-7 lg:grid-cols-2">
            <div aria-live="polite" className="flex flex-col gap-2.5">
              <p className="text-[15px] font-bold tracking-[0.06em] text-red uppercase">{part.code}</p>
              <h3 className="display text-[clamp(28px,3vw,40px)] text-navy">{part.title}</h3>
              <p className="max-w-[48ch] text-[19px] text-ink-soft">{part.text}</p>
            </div>
            <TireDiagram focus={focus} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TireDiagram({ focus }: { focus?: "width" | "profile" | "rim" }) {
  const tone = (key: "width" | "profile" | "rim") =>
    cn("transition-opacity duration-300", focus && focus !== key ? "opacity-25" : "opacity-100");
  return (
    <svg
      viewBox="-10 -24 470 250"
      role="img"
      aria-label="Corte de un neumático con el ancho, el alto del flanco y el diámetro de la llanta"
      className="h-auto w-full max-w-[480px] justify-self-center"
    >
      <rect x="130" y="20" width="160" height="70" rx="26" fill="#16233A" />
      <rect x="130" y="130" width="160" height="70" rx="26" fill="#16233A" />
      <rect x="150" y="90" width="120" height="40" fill="#C9D1DE" />
      <g fontSize="13" fontFamily="var(--font-source-sans), sans-serif" fill="var(--ink)">
        <g className={tone("width")}>
          <line x1="130" y1="10" x2="290" y2="10" stroke="var(--red)" strokeWidth={focus === "width" ? 4 : 2} />
          <text x="210" y="2" textAnchor="middle">
            Ancho 205 mm
          </text>
        </g>
        <g className={tone("profile")}>
          <line x1="310" y1="20" x2="310" y2="90" stroke="var(--red)" strokeWidth={focus === "profile" ? 4 : 2} />
          <text x="318" y="60">
            Flanco: 55% del ancho
          </text>
        </g>
        <g className={tone("rim")}>
          <line x1="110" y1="90" x2="110" y2="130" stroke="var(--navy)" strokeWidth={focus === "rim" ? 4 : 2} />
          <text x="102" y="114" textAnchor="end">
            Llanta 16&quot;
          </text>
        </g>
      </g>
    </svg>
  );
}

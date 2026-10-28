import Image from "next/image";
import { tour } from "@/data/company";

// Fase 1: versión estática (poster + textos). En la fase 2 el scroll avanza el video
// dentro de un bloque sticky y los textos aparecen por tramos.
export function PlantTour() {
  return (
    <section id="recorrido" aria-labelledby="recorrido-title" className="relative bg-navy text-white">
      <div className="relative h-[min(100vh,860px)] min-h-[520px] overflow-hidden">
        <Image
          src="/media/recorrido-poster.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
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

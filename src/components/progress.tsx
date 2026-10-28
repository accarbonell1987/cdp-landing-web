import Image from "next/image";
import entrada from "@/assets/media/render-entrada.jpg";
import hall from "@/assets/media/render-hall.jpg";
import sitePlan from "@/assets/media/render-site-plan.jpg";
import { SectionHeading } from "@/components/section-heading";
import { milestones, type MilestoneStatus } from "@/data/company";
import { cn } from "@/lib/utils";

const statusLabel: Record<MilestoneStatus, string> = {
  hecho: "Hecho",
  "en-curso": "En curso",
  proximo: "Próximo",
};

const gallery = [
  { src: entrada, alt: "Visualización del pórtico de acceso a la planta" },
  { src: hall, alt: "Visualización del interior de la nave de producción" },
  { src: sitePlan, alt: "Visualización aérea del predio con la nave y los accesos" },
];

export function Progress() {
  return (
    <section id="avance" aria-labelledby="avance-title" className="bg-navy py-24 text-white">
      <div className="wrap flex flex-col gap-14">
        <SectionHeading
          id="avance-title"
          kicker="Avance de obra"
          title="De los planos a la primera cubierta."
          aside="Fechas estimadas. Las actualizamos con cada etapa cumplida."
          inverse
        />
        <ol className="grid gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {milestones.map((m) => (
            <li
              key={m.title}
              className={cn(
                "flex flex-col gap-3 border-t-4 pt-6 pr-6",
                m.status === "hecho" ? "border-white" : "border-navy-soft",
              )}
            >
              <span
                className={cn(
                  "self-start rounded-full text-[15px] font-bold",
                  m.status === "hecho" && "bg-white px-3 py-0.5 text-navy",
                  m.status === "en-curso" && "px-3 py-0.5 text-white shadow-[inset_0_0_0_1.5px_#fff]",
                  m.status === "proximo" && "py-0.5 text-[#d5dcea]",
                )}
              >
                {statusLabel[m.status]}
              </span>
              <span className="display text-[32px]">{m.year}</span>
              <h3 className="text-[21px] font-bold">{m.title}</h3>
              <p className="text-[17px] text-[#d5dcea]">{m.text}</p>
            </li>
          ))}
        </ol>
        <ul className="grid gap-4 md:grid-cols-3">
          {gallery.map((img) => (
            <li key={img.alt}>
              <Image
                src={img.src}
                alt={img.alt}
                placeholder="blur"
                sizes="(min-width: 768px) 33vw, 100vw"
                className="aspect-[3/2] w-full rounded-2xl object-cover"
              />
            </li>
          ))}
        </ul>
        <p className="text-[15px] text-[#d5dcea]">Imágenes: visualizaciones del proyecto.</p>
      </div>
    </section>
  );
}

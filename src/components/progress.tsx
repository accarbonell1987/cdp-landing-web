import Image from "next/image";
import entrada from "@/assets/media/render-entrada.jpg";
import hall from "@/assets/media/render-hall.jpg";
import sitePlan from "@/assets/media/render-site-plan.jpg";
import { SectionHeading } from "@/components/section-heading";
import { MilestoneTrack } from "@/components/milestone-track";
import { Reveal } from "@/components/reveal";

const gallery = [
  { src: entrada, alt: "Visualización del pórtico de acceso a la planta" },
  { src: hall, alt: "Visualización del interior de la nave de producción" },
  {
    src: sitePlan,
    alt: "Visualización aérea del predio con la nave y los accesos",
  },
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
        <MilestoneTrack />
        <ul className="grid gap-4 md:grid-cols-3">
          {gallery.map((img, i) => (
            <Reveal as="li" key={img.alt} delay={i * 90}>
              <Image
                src={img.src}
                alt={img.alt}
                placeholder="blur"
                sizes="(min-width: 768px) 33vw, 100vw"
                className="aspect-[3/2] w-full rounded-2xl object-cover"
              />
            </Reveal>
          ))}
        </ul>
        <p className="text-[15px] text-[#d5dcea]">Imágenes: visualizaciones del proyecto.</p>
      </div>
    </section>
  );
}

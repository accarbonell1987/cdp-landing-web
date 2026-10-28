import { GaleriaReveal } from "@/components/animations/galeria-reveal";
import { PlanosScrub } from "@/components/animations/planos-scrub";
import { MilestoneTrack } from "@/components/milestone-track";
import { SectionHeading } from "@/components/section-heading";
import { gallery, planosScrub } from "@/data/renders";

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
        <PlanosScrub {...planosScrub} />
        <MilestoneTrack />
        <GaleriaReveal items={gallery} />
        <p className="text-[15px] text-[#d5dcea]">Imágenes: visualizaciones del proyecto.</p>
      </div>
    </section>
  );
}

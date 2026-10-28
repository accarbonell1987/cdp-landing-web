import { MapaPredio } from "@/components/animations/mapa-predio";
import { SectionHeading } from "@/components/section-heading";
import { predio } from "@/data/renders";

export function SiteMap() {
  return (
    <section id="predio" aria-labelledby="predio-title" className="py-24">
      <div className="wrap flex flex-col gap-10">
        <SectionHeading id="predio-title" kicker={predio.kicker} title={predio.title} aside={predio.text} />
        <MapaPredio aerial={predio.aerial} aerialAlt={predio.aerialAlt} hotspots={predio.hotspots} />
      </div>
    </section>
  );
}

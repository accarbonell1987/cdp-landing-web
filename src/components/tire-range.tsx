import { Check } from "lucide-react";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { tireFamilies } from "@/data/tires";

export function TireRange() {
  return (
    <section id="neumaticos" aria-labelledby="neumaticos-title" className="py-24">
      <div className="wrap flex flex-col gap-10">
        <SectionHeading
          id="neumaticos-title"
          kicker="Neumáticos"
          title="Los neumáticos que vamos a fabricar."
          aside="Cinco familias para lo que se mueve en Paraguay. Medidas y modelos de ejemplo, sujetos a homologación."
        />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {tireFamilies.map((family, i) => (
            <Reveal as="li" key={family.id} variant="rise" delay={i * 120} className="card-soft flex flex-col overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden bg-mist">
                <Image
                  src={family.image}
                  alt=""
                  placeholder="blur"
                  sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="card-soft-media size-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <h3 className="display text-[24px] text-navy">{family.name}</h3>
                <p className="text-[17px] text-ink-soft">{family.use}</p>
                <ul className="grid gap-2 text-[16px] text-ink-soft">
                  {family.features.map((feature) => (
                    <li key={feature} className="flex gap-2.5">
                      <Check aria-hidden="true" className="mt-1 size-4 flex-none text-red" strokeWidth={3} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <dl className="mt-auto grid gap-2 rounded-2xl bg-mist px-4 py-3 text-[15px]">
                  <div>
                    <dt className="text-muted-foreground">Rodados</dt>
                    <dd className="font-semibold text-navy">{family.rims}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Ejemplo</dt>
                    <dd className="font-semibold whitespace-nowrap text-navy">{family.example}</dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          ))}
        </ul>
        <p className="text-[15px] text-muted-foreground">Fotos de referencia: Unsplash.</p>
      </div>
    </section>
  );
}

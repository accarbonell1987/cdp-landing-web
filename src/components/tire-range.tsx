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
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {tireFamilies.map((family, i) => (
            <Reveal as="li" key={family.id} delay={i * 70} className="flex flex-col rounded-2xl bg-white">
              {/* Dibujo de banda de rodamiento hecho con CSS, uno por familia. */}
              <div aria-hidden="true" className={`tread tread-${family.pattern}`} />
              <div className="flex flex-1 flex-col gap-3 p-6">
                <h3 className="display text-[24px] text-navy">{family.name}</h3>
                <p className="text-[17px] text-ink-soft">{family.use}</p>
                <ul className="grid list-disc gap-1 pl-[18px] text-[16px] text-ink-soft">
                  {family.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <dl className="mt-auto grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 border-t border-line pt-3.5 text-[15px]">
                  <dt className="text-muted-foreground">Rodados</dt>
                  <dd className="text-right font-semibold">{family.rims}</dd>
                  <dt className="text-muted-foreground">Ejemplo</dt>
                  <dd className="text-right font-semibold">{family.example}</dd>
                </dl>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

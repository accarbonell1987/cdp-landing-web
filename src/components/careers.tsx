import Image from "next/image";
import salaEspera from "@/assets/media/render-sala-espera.jpg";
import { Button } from "@/components/ui/button";
import { jobs } from "@/data/company";

export function Careers() {
  return (
    <section id="empleo" aria-labelledby="empleo-title" className="pb-24">
      <div className="wrap">
        <div className="grid overflow-hidden rounded-3xl bg-white lg:grid-cols-2">
          <div className="flex flex-col items-start gap-5 p-[clamp(28px,4vw,56px)]">
            <p className="kicker">Empleo</p>
            <h2 id="empleo-title" className="display text-[clamp(34px,3.8vw,56px)]">
              {jobs.title}
            </h2>
            <p className="max-w-[52ch] text-ink-soft">{jobs.text}</p>
            <ul aria-label="Áreas" className="flex flex-wrap gap-2.5">
              {jobs.areas.map((area) => (
                <li key={area} className="rounded-full bg-mist px-3.5 py-1.5 text-[16px] font-semibold text-navy">
                  {area}
                </li>
              ))}
            </ul>
            <Button asChild>
              <a href="#contacto">Dejar mi CV</a>
            </Button>
          </div>
          <figure className="relative min-h-[360px]">
            <Image
              src={salaEspera}
              alt="Visualización de la sala de espera de las oficinas"
              placeholder="blur"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <figcaption className="absolute bottom-3 left-4 rounded-full bg-white/90 px-3 py-1 text-[14px] text-ink-soft">
              Visualización del proyecto
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

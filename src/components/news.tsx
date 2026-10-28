import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { news } from "@/data/company";

export function News() {
  return (
    <section id="novedades" aria-labelledby="novedades-title" className="pb-24">
      <div className="wrap flex flex-col gap-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="novedades-title" className="display text-[clamp(30px,3vw,44px)]">
            Novedades
          </h2>
          {/* Fase 5: enlazar al listado cuando exista. */}
          <a href="#novedades" className="py-3 font-bold text-navy hover:text-red">
            Ver todas
          </a>
        </div>
        <ul className="grid gap-4 md:grid-cols-3">
          {news.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 90} className="card-soft relative flex flex-col gap-3 p-7">
              <span className="self-start rounded-full bg-mist px-3 py-1 text-[14px] font-semibold text-navy">
                {item.date}
              </span>
              <h3 className="text-[21px] leading-snug font-bold">
                {/* The link covers the whole card. */}
                <a href="#novedades" className="text-ink after:absolute after:inset-0 after:rounded-[24px] hover:text-navy">
                  {item.title}
                </a>
              </h3>
              <p className="text-[17px] text-ink-soft">{item.summary}</p>
              <span aria-hidden="true" className="mt-auto inline-flex items-center gap-1.5 pt-2 font-bold text-red">
                Leer más <ArrowRight className="size-4" />
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

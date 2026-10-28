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
          {news.map((item) => (
            <li key={item.title} className="flex flex-col gap-2 rounded-2xl bg-white p-6">
              <span className="text-[15px] text-muted-foreground">{item.date}</span>
              <h3 className="text-[21px] font-bold">
                <a href="#novedades" className="text-ink hover:text-navy">
                  {item.title}
                </a>
              </h3>
              <p className="text-[17px] text-ink-soft">{item.summary}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

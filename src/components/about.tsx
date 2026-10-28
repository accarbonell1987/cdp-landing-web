import Image from "next/image";
import recepcion from "@/assets/media/render-recepcion.jpg";
import { about } from "@/data/company";

export function About() {
  return (
    <section id="nosotros" aria-labelledby="nosotros-title" className="pt-[72px] pb-24">
      <div className="wrap grid items-center gap-x-20 gap-y-12 lg:grid-cols-2">
        <div className="flex flex-col gap-5">
          <p className="kicker">Nosotros</p>
          <h2 id="nosotros-title" className="display text-[clamp(34px,3.8vw,56px)]">
            {about.title}
          </h2>
          <p className="max-w-[58ch] text-ink-soft">{about.text}</p>
          <ul className="mt-2 grid gap-4">
            {about.values.map((value) => (
              <li key={value.title} className="flex gap-3.5">
                <span aria-hidden="true" className="mt-[9px] size-2.5 flex-none rounded-full bg-red" />
                <span>
                  <strong>{value.title}</strong> {value.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <figure className="flex flex-col gap-2.5">
          <Image
            src={recepcion}
            alt="Visualización de la recepción de la planta con mostrador de madera y el logotipo CDP"
            placeholder="blur"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-[4/3] w-full rounded-[20px] object-cover"
          />
          <figcaption className="text-[15px] text-muted-foreground">
            Recepción de las oficinas. Visualización del proyecto.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

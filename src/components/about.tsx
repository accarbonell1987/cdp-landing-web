import recepcion from "@/assets/media/render-recepcion.jpg";
import { CortinaReveal } from "@/components/animations/cortina-reveal";
import { LottieIcon } from "@/components/lottie-icon";
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
              <li key={value.title} className="group flex items-center gap-4">
                <span className="grid size-14 flex-none place-items-center rounded-2xl bg-mist">
                  <LottieIcon src={value.icon} className="size-12" />
                </span>
                <span>
                  <strong>{value.title}</strong> {value.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <figure className="flex flex-col gap-2.5">
          <CortinaReveal
            src={recepcion}
            alt="Visualización de la recepción de la planta con mostrador de madera y el logotipo CDP"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-[4/3] w-full rounded-[20px]"
          />
          <figcaption className="text-[15px] text-muted-foreground">
            Recepción de las oficinas. Visualización del proyecto.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

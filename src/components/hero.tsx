import Image from "next/image";
import fachada from "@/assets/media/render-fachada-dia.jpg";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="pb-[72px]">
      <div className="relative isolate h-[420px] overflow-hidden md:h-[620px]">
        <div className="cdp-kb absolute inset-0 -z-20">
          <Image
            src={fachada}
            alt="Visualización de la planta de Cauchos del Paraguay de día, con la nave, el logotipo y el bloque de oficinas"
            preload
            fetchPriority="high"
            placeholder="blur"
            fill
            sizes="100vw"
            className="object-cover object-[50%_45%]"
          />
        </div>
        <div aria-hidden="true" className="cdp-hero-shade absolute inset-0 -z-10" />
      </div>
      <div className="wrap">
        <div className="relative -mt-20 flex max-w-[860px] flex-col gap-6 rounded-[20px] bg-white p-7 shadow-[0_24px_60px_rgba(11,42,91,0.12)] md:-mt-[200px] md:p-14">
          <p className="kicker cdp-rise">Industria nacional</p>
          <h1 id="hero-title" className="display cdp-rise text-[clamp(40px,5.4vw,80px)] text-navy">
            La primera fábrica de neumáticos de Paraguay.
          </h1>
          <p className="cdp-rise max-w-[54ch] text-[21px] text-ink-soft">
            Estamos construyendo en [Ciudad] una planta que va a generar empleo, conocimiento técnico y neumáticos para
            todo el país. [Confirmar el claim de &quot;primera&quot;.]
          </p>
          <div className="cdp-rise flex flex-wrap gap-3">
            <Button asChild>
              <a href="#avance">Ver el avance</a>
            </Button>
            <Button asChild variant="outline">
              <a href="#empleo">Quiero trabajar en CDP</a>
            </Button>
          </div>
          <p className="cdp-rise text-[15px] text-muted-foreground">Imagen: visualización del proyecto.</p>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import fachada from "@/assets/media/render-fachada-dia.jpg";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="pb-[72px]">
      <Image
        src={fachada}
        alt="Visualización de la planta de Cauchos del Paraguay de día, con la nave, el logotipo y el bloque de oficinas"
        preload
        placeholder="blur"
        sizes="100vw"
        className="h-[420px] w-full object-cover object-[50%_45%] md:h-[620px]"
      />
      <div className="wrap">
        <div className="relative -mt-20 flex max-w-[860px] flex-col gap-6 rounded-[20px] bg-white p-7 shadow-[0_24px_60px_rgba(11,42,91,0.12)] md:-mt-[200px] md:p-14">
          <p className="kicker">Industria nacional</p>
          <h1 id="hero-title" className="display text-[clamp(40px,5.4vw,80px)] text-navy">
            La primera fábrica de neumáticos de Paraguay.
          </h1>
          <p className="max-w-[54ch] text-[21px] text-ink-soft">
            Estamos construyendo en [Ciudad] una planta que va a generar empleo, conocimiento técnico y neumáticos para
            todo el país. [Confirmar el claim de &quot;primera&quot;.]
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <a href="#avance">Ver el avance</a>
            </Button>
            <Button asChild variant="outline">
              <a href="#empleo">Quiero trabajar en CDP</a>
            </Button>
          </div>
          <p className="text-[15px] text-muted-foreground">Imagen: visualización del proyecto.</p>
        </div>
      </div>
    </section>
  );
}

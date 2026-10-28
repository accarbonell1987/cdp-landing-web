import { Hero } from "@/components/hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="contenido">
        <Hero />
        {/* Fase 1: nosotros, recorrido, avance, neumáticos, leé tu neumático, empleo, novedades, contacto. */}
      </main>
      <SiteFooter />
    </>
  );
}

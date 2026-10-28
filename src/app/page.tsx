import { About } from "@/components/about";
import { Careers } from "@/components/careers";
import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { News } from "@/components/news";
import { PlantTour } from "@/components/plant-tour";
import { Progress } from "@/components/progress";
import { ReadYourTire } from "@/components/read-your-tire";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TireRange } from "@/components/tire-range";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="contenido">
        <Hero />
        <About />
        <PlantTour />
        <Progress />
        <TireRange />
        <ReadYourTire />
        <Careers />
        <News />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}

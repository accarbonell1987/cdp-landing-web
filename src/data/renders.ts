// Renders del proyecto que usan las animaciones: mapa del predio, scrub y galería.
// Todas son visualizaciones; textos entre [corchetes] están sin confirmar.

import type { StaticImageData } from "next/image";
import entrada from "@/assets/media/render-entrada.jpg";
import hall from "@/assets/media/render-hall.jpg";
import sitePlan from "@/assets/media/render-site-plan.jpg";
import acceso2Camion from "@/assets/media/renders/acceso2-camion.webp";
import aereo from "@/assets/media/renders/aereo.webp";
import fachadaTarde from "@/assets/media/renders/fachada-tarde.webp";
import interior2 from "@/assets/media/renders/interior-2.webp";
import interior3 from "@/assets/media/renders/interior-3.webp";
import naveEsquinaTarde from "@/assets/media/renders/nave-esquina-tarde.webp";
import naveFondo from "@/assets/media/renders/nave-fondo.webp";
import naveLateralTarde from "@/assets/media/renders/nave-lateral-tarde.webp";
import oficinasEntrada from "@/assets/media/renders/oficinas-entrada.webp";
import porticoFrontal from "@/assets/media/renders/portico-frontal.webp";
import porticoLateral from "@/assets/media/renders/portico-lateral.webp";

export type Hotspot = {
  id: string;
  /** Position on the aerial view, in % from the left and from the top. */
  x: number;
  y: number;
  zoom: number;
  labelSide?: "right" | "left";
  label: string;
  caption: string;
  src: StaticImageData;
  alt: string;
};

export const predio = {
  kicker: "El predio",
  title: "Un predio, dos accesos.",
  text: "Tocá un punto de la vista aérea para entrar a esa parte del proyecto.",
  aerial: aereo,
  aerialAlt: "Vista aérea del predio con la nave, los estacionamientos y los dos accesos",
  hotspots: [
    {
      id: "acceso1",
      x: 79,
      y: 71,
      zoom: 3.2,
      label: "Acceso 1 · Visitas",
      caption: "Pórtico de ingreso, caseta de control y estacionamiento de visitas.",
      src: porticoFrontal,
      alt: "Visualización del pórtico de acceso para visitas",
    },
    {
      id: "acceso2",
      x: 27.5,
      y: 68,
      zoom: 3.2,
      labelSide: "left",
      label: "Acceso 2 · Camiones",
      caption: "Ingreso logístico directo a la playa de carga.",
      src: acceso2Camion,
      alt: "Visualización del acceso de camiones con barrera y caseta",
    },
    {
      id: "nave",
      x: 40,
      y: 60,
      zoom: 2.4,
      label: "Nave de producción",
      caption: "[0.000] m² de planta libre para mezclado, prensas y laboratorio.",
      src: interior2,
      alt: "Visualización del interior de la nave de producción",
    },
    {
      id: "oficinas",
      x: 44,
      y: 82,
      zoom: 3,
      label: "Oficinas",
      caption: "Recepción, administración y sala de espera.",
      src: oficinasEntrada,
      alt: "Visualización de la entrada al bloque de oficinas",
    },
  ] satisfies Hotspot[],
};

export const planosScrub = {
  src: fachadaTarde,
  alt: "Visualización de la fachada de la planta al atardecer",
  labelStart: "Proyecto aprobado · 2026",
  labelEnd: "Primera producción · 2027",
};

export type GalleryItem = { src: StaticImageData; alt: string; caption: string };

export const gallery: GalleryItem[] = [
  { src: entrada, alt: "Visualización del pórtico de acceso a la planta", caption: "Pórtico de acceso" },
  { src: hall, alt: "Visualización del interior de la nave de producción", caption: "Nave de producción" },
  { src: sitePlan, alt: "Visualización aérea del predio con la nave y los accesos", caption: "Vista aérea del predio" },
  {
    src: naveLateralTarde,
    alt: "Visualización de la fachada lateral de la nave con el acceso de camiones",
    caption: "Fachada lateral y acceso de camiones",
  },
  { src: naveEsquinaTarde, alt: "Visualización de la esquina de la nave al atardecer", caption: "Esquina de la nave" },
  { src: interior3, alt: "Visualización de otro sector del interior de la nave", caption: "Interior de la nave" },
  { src: porticoLateral, alt: "Visualización del pórtico de acceso visto desde la ruta", caption: "Pórtico desde la ruta" },
  { src: naveFondo, alt: "Visualización del fondo de la nave con los portones 2 y 3", caption: "Portones 2 y 3" },
];

// Datos editables del sitio. Todo lo que está entre [corchetes] es relleno
// pendiente de confirmar por CDP (fase 5 del plan).

export const site = {
  name: "Cauchos del Paraguay S.A.",
  shortName: "CDP",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  title: "Cauchos del Paraguay — Neumáticos hechos en Paraguay",
  description:
    "Cauchos del Paraguay S.A. construye en [Ciudad] una planta de neumáticos para autos, camionetas, utilitarios y el campo. Conocé el avance de la obra, la gama y cómo trabajar con nosotros.",
  locale: "es_PY",
  contact: {
    address: "[Dirección de la planta]",
    city: "[Ciudad]",
    country: "PY",
    phone: "[+595 000 000 000]",
    whatsapp: "[+595 900 000 000]",
    email: "[contacto@cdp.com.py]",
  },
  social: [] as string[],
} as const;

export const nav = [
  { href: "#nosotros", label: "Nosotros" },
  { href: "#avance", label: "Avance de obra" },
  { href: "#neumaticos", label: "Neumáticos" },
  { href: "#empleo", label: "Empleo" },
  { href: "#novedades", label: "Novedades" },
] as const;

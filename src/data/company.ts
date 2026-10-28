// Contenido institucional de relleno. Lo que está entre [corchetes] lo confirma CDP.

export const about = {
  title: "Una empresa paraguaya con vocación regional.",
  text: "Cauchos del Paraguay S.A. reúne a inversores y técnicos [paraguayos] con un objetivo: fabricar en el país los neumáticos que hoy se importan. Queremos ser el proveedor de confianza de distribuidores, flotas y productores del Mercosur.",
  values: [
    { title: "Respeto por las personas.", text: "Seguridad y formación en cada puesto.", icon: "/lottie/personas.json" },
    { title: "Respeto por el ambiente.", text: "Menos residuos, más reciclado de caucho.", icon: "/lottie/ambiente.json" },
    { title: "Respeto por el cliente.", text: "Calidad medida y atención cercana.", icon: "/lottie/cliente.json" },
  ],
};

export const tour = {
  title: "Entrá a la planta.",
  intro: "Deslizá hacia abajo para recorrer el acceso.",
  captions: [
    "Dos accesos: uno para camiones, otro para visitas.",
    "Al fondo, la nave de producción de [0.000] m².",
    "Neumáticos hechos en Paraguay, desde [2027].",
  ],
};

export type MilestoneStatus = "hecho" | "en-curso" | "proximo";

export const milestones: { year: string; title: string; text: string; status: MilestoneStatus }[] = [
  { year: "2026", title: "Proyecto aprobado", text: "Diseño de planta, predio y accesos.", status: "hecho" },
  { year: "[2026]", title: "Obra civil", text: "Nave, oficinas y servicios del predio.", status: "en-curso" },
  { year: "[2027]", title: "Montaje de equipos", text: "Mezcladoras, prensas de vulcanizado y laboratorio.", status: "proximo" },
  { year: "[2027]", title: "Primera producción", text: "Homologación y primeras entregas.", status: "proximo" },
];

export const jobs = {
  title: "[000] puestos de trabajo nuevos.",
  text: "Vamos a formar a nuestro equipo desde el inicio. No hace falta experiencia en neumáticos para la mayoría de los puestos.",
  areas: ["Producción", "Mantenimiento", "Laboratorio", "Logística", "Administración"],
};

export const news = [
  { date: "[Fecha]", title: "[Firmamos el inicio de obra con la constructora]", summary: "[Resumen de la noticia en una o dos líneas.]" },
  { date: "[Fecha]", title: "[Convenio de formación técnica con una institución local]", summary: "[Resumen de la noticia en una o dos líneas.]" },
  { date: "[Fecha]", title: "[Abrimos el registro de proveedores]", summary: "[Resumen de la noticia en una o dos líneas.]" },
];

export const contactReasons = ["Ventas", "Proveedores", "Empleo", "Prensa"] as const;

// Familias de neumáticos y guía del código del flanco.
// Medidas y rodados son de ejemplo hasta la homologación de cada producto.

export type TreadPattern = "rib" | "allTerrain" | "cargo" | "truck" | "agro";

export type TireFamily = {
  id: string;
  name: string;
  use: string;
  features: string[];
  rims: string;
  example: string;
  pattern: TreadPattern;
};

export const tireFamilies: TireFamily[] = [
  {
    id: "autos",
    name: "Autos",
    use: "Ciudad y ruta, con bajo ruido y frenado corto en mojado.",
    features: ["Surcos longitudinales que evacuan agua", "Compuesto de bajo desgaste"],
    rims: "[13 a 17]",
    example: "185/65 R15 88H",
    pattern: "rib",
  },
  {
    id: "suv",
    name: "SUV y camionetas",
    use: "Asfalto, tierra roja y ripio en el mismo viaje.",
    features: ["Bloques abiertos para tracción", "Flanco reforzado contra cortes"],
    rims: "[15 a 18]",
    example: "265/70 R16 112T",
    pattern: "allTerrain",
  },
  {
    id: "utilitarios",
    name: "Utilitarios",
    use: "Reparto urbano y carga liviana con alta rotación.",
    features: ["Carcasa de mayor capacidad de carga", "Banda pensada para muchos kilómetros"],
    rims: "[14 a 16]",
    example: "205/75 R16C",
    pattern: "cargo",
  },
  {
    id: "camion-bus",
    name: "Camión y bus",
    use: "Larga distancia y transporte de pasajeros.",
    features: ["Estructura apta para recapado", "Opciones para eje direccional y tracción"],
    rims: "[17,5 a 22,5]",
    example: "295/80 R22.5",
    pattern: "truck",
  },
  {
    id: "agricola",
    name: "Agrícola",
    use: "Tractores, cosechadoras e implementos.",
    features: ["Tacos profundos y autolimpiantes", "Menos compactación del suelo"],
    rims: "[24 a 38]",
    example: "18.4-34 R1",
    pattern: "agro",
  },
];

export const tireCodeExample = "205/55 R16 91V";

export const tireCodeParts = [
  { code: "205", title: "Ancho", text: "Ancho de la banda de rodamiento, de flanco a flanco, en milímetros." },
  { code: "/55", title: "Perfil", text: "Alto del flanco como porcentaje del ancho: 55% de 205 mm, unos 113 mm." },
  { code: "R", title: "Construcción radial", text: "Las capas de la carcasa van en sentido radial. Es el estándar actual para autos y camionetas." },
  { code: "16", title: "Diámetro de llanta", text: "Medida de la llanta en la que se monta, en pulgadas." },
  { code: "91", title: "Índice de carga", text: "Carga máxima por neumático: 91 equivale a 615 kg." },
  { code: "V", title: "Índice de velocidad", text: "Velocidad máxima con carga: V equivale a 240 km/h." },
];

# CDP · Web institucional (Next.js)

Web de Cauchos del Paraguay S.A. Dirección de diseño: "Hecho en Paraguay" (canvas de propuestas).
Plan por fases: ver el documento "Web CDP: plan por fases".

## Stack

- Next.js 16 (App Router, páginas estáticas, Cache Components)
- React 19, TypeScript, Tailwind CSS 4
- shadcn/ui (`components.json`) y componentes de 21st.dev (fase 2)
- Tipografías: Sora (títulos) y Source Sans 3 (texto), vía `next/font`

## Estructura

```
src/
├── app/            # layout (SEO, JSON-LD), página, robots, sitemap, iconos, imagen OG
├── components/     # una pieza por sección; ui/ = componentes shadcn
├── data/           # ← EDITAR AQUÍ: site.ts (empresa, contacto, menú), company.ts (secciones), tires.ts (gama y código)
├── assets/media/   # renders del proyecto (importados, Next genera AVIF/WebP)
└── lib/utils.ts    # cn()
public/
├── brand/          # logos PNG (falta el SVG oficial)
└── media/          # video del recorrido y su poster
```

Todo lo que está entre `[corchetes]` es relleno pendiente de confirmar por CDP.

## Comandos

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de producción
npm run lint
```

Copiar `.env.example` a `.env.local` y completar `NEXT_PUBLIC_SITE_URL`.

## Deploy

Vercel: importar el repositorio, framework Next.js, sin configuración extra.
`vercel.json` define los headers de seguridad (CSP preparada para Google Tag Manager / GA4)
y la redirección de `www` (completar el dominio).

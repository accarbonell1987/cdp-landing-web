@AGENTS.md

# CDP · Web corporativa de Cauchos del Paraguay S.A.

Contexto para cualquier desarrollador o agente que abra este repo. Leer completo antes de tocar código.

## Repositorio y cuenta de GitHub (obligatorio)

- Repo: https://github.com/accarbonell1987/cdp-landing-web (propio de `accarbonell1987`; desde acá se conecta Vercel).
- Repo anterior, ya no se usa: `alafourcadev/cdp-corporative-web`. Su historial (fases 0 a 2 y los PR #1 y #2) se migró completo a este.
- **Siempre se trabaja con la cuenta `accarbonell1987`.** Nunca con otra cuenta (en particular, no `accarbonelld2`).
- Si `git push` o `gh` devuelven 403/404 en este repo, casi siempre es porque la cuenta activa de `gh` cambió:

  ```bash
  gh auth status            # la cuenta activa debe ser accarbonell1987
  gh auth switch -u accarbonell1987
  ```

- Flujo: una rama y un PR por fase (`fase-1-maqueta`, `fase-2-animacion`, …). Vercel genera la vista previa de cada PR. No se mergea una fase sin la revisión de Alberto Carlos.
- Commits y PRs sin atribuciones de IA: no agregar `Co-Authored-By`, enlaces de sesión, pies tipo "Generated with" ni ninguna mención a Claude u otra IA en mensajes de commit, títulos o descripciones de PR.

## Qué es el proyecto

Web institucional de **Cauchos del Paraguay S.A. (CDP)**, una fábrica de **neumáticos** (en Paraguay "cauchos" = neumáticos) en etapa de proyecto: la planta todavía no existe, solo hay renders.

- Idioma del sitio: español de Paraguay (voseo: "Conocé", "Escribinos", "Trabajá con nosotros").
- Todas las imágenes son **visualizaciones del proyecto** y se rotulan así ("Visualización del proyecto"). Nunca presentarlas como una planta operativa.
- Contenido real de CDP: **todavía no existe**. Se usan textos de relleno y todo dato sin confirmar va entre `[corchetes]` (cifras, fechas, contacto, dirección, gama). No inventar cifras sin corchetes.
- Pendientes del cliente: logo SVG, gama real de neumáticos, ubicación y datos de la planta, contacto, ID de GA4/GTM, render corregido de los pilares del portón (la marca se lee "ϥGD"), video HD con licencia comercial, dominio.

## Decisiones tomadas

| Tema | Decisión |
| --- | --- |
| Stack | Next.js 16 (App Router, páginas estáticas, `cacheComponents`), React 19, TypeScript, Tailwind 4 |
| Componentes | shadcn/ui (`components.json`) + componentes y animaciones de **21st.dev** (vía su conector MCP). Antes de traer código de 21st se muestran opciones: traerlo consume créditos |
| Dirección de diseño | "Hecho en Paraguay" (institucional): blanco, azul `#0B2A5B`, rojo `#B81D2B`, tipografías Bricolage Grotesque (títulos) y Figtree (texto), ambas de Google Fonts con licencia OFL. Prototipo en el canvas "CDP propuestas de diseño" (artboard 3) |
| Secciones | Header, hero, nosotros, recorrido en video con scroll, avance de obra, tipos de neumáticos, "Leé tu neumático" (interactivo), empleo, novedades, contacto, footer |
| Recorrido en video | Sección fija (sticky) donde el scroll avanza el video y al final da paso a la siguiente sección, estilo Apple. Video: `public/media/recorrido-scrub.mp4` y `recorrido-scrub-movil.mp4` (5 s, 24 fps, todos los cuadros son keyframes: `ffmpeg -g 1`, si no el seek salta). Lógica en `src/components/plant-tour.tsx`, adaptada de "Magic Hour" (21st.dev) |
| SEO | Metadata y Open Graph en `src/app/layout.tsx`, JSON-LD `Organization`, `sitemap.ts`, `robots.ts`, imagen OG 1200×630 |
| Analítica | GA4 vía Google Tag Manager con Consent Mode v2, cargado solo tras aceptar cookies (Ley 7593/2025 de datos personales de Paraguay). Fase 3 |
| Accesibilidad | WCAG 2.2 AA: contraste ≥ 4,5:1, foco visible, targets ≥ 44 px, `prefers-reduced-motion` (sin video ni scroll animado), skip link, landmarks, `alt` descriptivos |
| Deploy | Vercel. Headers de seguridad y CSP (preparada para GTM/GA4) en `vercel.json` |

## Plan por fases

Documento: "Web CDP: plan por fases" (https://claude.ai/artifact/G1jsKhZaEAmSPPYHihk5FT).

0. Base técnica ← hecho (falta importar este repo en Vercel)
1. Maqueta de secciones (sin animación, textos en `src/data/`) ← hecho
2. Interacción y animación (21st.dev, recorrido en video, Leé tu neumático) ← hecho (aprobada en el repo anterior; entra a `main` por el PR "Fases 1 y 2")
   - Ajustes de diseño tras probar en local (rama `ajustes-diseno`): sin guion en los kickers, tarjetas más cálidas, fotos por tipo de neumático, timeline nuevo, SVG animados, tipografías
3. Formularios y medición (contacto, WhatsApp, cookies, GA4) ← en pausa
4. Calidad (WCAG, Lighthouse ≥ 90 en móvil, SEO técnico)
5. Contenido real y lanzamiento

## Convenciones de código

- Componentes de servidor por defecto. `"use client"` solo en piezas interactivas o animadas.
- Datos editables en `src/data/*.ts`; los componentes no tienen copy hardcodeado salvo títulos de sección.
- Colores y tipografías solo desde los tokens de `src/app/globals.css` (`bg-navy`, `text-red`, `.display`, `.kicker`, `.wrap`).
- Imágenes de renders en `src/assets/media/` importadas estáticamente (Next genera AVIF/WebP y blur).
- Next.js 16 tiene cambios incompatibles con versiones anteriores: consultar `node_modules/next/dist/docs/` antes de usar una API.

## Comandos

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # debe pasar antes de cada PR
npm run lint
npx tsc --noEmit
```

## Material de origen

Fuera del repo, en la carpeta compartida del proyecto (`cdp-web-para-disenador/`): `source-assets/` (renders, video Kling, PDF de 20 láminas) y `cdp-web/` (propuesta anterior en Next.js, solo como referencia). La landing de referencia técnica es CPR Autocentro Goodyear (`Development/Angel Paredes/landing/landing-cpr-autocentro-goodyear`).

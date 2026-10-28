import type { MetadataRoute } from "next";
import { site } from "@/data/site";

// Las vistas previas de Vercel no se indexan; solo el despliegue de producción.
const indexable = !process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: indexable ? { userAgent: "*", allow: "/" } : { userAgent: "*", disallow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}

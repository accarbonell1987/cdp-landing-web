import Image from "next/image";
import { site } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-white py-12">
      <div className="wrap flex flex-wrap items-center justify-between gap-6 text-[15px] text-[#4a5160]">
        <Image src="/brand/cdp-full-graphite.png" alt={site.name} width={882} height={334} className="h-14 w-auto" />
        <span>
          © 2026 {site.name} · Hecho en Paraguay. Imágenes: visualizaciones del proyecto.
        </span>
        <span className="flex gap-5">
          <a href="#inicio">Privacidad</a>
          <a href="#inicio">Cookies</a>
        </span>
      </div>
    </footer>
  );
}

import Image from "next/image";
import Link from "next/link";
import { MobileMenu } from "@/components/mobile-menu";
import { Button } from "@/components/ui/button";
import { nav } from "@/data/site";

export function SiteHeader() {
  return (
    <>
      {/* Paraguay's flag as a thin band: red, white, blue. */}
      <div aria-hidden="true" className="flex h-[6px]">
        <span className="flex-1 bg-red" />
        <span className="flex-1 bg-white" />
        <span className="flex-1 bg-navy" />
      </div>
      <header className="relative border-b border-line bg-white">
        <div className="wrap flex items-center justify-between gap-6 py-3.5">
          <Link href="/" aria-label="Cauchos del Paraguay, inicio" className="block">
            <Image
              src="/brand/cdp-full-graphite.png"
              alt=""
              width={882}
              height={334}
              preload
              className="h-[52px] w-auto"
            />
          </Link>
          <nav aria-label="Principal" className="flex items-center gap-3 lg:gap-7">
            <ul className="hidden gap-[26px] text-[16px] font-semibold lg:flex">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="inline-block py-3 text-ink no-underline underline-offset-[6px] hover:text-navy hover:underline"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <Button asChild size="sm">
              <a href="#contacto">Contacto</a>
            </Button>
            <MobileMenu />
          </nav>
        </div>
      </header>
    </>
  );
}

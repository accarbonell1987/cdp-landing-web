"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { nav } from "@/data/site";

// Disclosure below `lg`: the button toggles a panel under the header. Escape closes it
// and returns focus to the button; choosing a link closes it too.
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="menu-movil"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex size-12 items-center justify-center rounded-full text-navy hover:bg-mist"
      >
        {open ? <X aria-hidden="true" className="size-6" /> : <Menu aria-hidden="true" className="size-6" />}
        <span className="sr-only">{open ? "Cerrar menú" : "Abrir menú"}</span>
      </button>
      <div
        id="menu-movil"
        hidden={!open}
        className="absolute inset-x-0 top-full z-40 border-b border-line bg-white shadow-[0_16px_32px_rgba(11,42,91,0.10)]"
      >
        <ul className="wrap flex flex-col py-3">
          {nav.map((item) => (
            <li key={item.href} className="border-b border-line last:border-0">
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-3.5 text-[18px] font-semibold text-ink hover:text-navy"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

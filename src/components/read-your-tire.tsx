import { tireCodeExample, tireCodeParts } from "@/data/tires";

// Fase 1: las seis partes del código a la vista. En la fase 2 se vuelve interactivo
// (un botón por parte); esta lista queda como versión sin JavaScript.
export function ReadYourTire() {
  return (
    <section id="lee-tu-neumatico" aria-labelledby="lee-title" className="pb-24">
      <div className="wrap">
        <div className="flex flex-col gap-8 rounded-3xl bg-white p-[clamp(24px,4vw,56px)]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="flex max-w-[640px] flex-col gap-4">
              <p className="kicker">Guía</p>
              <h2 id="lee-title" className="display text-[clamp(34px,3.8vw,56px)]">
                Leé tu neumático.
              </h2>
              <p className="text-ink-soft">El flanco de cada neumático lleva un código. Así se lee cada parte.</p>
            </div>
            <p className="text-[15px] text-muted-foreground">Ejemplo: {tireCodeExample}</p>
          </div>

          <p
            aria-hidden="true"
            className="display text-[clamp(40px,7vw,104px)] leading-none font-extrabold tracking-[-0.02em] text-navy"
          >
            {tireCodeExample}
          </p>

          <div className="grid items-center gap-8 border-t-[3px] border-red pt-7 lg:grid-cols-[1.4fr_1fr]">
            <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {tireCodeParts.map((part) => (
                <div key={part.code} className="flex flex-col gap-1">
                  <dt className="flex items-baseline gap-3">
                    <span className="display text-[28px] text-red">{part.code}</span>
                    <span className="text-[19px] font-bold text-navy">{part.title}</span>
                  </dt>
                  <dd className="text-[17px] text-ink-soft">{part.text}</dd>
                </div>
              ))}
            </dl>
            <TireDiagram />
          </div>
        </div>
      </div>
    </section>
  );
}

function TireDiagram() {
  return (
    <svg
      viewBox="-10 -24 470 250"
      role="img"
      aria-label="Corte de un neumático con el ancho, el alto del flanco y el diámetro de la llanta"
      className="h-auto w-full max-w-[480px] justify-self-center"
    >
      <rect x="130" y="20" width="160" height="70" rx="26" fill="#16233A" />
      <rect x="130" y="130" width="160" height="70" rx="26" fill="#16233A" />
      <rect x="150" y="90" width="120" height="40" fill="#C9D1DE" />
      <g fontSize="13" fontFamily="var(--font-source-sans), sans-serif" fill="var(--ink)">
        <line x1="130" y1="10" x2="290" y2="10" stroke="var(--red)" strokeWidth="2" />
        <text x="210" y="6" textAnchor="middle">
          Ancho 205 mm
        </text>
        <line x1="310" y1="20" x2="310" y2="90" stroke="var(--red)" strokeWidth="2" />
        <text x="318" y="60">Flanco: 55% del ancho</text>
        <line x1="110" y1="90" x2="110" y2="130" stroke="var(--navy)" strokeWidth="2" />
        <text x="102" y="114" textAnchor="end">
          Llanta 16&quot;
        </text>
      </g>
    </svg>
  );
}

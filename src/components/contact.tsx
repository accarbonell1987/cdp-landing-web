import { Button } from "@/components/ui/button";
import { LottieIcon } from "@/components/lottie-icon";
import { Reveal } from "@/components/reveal";
import { contactReasons } from "@/data/company";
import { site } from "@/data/site";

const field = "flex flex-col gap-1.5";
const label = "text-[16px] font-bold";
const control =
  "rounded-[10px] border-[1.5px] border-input bg-white px-3.5 py-[13px] text-[18px] text-ink focus-visible:border-navy";

// Fase 1: solo el marcado. El envío (servicio de email, validación, mensaje de estado)
// se conecta en la fase 3.
export function Contact() {
  const { address, city, phone, email } = site.contact;
  return (
    <section id="contacto" aria-labelledby="contacto-title" className="bg-mist py-24">
      <div className="wrap grid gap-14 lg:grid-cols-2">
        <div className="flex flex-col gap-5">
          <p className="kicker">Contacto</p>
          <h2 id="contacto-title" className="display text-[clamp(34px,3.8vw,56px)]">
            Estamos para escucharte.
          </h2>
          <p className="text-ink-soft">
            Clientes, proveedores, postulantes y prensa: escribinos y te derivamos al área correcta.
          </p>
          <address className="flex flex-col gap-3 not-italic">
            {[
              { icon: "/lottie/ubicacion.json", text: `${address}, ${city}, Paraguay` },
              { icon: "/lottie/telefono.json", text: phone },
              { icon: "/lottie/email.json", text: email },
            ].map((line) => (
              <span key={line.icon} className="group flex items-center gap-3">
                <span className="grid size-12 flex-none place-items-center rounded-xl bg-white">
                  <LottieIcon src={line.icon} className="size-10" />
                </span>
                {line.text}
              </span>
            ))}
          </address>
        </div>
        <Reveal>
          <form aria-labelledby="contacto-title" className="flex flex-col gap-[18px] rounded-[20px] bg-white p-8">
            <div className={field}>
              <label htmlFor="contacto-nombre" className={label}>
                Nombre y apellido
              </label>
              <input id="contacto-nombre" name="nombre" type="text" autoComplete="name" required className={control} />
            </div>
            <div className={field}>
              <label htmlFor="contacto-email" className={label}>
                Email
              </label>
              <input id="contacto-email" name="email" type="email" autoComplete="email" required className={control} />
            </div>
            <div className={field}>
              <label htmlFor="contacto-area" className={label}>
                Área
              </label>
              <select id="contacto-area" name="area" className={control}>
                {contactReasons.map((reason) => (
                  <option key={reason}>{reason}</option>
                ))}
              </select>
            </div>
            <div className={field}>
              <label htmlFor="contacto-mensaje" className={label}>
                Mensaje
              </label>
              <textarea id="contacto-mensaje" name="mensaje" rows={4} className={control} />
            </div>
            <div className="flex items-start gap-2.5">
              <input
                id="contacto-privacidad"
                name="privacidad"
                type="checkbox"
                required
                className="mt-0.5 size-6 flex-none accent-navy"
              />
              <label htmlFor="contacto-privacidad" className="text-[16px]">
                Acepto la{" "}
                <a href="#inicio" className="text-navy underline">
                  política de privacidad
                </a>
                .
              </label>
            </div>
            <Button type="submit" className="self-start">
              Enviar
            </Button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

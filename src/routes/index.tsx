import { createFileRoute } from "@tanstack/react-router";
import {
  Sparkles,
  ShieldCheck,
  Wallet,
  Award,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  Check,
  Star,
} from "lucide-react";
import heroSmile from "@/assets/hero-smile.jpg";
import clinicInterior from "@/assets/clinic-interior.jpg";
import dentistWork from "@/assets/dentist-work.jpg";
import { ChatWidget } from "@/components/ChatWidget";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "COV · Centro Odontológico Valenciano · Clínica dental en Valencia" },
      {
        name: "description",
        content:
          "Clínica dental premium en Valencia: implantes, estética dental, ortodoncia invisible y más. Primera visita gratis. Financiación sin intereses.",
      },
      { property: "og:title", content: "COV · Clínica dental premium en Valencia" },
      {
        property: "og:description",
        content:
          "Implantología avanzada, estética dental y ortodoncia invisible. Primera visita gratis y financiación 0%.",
      },
      { property: "og:image", content: heroSmile },
    ],
  }),
  component: Landing,
});

const TREATMENTS = [
  {
    title: "Implantes dentales",
    desc: "All-on-4, cirugía guiada y materiales biocompatibles de última generación.",
    icon: "🦷",
  },
  {
    title: "Estética dental",
    desc: "Carillas, blanqueamiento y diseño digital de sonrisa.",
    icon: "✨",
  },
  {
    title: "Ortodoncia invisible",
    desc: "Invisalign® y Spark™. Alinea tus dientes sin que se note.",
    icon: "😁",
  },
  {
    title: "Prótesis dentales",
    desc: "Fijas, removibles y sobre implantes, hechas a medida.",
    icon: "🛠️",
  },
  {
    title: "Endodoncia",
    desc: "Tratamiento de conductos con microscopio de precisión.",
    icon: "🔬",
  },
  {
    title: "Prevención bucal",
    desc: "Higienes, fluorización y planes de mantenimiento.",
    icon: "🪥",
  },
  {
    title: "Empastes dentales",
    desc: "Composites estéticos invisibles y duraderos.",
    icon: "💎",
  },
  {
    title: "Sedación consciente",
    desc: "Tratamientos sin miedo ni dolor, con total seguridad.",
    icon: "🌿",
  },
];

const BENEFITS = [
  {
    icon: Sparkles,
    title: "Primera visita gratis",
    text: "Radiografía digital, diagnóstico, plan de tratamiento y presupuesto.",
  },
  {
    icon: Wallet,
    title: "Financiación 0%",
    text: "De 3 a 48 meses sin intereses. Cuotas desde 30€.",
  },
  {
    icon: ShieldCheck,
    title: "Tecnología punta",
    text: "Cirugía guiada por ordenador y biocompatibilidad premium.",
  },
  {
    icon: Award,
    title: "Premio 2026",
    text: "Mejor Clínica Odontológica de la Comunidad Valenciana.",
  },
];

const BRANDS = [
  "Nobel Biocare",
  "Straumann",
  "Invisalign",
  "Spark",
  "3M",
  "Ivoclar",
  "Zimmer",
  "Dentsply",
  "Klockner",
  "Ormco",
];

const TESTIMONIALS = [
  {
    name: "María G.",
    text: "Increíble trato y resultados. Mis implantes parecen dientes naturales. Repetiría sin dudar.",
  },
  {
    name: "Javier R.",
    text: "Llevaba años con miedo al dentista. La sedación consciente me cambió la vida.",
  },
  {
    name: "Lucía P.",
    text: "El Invisalign fue mucho más cómodo de lo que esperaba. Sonrío con seguridad por primera vez.",
  },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background text-ink">
      <Header />
      <Hero />
      <Benefits />
      <Treatments />
      <ClinicShowcase />
      <Testimonials />
      <Brands />
      <CTA />
      <Footer />
      <ChatWidget />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-cyan font-display text-lg font-bold text-ink">
            C
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg font-bold tracking-tight">COV</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Odontológico Valenciano
            </div>
          </div>
        </a>
        <nav className="hidden gap-8 text-sm font-medium md:flex">
          <a href="#tratamientos" className="hover:text-primary">Tratamientos</a>
          <a href="#nosotros" className="hover:text-primary">Nosotros</a>
          <a href="#testimonios" className="hover:text-primary">Opiniones</a>
          <a href="#contacto" className="hover:text-primary">Contacto</a>
        </nav>
        <a
          href="#contacto"
          className="hidden items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-cream transition hover:opacity-90 md:inline-flex"
        >
          Pide cita
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-32 -right-32 h-[600px] w-[600px] rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute top-40 -left-32 h-[400px] w-[400px] rounded-full bg-accent-glow/40 blur-3xl" />
      </div>
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-[1.1fr_1fr] lg:py-28">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-1.5 text-xs font-medium backdrop-blur">
            <Award className="h-3.5 w-3.5 text-primary" />
            Premio Mejor Clínica Odontológica 2026
          </div>
          <h1 className="font-display text-5xl font-medium leading-[1.05] tracking-tight text-balance lg:text-7xl">
            Come, habla y <em className="italic text-primary">sonríe</em> con confianza.
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
            Odontología premium en Valencia con más de 15 años de experiencia. Implantología avanzada,
            estética dental y ortodoncia invisible. Primera visita y estudio{" "}
            <strong className="text-ink">gratis</strong>.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 rounded-full gradient-cyan px-7 py-4 text-base font-semibold text-ink shadow-lg ring-glow transition hover:scale-[1.02]"
            >
              Pide tu cita gratis
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#tratamientos"
              className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-7 py-4 text-base font-semibold text-ink transition hover:bg-ink/5"
            >
              Ver tratamientos
            </a>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3 pt-4 text-sm text-muted-foreground">
            {["Radiografía digital", "Diagnóstico experto", "Plan + presupuesto"].map((t) => (
              <div key={t} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" /> {t}
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 -z-10 rounded-[3rem] gradient-cyan opacity-30 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2.5rem] ring-1 ring-border shadow-2xl">
            <img
              src={heroSmile}
              alt="Paciente sonriendo en clínica dental COV"
              width={1536}
              height={1536}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-card p-5 shadow-xl ring-1 ring-border sm:block animate-float">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <div className="text-2xl font-display font-bold leading-none">+15 años</div>
                <div className="text-xs text-muted-foreground">de experiencia</div>
              </div>
            </div>
          </div>
          <div className="absolute -top-4 -right-4 hidden rounded-2xl bg-ink p-5 text-cream shadow-xl sm:block animate-float [animation-delay:1s]">
            <div className="text-3xl font-display font-bold leading-none">4.9</div>
            <div className="mt-1 flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-primary text-primary" />
              ))}
            </div>
            <div className="mt-1 text-[10px] uppercase tracking-widest opacity-70">Google reviews</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section className="border-y border-border bg-cream/60">
      <div className="mx-auto grid max-w-7xl gap-px overflow-hidden bg-border md:grid-cols-4">
        {BENEFITS.map((b) => (
          <div key={b.title} className="bg-cream/60 p-8">
            <b.icon className="h-7 w-7 text-primary" />
            <h3 className="mt-4 font-display text-xl font-semibold">{b.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{b.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Treatments() {
  return (
    <section id="tratamientos" className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <div className="text-xs font-medium uppercase tracking-widest text-primary">
            Nuestros tratamientos
          </div>
          <h2 className="mt-3 font-display text-4xl font-medium leading-tight tracking-tight text-balance lg:text-5xl">
            Soluciones dentales completas, hechas a tu medida.
          </h2>
        </div>
        <p className="max-w-md text-muted-foreground">
          De la prevención a la cirugía avanzada. Tecnología 3D, materiales premium y un equipo experto
          liderado por el Dr. Cristian Arnaudo.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TREATMENTS.map((t) => (
          <article
            key={t.title}
            className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:shadow-xl hover:ring-2 hover:ring-primary/30"
          >
            <div className="text-4xl">{t.icon}</div>
            <h3 className="mt-5 font-display text-xl font-semibold">{t.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
            <div className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition group-hover:opacity-100">
              Saber más <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ClinicShowcase() {
  return (
    <section id="nosotros" className="bg-ink text-cream">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-2 lg:items-center">
        <div className="grid grid-cols-2 gap-4">
          <img
            src={clinicInterior}
            alt="Interior clínica COV"
            width={1536}
            height={1024}
            loading="lazy"
            className="col-span-2 h-64 w-full rounded-3xl object-cover ring-1 ring-white/10"
          />
          <img
            src={dentistWork}
            alt="Trabajo del equipo COV"
            width={1280}
            height={1280}
            loading="lazy"
            className="h-56 w-full rounded-3xl object-cover ring-1 ring-white/10"
          />
          <div className="flex h-56 flex-col justify-between rounded-3xl gradient-cyan p-6 text-ink">
            <div className="text-5xl font-display font-bold leading-none">2</div>
            <div>
              <div className="font-semibold">Clínicas en Valencia</div>
              <div className="text-xs opacity-70">Cortes Valencianas y Plaza España</div>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="text-xs font-medium uppercase tracking-widest text-primary">
            Instalaciones excepcionales
          </div>
          <h2 className="font-display text-4xl font-medium leading-tight tracking-tight lg:text-5xl">
            La clínica premium <em className="italic">al alcance de todos</em>.
          </h2>
          <p className="text-lg leading-relaxed text-cream/80">
            Más de 15 años cuidando sonrisas en Valencia. Equipo médico liderado por el cirujano experto
            en implantología <strong className="text-cream">Dr. Cristian Arnaudo</strong>, con dos
            clínicas equipadas con la última tecnología.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-2">
            {[
              { k: "+15", v: "Años de experiencia" },
              { k: "+10k", v: "Pacientes felices" },
              { k: "4.9★", v: "Valoración Google" },
              { k: "0%", v: "Intereses financiación" },
            ].map((s) => (
              <div key={s.v} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="font-display text-3xl font-bold text-primary">{s.k}</div>
                <div className="mt-1 text-xs text-cream/70">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="testimonios" className="mx-auto max-w-7xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <div className="text-xs font-medium uppercase tracking-widest text-primary">
          Lo que dicen nuestros pacientes
        </div>
        <h2 className="mt-3 font-display text-4xl font-medium tracking-tight lg:text-5xl">
          Sonrisas que hablan por sí solas.
        </h2>
      </div>
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <figure
            key={t.name}
            className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-7"
          >
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            <blockquote className="text-base leading-relaxed">{t.text}</blockquote>
            <figcaption className="mt-auto text-sm font-semibold">{t.name}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Brands() {
  const items = [...BRANDS, ...BRANDS];
  return (
    <section className="border-y border-border bg-cream/40 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Marcas que confían en nosotros
        </div>
        <div className="mt-8 overflow-hidden">
          <div className="flex w-max animate-marquee gap-12">
            {items.map((b, i) => (
              <div
                key={i}
                className="whitespace-nowrap font-display text-2xl font-semibold text-ink/40"
              >
                {b}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="contacto" className="mx-auto max-w-7xl px-6 py-24">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-ink p-10 text-cream lg:p-16">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/30 blur-3xl" />
        <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-primary" /> Primera visita gratis
            </div>
            <h2 className="font-display text-4xl font-medium leading-tight tracking-tight lg:text-5xl">
              ¿Listo para tu nueva sonrisa?
            </h2>
            <p className="max-w-md text-cream/80">
              Habla con <strong>Sofía</strong>, nuestra asistente IA, y agenda tu visita en menos de un
              minuto. O contáctanos directamente.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="tel:+34900000000"
                className="inline-flex items-center gap-2 rounded-full gradient-cyan px-6 py-3 text-sm font-semibold text-ink"
              >
                <Phone className="h-4 w-4" /> Llámanos
              </a>
              <a
                href="https://wa.me/34900000000"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold"
              >
                WhatsApp
              </a>
            </div>
          </div>
          <div className="grid gap-4">
            <ContactCard
              icon={<MapPin className="h-5 w-5" />}
              title="COV Cortes Valencianas"
              text="Av. de las Cortes Valencianas, Valencia"
            />
            <ContactCard
              icon={<MapPin className="h-5 w-5" />}
              title="COV Plaza España"
              text="Plaza de España, Valencia"
            />
            <ContactCard
              icon={<Clock className="h-5 w-5" />}
              title="Horario"
              text="Lun-Vie 9:00–20:30 · Sáb 9:00–14:00"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary">
        {icon}
      </div>
      <div>
        <div className="font-semibold">{title}</div>
        <div className="text-sm text-cream/70">{text}</div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-cream/40 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground md:flex-row">
        <div>© {new Date().getFullYear()} Centro Odontológico Valenciano · Valencia, España</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-ink">Política de privacidad</a>
          <a href="#" className="hover:text-ink">Aviso legal</a>
        </div>
      </div>
    </footer>
  );
}

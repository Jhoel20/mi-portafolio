"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { MapPin, Mail, Phone, Menu, X, ArrowRight, Check, MessageCircle, Factory, HardHat, Mountain, Ruler, Drone, Layers, PackageCheck } from "lucide-react";

const Viewer360 = dynamic(() => import("./Viewer360").then((m) => m.default), { ssr: false });
const Visor3D = dynamic(() => import("./Visor3D").then((m) => m.default), { ssr: false });

const NAV = ["Servicios", "Proyectos", "Modelos 3D", "Cómo trabajamos", "Contacto"];
const slug = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, "-");
const WHATSAPP =
  "https://wa.me/51930284388?text=Hola%2C%20me%20interesa%20cotizar%20un%20levantamiento%20fotogram%C3%A9trico%20con%20drone";

const SECTORS = ["Minería", "Agroindustria", "Edificación", "Inmobiliario"];

// Cada servicio se presenta por el problema que resuelve, con una foto real de fondo.
// El texto aparece al pasar el mouse (computadora) o al tocar la tarjeta (celular).
const SERVICES = [
  {
    icon: Factory,
    title: "Ampliaciones sin sorpresas",
    desc: "Diseña sobre las medidas reales de tu planta, no sobre planos antiguos.",
    items: ["Nube de puntos 3D", "Modelo BIM en Revit"],
    img: "/img/nube-bim-ampliacion.jpg",
  },
  {
    icon: HardHat,
    title: "Avance de obra",
    desc: "Compara el avance de tu obra sin ir al sitio.",
    items: ["Ortofotos por fecha", "Registro aéreo"],
    img: "/img/monitoreo-barranco.jpg",
  },
  {
    icon: Mountain,
    title: "Topografía",
    desc: "Áreas extensas y líneas largas en menos tiempo de campo.",
    items: ["Curvas de nivel", "Modelo de elevación"],
    img: "/img/mineria-huarochiri.jpg",
  },
  {
    icon: Ruler,
    title: "Planos as-built",
    desc: "Cómo quedó la obra, no cómo se diseñó.",
    items: ["Planos as-built", "Revit y AutoCAD"],
    img: "/img/cimentacion-lima-sur.jpg",
  },
];

type Project = { title: string; tags: string[]; desc: string; img: string; modelo3d?: boolean };

const PROJECTS: Project[] = [
  {
    title: "Levantamiento industrial Tulumayo — Ucayali",
    tags: ["Ortofoto", "Curvas de nivel", "Nube de puntos", "BIM", "5 ha"],
    desc: "Vuelo fotogramétrico sobre área industrial de aceites. Precisión ±2 cm. Entrega en 48h.",
    img: "/img/ucayali.jpg",
    modelo3d: true,
  },
  {
    title: "Unidad minera — Huarochirí, Lima",
    tags: ["Minería", "Línea de relave", "Planta"],
    desc: "Levantamiento con drone de la línea de relave y de la planta de una unidad minera.",
    img: "/img/mineria-huarochiri.jpg",
  },
  {
    title: "Planta agroindustrial — Tarapoto, San Martín",
    tags: ["Gemelo digital", "BIM", "Ampliación"],
    desc: "Modelo gemelo digital de la planta existente, usado como base para diseñar su ampliación.",
    img: "/img/planta-tarapoto.jpg",
  },
  {
    title: "Campus universitario — Lima Sur",
    tags: ["Edificación", "Cimentación"],
    desc: "Levantamiento aéreo durante la fase de cimentación de un nuevo campus universitario.",
    img: "/img/cimentacion-lima-sur.jpg",
  },
  {
    title: "Proyecto inmobiliario — Barranco, Lima",
    tags: ["Monitoreo de obra", "Edificación"],
    desc: "Monitoreo periódico del avance de obra con drone para una inmobiliaria.",
    img: "/img/monitoreo-barranco.jpg",
  },
];

const STEPS = [
  {
    n: "1",
    icon: Drone,
    title: "Volamos el sitio",
    desc: "Coordinamos el acceso contigo y capturamos el área con drone, sin detener tu operación.",
  },
  {
    n: "2",
    icon: Layers,
    title: "Procesamos los datos",
    desc: "Convertimos las fotos en ortofoto, nube de puntos y modelo de elevación, georreferenciados.",
  },
  {
    n: "3",
    icon: PackageCheck,
    title: "Entregamos listo para usar",
    desc: "Recibes los archivos en Revit y AutoCAD, y un visor web para revisar el modelo 3D desde cualquier equipo.",
  },
];

// "Cómo trabajamos": al entrar en pantalla se dibuja la línea entre pasos, uno tras otro,
// y luego cada ícono se ilumina en secuencia, en bucle, como un proceso en marcha.
function Steps() {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="mt-16 grid grid-cols-1 md:grid-cols-3">
      {STEPS.map((s, i) => {
        const Icon = s.icon;
        const last = i === STEPS.length - 1;
        const delay = `${i * 600}ms`;
        return (
          <div key={s.n} className="relative flex md:flex-col md:items-center gap-6 md:gap-0 pb-12 md:pb-0 md:px-6 md:text-center">
            {/* Conector hacia el siguiente paso: vertical en celular, horizontal en computadora */}
            {!last && (
              <>
                <span className="md:hidden absolute left-7 top-16 bottom-2 w-px bg-white/10 overflow-hidden">
                  <span className={`block w-full h-full bg-white origin-top transition-transform duration-700 ease-out ${seen ? "scale-y-100" : "scale-y-0"}`}
                    style={{ transitionDelay: `${i * 600 + 400}ms` }} />
                </span>
                <span className="hidden md:block absolute top-7 left-[calc(50%+2.5rem)] w-[calc(100%-5rem)] h-px bg-white/10 overflow-hidden">
                  <span className={`block w-full h-full bg-white origin-left transition-transform duration-700 ease-out ${seen ? "scale-x-100" : "scale-x-0"}`}
                    style={{ transitionDelay: `${i * 600 + 400}ms` }} />
                </span>
              </>
            )}

            {/* Ícono */}
            <div className={`relative shrink-0 w-14 h-14 flex items-center justify-center border transition-all duration-500
              ${seen ? "border-white text-white bg-white/5" : "border-white/15 text-neutral-600"}`}
              style={{ transitionDelay: delay }}>
              {seen && (
                <span className="absolute inset-0 border border-white motion-safe:animate-step-pulse opacity-0"
                  style={{ animationDelay: `${1800 + i * 1000}ms` }} />
              )}
              <Icon size={26} strokeWidth={1.5} className={i === 0 && seen ? "motion-safe:animate-hover-float" : ""} />
            </div>

            {/* Texto */}
            <div className={`md:mt-8 transition-all duration-700 ease-out ${seen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: `${i * 600 + 200}ms` }}>
              <span className="text-xs tracking-[0.2em] uppercase text-neutral-500">Paso {s.n}</span>
              <h3 className="mt-2 text-xl font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-3 text-neutral-400 leading-relaxed md:max-w-xs md:mx-auto">{s.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-medium tracking-[0.2em] uppercase text-neutral-500 mb-4">{children}</p>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeService, setActiveService] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(slug(id))?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <main className="bg-[#050505] text-white min-h-screen font-sans overflow-x-hidden">
      {/* NAV */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
          scrolled || menuOpen ? "bg-[#050505]/90 backdrop-blur border-b border-white/10" : ""
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-3">
            <img src="/img/logo.png" alt="" className="h-9 w-9" />
            <span className="text-left leading-tight">
              <span className="block text-base font-semibold tracking-wide">AIDRONE</span>
              <span className="block text-[10px] tracking-[0.3em] text-neutral-400">INGENIEROS</span>
            </span>
          </button>

          <div className="hidden lg:flex items-center gap-8">
            {NAV.map((n) => (
              <button key={n} onClick={() => scrollTo(n)} className="text-sm text-neutral-300 hover:text-white transition-colors">
                {n}
              </button>
            ))}
            <a href={WHATSAPP} target="_blank" rel="noopener"
              className="px-5 py-2.5 bg-white text-black text-sm font-medium hover:bg-neutral-200 transition-colors flex items-center gap-2">
              <MessageCircle size={17} /> WhatsApp
            </a>
          </div>

          <div className="lg:hidden flex items-center gap-4">
            <a href={WHATSAPP} target="_blank" rel="noopener"
              className="px-3.5 py-2 bg-white text-black text-sm font-medium flex items-center gap-2">
              <MessageCircle size={16} /> WhatsApp
            </a>
            <button className="text-white" aria-label="Menú" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden px-6 pb-6 pt-2 flex flex-col gap-4 border-t border-white/10">
            {NAV.map((n) => (
              <button key={n} onClick={() => scrollTo(n)} className="text-left text-base text-neutral-200">
                {n}
              </button>
            ))}
            <a href={WHATSAPP} target="_blank" rel="noopener"
              className="mt-2 px-5 py-3 bg-white text-black text-sm font-medium text-center">
              Cotizar por WhatsApp
            </a>
          </div>
        )}
      </nav>

      {/* PORTADA */}
      <section className="relative min-h-[100svh] flex items-end">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/video/hero.mp4"
          poster="/video/hero-poster.jpg"
          autoPlay muted loop playsInline preload="metadata"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/55 to-[#050505]/30" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/70 to-transparent" />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pb-16 pt-32 sm:pb-24">
          <p className="text-xs sm:text-sm font-medium tracking-[0.2em] uppercase text-neutral-300 mb-5">
            Fotogrametría con drone y BIM · Perú
          </p>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05] max-w-4xl">
            Tu planta u obra, medida y modelada en 3D antes de construir.
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-neutral-300 max-w-2xl leading-relaxed">
            Volamos el sitio con drone y entregamos ortofotos, nube de puntos y modelo BIM,
            para que diseñes ampliaciones y controles el avance con medidas reales.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <a href={WHATSAPP} target="_blank" rel="noopener"
              className="px-7 py-4 bg-white text-black font-medium text-center hover:bg-neutral-200 transition-colors">
              Solicitar cotización
            </a>
            <button onClick={() => scrollTo("Modelos 3D")}
              className="px-7 py-4 border border-white/40 text-white font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
              Ver un modelo 3D real <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* CIFRAS */}
      <section className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[["±2 cm", "Precisión"], ["48 h", "Tiempo de entrega"], ["20+", "Proyectos"], ["BIM", "Integración con Revit"]].map(([val, label]) => (
            <div key={label}>
              <div className="text-3xl sm:text-4xl font-semibold tracking-tight">{val}</div>
              <div className="mt-1 text-xs tracking-[0.2em] uppercase text-neutral-500">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTORES */}
      <section className="border-y border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-wrap items-center gap-x-10 gap-y-3">
          <span className="text-xs tracking-[0.2em] uppercase text-neutral-500">Trabajamos en</span>
          {SECTORS.map((s) => (
            <span key={s} className="text-sm sm:text-base text-neutral-200">{s}</span>
          ))}
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="py-24 px-6 scroll-mt-16">
        <div className="max-w-6xl mx-auto">
          <Label>Servicios</Label>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight max-w-3xl">
            Lo que resolvemos en tu proyecto
          </h2>

          <div className="mt-14 flex flex-col md:flex-row gap-2 md:h-[30rem]">
            {SERVICES.map((s, i) => {
              const open = activeService === i;
              const Icon = s.icon;
              return (
                <button
                  key={s.title}
                  type="button"
                  aria-expanded={open}
                  onClick={() => setActiveService(i)}
                  onMouseEnter={() => setActiveService(i)}
                  onFocus={() => setActiveService(i)}
                  className={`group relative overflow-hidden text-left border border-white/10 transition-all duration-500 ease-out
                    ${open ? "h-80 md:h-auto md:flex-[3]" : "h-28 md:h-auto md:flex-1"}`}
                >
                  <img src={s.img} alt="" loading="lazy"
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700
                      ${open ? "scale-100 grayscale-0" : "scale-110 grayscale"}`} />
                  <div className={`absolute inset-0 transition-colors duration-500
                    ${open ? "bg-gradient-to-t from-black via-black/60 to-black/10" : "bg-black/65"}`} />

                  <div className="relative h-full flex flex-col justify-end p-5 sm:p-7">
                    <Icon size={26} strokeWidth={1.5} className="text-white mb-3" />
                    <h3 className={`font-semibold tracking-tight leading-tight ${open ? "text-xl sm:text-2xl" : "text-lg md:text-xl"}`}>{s.title}</h3>
                    <div className={`grid transition-all duration-500 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                      <div className="overflow-hidden">
                        <p className="mt-3 text-neutral-200 leading-relaxed max-w-md">{s.desc}</p>
                        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                          {s.items.map((it) => (
                            <li key={it} className="flex items-center gap-2 text-sm text-white">
                              <Check size={15} className="shrink-0" /> {it}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROYECTOS */}
      <section id="proyectos" className="py-24 px-6 scroll-mt-16">
        <div className="max-w-6xl mx-auto">
          <Label>Proyectos</Label>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight">Trabajo en campo</h2>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PROJECTS.map((p, i) => (
              <article key={p.title} className={`${i === 0 ? "sm:col-span-2 " : ""}group border border-white/10 overflow-hidden`}>
                <div className={`relative overflow-hidden ${i === 0 ? "h-60 sm:h-[26rem]" : "h-60 sm:h-72"}`}>
                  <img src={p.img} alt={p.title} loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6 sm:p-7">
                  <h3 className="text-lg sm:text-xl font-semibold tracking-tight">{p.title}</h3>
                  <p className="mt-2 text-neutral-400">{p.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="text-xs px-2.5 py-1 border border-white/15 text-neutral-300">{t}</span>
                    ))}
                  </div>
                  {p.modelo3d && (
                    <button onClick={() => scrollTo("Modelos 3D")}
                      className="mt-5 text-sm font-medium text-white underline underline-offset-4 decoration-white/40 hover:decoration-white flex items-center gap-2">
                      Explorar este proyecto en 3D <ArrowRight size={16} />
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* MODELOS 3D */}
      <section id="modelos-3d" className="py-24 px-6 scroll-mt-16 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <Label>Modelos 3D</Label>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight max-w-3xl">
            Revisa un levantamiento real desde tu navegador
          </h2>
          <p className="mt-5 text-lg text-neutral-400 max-w-2xl leading-relaxed">
            Nube de puntos del proyecto Tulumayo, con 80 millones de puntos. Puedes rotarla,
            verla por elevación y medir distancias o áreas sin instalar nada.
          </p>

          <div className="mt-10">
            <Visor3D />
          </div>

          <div className="mt-20 grid lg:grid-cols-[1fr_2fr] gap-8 items-start">
            <div>
              <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">De la nube de puntos al modelo BIM</h3>
              <p className="mt-4 text-neutral-400 leading-relaxed">
                Sobre el levantamiento real del sitio modelamos la ampliación de la planta,
                para diseñar con las medidas exactas de lo que ya existe.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-neutral-200">
                <li className="flex items-center gap-3"><span className="w-3 h-3 bg-[#2a3bff]" /> Estructura de ampliación (modelo BIM)</li>
                <li className="flex items-center gap-3"><span className="w-3 h-3 bg-[#4f9a4a]" /> Sitio existente (nube de puntos)</li>
              </ul>
            </div>
            <figure className="border border-white/10 overflow-hidden bg-[#050505]">
              <img src="/img/nube-bim-ampliacion.jpg" loading="lazy" className="w-full h-auto block"
                alt="Nube de puntos de la planta con la estructura de ampliación modelada en BIM" />
            </figure>
          </div>

          <div className="mt-20">
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">Vista 360° desde el drone</h3>
            <p className="mt-4 text-neutral-400 max-w-2xl">Arrastra para mirar alrededor desde el punto de vuelo.</p>
            <div className="mt-8">
              <Viewer360 />
            </div>
          </div>
        </div>
      </section>

      {/* CÓMO TRABAJAMOS */}
      <section id="como-trabajamos" className="py-24 px-6 scroll-mt-16 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <Label>Cómo trabajamos</Label>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight">Del vuelo al modelo, en tres pasos</h2>

          <Steps />
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="py-24 px-6 scroll-mt-16 border-t border-white/10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14">
          <div>
            <Label>Contacto</Label>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight">Cuéntanos tu proyecto</h2>
            <p className="mt-5 text-lg text-neutral-400 max-w-md leading-relaxed">
              Dinos dónde está el sitio y qué necesitas. Te respondemos con una propuesta en menos de 24 horas.
            </p>

            <a href={WHATSAPP} target="_blank" rel="noopener"
              className="mt-8 inline-flex items-center gap-3 px-7 py-4 bg-white text-black font-medium hover:bg-neutral-200 transition-colors">
              <MessageCircle size={18} /> Escribir por WhatsApp
            </a>

            <div className="mt-10 space-y-5">
              {[
                { icon: <Phone size={18} />, label: "WhatsApp", val: "+51 930 284 388" },
                { icon: <Mail size={18} />, label: "Correo", val: "aidrone.ingenieros@gmail.com" },
                { icon: <MapPin size={18} />, label: "Ubicación", val: "Lima, Perú" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="text-neutral-500">{item.icon}</div>
                  <div>
                    <div className="text-xs tracking-[0.2em] uppercase text-neutral-500">{item.label}</div>
                    <div className="text-neutral-200">{item.val}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex gap-6 text-sm">
              <a href="https://www.linkedin.com/company/aidrone-eng/" target="_blank" rel="noopener"
                className="text-neutral-300 underline underline-offset-4 decoration-white/30 hover:text-white">LinkedIn</a>
              <a href="https://www.instagram.com/aidrone_engineers/" target="_blank" rel="noopener"
                className="text-neutral-300 underline underline-offset-4 decoration-white/30 hover:text-white">Instagram</a>
            </div>
          </div>

          <form className="flex flex-col gap-4 lg:pt-10" action="https://formspree.io/f/xdabobvr" method="POST">
            {[
              { name: "nombre", type: "text", ph: "Nombre completo", req: true },
              { name: "email", type: "email", ph: "Correo electrónico", req: true },
              { name: "empresa", type: "text", ph: "Empresa (opcional)", req: false },
            ].map((f) => (
              <input key={f.name} name={f.name} type={f.type} placeholder={f.ph} required={f.req}
                className="bg-transparent border border-white/20 px-4 py-3.5 text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors" />
            ))}
            <textarea name="mensaje" rows={5} required placeholder="¿Dónde está el sitio y qué necesitas?"
              className="bg-transparent border border-white/20 px-4 py-3.5 text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors resize-none" />
            <button type="submit"
              className="px-7 py-4 border border-white/40 text-white font-medium hover:bg-white hover:text-black transition-colors">
              Enviar consulta
            </button>
          </form>
        </div>
      </section>

      <footer className="border-t border-white/10 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-neutral-500">
          <span className="flex items-center gap-2">
            <img src="/img/logo.png" alt="" className="h-6 w-6 opacity-70" /> AIDRONE Ingenieros
          </span>
          <span>© 2026 · Lima, Perú</span>
        </div>
      </footer>
    </main>
  );
}

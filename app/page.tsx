"use client";
import dynamic from "next/dynamic";

const Viewer360 = dynamic(() => import("./Viewer360").then(m => m.default), { ssr: false });
const Visor3D = dynamic(() => import("./Visor3D").then(m => m.default), { ssr: false });
import { useEffect, useRef, useState } from "react";
import { MapPin, Mail, Phone, ChevronDown, Layers, Map, Box, FileText, Menu, X } from "lucide-react";

const NAV = ["Inicio", "Servicios", "Portafolio", "Contacto"];

const SERVICES = [
  {
    icon: <Map size={32} />,
    title: "Ortofotos",
    desc: "Imágenes aéreas georreferenciadas de alta resolución, ideales para análisis territorial, planificación urbana y supervisión de obras.",
  },
  {
    icon: <Layers size={32} />,
    title: "Curvas de Nivel",
    desc: "Modelos digitales de elevación (DEM/DTM) con curvas de nivel de precisión centimétrica para topografía y diseño civil.",
  },
  {
    icon: <Box size={32} />,
    title: "Nube de Puntos 3D",
    desc: "Captura densa de puntos 3D del terreno o estructura, procesada con fotogrametría avanzada para análisis volumétrico y modelado BIM.",
  },
  {
    icon: <FileText size={32} />,
    title: "Planos Postconstrucción",
    desc: "Documentación técnica postconstrucción integrada con Revit y AutoCAD, entregando planos as-built listos para expediente técnico.",
  },
];

const PROJECTS = [
  {
    title: "Levantamiento Industrual Tulumayo — Ucayali",
    tags: ["Ortofoto", "Curvas de Nivel", "Nube de Puntos", "BIM", "5 ha"],
    desc: "Vuelo fotogramétrico sobre área industria de aceites. Precisión ±2 cm. Entrega en 48h.",
    img: "/P_UCAYALI.JPG",
  },
  {
    title: "Edificio Comercial — Lima",
    tags: ["Nube de Puntos", "BIM/Revit", "Postconstrucción"],
    desc: "Escaneo fotogramétrico de fachada e interiores. Integración directa con modelo Revit.",
    color: "from-cyan-500/20 to-transparent",
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
  },
  {
    title: "Habilitación Urbana — Arequipa",
    tags: ["Ortofoto", "Planos AS-BUILT", "12 ha"],
    desc: "Mapeo completo de habilitación urbana para entidad municipal. GSD 3 cm/px.",
    color: "from-violet-500/20 to-transparent",
    img: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&q=80",
  },
  {
    title: "Carretera — Puno",
    tags: ["DEM", "Curvas de Nivel", "8 km"],
    desc: "Modelado de eje vial para diseño geométrico. Exportación en formatos DXF y LAS.",
    color: "from-emerald-500/20 to-transparent",
    img: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=600&q=80",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Inicio");
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <main className="bg-[#080c10] text-white min-h-screen font-mono overflow-x-hidden">
      {/* Grid background */}
      <div className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0,200,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,200,255,0.04) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow orbs */}
      <div className="fixed top-[-200px] left-[-200px] w-[600px] h-[600px] rounded-full pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, rgba(0,180,255,0.08) 0%, transparent 70%)" }} />
      <div className="fixed bottom-[-200px] right-[-200px] w-[500px] h-[500px] rounded-full pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, rgba(100,60,255,0.08) 0%, transparent 70%)" }} />

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#080c10]/90 backdrop-blur border-b border-cyan-900/30" : ""}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-cyan-400 text-xl font-bold tracking-widest">AI</span>
            <span className="text-white text-xl font-bold tracking-widest">DRONE</span>
            <span className="text-gray-500 text-xs ml-2 hidden sm:block">INGENIEROS</span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV.map((n) => (
              <button key={n} onClick={() => scrollTo(n)}
                className="text-xs tracking-widest uppercase text-gray-400 hover:text-cyan-400 transition-colors">
                {n}
              </button>
            ))}
            <a href="https://wa.me/51930284388?text=Hola%2C%20me%20interesa%20cotizar%20un%20levantamiento%20fotogram%C3%A9trico%20con%20drone"
            target="_blank"
            className="px-4 py-2 border border-cyan-500/50 text-cyan-400 text-xs tracking-widest hover:bg-cyan-500/10 transition-all">
            COTIZAR
            </a>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden text-gray-400" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#080c10]/95 border-b border-cyan-900/30 px-6 py-4 flex flex-col gap-4">
            {NAV.map((n) => (
              <button key={n} onClick={() => scrollTo(n)}
                className="text-xs tracking-widest uppercase text-gray-400 hover:text-cyan-400 text-left transition-colors">
                {n}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="inicio" ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-12">
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-cyan-500/30 px-4 py-1.5 mb-8 text-xs tracking-widest text-cyan-400 bg-cyan-500/5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            FOTOGRAMETRÍA CON DRONE — PERÚ
          </div>

          <h1 className="text-5xl sm:text-7xl font-black tracking-tight mb-4 leading-none">
            <span className="text-white">AI</span>
            <span className="text-cyan-400">DRONE</span>
          </h1>

          <p className="text-gray-300 text-sm sm:text-base tracking-widest uppercase mb-4">
            I N G E N I E R O S
          </p>

          <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed font-sans">
            Levantamientos fotogramétricos de precisión con tecnología drone.
            Ortofotos, curvas de nivel, nube de puntos y BIM.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => scrollTo("Portafolio")}
              className="px-8 py-3 bg-cyan-500 text-black text-xs font-bold tracking-widest hover:bg-cyan-400 transition-all w-full sm:w-auto">
              VER PROYECTOS
            </button>
<a href="https://wa.me/51930284388?text=Hola%2C%20me%20interesa%20cotizar%20un%20levantamiento%20fotogram%C3%A9trico%20con%20drone"
  target="_blank"
  className="px-8 py-3 border border-gray-600 text-gray-300 text-xs tracking-widest hover:border-cyan-500/50 hover:text-cyan-400 transition-all w-full sm:w-auto">
  SOLICITAR COTIZACIÓN
</a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600 animate-bounce">
          <span className="text-xs tracking-widest">SCROLL</span>
          <ChevronDown size={16} />
        </div>

        {/* Decorative lines */}
        <div className="absolute left-0 top-1/2 w-24 h-px bg-gradient-to-r from-transparent to-cyan-500/30" />
        <div className="absolute right-0 top-1/2 w-24 h-px bg-gradient-to-l from-transparent to-cyan-500/30" />
      </section>

      {/* STATS */}
      <section className="border-y border-cyan-900/20 py-8 bg-cyan-500/3">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[["±2 cm", "Precisión GSD"], ["48h", "Tiempo entrega"], ["20+", "Proyectos"], ["BIM", "Integración Revit"]].map(([val, label]) => (
            <div key={label}>
              <div className="text-2xl font-black text-cyan-400 mb-1">{val}</div>
              <div className="text-xs text-gray-500 tracking-widest uppercase">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <p className="text-cyan-400 text-xs tracking-widest uppercase mb-3">// 01 SERVICIOS</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white">Lo que entregamos</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-cyan-900/20">
            {SERVICES.map((s) => (
              <div key={s.title} className="bg-[#080c10] p-8 group hover:bg-cyan-500/5 transition-all duration-300">
                <div className="text-cyan-400 mb-6 group-hover:scale-110 transition-transform duration-300">{s.icon}</div>
                <h3 className="text-white font-bold text-base mb-3 tracking-wide">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-sans">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTAFOLIO */}
      <section id="portafolio" className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <p className="text-cyan-400 text-xs tracking-widest uppercase mb-3">// 02 PORTAFOLIO</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white">Proyectos ejecutados</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PROJECTS.map((p) => (
              <div key={p.title} className="group relative border border-cyan-900/30 overflow-hidden hover:border-cyan-500/40 transition-all duration-300">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img src={p.img} alt={p.title}
                    className="w-full h-full object-cover opacity-100 group-hover:scale-105 transition-all duration-500" />
                  <div className="absolute inset-0" />
                </div>

                {/* Content */}
                <div className="p-6 bg-[#080c10]">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {p.tags.map((t) => (
                      <span key={t} className="text-xs px-2 py-0.5 border border-cyan-800/50 text-cyan-500 tracking-wider">{t}</span>
                    ))}
                  </div>
                  <h3 className="text-white font-bold mb-2">{p.title}</h3>
                  <p className="text-gray-500 text-sm font-sans">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* VISOR 360 */}
      {/* VISOR 3D NUBE DE PUNTOS */}
<div className="max-w-6xl mx-auto px-6 mt-12">
  <p className="text-cyan-400 text-xs tracking-widest uppercase mb-4">
    // NUBE DE PUNTOS 3D — MODELO REAL
  </p>
  <Visor3D />
</div>
      <div className="max-w-6xl mx-auto px-6 mt-12">
        <p className="text-cyan-400 text-xs tracking-widest uppercase mb-4">
          // VISTA 360° — PROYECTO REAL
        </p>
        <Viewer360 />
      </div>
      {/* CONTACTO */}
      <section id="contacto" className="py-24 px-6 relative z-10 border-t border-cyan-900/20">
        <div className="max-w-3xl mx-auto">
          <div className="mb-16">
            <p className="text-cyan-400 text-xs tracking-widest uppercase mb-3">// 03 CONTACTO</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white">¿Tienes un proyecto?</h2>
            <p className="text-gray-400 mt-3 font-sans">Cuéntanos y te enviamos una propuesta en menos de 24 horas.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Info */}
            <div className="flex flex-col gap-6">
              {[
                { icon: <Mail size={16} />, label: "Email", val: "aidrone.ingenieros@gmail.com | ccus.jhoel.kana@gmail.com" },
                { icon: <Phone size={16} />, label: "WhatsApp", val: "+51 930284388" },
                { icon: <MapPin size={16} />, label: "Ubicación", val: "Lima, Perú" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="text-cyan-400">{item.icon}</div>
                  <div>
                    <div className="text-xs text-gray-600 tracking-widest uppercase">{item.label}</div>
                    <div className="text-gray-300 text-sm font-sans">{item.val}</div>
                  </div>
                </div>
              ))}

              <div className="mt-4 pt-6 border-t border-cyan-900/20">
                <p className="text-xs text-gray-600 tracking-widest uppercase mb-3">SÍGUENOS</p>
                <div className="flex gap-4">
                  <a href="#" className="text-xs text-gray-400 hover:text-cyan-400 tracking-widest transition-colors">LINKEDIN</a>
                  <a href="#" className="text-xs text-gray-400 hover:text-cyan-400 tracking-widest transition-colors">INSTAGRAM</a>
                </div>
              </div>
            </div>

{/* Form */}
<form className="flex flex-col gap-4" action="https://formspree.io/f/xdabobvr" method="POST">
  <input name="nombre" type="text" placeholder="Nombre completo"
    className="bg-transparent border border-cyan-900/40 px-4 py-3 text-sm text-gray-300 placeholder-gray-700 focus:outline-none focus:border-cyan-500/60 transition-colors font-sans" />
  <input name="email" type="email" placeholder="Correo electrónico"
    className="bg-transparent border border-cyan-900/40 px-4 py-3 text-sm text-gray-300 placeholder-gray-700 focus:outline-none focus:border-cyan-500/60 transition-colors font-sans" />
  <input name="empresa" type="text" placeholder="Empresa (opcional)"
    className="bg-transparent border border-cyan-900/40 px-4 py-3 text-sm text-gray-300 placeholder-gray-700 focus:outline-none focus:border-cyan-500/60 transition-colors font-sans" />
  <textarea name="mensaje" placeholder="Describe tu proyecto..." rows={4}
    className="bg-transparent border border-cyan-900/40 px-4 py-3 text-sm text-gray-300 placeholder-gray-700 focus:outline-none focus:border-cyan-500/60 transition-colors resize-none font-sans" />
  <button type="submit"
    className="px-8 py-3 bg-cyan-500 text-black text-xs font-bold tracking-widest hover:bg-cyan-400 transition-all">
    ENVIAR CONSULTA →
  </button>
</form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-cyan-900/20 py-8 px-6 text-center">
        <p className="text-gray-700 text-xs tracking-widest">
          © 2026 AIDRONE INGENIEROS — LIMA, PERÚ
        </p>
      </footer>
    </main>
  );
}

"use client";
import { useEffect, useRef, useState } from "react";

type Props = { src?: string; height?: number };

/**
 * Visor de nube de puntos (Potree) embebido.
 * - Solo carga el iframe cuando la sección entra en pantalla (la página carga más rápido).
 * - Muestra una capa "Explorar en 3D" para que la rueda del mouse / el dedo no queden
 *   atrapados en el visor mientras el usuario hace scroll por la página.
 */
export default function Visor3D({ src = "/potree/index.html", height = 620 }: Props) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Al salir de la sección, vuelve a bloquear la interacción para no atrapar el scroll
  useEffect(() => {
    const el = boxRef.current;
    if (!el || !active) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) setActive(false);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [active]);

  return (
    <div
      ref={boxRef}
      className="relative w-full border border-brand-900/30 overflow-hidden bg-[#050505]"
      style={{ height: `min(${height}px, 75vh)` }}
    >
      {visible && (
        <iframe
          src={src}
          title="Nube de puntos 3D"
          allow="fullscreen"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
          style={{ pointerEvents: active ? "auto" : "none" }}
        />
      )}

      {!active && (
        <button
          onClick={() => setActive(true)}
          className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-10 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent group cursor-pointer"
        >
          <span className="px-6 py-3 bg-brand-500 text-black text-xs font-bold tracking-widest group-hover:bg-brand-400 transition-all">
            ▶ EXPLORAR EN 3D
          </span>
          <span className="mt-3 text-[11px] tracking-widest text-gray-400">
            Rota, mide distancias y áreas sobre el modelo real
          </span>
        </button>
      )}

      <a
        href={src}
        target="_blank"
        rel="noopener"
        className="absolute bottom-3 right-3 z-20 px-3 py-2 bg-[#050505]/80 border border-brand-500/40 text-brand-400 text-[11px] font-bold tracking-widest hover:bg-brand-500 hover:text-black transition-all"
      >
        ⛶ PANTALLA COMPLETA
      </a>
    </div>
  );
}

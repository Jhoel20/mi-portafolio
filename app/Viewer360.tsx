"use client";
import { useEffect, useRef, useState } from "react";

type PannellumViewer = { destroy: () => void; on: (ev: string, cb: () => void) => void };

declare global {
  interface Window {
    pannellum?: { viewer: (el: HTMLElement, cfg: Record<string, unknown>) => PannellumViewer };
  }
}

const CDN = "https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build";

// Carga pannellum una sola vez aunque el componente se monte varias veces
let pannellumPromise: Promise<void> | null = null;
function loadPannellum(): Promise<void> {
  if (window.pannellum) return Promise.resolve();
  if (pannellumPromise) return pannellumPromise;
  pannellumPromise = new Promise((resolve, reject) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `${CDN}/pannellum.css`;
    document.head.appendChild(link);
    const script = document.createElement("script");
    script.src = `${CDN}/pannellum.js`;
    script.onload = () => resolve();
    script.onerror = reject;
    document.head.appendChild(script);
  });
  return pannellumPromise;
}

type Props = { pano8k?: string; pano4k?: string; height?: number };

export default function Viewer360({
  pano8k = "/img/pano_8k.jpg",
  pano4k = "/img/pano_4k.jpg",
  height = 520,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let viewer: PannellumViewer | null = null;
    let cancelled = false;

    const io = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        await loadPannellum();
        if (cancelled || !window.pannellum) return;

        // Muchos celulares no soportan texturas de más de 4096 px: elegimos la imagen adecuada
        const small = matchMedia("(pointer: coarse)").matches || window.innerWidth < 900;
        viewer = window.pannellum.viewer(el, {
          type: "equirectangular",
          panorama: small ? pano4k : pano8k,
          autoLoad: true,
          autoRotate: -2,
          autoRotateInactivityDelay: 8000,
          showZoomCtrl: !small,
          compass: false,
          hfov: 100,
          mouseZoom: false, // la rueda sigue haciendo scroll en la página
        });
        viewer.on("load", () => setLoading(false));
      },
      { rootMargin: "300px" }
    );
    io.observe(el);

    return () => {
      cancelled = true;
      io.disconnect();
      viewer?.destroy();
    };
  }, [pano4k, pano8k]);

  return (
    <div className="relative w-full border border-brand-900/30 overflow-hidden bg-[#050505]"
      style={{ height: `min(${height}px, 70vh)` }}>
      <div ref={ref} className="absolute inset-0" />
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-[11px] tracking-[0.25em] text-gray-500 animate-pulse">CARGANDO VISTA 360°…</span>
        </div>
      )}
    </div>
  );
}

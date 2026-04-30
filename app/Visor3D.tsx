"use client";

export default function Visor3D() {
  return (
    <div
      className="w-full border border-cyan-900/30 rounded overflow-hidden relative"
      style={{ height: "600px" }}
    >
      <iframe
        src="/potree/index.html"
        style={{ width: "100%", height: "100%", border: "none" }}
      />

      <a
        href="/potree/index.html"
        target="_blank"
        className="absolute bottom-4 right-4 px-4 py-2 bg-cyan-500 text-black text-xs font-bold tracking-widest hover:bg-cyan-400 transition-all"
      >
        PANTALLA COMPLETA
      </a>
    </div>
  );
}
"use client";
import { useEffect, useRef } from "react";

export default function Viewer360() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js";
    script.onload = () => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css";
      document.head.appendChild(link);

      setTimeout(() => {
        (window as any).pannellum.viewer(containerRef.current, {
          type: "equirectangular",
          panorama: "/foto_prueba.JPG",
          autoLoad: true,
          autoRotate: -2,
          compass: false,
        });
      }, 300);
    };
    document.head.appendChild(script);
  }, []);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "500px" }}
      className="rounded border border-cyan-900/30 overflow-hidden" />
  );
}
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AIDRONE Ingenieros — Fotogrametría con drone en Perú",
  description:
    "Levantamientos fotogramétricos con drone: ortofotos, curvas de nivel, nubes de puntos 3D y planos as-built integrados con BIM/Revit. Lima, Perú.",
  keywords: ["fotogrametría", "drone", "ortofoto", "curvas de nivel", "nube de puntos", "BIM", "topografía", "Perú"],
  openGraph: {
    title: "AIDRONE Ingenieros — Fotogrametría con drone",
    description: "Ortofotos, curvas de nivel, nubes de puntos 3D y BIM. Explora un modelo 3D real en la web.",
    images: ["/img/ucayali.jpg"],
    locale: "es_PE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

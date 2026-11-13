"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { ConnectorLine } from "./ConnectorLine";

const PLATFORMS = [
  { name: "Instagram & Reels" },
  { name: "TikTok & Konten Video" },
  { name: "Google Maps & Pencarian" },
  { name: "Iklan Meta & TikTok Ads" },
];

export function HeroSection() {
  const [platformIdx, setPlatformIdx] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 50, y: 30 });

  useEffect(() => {
    const platformTimer = setInterval(() => {
      setPlatformIdx((prev) => (prev + 1) % PLATFORMS.length);
    }, 2600);
    return () => clearInterval(platformTimer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const activePlatform = PLATFORMS[platformIdx];

  return (
    <section className="relative pt-20 pb-4 sm:pt-24 sm:pb-6 px-3 sm:px-6 bg-[#060505]">
      {/* Wealthclub-style Framed Dark Luxury Stage */}
      <div
        onMouseMove={handleMouseMove}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-[28px] sm:rounded-[36px] border border-white/[0.08] bg-[#0A0908] pt-16 pb-6 sm:pt-24 sm:pb-8 shadow-[0_30px_100px_rgba(0,0,0,0.85)] bg-dot-matrix-dark"
      >
        {/* Interactive Mouse-Tracking Champagne Ambient Glow */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-500"
          style={{
            background: `radial-gradient(620px circle at ${mousePos.x}% ${mousePos.y}%, rgba(226, 184, 150, 0.13), transparent 65%)`,
          }}
          aria-hidden="true"
        />

        {/* Centered Editorial Copywriting */}
        <div className="relative z-10 mx-auto max-w-4xl px-5 sm:px-8 text-center">
          {/* Interactive Platform Capture Ticker */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 backdrop-blur-md"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#E2B896]" />
            <span className="text-[11px] font-medium text-[#A99E94]">
              Menangkap Trafik:
            </span>
            <div className="relative h-4 w-40 sm:w-48 overflow-hidden text-left">
              <AnimatePresence mode="wait">
                <motion.span
                  key={activePlatform.name}
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="absolute inset-0 text-[11px] font-bold tracking-wide text-[#E2B896]"
                >
                  {activePlatform.name}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Main Display Headline with Glowing Champagne Emphasis */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="mt-7 text-3xl sm:text-5xl lg:text-[58px] font-semibold tracking-[-0.03em] text-[#F5F2EE] leading-[1.12]"
          >
            Membangun{" "}
            <span className="font-serif italic font-semibold text-[#FFF7EE] text-glow-champagne">
              kepercayaan pasien
            </span>{" "}
            selama 3 bulan dengan menangkap trafik di semua platform.
          </motion.h1>

          {/* Concise Luxury Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.16 }}
            className="mt-6 mx-auto max-w-2xl text-sm sm:text-base text-[#9A8F86] leading-relaxed"
          >
            Website resmi khusus{" "}
            <span className="text-[#EAE2DA] font-medium">
              klinik kecantikan &amp; dokter estetika
            </span>{" "}
            yang menampilkan kredibilitas medis, before–after testimoni, katalog
            perawatan interaktif, hingga{" "}
            <span className="text-[#EAE2DA] font-medium">
              reservasi langsung ke WhatsApp
            </span>{" "}
            dengan data pasien yang sudah rapi untuk admin.
          </motion.p>

          {/* Centered Specular CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.24 }}
            className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3.5"
          >
            <a
              href="#konsultasi"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 btn-specular px-7 py-3.5 text-xs sm:text-sm font-semibold text-[#F5F2EE] transition-all"
            >
              Klaim Free Konsultasi
              <ArrowRight className="h-4 w-4 text-[#E2B896]" />
            </a>
            <a
              href="#demo-wa"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.02] px-6 py-3.5 text-xs sm:text-sm font-medium text-[#C5BBB2] transition-colors hover:bg-white/[0.06] hover:text-white"
            >
              <MessageCircle className="h-4 w-4 text-[#E2B896]" />
              Simulasi Form Reservasi WA
            </a>
          </motion.div>
        </div>

        {/* Subtle Halftone Monogram Watermark (Wealthclub-inspired, no photo) */}
        <div
          className="pointer-events-none relative mt-10 sm:mt-14 flex justify-center select-none"
          aria-hidden="true"
        >
          <span className="font-serif italic text-[140px] sm:text-[200px] font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#E2B896]/18 via-[#E2B896]/06 to-transparent">
            A
          </span>
        </div>

        {/* Bottom glowing dot connector at frame edge */}
        <div className="relative z-10 flex justify-center">
          <ConnectorLine dark />
        </div>
      </div>
    </section>
  );
}

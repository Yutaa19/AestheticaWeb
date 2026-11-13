"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const DELIVERABLES = [
  "Audit kebocoran trafik & alur admin WhatsApp klinik",
  "Desain website eksklusif (kredibilitas dokter & before–after)",
  "Katalog treatment interaktif pemisah jalur Dokter & Beautician",
  "Form reservasi pasien terstruktur direct-to-WhatsApp admin",
  "Integrasi tracking trafik Instagram, TikTok, Google & Meta Ads",
];

export function OfferCtaSection() {
  const [remainingSlots, setRemainingSlots] = useState<number>(98);
  const [totalSlots] = useState<number>(100);

  useEffect(() => {
    let mounted = true;
    fetch("/api/slots")
      .then((res) => res.json())
      .then((data: { remaining?: number }) => {
        if (mounted && typeof data.remaining === "number") {
          setRemainingSlots(data.remaining);
        }
      })
      .catch(() => {
        // Fallback to initial state if fetch fails
      });
    return () => {
      mounted = false;
    };
  }, []);

  const handleClaimClick = () => {
    setRemainingSlots((prev) => Math.max(0, prev - 1));
    fetch("/api/slots", { method: "POST", keepalive: true })
      .then((res) => res.json())
      .then((data: { remaining?: number }) => {
        if (typeof data.remaining === "number") {
          setRemainingSlots(data.remaining);
        }
      })
      .catch(() => {
        // Keep optimistic decrement
      });
  };

  const waHref = buildWhatsAppUrl(
    "Halo Tim AestheticaWeb, saya ingin klaim *FREE Konsultasi & Blueprint Website Klinik* untuk kuota 100 Klinik Pertama."
  );

  return (
    <section
      id="konsultasi"
      className="relative py-20 sm:py-28 bg-[#060505] text-[#F5F2EE] overflow-hidden"
    >
      {/* Subtle Ambient Champagne Glow behind card */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[420px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(226,184,150,0.09)_0%,transparent_70%)] blur-2xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        {/* Minimal Centered Headline (Matching Wealthclub Reference) */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center text-3xl sm:text-5xl font-semibold tracking-[-0.03em] leading-[1.15] text-[#F5F2EE]"
        >
          Mulai bangun kepercayaan
          <br />
          pasien klinik Anda hari ini
        </motion.h2>

        {/* Focused Single Premium Card (Wealthclub Reference Style) */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="mt-12 mx-auto max-w-[440px] rounded-2xl border border-white/[0.09] bg-[#0B0A09] p-7 sm:p-9 shadow-[0_30px_90px_rgba(0,0,0,0.85)]"
        >
          {/* Top Brand + Live Remaining Slot Pill */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-[#E2B896]" />
              <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#D8CEC4]">
                AestheticaWeb
              </span>
            </div>
            <span className="text-[11px] font-semibold text-[#E2B896]">
              Sisa {remainingSlots} / {totalSlots} Slot
            </span>
          </div>

          {/* Eyebrow */}
          <p className="mt-7 text-[10px] font-semibold tracking-[0.18em] uppercase text-[#7D736B]">
            KHUSUS 100 KLINIK PERTAMA • FREE KONSULTASI
          </p>

          {/* Strikethrough Price + GRATIS */}
          <div className="mt-2.5">
            <div className="flex items-baseline gap-3">
              <span className="text-lg font-semibold text-[#6E645C] line-through decoration-[#B84A4A] decoration-2">
                Rp 5.000.000
              </span>
              <span className="text-4xl sm:text-[42px] font-bold tracking-tight text-[#F5F2EE]">
                GRATIS
              </span>
            </div>
            <p className="mt-1 text-xs text-[#7D736B]">/ sesi konsultasi &amp; audit</p>
          </div>

          {/* Clean Checklist */}
          <ul className="mt-7 space-y-3">
            {DELIVERABLES.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-xs sm:text-[13px] text-[#C8BEB5] leading-relaxed"
              >
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border border-white/15 bg-white/[0.04] text-[#E2B896]">
                  <Check className="h-2.5 w-2.5" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* Specular CTA Button (Decrements Slot on Click) */}
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClaimClick}
            className="mt-8 w-full inline-flex items-center justify-center rounded-xl border border-white/20 btn-specular px-6 py-3.5 text-xs sm:text-sm font-semibold text-[#F5F2EE] transition-all"
          >
            Klaim Free Konsultasi
          </a>

          <p className="mt-4 text-center text-[11px] text-[#6E645C]">
            Tersisa {remainingSlots} slot konsultasi untuk batch pertama.
          </p>
        </motion.div>

        {/* Minimal Footer */}
        <footer className="mt-20 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6E645C]">
          <p>© 2026 AestheticaWeb. Spesialis Website Konversi Klinik Kecantikan.</p>
          <p>Dirancang khusus untuk Owner Klinik &amp; Dokter Estetika Indonesia.</p>
        </footer>
      </div>
    </section>
  );
}

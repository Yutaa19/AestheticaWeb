"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { ConnectorLine } from "./ConnectorLine";

export function QuoteSection() {
  return (
    <section className="relative py-16 sm:py-24 bg-[#060505]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-[32px] border border-white/[0.08] bg-[#0C0B0A] px-6 py-12 sm:px-14 sm:py-16 shadow-[0_24px_65px_rgba(0,0,0,0.65)]"
        >
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#E2B896]/30 bg-[#171311] text-[#E2B896]">
            <Quote className="h-5 w-5" />
          </span>

          <blockquote className="mt-6 font-serif italic text-2xl sm:text-4xl font-semibold text-[#F5F2EE] leading-snug">
            &ldquo;Keahlian medis Anda menyelamatkan kulit dan kepercayaan diri
            pasien. Jangan biarkan sistem reservasi yang lambat dan katalog PDF
            yang membingungkan membuat pasien terbaik Anda berpindah ke klinik
            sebelah.&rdquo;
          </blockquote>

          <div className="mt-8 flex flex-col items-center">
            <p className="text-sm font-bold text-[#F5F2EE]">
              Siap Menjadikan Website Sebagai Aset Konversi Klinik 24/7?
            </p>
            <p className="mt-1 text-xs text-[#9A8F86]">
              Konsultasikan alur pasien, katalog treatment, dan sistem WhatsApp
              klinik Anda bersama tim kami —{" "}
              <span className="font-semibold text-[#E2B896]">
                100% Gratis untuk 100 Klinik Pertama.
              </span>
            </p>
          </div>
        </motion.div>
      </div>

      <ConnectorLine dark className="mt-12 sm:mt-16" />
    </section>
  );
}

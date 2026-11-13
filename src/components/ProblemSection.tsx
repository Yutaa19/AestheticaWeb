"use client";

import { motion } from "framer-motion";
import {
  Clock,
  FileWarning,
  Ghost,
  Sparkles,
  Stethoscope,
  TimerOff,
} from "lucide-react";
import { ConnectorLine } from "./ConnectorLine";

const CLINIC_PROBLEMS = [
  {
    id: "no-show",
    tagline: "Sudah Tanya Panjang Lebar, Hari-H Tidak Datang",
    description:
      "Admin sudah meluangkan waktu lama membalas chat calon pasien, tapi saat hari perawatan tiba-tiba batal atau menghilang tanpa kabar.",
    icon: Ghost,
    visualLabel: "Hari-H • Tidak Jadi Datang",
    spanWide: false,
  },
  {
    id: "salah-antrean",
    tagline: "Salah Antrean Antara Beautician dan Dokter",
    description:
      "Pasien sering bingung mana perawatan yang bisa langsung ditangani Beautician dan mana yang wajib konsultasi Dokter terlebih dahulu.",
    icon: Stethoscope,
    visualLabel: "Bingung Pilih Antrean",
    spanWide: false,
  },
  {
    id: "menu-paralysis",
    tagline: "Pasien Bingung Memilih Perawatan dari Daftar PDF",
    description:
      "Mengirim brosur atau daftar harga PDF berhalaman-halaman membuat calon pasien malas membaca, tidak paham manfaatnya, lalu menunda jadwal.",
    icon: FileWarning,
    visualLabel: "Terlalu Banyak Pilihan PDF",
    spanWide: true,
  },
  {
    id: "waiting-time",
    tagline: "Jadwal Bentrok & Pasien Menunggu Terlalu Lama",
    description:
      "Pencatatan jadwal manual dari banyak chat WhatsApp membuat jadwal ruangan bertabrakan, sehingga pasien menunggu lama di ruang tunggu.",
    icon: Clock,
    visualLabel: "Jadwal Bertabrakan",
    spanWide: false,
  },
  {
    id: "lead-decay",
    tagline: "Biaya Iklan Terbuang Karena Admin Lambat Balas",
    description:
      "Iklan sudah berjalan setiap hari, tetapi saat chat menumpuk dan admin telat membalas lebih dari 5 menit, calon pasien langsung pindah ke klinik lain.",
    icon: TimerOff,
    visualLabel: "Telat Balas • Pasien Pindah",
    spanWide: false,
  },
];

export function ProblemSection() {
  return (
    <section id="masalah" className="relative py-20 sm:py-28 bg-[#060505]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Centered Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-[#F5F2EE] leading-tight">
            5 Masalah yang Diam-Diam Mengurangi{" "}
            <span className="font-serif italic text-[#E2B896]">
              Pemasukan Klinik
            </span>{" "}
            Setiap Hari
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#9A8F86] leading-relaxed max-w-xl mx-auto">
            Banyak klinik sudah punya dokter berpengalaman dan alat lengkap,
            tapi kehilangan banyak calon pasien karena cara pendaftaran masih
            serba manual.
          </p>
        </motion.div>

        {/* Sticky Left + Scrollable Bento Cards Right */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Sticky Column */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] uppercase text-[#E2B896]">
              <Sparkles className="h-3.5 w-3.5" />
              Kenapa Ini Mendesak?
            </div>

            <h3 className="text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-[#F5F2EE] leading-snug">
              Masalah Kecil.{" "}
              <span className="text-[#E2B896]">Dampak Besar.</span>
            </h3>

            <p className="text-sm text-[#9A8F86] leading-relaxed">
              Setiap kali admin lambat membalas atau calon pasien bingung memilih
              perawatan, uang iklan yang sudah Anda keluarkan ikut terbuang
              karena pasien memilih klinik lain yang lebih mudah dihubungi.
            </p>
          </div>

          {/* Right Scrollable Bento Grid (Simple everyday wording) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CLINIC_PROBLEMS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: idx * 0.06 }}
                  className={`group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0B0A09] p-6 sm:p-7 flex flex-col justify-between transition-colors hover:border-[#E2B896]/35 ${
                    item.spanWide
                      ? "sm:col-span-2 min-h-[260px]"
                      : "min-h-[340px]"
                  }`}
                >
                  <div className="relative z-10 max-w-md">
                    <h4 className="text-base sm:text-lg font-bold text-[#F5F2EE] tracking-tight">
                      {item.tagline}
                    </h4>
                    <p className="mt-2 text-xs sm:text-sm text-[#8F857D] leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div
                    className={`relative z-10 mt-8 flex ${
                      item.spanWide ? "justify-end" : "justify-center"
                    }`}
                  >
                    <div
                      className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 h-32 w-48 rounded-full bg-[radial-gradient(circle,rgba(226,184,150,0.16)_0%,transparent_70%)] blur-xl"
                      aria-hidden="true"
                    />

                    <div className="relative w-full max-w-[230px] rounded-2xl border border-white/10 bg-gradient-to-br from-[#191512] to-[#0D0B0A] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)] transform -rotate-3 transition-transform duration-500 group-hover:rotate-0 group-hover:-translate-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E2B896]/30 bg-[#E2B896]/10 text-[#E2B896]">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="h-1.5 w-8 rounded-full bg-white/10" />
                      </div>
                      <p className="mt-4 text-xs font-semibold text-[#EAE2DA]">
                        {item.visualLabel}
                      </p>
                      <div className="mt-2.5 h-1 w-2/3 rounded-full bg-gradient-to-r from-[#E2B896]/60 to-transparent" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <ConnectorLine dark className="mt-16 sm:mt-20" />
    </section>
  );
}

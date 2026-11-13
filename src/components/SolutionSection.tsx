"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BellRing,
  Check,
  Clock,
  Lock,
  Sparkles,
  Stethoscope,
  Ticket,
  UserCheck,
} from "lucide-react";
import { ConnectorLine } from "./ConnectorLine";

const COMPLAINT_OPTIONS = [
  {
    id: "jerawat",
    label: "Jerawat & Bekasnya",
    packageName: "Paket Acne Glow",
    price: "Rp 250.000",
    duration: "45 Menit",
    pathway: "Jalur Dokter / Beautician",
    note: "Sudah termasuk pembersihan komedo, peeling ringan, & masker pereda radang.",
  },
  {
    id: "flek",
    label: "Flek Hitam",
    packageName: "Paket Laser Rejuve",
    price: "Rp 350.000",
    duration: "60 Menit",
    pathway: "Wajib Konsultasi Dokter",
    note: "Sudah termasuk krim anestesi & pengecekan kondisi kulit langsung oleh dokter.",
  },
  {
    id: "kusam",
    label: "Wajah Kusam",
    packageName: "Facial Detox Glow",
    price: "Rp 185.000",
    duration: "45 Menit",
    pathway: "Langsung Beautician",
    note: "Perawatan instan tanpa rasa sakit untuk mengembalikan kecerahan wajah.",
  },
] as const;

export function SolutionSection() {
  const [selectedComplaint, setSelectedComplaint] = useState<string>("jerawat");
  const [reminderSaved, setReminderSaved] = useState(false);

  const activeComplaint =
    COMPLAINT_OPTIONS.find((item) => item.id === selectedComplaint) ??
    COMPLAINT_OPTIONS[0];

  return (
    <section
      id="solusi"
      className="relative bg-[#0a0a0a] overflow-hidden pt-20 sm:pt-28 pb-12"
    >
      {/* ============================================================
          INTRO HEADER SECTION #solusi
         ============================================================ */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 text-center pb-12 sm:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-5xl lg:text-[54px] font-semibold tracking-[-0.03em] text-[#F5F2EE] leading-[1.14]">
            Bukan hanya sekedar website tetapi menjadi kunci memberikan{" "}
            <span className="font-serif italic font-semibold text-[#FFF7EE] text-glow-champagne">
              pelayanan terbaik
            </span>
          </h2>

          <p className="mt-5 text-sm sm:text-base text-[#9A8F86] leading-relaxed max-w-2xl mx-auto">
            Enam fitur praktis di dalam satu website untuk menjawab rasa
            penasaran pasien detik itu juga, merapikan jadwal antrean, dan
            memastikan pasien datang tepat waktu.
          </p>
        </motion.div>
      </div>

      <ConnectorLine dark className="my-4" />

      {/* ============================================================
          SOLUSI 1 (Ref 6: Centered Hero Showcase + Large App Window)
         ============================================================ */}
      <div className="relative py-20 sm:py-28">
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-[680px] rounded-full bg-amber-500/[0.06] blur-[140px]"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h3 className="text-2xl sm:text-4xl lg:text-[42px] font-semibold tracking-[-0.03em] text-[#F5F2EE] leading-[1.18]">
              Pasien Dijawab Detik Itu Juga,{" "}
              <span className="font-serif italic text-[#FFF7EE] text-glow-champagne">
                Meski Admin Sedang Sibuk.
              </span>
            </h3>

            <p className="mt-4 text-sm sm:text-base text-[#9A8F86] leading-relaxed max-w-2xl mx-auto">
              Calon pasien cukup klik keluhan wajahnya di website untuk langsung
              melihat rekomendasi perawatan dan kisaran harganya saat itu juga.
              Pasien tidak lagi kabur ke klinik lain hanya karena menunggu
              balasan chat admin.
            </p>
          </motion.div>

          {/* Large Centered Interactive UI Frame */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="mt-12 mx-auto max-w-4xl rounded-[28px] border border-white/10 bg-[#121212]/90 p-5 sm:p-8 shadow-[0_30px_90px_rgba(0,0,0,0.85)] hover:border-amber-500/40 transition-all duration-300"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="ml-2 text-xs font-semibold text-[#C5BBB2]">
                  Asisten Rekomendasi Klinik • Online 24 Jam
                </span>
              </div>
              <span className="rounded-full border border-emerald-500/40 bg-emerald-500/15 px-3 py-1 text-[10px] font-bold text-emerald-300">
                ● Respon Otomatis Aktif
              </span>
            </div>

            <div className="text-center">
              <p className="text-base sm:text-xl font-semibold text-[#F5F2EE]">
                Apa keluhan wajah yang ingin Anda atasi hari ini?
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
                {COMPLAINT_OPTIONS.map((item) => {
                  const isActive = item.id === activeComplaint.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedComplaint(item.id)}
                      className={`rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer border ${
                        isActive
                          ? "border-amber-400/70 bg-amber-500/20 text-amber-200 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                          : "border-white/10 bg-white/[0.03] text-[#9A8F86] hover:text-white hover:border-white/25"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeComplaint.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="mt-6 rounded-2xl border border-amber-500/35 bg-gradient-to-br from-amber-500/[0.10] via-[#141210] to-[#0a0a0a] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-[10px] font-bold text-amber-300">
                      Rekomendasi Cocok
                    </span>
                    <span className="text-[11px] text-[#9A8F86]">
                      {activeComplaint.pathway} • {activeComplaint.duration}
                    </span>
                  </div>
                  <h4 className="mt-2 text-lg sm:text-xl font-bold text-[#F5F2EE]">
                    {activeComplaint.packageName} - {activeComplaint.price}
                  </h4>
                  <p className="mt-1 text-xs sm:text-sm text-[#9A8F86]">
                    {activeComplaint.note}
                  </p>
                </div>

                <a
                  href="#demo-wa"
                  className="shrink-0 inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 hover:bg-amber-300 px-5 py-3 text-xs font-bold text-[#0a0a0a] transition-colors"
                >
                  Booking Paket Ini
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <ConnectorLine dark className="my-4" />

      {/* ============================================================
          SOLUSI 2 (3-Column Hero: Katalog Anti-PDF + Antrean Rapi + Tiket Digital)
         ============================================================ */}
      <div className="relative py-20 sm:py-28">
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-[720px] rounded-full bg-amber-500/[0.05] blur-[140px]"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h3 className="text-2xl sm:text-4xl lg:text-[42px] font-semibold tracking-[-0.03em] text-[#F5F2EE] leading-[1.18]">
              Katalog Jelas, Antrean Rapi, &amp;{" "}
              <span className="font-serif italic text-[#FFF7EE] text-glow-champagne">
                Komitmen Pasien
              </span>{" "}
              dalam Satu Alur.
            </h3>

            <p className="mt-4 text-sm sm:text-base text-[#9A8F86] leading-relaxed max-w-2xl mx-auto">
              Pasien langsung tahu jalur perawatannya tanpa bingung baca brosur
              PDF, memilih jam yang kursinya masih tersedia, lalu mengunci
              jadwal dengan tiket resmi klinik.
            </p>
          </motion.div>

          {/* 3-Column Bento Cards (Matching Reference) */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Kolom 1: Katalog Anti-PDF */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.04 }}
              className="rounded-3xl border border-white/10 bg-[#121212]/90 p-6 flex flex-col justify-between hover:border-amber-500/40 transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.65)]"
            >
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/35 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold text-emerald-300">
                  <Sparkles className="h-3 w-3" />
                  Katalog Anti-PDF
                </span>
                <h4 className="mt-4 text-lg font-bold text-[#F5F2EE] leading-snug">
                  Jalur Dokter &amp; Beautician Terpisah Otomatis
                </h4>
                <p className="mt-2 text-xs text-[#9A8F86] leading-relaxed">
                  Ganti brosur PDF kecil dengan katalog rapi berdurasi jelas dan
                  harga transparan tanpa biaya tersembunyi di kasir.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-2.5 rounded-2xl border border-white/10 bg-[#0a0a0a] p-3">
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/[0.06] p-2.5">
                  <span className="inline-flex items-center gap-1 rounded bg-emerald-500/20 px-1.5 py-0.5 text-[9px] font-bold text-emerald-300 leading-tight">
                    <UserCheck className="h-2.5 w-2.5 shrink-0" />
                    Langsung Beautician • 45 Menit
                  </span>
                  <p className="mt-2 text-xs font-bold text-[#F5F2EE]">
                    Facial Detox
                  </p>
                  <p className="text-[11px] font-semibold text-emerald-300">
                    Rp 185.000
                  </p>
                </div>

                <div className="rounded-xl border border-amber-500/35 bg-amber-500/[0.06] p-2.5">
                  <span className="inline-flex items-center gap-1 rounded bg-amber-500/20 px-1.5 py-0.5 text-[9px] font-bold text-amber-300 leading-tight">
                    <Stethoscope className="h-2.5 w-2.5 shrink-0" />
                    Wajib Konsultasi Dokter • 60 Menit
                  </span>
                  <p className="mt-2 text-xs font-bold text-[#F5F2EE]">
                    Laser Rejuve
                  </p>
                  <p className="text-[10px] text-amber-200/90 mt-0.5">
                    Harga Sudah Termasuk Krim Anestesi
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Kolom 2: Antrean Rapi */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="rounded-3xl border border-white/10 bg-[#121212]/90 p-6 flex flex-col justify-between hover:border-amber-500/40 transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.65)]"
            >
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/35 bg-amber-500/10 px-3 py-1 text-[11px] font-bold text-amber-300">
                  <Clock className="h-3 w-3" />
                  Antrean Rapi
                </span>
                <h4 className="mt-4 text-lg font-bold text-[#F5F2EE] leading-snug">
                  Pilihan Jam dengan Kuota Kursi Otomatis
                </h4>
                <p className="mt-2 text-xs text-[#9A8F86] leading-relaxed">
                  Pasien hanya bisa memilih jam yang kursinya masih kosong dan
                  data langsung tercatat ke tabel jadwal klinik.
                </p>
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-[#0a0a0a] p-3.5 space-y-2">
                <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2 opacity-55">
                  <span className="inline-flex items-center gap-1.5 text-xs text-[#7D736B] line-through">
                    <Lock className="h-3 w-3" />
                    10.00 WIB
                  </span>
                  <span className="text-[11px] font-semibold text-[#8E847C]">
                    Penuh ❌
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-amber-400/60 bg-amber-500/15 px-3 py-2">
                  <span className="text-xs font-bold text-amber-200">
                    13.00 WIB
                  </span>
                  <span className="text-[11px] font-bold text-amber-300">
                    Sisa 1 Kursi ⚡
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-2">
                  <span className="text-xs font-semibold text-emerald-100">
                    15.00 WIB
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-300">
                    Tersedia ✅
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Kolom 3: Tiket Digital Resmi Klinik */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.12 }}
              className="rounded-3xl border border-white/10 bg-[#121212]/90 p-6 flex flex-col justify-between hover:border-amber-500/40 transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.65)]"
            >
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/35 bg-amber-500/10 px-3 py-1 text-[11px] font-bold text-amber-300">
                  <Ticket className="h-3 w-3" />
                  Tiket Digital Resmi Klinik
                </span>
                <h4 className="mt-4 text-lg font-bold text-[#F5F2EE] leading-snug">
                  Pengunci Komitmen &amp; Pengingat Kalender HP
                </h4>
                <p className="mt-2 text-xs text-[#9A8F86] leading-relaxed">
                  Pasien otomatis mendapat tiket potongan khusus yang hangus
                  jika batal datang, lengkap dengan tombol pengingat HP.
                </p>
              </div>

              <div className="mt-6 rounded-2xl border border-amber-500/35 bg-gradient-to-br from-[#191510] via-[#0f0d0b] to-[#0a0a0a] p-4">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-amber-300">
                  <span>Tiket Resmi</span>
                  <span className="rounded bg-amber-500/20 px-1.5 py-0.5 font-mono">
                    VIP-1300
                  </span>
                </div>
                <div className="my-2.5 border-t border-dashed border-white/15" />
                <p className="text-xs font-bold text-[#F5F2EE] leading-snug">
                  Tiket Prioritas Ibu Rina — Sabtu, 13.00 WIB
                </p>
                <p className="mt-0.5 text-[11px] text-amber-200/90">
                  (Bonus Gratis Konsultasi Dokter)
                </p>
                <button
                  type="button"
                  onClick={() => setReminderSaved((prev) => !prev)}
                  className="mt-3 w-full inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/[0.06] hover:bg-amber-500/20 hover:border-amber-400/50 px-3 py-2 text-[11px] font-semibold text-[#F5F2EE] transition-colors cursor-pointer"
                >
                  <BellRing className="h-3.5 w-3.5 text-amber-300" />
                  {reminderSaved
                    ? "Pengingat Tersimpan di Kalender HP ✓"
                    : "🔔 Pasang Pengingat di HP"}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <ConnectorLine dark className="my-4" />

      {/* ============================================================
          SOLUSI 5: Kredibilitas Dokter & Before–After
         ============================================================ */}
      <div className="relative py-20 sm:py-28">
        <div
          className="pointer-events-none absolute top-1/2 right-1/4 h-80 w-96 rounded-full bg-emerald-500/[0.05] blur-[140px]"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h3 className="text-2xl sm:text-4xl font-semibold tracking-[-0.03em] text-[#F5F2EE] leading-[1.18]">
              Tampilkan Profil Dokter Resmi &amp;{" "}
              <span className="font-serif italic text-[#FFF7EE] text-glow-champagne">
                Bukti Hasil Perawatan
              </span>{" "}
              yang Nyata.
            </h3>

            <p className="mt-4 text-sm sm:text-base text-[#9A8F86] leading-relaxed max-w-2xl mx-auto">
              Bangun rasa aman pasien baru dengan menampilkan profil dokter
              bersertifikat, izin resmi klinik, serta perbandingan foto Before
              &amp; After pasien secara jujur.
            </p>
          </motion.div>

          {/* Doctor Credibility + Before-After Visual Frame */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="mt-12 rounded-[28px] border border-white/10 bg-[#121212]/90 p-5 sm:p-8 shadow-[0_24px_70px_rgba(0,0,0,0.75)] hover:border-amber-500/40 transition-all duration-300 space-y-6"
          >
            {/* Kredibilitas Dokter */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#0a0a0a] p-4 sm:p-5">
              <div className="flex items-center gap-3.5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-amber-400/45 bg-amber-500/15 text-sm font-bold text-amber-200">
                  dr
                </span>
                <div>
                  <p className="text-sm sm:text-base font-bold text-[#F5F2EE]">
                    dr. Clara Amanda
                  </p>
                  <p className="text-xs text-[#9A8F86]">
                    Izin Praktik Resmi (SIP) &amp; Standar Medis Klinik Kecantikan
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-3.5 py-1.5 text-[11px] font-bold text-emerald-300 self-start sm:self-center">
                <Check className="h-3.5 w-3.5" />
                Dokter Estetika Tersertifikasi
              </span>
            </div>

            {/* Before - After Comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-800/40 to-[#0a0a0a] p-6 text-center">
                <div className="mx-auto h-20 w-20 rounded-full bg-zinc-700/60 border border-white/10 mb-4" />
                <span className="inline-block rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-[#C5BBB2]">
                  Before (Kondisi Awal)
                </span>
                <p className="mt-2.5 text-xs text-[#9A8F86]">
                  Dokumentasi kondisi kulit sebelum tindakan pertama dilakukan.
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-500/35 bg-gradient-to-b from-emerald-500/15 to-[#0a0a0a] p-6 text-center">
                <div className="mx-auto h-20 w-20 rounded-full bg-amber-200/25 border border-amber-300/45 mb-4" />
                <span className="inline-block rounded-full bg-emerald-500/20 px-3.5 py-1 text-xs font-bold text-emerald-300">
                  After (Hasil Perawatan)
                </span>
                <p className="mt-2.5 text-xs text-[#C5BBB2]">
                  Perubahan nyata kulit tampak lebih cerah, bersih, dan sehat terawat.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <ConnectorLine dark className="mt-8" />
    </section>
  );
}

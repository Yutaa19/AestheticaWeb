"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BellRing,
  Check,
  CheckCircle2,
  Clock,
  Lock,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Ticket,
  UserCheck,
  Zap,
} from "lucide-react";
import { ConnectorLine } from "./ConnectorLine";

const COMPLAINT_OPTIONS = [
  {
    id: "jerawat",
    label: "Jerawat & Bekasnya",
    packageName: "Paket Acne Glow",
    price: "Rp 250.000",
    note: "Sudah termasuk ekstraksi & masker pereda radang",
  },
  {
    id: "flek",
    label: "Flek Hitam",
    packageName: "Paket Laser Rejuve",
    price: "Rp 350.000",
    note: "Ditangani langsung oleh Dokter Estetika",
  },
  {
    id: "kusam",
    label: "Wajah Kusam",
    packageName: "Facial Detox Glow",
    price: "Rp 185.000",
    note: "Langsung cerah dalam 45 menit, tanpa nyeri",
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
      className="relative py-20 sm:py-28 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Subtle Ambient Champagne Glow */}
      <div
        className="pointer-events-none absolute top-16 left-1/2 -translate-x-1/2 h-72 w-[640px] rounded-full bg-amber-500/[0.05] blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        {/* ============================================================
            HEADER SECTION #solusi
           ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-semibold text-[#E2B896] backdrop-blur-md">
            <span>✨ Solusi Lengkap Klinik Kecantikan</span>
          </span>

          <h2 className="mt-6 text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-[#F5F2EE] leading-[1.15]">
            Mengubah klik iklan menjadi{" "}
            <span className="font-serif italic font-semibold text-[#FFF7EE] text-glow-champagne">
              pasien yang rajin kembali
            </span>{" "}
            tanpa membuat admin kewalahan.
          </h2>

          <p className="mt-4 text-sm sm:text-base text-[#9A8F86] leading-relaxed max-w-2xl mx-auto">
            Enam fitur praktis di dalam satu website untuk menjawab rasa
            penasaran pasien detik itu juga, merapikan jadwal antrean, dan
            memastikan pasien datang tepat waktu.
          </p>
        </motion.div>

        {/* ============================================================
            BENTO GRID: 6 KARTU SOLUSI + MINI UI MOCKUP
           ============================================================ */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* KARTU 1: Respon Instan 24 Jam */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: 0.04 }}
            className="group rounded-3xl border border-white/10 bg-[#121212]/90 p-6 flex flex-col justify-between hover:border-amber-500/40 transition-all duration-300 shadow-[0_18px_50px_rgba(0,0,0,0.55)]"
          >
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[11px] font-semibold text-amber-300">
                <Zap className="h-3 w-3" />
                Respon Instan 24 Jam
              </span>

              <h3 className="mt-4 text-lg font-bold text-[#F5F2EE] leading-snug">
                Pasien Dijawab Detik Itu Juga, Meski Admin Sedang Sibuk.
              </h3>

              <p className="mt-2.5 text-xs sm:text-sm text-[#9A8F86] leading-relaxed">
                Calon pasien cukup klik keluhan wajahnya di website untuk
                langsung melihat rekomendasi perawatan dan kisaran harganya saat
                itu juga. Pasien tidak lagi kabur ke klinik lain hanya karena
                menunggu balasan chat admin.
              </p>
            </div>

            {/* Mini UI Mockup Kartu 1 */}
            <div className="mt-6 rounded-2xl border border-white/10 bg-[#0a0a0a] p-3.5">
              <p className="text-[10px] font-medium uppercase tracking-wider text-[#7D736B] mb-2">
                Pilih Keluhan Wajah Anda:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {COMPLAINT_OPTIONS.map((item) => {
                  const isActive = item.id === activeComplaint.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedComplaint(item.id)}
                      className={`rounded-lg px-2.5 py-1 text-[11px] font-medium transition-all cursor-pointer border ${
                        isActive
                          ? "border-amber-400/60 bg-amber-500/20 text-amber-200"
                          : "border-white/10 bg-white/[0.03] text-[#9A8F86] hover:text-white"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>

              <div className="mt-3 rounded-xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-transparent p-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-semibold text-amber-300">
                    Rekomendasi Cocok
                  </span>
                  <span className="text-[10px] text-emerald-400 font-semibold">
                    ● Tersedia
                  </span>
                </div>
                <p className="mt-1 text-xs font-bold text-[#F5F2EE]">
                  {activeComplaint.packageName} - {activeComplaint.price}
                </p>
                <p className="mt-0.5 text-[10px] text-[#9A8F86]">
                  {activeComplaint.note}
                </p>
              </div>
            </div>
          </motion.div>

          {/* KARTU 2: Katalog Anti-PDF */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="group rounded-3xl border border-white/10 bg-[#121212]/90 p-6 flex flex-col justify-between hover:border-amber-500/40 transition-all duration-300 shadow-[0_18px_50px_rgba(0,0,0,0.55)]"
          >
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold text-emerald-300">
                <Sparkles className="h-3 w-3" />
                Katalog Anti-PDF
              </span>

              <h3 className="mt-4 text-lg font-bold text-[#F5F2EE] leading-snug">
                Menu Perawatan Jelas, Jalur Dokter &amp; Beautician Terpisah
                Otomatis.
              </h3>

              <p className="mt-2.5 text-xs sm:text-sm text-[#9A8F86] leading-relaxed">
                Ganti brosur PDF yang tulisannya kecil dan membingungkan dengan
                katalog rapi yang langsung memisahkan perawatan khusus Dokter
                dan Beautician. Lengkap dengan info durasi perawatan dan harga
                transparan tanpa biaya tersembunyi di kasir.
              </p>
            </div>

            {/* Mini UI Mockup Kartu 2 */}
            <div className="mt-6 rounded-2xl border border-white/10 bg-[#0a0a0a] p-3 grid grid-cols-2 gap-2.5">
              {/* Kartu Kiri: Beautician */}
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/[0.06] p-2.5 flex flex-col justify-between">
                <div>
                  <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/20 px-1.5 py-0.5 text-[9px] font-bold text-emerald-300 leading-tight">
                    <UserCheck className="h-2.5 w-2.5 shrink-0" />
                    Langsung Beautician • 45 Menit
                  </span>
                  <p className="mt-2 text-xs font-bold text-[#F5F2EE]">
                    Facial Detox Glow
                  </p>
                  <p className="mt-0.5 text-[11px] font-semibold text-emerald-300">
                    Rp 185.000
                  </p>
                </div>
                <p className="mt-2 text-[9px] text-[#9A8F86]">
                  Tanpa perlu antre konsultasi dokter
                </p>
              </div>

              {/* Kartu Kanan: Dokter */}
              <div className="rounded-xl border border-amber-500/35 bg-amber-500/[0.06] p-2.5 flex flex-col justify-between">
                <div>
                  <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/20 px-1.5 py-0.5 text-[9px] font-bold text-amber-300 leading-tight">
                    <Stethoscope className="h-2.5 w-2.5 shrink-0" />
                    Wajib Konsultasi Dokter • 60 Menit
                  </span>
                  <p className="mt-2 text-xs font-bold text-[#F5F2EE]">
                    Laser Rejuve Flek
                  </p>
                  <p className="mt-0.5 text-[11px] font-semibold text-amber-300">
                    Rp 350.000
                  </p>
                </div>
                <p className="mt-2 text-[9px] font-medium text-amber-200/90">
                  Harga Sudah Termasuk Krim Anestesi
                </p>
              </div>
            </div>
          </motion.div>

          {/* KARTU 3: Antrean Rapi */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="group rounded-3xl border border-white/10 bg-[#121212]/90 p-6 flex flex-col justify-between hover:border-amber-500/40 transition-all duration-300 shadow-[0_18px_50px_rgba(0,0,0,0.55)]"
          >
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[11px] font-semibold text-amber-300">
                <Clock className="h-3 w-3" />
                Antrean Rapi
              </span>

              <h3 className="mt-4 text-lg font-bold text-[#F5F2EE] leading-snug">
                Pilihan Jam dengan Kuota Kursi, Otomatis Masuk ke Tabel Jadwal
                Klinik.
              </h3>

              <p className="mt-2.5 text-xs sm:text-sm text-[#9A8F86] leading-relaxed">
                Pasien hanya bisa memilih jam kedatangan yang kursinya masih
                kosong sehingga jadwal ruangan tidak pernah bertabrakan. Data
                pesanan otomatis tercatat di tabel jadwal klinik tanpa perlu
                diketik ulang oleh admin.
              </p>
            </div>

            {/* Mini UI Mockup Kartu 3 */}
            <div className="mt-6 rounded-2xl border border-white/10 bg-[#0a0a0a] p-3.5 space-y-2">
              <p className="text-[10px] font-medium uppercase tracking-wider text-[#7D736B]">
                Pilih Jam Kedatangan Hari Ini:
              </p>

              <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2 opacity-55">
                <span className="inline-flex items-center gap-1.5 text-xs text-[#7D736B] line-through">
                  <Lock className="h-3 w-3" />
                  10.00 WIB
                </span>
                <span className="text-[11px] font-semibold text-[#8E847C]">
                  Penuh ❌
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-amber-400/60 bg-amber-500/15 px-3 py-2 shadow-[0_0_16px_rgba(245,158,11,0.18)]">
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

          {/* KARTU 4: Pengunci Komitmen */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: 0.16 }}
            className="group rounded-3xl border border-white/10 bg-[#121212]/90 p-6 flex flex-col justify-between hover:border-amber-500/40 transition-all duration-300 shadow-[0_18px_50px_rgba(0,0,0,0.55)]"
          >
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[11px] font-semibold text-amber-300">
                <Ticket className="h-3 w-3" />
                Pengunci Komitmen
              </span>

              <h3 className="mt-4 text-lg font-bold text-[#F5F2EE] leading-snug">
                Tiket Voucher Khusus &amp; Pengingat Kalender HP agar Pasien
                Pasti Datang.
              </h3>

              <p className="mt-2.5 text-xs sm:text-sm text-[#9A8F86] leading-relaxed">
                Setiap pasien yang daftar dari website otomatis mendapatkan
                tiket potongan khusus yang akan hangus jika mereka batal datang.
                Dilengkapi tombol pengingat otomatis di kalender HP pasien agar
                mereka tidak lupa jadwalnya.
              </p>
            </div>

            {/* Mini UI Mockup Kartu 4 */}
            <div className="mt-6 rounded-2xl border border-amber-500/35 bg-gradient-to-br from-[#191510] via-[#0f0d0b] to-[#0a0a0a] p-4 relative overflow-hidden">
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-amber-300/90">
                <span>Tiket Digital Resmi</span>
                <span className="rounded bg-amber-500/20 px-1.5 py-0.5">
                  VIP-1300
                </span>
              </div>

              <div className="my-2.5 border-t border-dashed border-white/15" />

              <p className="text-xs font-bold text-[#F5F2EE] leading-relaxed">
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

          {/* KARTU 5: Kepercayaan Medis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="group rounded-3xl border border-white/10 bg-[#121212]/90 p-6 flex flex-col justify-between hover:border-amber-500/40 transition-all duration-300 shadow-[0_18px_50px_rgba(0,0,0,0.55)]"
          >
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold text-emerald-300">
                <ShieldCheck className="h-3 w-3" />
                Kepercayaan Medis
              </span>

              <h3 className="mt-4 text-lg font-bold text-[#F5F2EE] leading-snug">
                Tampilkan Profil Dokter Resmi &amp; Bukti Hasil Perawatan yang
                Nyata.
              </h3>

              <p className="mt-2.5 text-xs sm:text-sm text-[#9A8F86] leading-relaxed">
                Bangun rasa aman pasien baru dengan menampilkan profil dokter
                bersertifikat, izin resmi klinik, serta foto perubahan wajah
                pasien dari minggu ke minggu secara jujur.
              </p>
            </div>

            {/* Mini UI Mockup Kartu 5 */}
            <div className="mt-6 rounded-2xl border border-white/10 bg-[#0a0a0a] p-3.5 space-y-3">
              <div className="flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-amber-400/40 bg-amber-500/15 text-xs font-bold text-amber-200">
                    dr
                  </span>
                  <div>
                    <p className="text-xs font-bold text-[#F5F2EE]">
                      dr. Clara Amanda
                    </p>
                    <p className="text-[10px] text-[#9A8F86]">
                      Izin Praktik &amp; Klinik Resmi
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-2 py-0.5 text-[9px] font-bold text-emerald-300 shrink-0">
                  <Check className="h-2.5 w-2.5" />
                  Dokter Estetika Tersertifikasi
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-white/10 bg-gradient-to-b from-zinc-800/40 to-zinc-900/70 p-2.5 text-center">
                  <div className="mx-auto h-8 w-8 rounded-full bg-zinc-700/60 border border-white/10 mb-1.5" />
                  <span className="inline-block rounded bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-[#C5BBB2]">
                    Kondisi Awal
                  </span>
                </div>
                <div className="rounded-xl border border-emerald-500/35 bg-gradient-to-b from-emerald-500/15 to-emerald-950/20 p-2.5 text-center">
                  <div className="mx-auto h-8 w-8 rounded-full bg-amber-200/25 border border-amber-300/40 mb-1.5" />
                  <span className="inline-block rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                    Hasil 3 Bulan
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* KARTU 6: Ringkas & Langganan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: 0.24 }}
            className="group rounded-3xl border border-white/10 bg-[#121212]/90 p-6 flex flex-col justify-between hover:border-amber-500/40 transition-all duration-300 shadow-[0_18px_50px_rgba(0,0,0,0.55)]"
          >
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold text-emerald-300">
                <CheckCircle2 className="h-3 w-3" />
                Ringkas &amp; Langganan
              </span>

              <h3 className="mt-4 text-lg font-bold text-[#F5F2EE] leading-snug">
                Pasien Isi Form Singkat, Admin Terima Data Rapi di WhatsApp.
              </h3>

              <p className="mt-2.5 text-xs sm:text-sm text-[#9A8F86] leading-relaxed">
                Admin tidak perlu lagi tanya-jawab panjang lebar karena data
                nama, keluhan kulit, pilihan perawatan, dan jam kedatangan
                langsung masuk ke WhatsApp dengan format rapi. Dilengkapi
                panduan perawatan pasca-tindakan agar pasien kembali lagi bulan
                depan.
              </p>
            </div>

            {/* Mini UI Mockup Kartu 6 */}
            <div className="mt-6 rounded-2xl border border-white/10 bg-[#080C0A] p-3.5">
              <div className="rounded-xl rounded-tl-sm border border-emerald-500/25 bg-[#122019] p-3 text-[11px] leading-relaxed text-[#E7F3EC]">
                <p>
                  &ldquo;Halo Admin, saya{" "}
                  <span className="font-bold text-white">Rina</span>. Keluhan:{" "}
                  <span className="text-amber-200">Flek Hitam</span> |
                  Treatment:{" "}
                  <span className="text-amber-200">
                    Laser Glow (Jalur Dokter)
                  </span>{" "}
                  | Jadwal:{" "}
                  <span className="font-semibold text-emerald-300">
                    Sabtu 13.00 WIB
                  </span>
                  &rdquo;
                </p>
              </div>

              <a
                href="#demo-wa"
                className="mt-2.5 w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 px-3 py-2 text-[11px] font-bold text-[#06130C] transition-colors"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                Kirim ke WhatsApp Admin
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <ConnectorLine dark className="mt-16 sm:mt-20" />
    </section>
  );
}

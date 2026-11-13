"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  CalendarCheck,
  CheckCircle2,
  FileCheck2,
  MessageCircle,
  Send,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Stethoscope,
  UserCheck,
} from "lucide-react";
import { ConnectorLine } from "./ConnectorLine";
import {
  buildWhatsAppUrl,
  DEFAULT_CLINIC_ADMIN_WA,
  DEMO_TREATMENTS,
  formatClinicBookingMessage,
  isValidIndonesianPhone,
  normalizeIndonesianPhone,
  PatientBookingPayload,
} from "@/lib/whatsapp";

const SOLUTION_CARDS = [
  {
    id: "kredibilitas",
    tagline: "Kredibilitas Dokter & Klinik",
    description:
      "Tampilkan profil dokter bersertifikat, izin resmi klinik, dan ulasan Google 5.0 agar pasien baru percaya sejak klik pertama.",
    icon: ShieldCheck,
    badge: "Authority & Trust",
  },
  {
    id: "before-after",
    tagline: "Galeri Before–After Nyata",
    description:
      "Perlihatkan bukti perkembangan perawatan secara visual dan interaktif untuk membangun keyakinan pasien selama 3 bulan.",
    icon: SlidersHorizontal,
    badge: "Visual Proof",
  },
  {
    id: "anti-pdf",
    tagline: "Katalog Treatment Anti-PDF",
    description:
      "Ganti brosur PDF yang membingungkan dengan pilihan treatment terstruktur yang otomatis memisahkan jalur Dokter dan Beautician.",
    icon: FileCheck2,
    badge: "Smart Triage",
  },
];

const SHOWCASE_TABS = [
  {
    id: "slider",
    label: "Before–After Slider",
    desc: "Pasien dapat menggeser perbandingan hasil perawatan secara interaktif untuk melihat progres nyata sebelum memutuskan reservasi.",
  },
  {
    id: "dokter",
    label: "Profil Dokter & Izin",
    desc: "Memperkuat posisi dokter estetika dan standar klinis Anda di mata pasien baru yang datang dari Instagram, TikTok, maupun iklan.",
  },
  {
    id: "triage",
    label: "Pemisah Jalur Medis",
    desc: "Setiap treatment dilengkapi foto tindakan, kategori Penanganan Dokter vs Beautician, serta deskripsi singkat agar tidak salah antrean.",
  },
];

export function SolutionSection() {
  const [activeTab, setActiveTab] = useState(2);
  const [sliderPos, setSliderPos] = useState(52);
  const [booking, setBooking] = useState<PatientBookingPayload>({
    adminPhone: DEFAULT_CLINIC_ADMIN_WA,
    patientName: "Mohamad Rafly Andreanto",
    patientStatus: "Pasien Baru (Ingin Cek Kulit Singkat dg Dokter Dulu)",
    treatment: DEMO_TREATMENTS[0],
    preferredDate: "Besok",
    preferredTime: "13.00 WIB",
    skinConcern: "untuk penjadwalan nya gimana",
  });

  const phoneValid = isValidIndonesianPhone(booking.adminPhone);
  const normalizedPhone = normalizeIndonesianPhone(booking.adminPhone);
  const formattedMessage = formatClinicBookingMessage(booking);
  const adminWaUrl = buildWhatsAppUrl(formattedMessage, booking.adminPhone);

  return (
    <section id="solusi" className="relative py-20 sm:py-28 bg-[#060505]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* ============================================================
            BLOCK 1: 3-CARD SOLUTION OVERVIEW (TWS 3-Column Style)
           ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E2B896]/30 bg-[#E2B896]/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#E2B896]">
            <Sparkles className="h-3.5 w-3.5" />
            Solusi Website Klinik Kecantikan
          </span>
          <h2 className="mt-5 text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-[#F5F2EE] leading-tight">
            Sistem Website yang Mengubah Trafik Menjadi{" "}
            <span className="font-serif italic text-[#E2B896]">
              Pasien Terjadwal
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#9A8F86] leading-relaxed max-w-2xl mx-auto">
            Dirancang khusus untuk mempermudah calon pasien memahami perawatan
            sekaligus meringankan kerja admin klinik Anda.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          {SOLUTION_CARDS.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0B0A09] p-6 sm:p-7 flex flex-col justify-between min-h-[260px] transition-colors hover:border-[#E2B896]/35"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E2B896]/25 bg-[#16120F] text-[#E2B896]">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#7D736B]">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-[#F5F2EE] tracking-tight">
                    {card.tagline}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#8F857D] leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="mt-6 h-1 w-full rounded-full bg-white/[0.04] overflow-hidden">
                  <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-[#E2B896]/70 to-transparent transition-all duration-500 group-hover:w-full" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ============================================================
            BLOCK 2: INTERACTIVE FEATURE SHOWCASE (TWS Vertical Tab Style)
           ============================================================ */}
        <div className="mt-24 sm:mt-28">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-4xl font-semibold tracking-[-0.03em] text-[#F5F2EE]">
              Pengalaman Digital yang{" "}
              <span className="font-serif italic text-[#E2B896]">
                Nyaman Untuk Pasien
              </span>
            </h3>
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 space-y-3 border-l border-white/10 pl-5">
              {SHOWCASE_TABS.map((tab, idx) => {
                const isActive = activeTab === idx;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(idx)}
                    className={`relative w-full text-left py-3 px-4 rounded-2xl transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#120F0D] border border-[#E2B896]/30"
                        : "hover:bg-white/[0.02] border border-transparent"
                    }`}
                  >
                    {isActive && (
                      <span
                        className="absolute -left-[25px] top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-[#E2B896] shadow-[0_0_12px_rgba(226,184,150,0.9)]"
                        aria-hidden="true"
                      />
                    )}
                    <p
                      className={`text-sm font-bold ${
                        isActive ? "text-[#F5F2EE]" : "text-[#7D736B]"
                      }`}
                    >
                      {tab.label}
                    </p>
                    {isActive && (
                      <p className="mt-1.5 text-xs text-[#9A8F86] leading-relaxed">
                        {tab.desc}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-8">
              <div className="relative overflow-hidden rounded-3xl border border-white/[0.09] bg-[#0B0A09] p-4 sm:p-6 shadow-[0_24px_65px_rgba(0,0,0,0.75)]">
                <AnimatePresence mode="wait">
                  {activeTab === 0 && (
                    <motion.div
                      key="slider"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold text-[#E2B896]">
                          Simulasi Before–After (Geser Slider)
                        </span>
                        <span className="text-[11px] text-[#7D736B]">
                          {sliderPos}%
                        </span>
                      </div>
                      <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-2xl border border-white/10 select-none">
                        <Image
                          src="/images/hero-model.jpg"
                          alt="Hasil After Perawatan Glass Skin"
                          fill
                          className="object-cover object-top"
                          sizes="(max-width: 1024px) 100vw, 680px"
                        />
                        <span className="absolute top-3 right-3 rounded-full bg-[#3D6B59]/90 px-2.5 py-1 text-[10px] font-bold text-white">
                          AFTER (3x Sesi)
                        </span>

                        <div
                          className="absolute inset-0 overflow-hidden"
                          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                        >
                          <Image
                            src="/images/hero-model.jpg"
                            alt="Kondisi Before Perawatan"
                            fill
                            className="object-cover object-top grayscale-[45%] contrast-125 brightness-90 saturate-50"
                            sizes="(max-width: 1024px) 100vw, 680px"
                          />
                          <span className="absolute top-3 left-3 rounded-full bg-[#0C0B0A]/85 px-2.5 py-1 text-[10px] font-bold text-[#E2B896] border border-white/15">
                            BEFORE (Hari ke-1)
                          </span>
                        </div>

                        <div
                          className="absolute inset-y-0 w-0.5 bg-[#E2B896] pointer-events-none"
                          style={{ left: `${sliderPos}%` }}
                        >
                          <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-[#171311] text-[#E2B896] flex items-center justify-center text-xs font-bold border border-[#E2B896]/60">
                            ↔
                          </div>
                        </div>
                        <input
                          type="range"
                          min={10}
                          max={90}
                          value={sliderPos}
                          onChange={(e) => setSliderPos(Number(e.target.value))}
                          aria-label="Geser perbandingan Before dan After"
                          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
                        />
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 1 && (
                    <motion.div
                      key="dokter"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-2xl border border-white/10">
                        <Image
                          src="/images/clinic-consult.jpg"
                          alt="Konsultasi dokter estetika klinik kecantikan"
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 680px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A09] via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/15 bg-[#0B0A09]/85 backdrop-blur-md p-4 flex items-center justify-between gap-3">
                          <div>
                            <p className="text-sm font-bold text-[#F5F2EE]">
                              Kredibilitas Medis &amp; Google Rating 5.0★
                            </p>
                            <p className="text-xs text-[#9A8F86]">
                              Menampilkan izin resmi klinik, sertifikasi dokter,
                              dan ulasan pasien terverifikasi.
                            </p>
                          </div>
                          <span className="shrink-0 rounded-full border border-[#3D6B59]/60 bg-[#3D6B59]/20 px-3 py-1 text-[11px] font-bold text-[#8EE0BA]">
                            Terverifikasi
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 2 && (
                    <motion.div
                      key="triage"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-semibold text-[#E2B896]">
                          Katalog Pemisah Alur Treatment (Klik untuk isi Form
                          Demo)
                        </p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {DEMO_TREATMENTS.map((item) => {
                          const isSelected = booking.treatment.id === item.id;
                          const isDoctor =
                            item.roleCategory === "Penanganan Dokter";
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() =>
                                setBooking((prev) => ({
                                  ...prev,
                                  treatment: item,
                                }))
                              }
                              className={`group text-left rounded-2xl overflow-hidden border transition-all cursor-pointer flex flex-col justify-between ${
                                isSelected
                                  ? "border-[#E2B896] bg-[#16120F] shadow-[0_0_24px_rgba(226,184,150,0.12)]"
                                  : "border-white/10 bg-[#110F0E] hover:border-white/25"
                              }`}
                            >
                              <div>
                                {/* Foto Treatment */}
                                <div className="relative h-32 w-full overflow-hidden bg-[#181412]">
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 240px"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-[#110F0E] via-transparent to-transparent" />
                                  <span
                                    className={`absolute top-2.5 left-2.5 inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold border backdrop-blur-md ${
                                      isDoctor
                                        ? "border-[#E2B896]/50 bg-[#171311]/85 text-[#E2B896]"
                                        : "border-[#3D6B59]/60 bg-[#0E1914]/85 text-[#8EE0BA]"
                                    }`}
                                  >
                                    {isDoctor ? (
                                      <Stethoscope className="h-3 w-3" />
                                    ) : (
                                      <UserCheck className="h-3 w-3" />
                                    )}
                                    {item.roleCategory}
                                  </span>
                                </div>

                                <div className="p-3.5">
                                  <h4 className="text-sm font-bold text-[#F5F2EE] leading-snug">
                                    {item.name}
                                  </h4>
                                  <p className="mt-1.5 text-[11px] text-[#9A8F86] leading-relaxed">
                                    {item.shortDescription}
                                  </p>
                                </div>
                              </div>

                              <div className="px-3.5 pb-3.5 pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px]">
                                <span className="font-bold text-[#8EE0BA]">
                                  {item.promoPrice}
                                </span>
                                <span className="text-[#7D736B]">
                                  {item.duration}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================
            BLOCK 3: LIVE DEMO FORM RESERVASI -> WHATSAPP ADMIN
           ============================================================ */}
        <div id="demo-wa" className="mt-24 sm:mt-28">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#3D6B59]/45 bg-[#3D6B59]/15 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#8EE0BA]">
              <CalendarCheck className="h-3.5 w-3.5" />
              Live Interactive Demo • Direct ke WA Admin
            </span>
            <h3 className="mt-4 text-2xl sm:text-4xl font-semibold tracking-[-0.03em] text-[#F5F2EE]">
              Pasien Isi Form Singkat,{" "}
              <span className="font-serif italic text-[#E2B896]">
                Admin Terima Data Rapi
              </span>
            </h3>
            <p className="mt-2 text-sm text-[#9A8F86]">
              Masukkan nomor WhatsApp Admin Anda di bawah untuk mengetes langsung
              pengiriman data booking terstruktur ke WhatsApp.
            </p>
          </div>

          <ConnectorLine dark className="my-6" />

          <div className="rounded-[28px] border border-white/[0.10] bg-[#0B0A09] p-5 sm:p-8 shadow-[0_24px_65px_rgba(0,0,0,0.75)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left: Form including Admin WA Number with Indonesian Validation */}
              <div className="lg:col-span-6 space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-[#E2B896]">
                      Nomor WhatsApp Admin Klinik (Tujuan Kirim)
                    </label>
                    {phoneValid ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#8EE0BA]">
                        <CheckCircle2 className="h-3 w-3" />
                        Format ID Valid (+{normalizedPhone})
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#F29D9D]">
                        <AlertCircle className="h-3 w-3" />
                        Gunakan format 08... / +628...
                      </span>
                    )}
                  </div>
                  <input
                    type="tel"
                    value={booking.adminPhone}
                    onChange={(e) =>
                      setBooking((p) => ({ ...p, adminPhone: e.target.value }))
                    }
                    placeholder="Contoh: 0812-3456-7890 atau +62812..."
                    className={`w-full rounded-xl border bg-[#141210] px-3.5 py-2.5 text-sm text-white focus:outline-none ${
                      phoneValid
                        ? "border-white/10 focus:border-[#E2B896]"
                        : "border-[#B84A4A] focus:border-[#F29D9D]"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#E2B896] mb-1.5">
                    Nama Pasien
                  </label>
                  <input
                    type="text"
                    value={booking.patientName}
                    onChange={(e) =>
                      setBooking((p) => ({ ...p, patientName: e.target.value }))
                    }
                    placeholder="Contoh: Mohamad Rafly Andreanto"
                    className="w-full rounded-xl border border-white/10 bg-[#141210] px-3.5 py-2.5 text-sm text-white focus:border-[#E2B896] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#E2B896] mb-1.5">
                    Status Pasien
                  </label>
                  <select
                    value={booking.patientStatus}
                    onChange={(e) =>
                      setBooking((p) => ({
                        ...p,
                        patientStatus: e.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-white/10 bg-[#141210] px-3.5 py-2.5 text-sm text-white focus:border-[#E2B896] focus:outline-none"
                  >
                    <option value="Pasien Baru (Ingin Cek Kulit Singkat dg Dokter Dulu)">
                      Pasien Baru (Ingin Cek Kulit Singkat dg Dokter Dulu)
                    </option>
                    <option value="Pasien Lama (Lanjut Treatment Rutin)">
                      Pasien Lama (Lanjut Treatment Rutin)
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#E2B896] mb-1.5">
                    Perawatan Dipilih
                  </label>
                  <select
                    value={booking.treatment.id}
                    onChange={(e) => {
                      const found = DEMO_TREATMENTS.find(
                        (t) => t.id === e.target.value
                      );
                      if (found) setBooking((p) => ({ ...p, treatment: found }));
                    }}
                    className="w-full rounded-xl border border-white/10 bg-[#141210] px-3.5 py-2.5 text-sm text-white focus:border-[#E2B896] focus:outline-none"
                  >
                    {DEMO_TREATMENTS.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name} ({t.roleCategory})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#E2B896] mb-1.5">
                      Rencana Hari / Tanggal
                    </label>
                    <input
                      type="text"
                      value={booking.preferredDate}
                      onChange={(e) =>
                        setBooking((p) => ({
                          ...p,
                          preferredDate: e.target.value,
                        }))
                      }
                      className="w-full rounded-xl border border-white/10 bg-[#141210] px-3.5 py-2.5 text-sm text-white focus:border-[#E2B896] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#E2B896] mb-1.5">
                      Jam Tindakan
                    </label>
                    <input
                      type="text"
                      value={booking.preferredTime}
                      onChange={(e) =>
                        setBooking((p) => ({
                          ...p,
                          preferredTime: e.target.value,
                        }))
                      }
                      className="w-full rounded-xl border border-white/10 bg-[#141210] px-3.5 py-2.5 text-sm text-white focus:border-[#E2B896] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#E2B896] mb-1.5">
                    Keluhan / Catatan Tambahan
                  </label>
                  <input
                    type="text"
                    value={booking.skinConcern}
                    onChange={(e) =>
                      setBooking((p) => ({ ...p, skinConcern: e.target.value }))
                    }
                    className="w-full rounded-xl border border-white/10 bg-[#141210] px-3.5 py-2.5 text-sm text-white focus:border-[#E2B896] focus:outline-none"
                  />
                </div>
              </div>

              {/* Right: Live Admin WhatsApp Preview */}
              <div className="lg:col-span-6">
                <div className="rounded-2xl border border-white/10 bg-[#080C0A] p-4 shadow-inner">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366] text-[#0B1410]">
                        <MessageCircle className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-xs font-bold text-white">
                          WhatsApp Admin Klinik
                        </p>
                        <p className="text-[10px] text-[#7FD8A1]">
                          {phoneValid
                            ? `● Tujuan: +${normalizedPhone}`
                            : "● Menunggu nomor WA Indonesia valid"}
                        </p>
                      </div>
                    </div>
                    <CheckCircle2 className="h-4 w-4 text-[#25D366]" />
                  </div>

                  <div className="rounded-xl bg-[#131E18] p-4 text-[11px] sm:text-xs leading-relaxed text-[#E7F3EC] whitespace-pre-wrap font-mono max-h-[340px] overflow-y-auto">
                    {formattedMessage}
                  </div>

                  {phoneValid ? (
                    <a
                      href={adminWaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-xs font-bold text-[#0B1410] transition-transform hover:scale-[1.01]"
                    >
                      <Send className="h-3.5 w-3.5" />
                      Kirim Simulasi Booking ke WhatsApp Admin
                    </a>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-5 py-3 text-xs font-bold text-[#8A7F76] cursor-not-allowed"
                    >
                      <AlertCircle className="h-3.5 w-3.5" />
                      Lengkapi Nomor WA Admin Indonesia (08... / +628...)
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConnectorLine dark className="mt-16 sm:mt-20" />
    </section>
  );
}

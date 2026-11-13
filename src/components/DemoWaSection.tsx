"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  Lock,
  MessageCircle,
  Send,
  Stethoscope,
  Table2,
  Ticket,
  UserCheck,
  Zap,
} from "lucide-react";
import { ConnectorLine } from "./ConnectorLine";
import {
  buildWhatsAppUrl,
  isValidIndonesianPhone,
  normalizeIndonesianPhone,
} from "@/lib/whatsapp";

type PathwayType = "Beautician" | "Dokter";
type ValidationStatus = "waiting" | "arrived" | "cancelled";

interface TreatmentOption {
  id: string;
  concern: string;
  treatmentName: string;
  price: string;
  label: string;
  pathway: PathwayType;
  pathwayBadge: string;
}

interface TimeSlotOption {
  time: string;
  initialSeats: number;
  locked?: boolean;
}

interface SpreadsheetRow {
  id: string;
  queueCode: string;
  priority: "online" | "walkin";
  sessionTime: string;
  patientName: string;
  treatmentName: string;
  concern: string;
  pathway: PathwayType;
  voucherCode: string;
  status: ValidationStatus;
  isNew?: boolean;
}

const TREATMENT_OPTIONS: TreatmentOption[] = [
  {
    id: "facial-detox",
    concern: "Wajah Kusam",
    treatmentName: "Facial Detox Glow",
    price: "Rp 185.000",
    label: "Wajah Kusam — Facial Detox Glow (Rp 185.000)",
    pathway: "Beautician",
    pathwayBadge: "✨ Jalur Langsung Beautician",
  },
  {
    id: "laser-rejuve",
    concern: "Flek & Bekas Jerawat",
    treatmentName: "Laser Rejuve",
    price: "Rp 350.000",
    label: "Flek & Bekas Jerawat — Laser Rejuve (Rp 350.000)",
    pathway: "Dokter",
    pathwayBadge: "🩺 Jalur Wajib Dokter",
  },
  {
    id: "acne-peeling",
    concern: "Jerawat Meradang",
    treatmentName: "Acne Peeling + Suntik",
    price: "Rp 275.000",
    label: "Jerawat Meradang — Acne Peeling + Suntik (Rp 275.000)",
    pathway: "Dokter",
    pathwayBadge: "🩺 Jalur Wajib Dokter",
  },
];

const TIME_SLOTS: TimeSlotOption[] = [
  { time: "10.00 WIB", initialSeats: 0, locked: true },
  { time: "13.00 WIB", initialSeats: 1 },
  { time: "15.00 WIB", initialSeats: 2 },
];

const INITIAL_ROWS: SpreadsheetRow[] = [
  {
    id: "row-1",
    queueCode: "PRIO-01",
    priority: "online",
    sessionTime: "10.00 WIB",
    patientName: "Siti Rahmawati",
    treatmentName: "Laser Rejuve",
    concern: "Flek & Bekas Jerawat",
    pathway: "Dokter",
    voucherCode: "VIP-1000",
    status: "arrived",
  },
  {
    id: "row-2",
    queueCode: "PRIO-02",
    priority: "online",
    sessionTime: "13.00 WIB",
    patientName: "Nadia Kusuma",
    treatmentName: "Facial Detox Glow",
    concern: "Wajah Kusam",
    pathway: "Beautician",
    voucherCode: "VIP-1300",
    status: "waiting",
  },
  {
    id: "row-3",
    queueCode: "WALK-01",
    priority: "walkin",
    sessionTime: "13.00 WIB",
    patientName: "Dewi Lestari",
    treatmentName: "Facial Detox Glow",
    concern: "Wajah Kusam",
    pathway: "Beautician",
    voucherCode: "-",
    status: "waiting",
  },
];

const ADMIN_BENEFITS = [
  {
    title: "Anti Diselak & Anti Bentrok:",
    desc: "Pasien reservasi online selalu menjadi prioritas utama sesuai jam sesinya, terpisah jelas dari pasien yang datang langsung (walk-in).",
  },
  {
    title: "Aturan Tegas 15 Menit:",
    desc: "Jika pasien reservasi online belum tervalidasi hadir lewat dari 15 menit pada jam sesinya, status prioritas dan vouchernya otomatis gugur sehingga kursi bisa langsung diberikan ke pasien lain.",
  },
  {
    title: "Kuota Kursi Kembali Otomatis:",
    desc: 'Jika admin mengubah status validasi menjadi "Batal", kuota jam di website otomatis terbuka kembali untuk diisi calon pasien lain.',
  },
];

function getNextStatus(current: ValidationStatus): ValidationStatus {
  if (current === "waiting") return "arrived";
  if (current === "arrived") return "cancelled";
  return "waiting";
}

function getVoucherCode(time: string, counter: number): string {
  const numericTime = time.replace(/\D/g, "").slice(0, 4) || "1300";
  return counter > 1 ? `VIP-${numericTime}-${counter}` : `VIP-${numericTime}`;
}

export function DemoWaSection() {
  const [patientName, setPatientName] = useState("Rina Putri");
  const [selectedTreatmentId, setSelectedTreatmentId] = useState(
    TREATMENT_OPTIONS[1].id
  );
  const [selectedTime, setSelectedTime] = useState("13.00 WIB");
  const [adminPhone, setAdminPhone] = useState("");
  const [rows, setRows] = useState<SpreadsheetRow[]>(INITIAL_ROWS);
  const [submitCount, setSubmitCount] = useState(3);
  const [feedbackBanner, setFeedbackBanner] = useState<string | null>(null);

  const selectedTreatment =
    TREATMENT_OPTIONS.find((item) => item.id === selectedTreatmentId) ??
    TREATMENT_OPTIONS[0];

  const nextQueueNumber = submitCount + 1;
  const nextQueueCode = `PRIO-${String(nextQueueNumber).padStart(2, "0")}`;
  const previewVoucherCode = getVoucherCode(selectedTime, nextQueueNumber - 2);
  const trimmedName = patientName.trim() || "Rina Putri";
  const hasPhoneInput = adminPhone.trim().length > 0;
  const phoneValid = isValidIndonesianPhone(adminPhone);
  const normalizedPhone = normalizeIndonesianPhone(adminPhone);

  const whatsappPreviewText = useMemo(() => {
    return [
      `⚡ *[RESERVASI PRIORITAS ONLINE - ${nextQueueCode}]*`,
      ``,
      `Halo Admin Klinik, saya ingin konfirmasi jadwal kedatangan:`,
      `• *Nama Pasien:* ${trimmedName}`,
      `• *Keluhan:* ${selectedTreatment.concern}`,
      `• *Perawatan:* ${selectedTreatment.treatmentName}`,
      `• *Jalur Ruangan:* ${selectedTreatment.pathwayBadge}`,
      `• *Jam Kedatangan:* ${selectedTime}`,
      `• *Harga Transparan:* ${selectedTreatment.price}`,
      `• *Kode Tiket Voucher:* ${previewVoucherCode}`,
      ``,
      `_Catatan: Mohon hadir maksimal 15 menit dari jam sesi agar prioritas kursi & voucher tetap aktif._`,
    ].join("\n");
  }, [
    nextQueueCode,
    trimmedName,
    selectedTreatment,
    selectedTime,
    previewVoucherCode,
  ]);

  const handleSimulateSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (hasPhoneInput && !phoneValid) {
      setFeedbackBanner(
        "Nomor WA Admin belum valid. Gunakan format 08... atau +628..., atau kosongkan jika hanya ingin tes tabel."
      );
      return;
    }

    const newRow: SpreadsheetRow = {
      id: `row-${Date.now()}`,
      queueCode: nextQueueCode,
      priority: "online",
      sessionTime: selectedTime,
      patientName: trimmedName,
      treatmentName: selectedTreatment.treatmentName,
      concern: selectedTreatment.concern,
      pathway: selectedTreatment.pathway,
      voucherCode: previewVoucherCode,
      status: "waiting",
      isNew: true,
    };

    setRows((prev) => {
      const cleared = prev.map((r) => ({ ...r, isNew: false }));
      const onlineRows = [
        newRow,
        ...cleared.filter((r) => r.priority === "online"),
      ];
      const walkinRows = cleared.filter((r) => r.priority === "walkin");
      return [...onlineRows, ...walkinRows];
    });
    setSubmitCount((prev) => prev + 1);

    if (hasPhoneInput && phoneValid) {
      const waUrl = buildWhatsAppUrl(whatsappPreviewText, adminPhone);
      window.open(waUrl, "_blank", "noopener,noreferrer");
      setFeedbackBanner(
        `${trimmedName} (${nextQueueCode}) masuk ke urutan teratas tabel di bawah & WhatsApp dibuka ke +${normalizedPhone}.`
      );
    } else {
      setFeedbackBanner(
        `${trimmedName} (${nextQueueCode}) otomatis masuk ke urutan teratas tabel jadwal di bawah!`
      );
    }
  };

  const handleToggleRowStatus = (rowId: string) => {
    setRows((prev) =>
      prev.map((row) =>
        row.id === rowId
          ? { ...row, status: getNextStatus(row.status), isNew: false }
          : row
      )
    );
  };

  return (
    <section id="demo-wa" className="relative bg-[#0a0a0a] overflow-hidden">
      {/* ============================================================
          HERO SECTION 1: FORM PASIEN & WHATSAPP OTOMATIS (Ref 2)
         ============================================================ */}
      <div className="relative py-20 sm:py-28">
        <div
          className="pointer-events-none absolute top-24 left-1/2 -translate-x-1/2 h-96 w-[680px] rounded-full bg-emerald-500/[0.06] blur-[140px]"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
          {/* Centered Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-[#F5F2EE] leading-[1.15]">
              Pasien isi form singkat, Admin terima{" "}
              <span className="font-serif italic font-semibold text-[#FFF7EE] text-glow-champagne">
                data rapi &amp; jadwal prioritas
              </span>{" "}
              tanpa ketik manual.
            </h2>

            <p className="mt-4 text-sm sm:text-base text-[#9A8F86] leading-relaxed max-w-2xl mx-auto">
              Coba isi form di bawah ini untuk melihat bagaimana pesanan pasien
              langsung terkirim ke WhatsApp dan otomatis menempati urutan
              teratas di tabel jadwal klinik.
            </p>
          </motion.div>

          {/* Centered Large Interactive Window */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55 }}
            className="mt-12 rounded-[28px] border border-white/10 bg-[#121212]/90 p-5 sm:p-8 shadow-[0_30px_90px_rgba(0,0,0,0.85)]"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="ml-2 text-xs font-bold text-[#F5F2EE]">
                  Simulasi Form Pasien → WhatsApp Admin
                </span>
              </div>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold text-amber-300">
                Kode Antrean: {nextQueueCode}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
              {/* Form Inputs */}
              <form
                onSubmit={handleSimulateSubmit}
                className="lg:col-span-7 space-y-4"
              >
                <div>
                  <label
                    htmlFor="demo-patient-name"
                    className="block text-xs font-semibold text-[#E2B896] mb-1.5"
                  >
                    1. Nama Pasien
                  </label>
                  <input
                    id="demo-patient-name"
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Contoh: Rina Putri"
                    className="w-full rounded-xl border border-white/10 bg-[#0a0a0a] px-3.5 py-2.5 text-sm text-[#F5F2EE] placeholder:text-[#6B625B] focus:border-amber-400/60 focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="demo-treatment"
                    className="block text-xs font-semibold text-[#E2B896] mb-1.5"
                  >
                    2. Pilih Keluhan &amp; Perawatan
                  </label>
                  <select
                    id="demo-treatment"
                    value={selectedTreatmentId}
                    onChange={(e) => setSelectedTreatmentId(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#0a0a0a] px-3.5 py-2.5 text-sm text-[#F5F2EE] focus:border-amber-400/60 focus:outline-none"
                  >
                    {TREATMENT_OPTIONS.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.label}
                      </option>
                    ))}
                  </select>

                  <div className="mt-2 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
                    <span className="text-[11px] text-[#9A8F86]">
                      Jalur Otomatis:
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                        selectedTreatment.pathway === "Dokter"
                          ? "border border-amber-500/40 bg-amber-500/15 text-amber-300"
                          : "border border-emerald-500/40 bg-emerald-500/15 text-emerald-300"
                      }`}
                    >
                      {selectedTreatment.pathwayBadge}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="block text-xs font-semibold text-[#E2B896] mb-1.5">
                    3. Pilih Jam Kedatangan (Indikator Sisa Kursi)
                  </span>
                  <div className="space-y-2">
                    {TIME_SLOTS.map((slot) => {
                      const seats = slot.initialSeats;
                      const isDisabled = Boolean(slot.locked);
                      const isSelected =
                        selectedTime === slot.time && !isDisabled;

                      return (
                        <button
                          key={slot.time}
                          type="button"
                          disabled={isDisabled}
                          onClick={() => setSelectedTime(slot.time)}
                          className={`w-full flex items-center justify-between rounded-xl border px-3.5 py-2.5 text-left text-xs transition-all ${
                            isDisabled
                              ? "border-white/5 bg-white/[0.02] text-[#6B625B] opacity-55 cursor-not-allowed"
                              : isSelected
                                ? "border-amber-400/70 bg-amber-500/15 text-[#F5F2EE] shadow-[0_0_18px_rgba(245,158,11,0.16)] cursor-pointer"
                                : "border-white/10 bg-[#0a0a0a] text-[#C5BBB2] hover:border-white/25 cursor-pointer"
                          }`}
                        >
                          <span className="inline-flex items-center gap-2 font-semibold">
                            {isDisabled ? (
                              <Lock className="h-3.5 w-3.5 text-[#6B625B]" />
                            ) : (
                              <Clock className="h-3.5 w-3.5 text-amber-300" />
                            )}
                            {slot.time}
                          </span>

                          {slot.locked ? (
                            <span className="font-semibold text-[#7D736B]">
                              Penuh ❌ - Tidak bisa diklik
                            </span>
                          ) : seats === 1 ? (
                            <span className="font-bold text-amber-300">
                              Sisa 1 Kursi Prioritas ⚡
                            </span>
                          ) : (
                            <span className="font-semibold text-emerald-300">
                              Tersedia {seats} Kursi ✅
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="demo-admin-wa"
                      className="text-xs font-semibold text-[#E2B896]"
                    >
                      4. Nomor WA Admin (Tes Kirim Nyata - Opsional)
                    </label>
                    {hasPhoneInput &&
                      (phoneValid ? (
                        <span className="text-[10px] font-semibold text-emerald-300">
                          ✓ Valid (+{normalizedPhone})
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold text-rose-300">
                          Format 08... / +628...
                        </span>
                      ))}
                  </div>
                  <input
                    id="demo-admin-wa"
                    type="tel"
                    value={adminPhone}
                    onChange={(e) => setAdminPhone(e.target.value)}
                    placeholder="Opsional: 0812xxxx (kosongkan jika tes tabel saja)"
                    className="w-full rounded-xl border border-white/10 bg-[#0a0a0a] px-3.5 py-2.5 text-sm text-[#F5F2EE] placeholder:text-[#6B625B] focus:border-amber-400/60 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 via-[#E2B896] to-amber-300 px-5 py-3 text-xs sm:text-sm font-bold text-[#0a0a0a] shadow-[0_8px_24px_rgba(226,184,150,0.28)] hover:brightness-105 transition-all cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                  Simulasikan Masuk Tabel &amp; Kirim WA
                </button>

                {feedbackBanner && (
                  <div className="rounded-xl border border-emerald-500/35 bg-emerald-500/10 px-3 py-2.5 text-[11px] text-emerald-200 flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feedbackBanner}</span>
                  </div>
                )}
              </form>

              {/* WhatsApp Live Preview */}
              <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-[#080C0A] p-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-[#06130C]">
                      <MessageCircle className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-xs font-bold text-[#F5F2EE]">
                        Preview Chat WhatsApp
                      </p>
                      <p className="text-[10px] text-emerald-300">
                        ● Otomatis mengikuti isi form
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                    <Ticket className="h-3 w-3" />
                    {previewVoucherCode}
                  </span>
                </div>

                <div className="rounded-xl bg-[#111C16] p-3.5 text-[11px] leading-relaxed text-[#E7F3EC] whitespace-pre-wrap font-mono">
                  {whatsappPreviewText}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <ConnectorLine dark className="my-4" />

      {/* ============================================================
          HERO SECTION 2: LIVE SPREADSHEET ADMIN (Ref 1: Top Window + Bottom Copy)
         ============================================================ */}
      <div className="relative py-20 sm:py-28">
        <div
          className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 h-96 w-[720px] rounded-full bg-amber-500/[0.05] blur-[140px]"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
          {/* Top Centered Layered Spreadsheet Window (Ref 1) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55 }}
            className="relative"
          >
            {/* Subtle layered back frame */}
            <div
              className="mx-6 -mb-3 h-6 rounded-t-3xl border border-white/10 bg-white/[0.02]"
              aria-hidden="true"
            />
            <div className="rounded-[28px] border border-white/10 bg-[#121212]/90 overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.85)]">
              {/* Spreadsheet Top Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#161514] px-5 py-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-500/35 bg-emerald-500/15 text-emerald-300">
                    <Table2 className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-[#F5F2EE]">
                      Tabel Jadwal Harian Klinik (Sisi Admin)
                    </h3>
                    <p className="text-[11px] text-[#9A8F86]">
                      Klik tombol di kolom kanan untuk tes validasi kedatangan
                      pasien
                    </p>
                  </div>
                </div>
              </div>

              {/* Spreadsheet Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[820px]">
                  <thead>
                    <tr className="border-b border-white/10 bg-[#0d0d0d] text-[10px] font-bold uppercase tracking-wider text-[#9A8F86]">
                      <th className="py-3 px-4 border-r border-white/[0.06]">
                        Kode &amp; Prioritas
                      </th>
                      <th className="py-3 px-3.5 border-r border-white/[0.06]">
                        Jam Sesi
                      </th>
                      <th className="py-3 px-3.5 border-r border-white/[0.06]">
                        Nama Pasien
                      </th>
                      <th className="py-3 px-3.5 border-r border-white/[0.06]">
                        Perawatan &amp; Keluhan
                      </th>
                      <th className="py-3 px-3.5 border-r border-white/[0.06]">
                        Jalur Ruangan
                      </th>
                      <th className="py-3 px-3.5 border-r border-white/[0.06]">
                        Kode Voucher
                      </th>
                      <th className="py-3 px-4">
                        Validasi Kedatangan (Klik)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.07] text-xs">
                    <AnimatePresence initial={false}>
                      {rows.map((row) => {
                        const isOnline = row.priority === "online";
                        return (
                          <motion.tr
                            key={row.id}
                            layout
                            initial={{
                              opacity: 0,
                              y: -12,
                              backgroundColor: "rgba(245, 158, 11, 0.22)",
                            }}
                            animate={{
                              opacity: 1,
                              y: 0,
                              backgroundColor: row.isNew
                                ? "rgba(245, 158, 11, 0.10)"
                                : "rgba(0, 0, 0, 0)",
                            }}
                            transition={{ duration: 0.4 }}
                            className="hover:bg-white/[0.02] transition-colors"
                          >
                            <td className="py-3.5 px-4 border-r border-white/[0.06] align-top">
                              <p className="font-mono text-[11px] font-bold text-[#F5F2EE]">
                                {row.queueCode}
                              </p>
                              {isOnline ? (
                                <span className="mt-1 inline-flex items-center gap-1 rounded-full border border-amber-500/40 bg-amber-500/15 px-2 py-0.5 text-[9px] font-bold text-amber-300 whitespace-nowrap">
                                  <Zap className="h-2.5 w-2.5" />
                                  ⚡ PRIORITAS ONLINE
                                </span>
                              ) : (
                                <span className="mt-1 inline-flex items-center rounded-full border border-white/15 bg-white/[0.05] px-2 py-0.5 text-[9px] font-semibold text-[#9A8F86] whitespace-nowrap">
                                  Walk-In Biasa
                                </span>
                              )}
                            </td>

                            <td className="py-3.5 px-3.5 border-r border-white/[0.06] align-top font-semibold text-[#F5F2EE] whitespace-nowrap">
                              {row.sessionTime}
                            </td>

                            <td className="py-3.5 px-3.5 border-r border-white/[0.06] align-top font-semibold text-[#F5F2EE]">
                              {row.patientName}
                            </td>

                            <td className="py-3.5 px-3.5 border-r border-white/[0.06] align-top">
                              <p className="font-semibold text-[#EAE2DA]">
                                {row.treatmentName}
                              </p>
                              <p className="text-[10px] text-[#9A8F86]">
                                {row.concern}
                              </p>
                            </td>

                            <td className="py-3.5 px-3.5 border-r border-white/[0.06] align-top whitespace-nowrap">
                              {row.pathway === "Dokter" ? (
                                <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/35 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-bold text-amber-300">
                                  <Stethoscope className="h-3 w-3" />
                                  🩺 Dokter
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/35 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300">
                                  <UserCheck className="h-3 w-3" />
                                  ✨ Beautician
                                </span>
                              )}
                            </td>

                            <td className="py-3.5 px-3.5 border-r border-white/[0.06] align-top font-mono text-[11px] font-bold text-amber-200 whitespace-nowrap">
                              {row.voucherCode}
                            </td>

                            <td className="py-3.5 px-4 align-top">
                              <button
                                type="button"
                                onClick={() => handleToggleRowStatus(row.id)}
                                className={`w-full text-left rounded-lg border px-2.5 py-1.5 text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                                  row.status === "waiting"
                                    ? "border-white/15 bg-white/[0.05] text-[#E2D9D0] hover:border-amber-400/50"
                                    : row.status === "arrived"
                                      ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-300"
                                      : "border-rose-500/50 bg-rose-500/15 text-rose-300"
                                }`}
                              >
                                {row.status === "waiting" &&
                                  "⏳ Menunggu Pasien"}
                                {row.status === "arrived" &&
                                  "✅ Hadir Tepat Waktu - Tervalidasi"}
                                {row.status === "cancelled" &&
                                  "❌ Lewat 15 Menit / Batal"}
                              </button>

                              {row.status === "waiting" && (
                                <p className="mt-1 text-[10px] text-[#7D736B]">
                                  Klik untuk validasi hadir / batal
                                </p>
                              )}
                              {row.status === "arrived" && (
                                <p className="mt-1 text-[10px] font-medium text-emerald-300/90">
                                  Kursi Dikunci &amp; Voucher Aktif
                                </p>
                              )}
                              {row.status === "cancelled" && (
                                <p className="mt-1 text-[10px] font-medium text-rose-300/90">
                                  Voucher Hangus &amp; Kuota Kursi Dibuka
                                  Kembali di Web
                                </p>
                              )}
                            </td>
                          </motion.tr>
                        );
                      })}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

          {/* Bottom Centered Copy + 3 Admin Benefits (Ref 1) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="mt-12 text-center max-w-3xl mx-auto"
          >
            <h3 className="text-2xl sm:text-4xl font-semibold tracking-[-0.03em] text-[#F5F2EE] leading-[1.18]">
              Tabel Jadwal{" "}
              <span className="font-serif italic text-[#FFF7EE] text-glow-champagne">
                Prioritas Online
              </span>{" "}
              Otomatis untuk Admin Klinik.
            </h3>

            <p className="mt-3 text-sm sm:text-base text-[#9A8F86] leading-relaxed">
              Setiap pesanan dari form langsung menempati urutan teratas sesuai
              jam sesinya—tidak bisa diselak pasien walk-in dan dilengkapi
              validasi kehadiran 1 klik.
            </p>
          </motion.div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {ADMIN_BENEFITS.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-2xl border border-white/10 bg-[#121212]/90 p-5 flex items-start gap-3 hover:border-amber-500/40 transition-all duration-300"
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-xs leading-relaxed text-[#9A8F86]">
                  <span className="block font-bold text-[#F5F2EE] mb-1">
                    {benefit.title}
                  </span>
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ConnectorLine dark className="mt-8" />
    </section>
  );
}

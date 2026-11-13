export const DEFAULT_CLINIC_ADMIN_WA = "089526498247";

/**
 * Normalizes an Indonesian phone number (e.g. 0812..., +62 812..., 62812...)
 * into international WhatsApp format `628...`.
 */
export function normalizeIndonesianPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("0")) {
    return `62${digits.slice(1)}`;
  }
  if (digits.startsWith("62")) {
    return digits;
  }
  if (digits.startsWith("8")) {
    return `62${digits}`;
  }
  return digits;
}

/**
 * Validates that the normalized number is a valid Indonesian mobile/WhatsApp number (628xxxxxxxxx).
 */
export function isValidIndonesianPhone(raw: string): boolean {
  const normalized = normalizeIndonesianPhone(raw);
  return /^628[1-9][0-9]{7,11}$/.test(normalized);
}

export function buildWhatsAppUrl(
  message: string,
  adminPhoneRaw: string = DEFAULT_CLINIC_ADMIN_WA
): string {
  const normalized = normalizeIndonesianPhone(adminPhoneRaw);
  const target = isValidIndonesianPhone(adminPhoneRaw)
    ? normalized
    : normalizeIndonesianPhone(DEFAULT_CLINIC_ADMIN_WA);
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${target}?text=${encoded}`;
}

export interface TreatmentPreset {
  id: string;
  bookingHeader: string;
  name: string;
  roleCategory: "Penanganan Dokter" | "Beautician";
  shortDescription: string;
  image: string;
  promoPrice: string;
  duration: string;
  downtime: string;
  arrivalNote: string;
  preCareNote: string;
}

export const DEMO_TREATMENTS: TreatmentPreset[] = [
  {
    id: "brazilian-private",
    bookingHeader: "🟣 [BOOKING TINDAKAN DOKTER + ANESTESI 30 MENIT]",
    name: "Ultimate Brazilian Treatment (Private Care)",
    roleCategory: "Penanganan Dokter",
    shortDescription:
      "Perawatan area privat dengan krim anestesi & pengawasan dokter di ruangan khusus wanita.",
    image: "/images/clinic-consult.jpg",
    promoPrice: "Mulai Rp 449.000",
    duration: "30-45 Menit",
    downtime: "Zero Downtime",
    arrivalNote:
      "12.30 WIB (Wajib hadir 30 menit lebih awal untuk pengolesan anestesi/konsul dokter)",
    preCareNote: "Ruangan privat khusus wanita. Hindari waxing 2 minggu sebelumnya.",
  },
  {
    id: "pico-laser",
    bookingHeader: "🟣 [BOOKING TINDAKAN DOKTER + ANESTESI 30 MENIT]",
    name: "PicoBright Laser Toning",
    roleCategory: "Penanganan Dokter",
    shortDescription:
      "Tindakan laser medis oleh dokter untuk memudarkan flek, melasma, dan bekas jerawat membandel.",
    image: "/images/facial-treatment.jpg",
    promoPrice: "Mulai Rp 1.250.000",
    duration: "45 Menit",
    downtime: "Minimal Redness (2-4 Jam)",
    arrivalNote:
      "30 menit lebih awal untuk pengolesan krim anestesi & cek kulit dokter",
    preCareNote:
      "Hentikan pemakaian krim eksfoliasi/retinol 3 hari sebelum tindakan.",
  },
  {
    id: "hydra-glow",
    bookingHeader: "🟢 [BOOKING FACIAL BEAUTICIAN]",
    name: "HydraPeel Medical Facial",
    roleCategory: "Beautician",
    shortDescription:
      "Deep cleansing & ekstraksi komedo tanpa rasa sakit oleh beautician bersertifikat untuk kulit glowing.",
    image: "/images/hero-model.jpg",
    promoPrice: "Mulai Rp 450.000",
    duration: "50 Menit",
    downtime: "Zero Downtime",
    arrivalNote: "10 menit sebelum jadwal tindakan untuk registrasi singkat",
    preCareNote:
      "Datang dengan wajah bersih atau tanpa makeup tebal agar lebih cepat.",
  },
];

export interface PatientBookingPayload {
  adminPhone: string;
  patientName: string;
  patientStatus: string;
  treatment: TreatmentPreset;
  preferredDate: string;
  preferredTime: string;
  skinConcern: string;
}

export function formatClinicBookingMessage(data: PatientBookingPayload): string {
  const { treatment } = data;
  return [
    treatment.bookingHeader,
    `Klinik Pratama Everglow Salatiga`,
    `━━━━━━━━━━━━━━━━━━━━━`,
    ``,
    `📋 *DATA RESERVASI PASIEN*`,
    `• Nama Pasien: *${data.patientName || "-"}*`,
    `• Status Pasien: ${data.patientStatus}`,
    `• Perawatan Dipilih: *${treatment.name}*`,
    `• Estimasi Biaya Promo: *${treatment.promoPrice}* (Harga Spesial)`,
    `• Durasi Tindakan: ${treatment.duration}`,
    `• Downtime: ${treatment.downtime}`,
    ``,
    `🗓️ *JADWAL & WAKTU KEHADIRAN*`,
    `• Rencana Hari/Tanggal: *${data.preferredDate || "Besok"}*`,
    `• Jam Tindakan: *${data.preferredTime || "13.00 WIB"}*`,
    `• Waktu Hadir: *${treatment.arrivalNote}*`,
    ``,
    `⚠️ *CATATAN PRE-CARE PASIEN:*`,
    `"${treatment.preCareNote}"`,
    ``,
    `💬 *Keluhan / Catatan Tambahan:*`,
    `"${data.skinConcern || "-"}"`,
    ``,
    `━━━━━━━━━━━━━━━━━━━━━`,
    `Mohon konfirmasi ketersediaan slot kasur & dokter/terapis ya Kak Admin Everglow. Terima kasih! ✨`,
  ].join("\n");
}

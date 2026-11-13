"use client";

import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function FloatingWhatsApp() {
  const href = buildWhatsAppUrl(
    "Halo Tim AestheticaWeb, saya ingin konsultasi gratis mengenai pembuatan website untuk klinik kecantikan saya."
  );

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Konsultasi Gratis via WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-xs font-bold text-[#0B1410] shadow-[0_10px_28px_rgba(37,211,102,0.38)] transition-transform hover:scale-105"
    >
      <MessageCircle className="h-4 w-4" />
      <span className="hidden sm:inline">Free Konsultasi WA</span>
    </a>
  );
}

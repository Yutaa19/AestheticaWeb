import type { Metadata } from "next";
import { Manrope, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "AestheticaWeb | Sistem Website Konversi Khusus Klinik Kecantikan & Dokter Estetika",
  description:
    "Bangun kepercayaan pasien selama 3 bulan dengan menangkap trafik di semua platform. Tampilkan kredibilitas dokter, before-after, katalog treatment interaktif, dan reservasi direct-to-WhatsApp terstruktur.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${manrope.variable} ${cormorant.variable} scroll-smooth antialiased dark`}
    >
      <body className="min-h-screen bg-[#060505] text-[#F5F2EE] font-sans selection:bg-[#E2B896]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}

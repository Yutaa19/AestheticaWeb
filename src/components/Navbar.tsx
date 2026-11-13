"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Masalah", href: "#masalah" },
  { label: "Solusi", href: "#solusi" },
  { label: "Demo WA", href: "#demo-wa" },
  { label: "Penawaran", href: "#konsultasi" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-4 inset-x-0 z-50 px-4">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="mx-auto max-w-3xl rounded-2xl border border-white/[0.10] bg-[#0C0B0A]/80 px-4 py-2 shadow-[0_12px_40px_rgba(0,0,0,0.65)] backdrop-blur-xl"
      >
        <div className="flex items-center justify-between gap-4">
          <a href="#" className="flex items-center gap-2.5 pl-1">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#E2B896]/30 bg-[#171311] text-[#E2B896]">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#F5F2EE]">
              Aesthetica<span className="text-[#E2B896]">Web</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-medium text-[#9B9086] transition-colors hover:text-[#F5F2EE]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#konsultasi"
              className="hidden sm:inline-flex items-center justify-center rounded-xl border border-white/15 btn-specular px-4 py-2 text-xs font-semibold text-[#F5F2EE] transition-all"
            >
              Free Konsultasi
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="inline-flex md:hidden h-8 w-8 items-center justify-center rounded-lg border border-white/15 text-[#F5F2EE]"
              aria-label="Toggle Menu"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden md:hidden"
            >
              <div className="flex flex-col gap-1.5 pt-3 pb-2 border-t border-white/10 mt-2.5">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-3 py-2 text-sm font-medium text-[#C5BBB2] hover:bg-white/5 hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#konsultasi"
                  onClick={() => setMobileOpen(false)}
                  className="mt-1 inline-flex items-center justify-center rounded-xl border border-white/15 btn-specular px-4 py-2.5 text-sm font-semibold text-[#F5F2EE]"
                >
                  Klaim Free Konsultasi
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}

"use client";

import { motion } from "framer-motion";

interface ConnectorLineProps {
  direction?: "down" | "up";
  dark?: boolean;
  className?: string;
}

/**
 * Glowing vertical connector line with endpoint dot inspired by the reference layout,
 * styled in champagne rose-gold for aesthetic clinic prestige.
 */
export function ConnectorLine({
  direction = "down",
  dark = false,
  className = "",
}: ConnectorLineProps) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`} aria-hidden="true">
      {direction === "up" && (
        <span
          className={`h-2 w-2 rounded-full ${
            dark
              ? "bg-[#E8C5A5] shadow-[0_0_12px_rgba(232,197,165,0.9)]"
              : "bg-[#B87D5B] shadow-[0_0_10px_rgba(184,125,91,0.65)]"
          }`}
        />
      )}
      <motion.div
        initial={{ scaleY: 0, opacity: 0 }}
        whileInView={{ scaleY: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        style={{ originY: direction === "down" ? 0 : 1 }}
        className={`w-[1.5px] h-14 sm:h-20 ${
          dark
            ? "bg-gradient-to-b from-[#D4A373]/10 via-[#D4A373]/70 to-[#E8C5A5]"
            : "bg-gradient-to-b from-[#B87D5B]/10 via-[#B87D5B]/60 to-[#B87D5B]"
        }`}
      />
      {direction === "down" && (
        <span
          className={`h-2 w-2 rounded-full ${
            dark
              ? "bg-[#E8C5A5] shadow-[0_0_12px_rgba(232,197,165,0.9)]"
              : "bg-[#B87D5B] shadow-[0_0_10px_rgba(184,125,91,0.65)]"
          }`}
        />
      )}
    </div>
  );
}

import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ProblemSection } from "@/components/ProblemSection";
import { SolutionSection } from "@/components/SolutionSection";
import { DemoWaSection } from "@/components/DemoWaSection";
import { QuoteSection } from "@/components/QuoteSection";
import { OfferCtaSection } from "@/components/OfferCtaSection";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <DemoWaSection />
      <QuoteSection />
      <OfferCtaSection />
      <FloatingWhatsApp />
    </main>
  );
}

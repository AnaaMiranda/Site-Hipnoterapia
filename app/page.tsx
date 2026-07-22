import { Hero } from "@/components/sections/Hero";
import { Sobre } from "@/components/sections/Sobre";
import { Hipnoterapia } from "@/components/sections/Hipnoterapia";
import { Beneficios } from "@/components/sections/Beneficios";
import { ComoFunciona } from "@/components/sections/ComoFunciona";
import { Atendimento } from "@/components/sections/Atendimento";
import { Depoimentos } from "@/components/sections/Depoimentos";
import { Agendar } from "@/components/sections/Agendar";
import { Faq } from "@/components/sections/Faq";
import { CtaFinal } from "@/components/sections/CtaFinal";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Sobre />
      <Hipnoterapia />
      <Beneficios />
      <ComoFunciona />
      <Atendimento />
      <Depoimentos />
      <Agendar />
      <Faq />
      <CtaFinal />
    </>
  );
}

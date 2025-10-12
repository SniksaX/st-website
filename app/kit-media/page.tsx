import Section from "@/components/Section";
import { Separator } from "@/components/ui/separator";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Presentation from "./components/Presentation";
import Logos from "./components/Logos";
import Colors from "./components/Colors";
import PressPhotos from "./components/PressPhotos";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SectionDivider from "./components/SectionDivider";

export const metadata = {
  title: "Kit média | Sans Transition",
  description: "Logos, éléments de marque, photos presse et dossier complet du kit média de Sans Transition.",
};

export default function KitMediaPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-50 selection:bg-white/10">
      <Header />
      <div className="mb-10">
        <Hero />
      </div>
      <Presentation />
      <SectionDivider />
      <Logos />
      <SectionDivider />
      <Colors />
      <SectionDivider />
      <PressPhotos />
      <SectionDivider />
      <div className="mb-10">
        <Contact />
      </div>
      <Footer />
    </main>
  );
}

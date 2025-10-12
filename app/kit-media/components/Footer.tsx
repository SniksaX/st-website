import { KIT_PDF } from "../constants";
import { Mail, FileText } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/70">
        <p>© {new Date().getFullYear()} Sans Transition — Média par et pour les minorités.</p>
        <div className="flex items-center gap-3">
          <a href={KIT_PDF} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-white">
            <FileText className="size-4" /> Kit (PDF)
          </a>
          <a href="mailto:contact@sanstransition.fr" className="inline-flex items-center gap-1 hover:text-white">
            <Mail className="size-4" /> contact@sanstransition.fr
          </a>
        </div>
      </div>
    </footer>
  );
}

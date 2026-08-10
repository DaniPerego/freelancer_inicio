"use client";

import { useLanguage } from "./LanguageProvider";
import type { Lang } from "@/i18n/translations";

const langs: { code: Lang; label: string }[] = [
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
  { code: "pt", label: "PT" },
];

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="fixed top-4 left-4 sm:top-6 sm:left-6 flex gap-1 z-50">
      {langs.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          className={`px-2 py-1 text-xs font-mono rounded transition-colors ${
            lang === l.code
              ? "bg-accent text-white"
              : "bg-border/50 hover:bg-border text-muted hover:text-foreground"
          }`}
          aria-label={`Cambiar idioma a ${l.label}`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}

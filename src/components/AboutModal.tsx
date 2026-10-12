"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "./LanguageProvider";

interface AboutModalProps {
  open: boolean;
  onClose: () => void;
}

export function AboutModal({ open, onClose }: AboutModalProps) {
  const { t } = useLanguage();
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-lg rounded-2xl bg-card border border-border p-8 shadow-xl animate-in zoom-in-95 fade-in duration-200 max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-label={t("aboutTitle")}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        {/* Profile photo */}
        <div className="flex justify-center mb-6">
          <img
            src="/profile-avatar.jpg"
            alt="Carlos Daniel Pérego"
            className="w-28 h-28 rounded-full object-cover border-2 border-border"
          />
        </div>

        {/* Name */}
        <h2 className="text-2xl font-bold text-center mb-1">
          Carlos Daniel Pérego
        </h2>
        <p className="text-accent text-center text-sm font-medium mb-6">
          {t("aboutRole")}
        </p>

        {/* Bio */}
        <p className="text-muted leading-relaxed text-sm mb-8">
          {t("aboutBio")}
        </p>

        {/* Experience highlights */}
        <div className="mb-8">
          <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-accent mb-3">
            {t("aboutExperience")}
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
              {t("aboutExp1")}
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
              {t("aboutExp2")}
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
              {t("aboutExp3")}
            </li>
          </ul>
        </div>

        {/* Stack */}
        <div className="mb-8">
          <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-accent mb-3">
            {t("aboutStack")}
          </h3>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted">
            {[
              "Next.js",
              "React",
              "TypeScript",
              "JavaScript",
              "Vue.js",
              "Tailwind CSS",
              "Node.js",
              "MySQL",
              "AI-Driven Dev",
            ].map((skill) => (
              <span key={skill} className="cursor-default">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-accent mb-3">
            {t("aboutEducation")}
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
              {t("aboutEdu1")}
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
              {t("aboutEdu2")}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { useLanguage } from "./LanguageProvider";
import { AboutModal } from "./AboutModal";
import { ProjectModal } from "./ProjectModal";
import { LogoScroll } from "./LogoScroll";
import { AmbientBackground } from "./AmbientBackground";

const projectKeys = [
  { slug: "tiempomasamadre", name: "project1Name", desc: "project1Desc", url: "https://tiempomasamadre.vercel.app/", tags: ["Next.js", "TypeScript", "Prisma", "Tailwind", "Stripe"] },
  { slug: "alqui-libres", name: "project2Name", desc: "project2Desc", url: "https://alqui-libres.vercel.app/", tags: ["Vue.js", "Firebase", "Vite", "Tailwind"] },
  { slug: "dividamos-la-cuenta", name: "project3Name", desc: "project3Desc", url: "https://dividamos-la-cuenta.vercel.app/", tags: ["React Native", "Expo", "TypeScript"] },
  { slug: "bendito-cross", name: "project4Name", desc: "project4Desc", url: "https://bendito-cross.vercel.app/", tags: ["HTML", "CSS", "JavaScript"] },
  { slug: "escrutinio-carnaval-2026", name: "project5Name", desc: "project5Desc", url: "https://escrutinio-carnaval-2026.vercel.app/", tags: ["JavaScript", "Node.js"] },
  { slug: "gestion-gimnasio-demo", name: "project6Name", desc: "project6Desc", url: "https://gestion-gimnasio-demo.vercel.app/", tags: ["Next.js", "TypeScript", "Tailwind"] },
  { slug: "libresqr", name: "project7Name", desc: "project7Desc", url: "https://libresqr.vercel.app/", tags: ["Next.js", "TypeScript", "Tailwind", "qrcode.react"] },
  { slug: "tvlibres", name: "project8Name", desc: "project8Desc", url: "https://tvlibres.vercel.app/", tags: ["PWA", "JavaScript", "Service Worker"] },
  { slug: "libres-cobros", name: "project9Name", desc: "project9Desc", url: "https://libres-cobros.vercel.app/", tags: ["Next.js", "Prisma", "PostgreSQL", "Stripe", "Mercado Pago"] },
  { slug: "libres-pdf", name: "project10Name", desc: "project10Desc", url: "https://libres-pdf.vercel.app/", tags: ["JavaScript", "pdf-lib", "Fabric.js"] },
];

const serviceKeys = [
  { title: "service1Title", description: "service1Description" },
  { title: "service2Title", description: "service2Description" },
  { title: "service3Title", description: "service3Description" },
];

export function PageContent() {
  const { t } = useLanguage();
  const [aboutOpen, setAboutOpen] = useState(false);
  const handleClose = useCallback(() => setAboutOpen(false), []);
  const [projectModal, setProjectModal] = useState<typeof projectKeys[number] | null>(null);
  const handleProjectClose = useCallback(() => setProjectModal(null), []);

  return (
    <>
      <AmbientBackground />

      {/* Hero */}
      <header className="relative flex flex-col items-center justify-center min-h-[70vh] px-6 pt-16 sm:pt-0 text-center">
        <p className="text-accent font-mono text-xs tracking-[0.2em] uppercase mb-4">
          {t("location")}
        </p>
        <h1 className="text-4xl sm:text-4xl font-bold tracking-tight mb-3 text-accent">
          DesarrolloWeb-pdl
        </h1>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight mb-2">
          Carlos Daniel Pérego
        </h2>
        <h3 className="text-lg sm:text-xl text-muted font-light mb-4">
          desarrollador web
        </h3>
        <LogoScroll />
        <p className="max-w-md text-muted leading-relaxed mb-8 whitespace-pre-line">
          {t("description")}
        </p>
        <div className="flex gap-6">
          <button
            onClick={() => setAboutOpen(true)}
            className="text-sm font-medium hover:text-accent transition-colors"
          >
            {t("navAbout")}
          </button>
          <a
            href="#proyectos"
            className="text-sm font-medium hover:text-accent transition-colors"
          >
            {t("navProjects")}
          </a>
          <a
            href="#contacto"
            className="text-sm font-medium hover:text-accent transition-colors"
          >
            {t("navContact")}
          </a>
        </div>
      </header>

      {/* Servicios */}
      <section id="servicios" className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-mono text-xs tracking-[0.2em] uppercase mb-3">
            {t("servicesLabel")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-10">
            {t("servicesTitle")}
          </h2>
          <div className="space-y-8">
            {serviceKeys.map((sk) => (
              <div key={sk.title} className="group">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                  {t(sk.title)}
                </h3>
                <p className="text-muted leading-relaxed">
                  {t(sk.description)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metodología */}
      <section id="metodologia" className="relative py-20 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-mono text-xs tracking-[0.2em] uppercase mb-3">
            {t("methodologyLabel")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-10">
            {t("methodologyTitle")}
          </h2>

          <div className="space-y-4">
            {/* Grupo 1: Proyecto de punta a punta */}
            <details className="group border-b border-border">
              <summary className="flex items-center justify-between cursor-pointer list-none py-5 [&::-webkit-details-marker]:hidden">
                <span className="text-lg font-semibold group-hover:text-accent transition-colors">
                  {t("methodologyGroup2")}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted shrink-0 ml-4 transition-transform duration-200 group-open:rotate-90"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </summary>
              <div className="pb-6 space-y-6">
                {[
                  { num: "01", title: "process1Title", desc: "process1Description" },
                  { num: "02", title: "process2Title", desc: "process2Description" },
                  { num: "03", title: "process3Title", desc: "process3Description" },
                  { num: "04", title: "process4Title", desc: "process4Description" },
                  { num: "05", title: "process5Title", desc: "process5Description" },
                ].map((step) => (
                  <div key={step.num} className="group/step flex gap-6">
                    <span className="font-mono text-accent text-sm shrink-0 mt-1">
                      {step.num}
                    </span>
                    <div>
                      <h3 className="font-semibold mb-1 group-hover/step:text-accent transition-colors">
                        {t(step.title)}
                      </h3>
                      <p className="text-muted text-sm leading-relaxed">
                        {t(step.desc)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </details>

            {/* Grupo 2: Desarrollo con IA */}
            <details className="group border-b border-border">
              <summary className="flex items-center justify-between cursor-pointer list-none py-5 [&::-webkit-details-marker]:hidden">
                <span className="text-lg font-semibold group-hover:text-accent transition-colors">
                  {t("methodologyGroup1")}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted shrink-0 ml-4 transition-transform duration-200 group-open:rotate-90"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </summary>
              <div className="pb-6 space-y-6">
                {[
                  { num: "01", title: "method1Title", desc: "method1Description" },
                  { num: "02", title: "method2Title", desc: "method2Description" },
                  { num: "03", title: "method3Title", desc: "method3Description" },
                  { num: "04", title: "method4Title", desc: "method4Description" },
                ].map((step) => (
                  <div key={step.num} className="group/step flex gap-6">
                    <span className="font-mono text-accent text-sm shrink-0 mt-1">
                      {step.num}
                    </span>
                    <div>
                      <h3 className="font-semibold mb-1 group-hover/step:text-accent transition-colors">
                        {t(step.title)}
                      </h3>
                      <p className="text-muted text-sm leading-relaxed">
                        {t(step.desc)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* Proyectos */}
      <section id="proyectos" className="relative py-20 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-mono text-xs tracking-[0.2em] uppercase mb-3">
            {t("projectsLabel")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-10">
            {t("projectsTitle")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {projectKeys.map((project) => (
              <button
                key={project.name}
                onClick={() => setProjectModal(project)}
                className="group block w-full text-left rounded-lg border border-border bg-card overflow-hidden hover:border-accent/30 transition-colors"
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={`/projects/${project.slug}.webp`}
                    alt={t(project.name)}
                    width={1280}
                    height={800}
                    loading="lazy"
                    className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Frosted orange veil — cleared on hover */}
                  <div className="absolute inset-0 bg-accent/20 backdrop-blur-[2px] opacity-100 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none" />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-lg font-semibold group-hover:text-accent transition-colors">
                      {t(project.name)}
                    </h3>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-muted group-hover:text-accent transition-colors shrink-0 mt-1"
                    >
                      <path d="M7 17L17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </div>
                  <p className="text-muted text-sm leading-relaxed mb-3">
                    {t(project.desc)}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs text-muted/70">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-mono text-xs tracking-[0.2em] uppercase mb-3">
            {t("skillsLabel")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-10">
            {t("skillsTitle")}
          </h2>
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {[
              "Next.js",
              "React",
              "TypeScript",
              "JavaScript",
              "Node.js",
              "Vue.js",
              "React Native",
              "Tailwind CSS",
              "Prisma",
              "Firebase",
              "MySQL",
              "PostgreSQL",
              "Stripe",
              "Mercado Pago",
              "Vercel",
              "Git",
            ].map((skill) => (
              <span
                key={skill}
                className="text-sm text-muted hover:text-foreground transition-colors cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="relative py-20 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-accent font-mono text-xs tracking-[0.2em] uppercase mb-3">
            {t("contactLabel")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            {t("contactTitle")}
          </h2>
          <p className="text-muted mb-10">
            {t("contactSubtitle")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
            {/* WhatsApp */}
            <a
              href="https://wa.me/543772430061"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-accent transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>

            {/* Email */}
            <a
              href="mailto:danielperego09@gmail.com"
              className="flex items-center gap-2 hover:text-accent transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              danielperego09@gmail.com
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/desarrolloweb.pdl"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-accent transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              @desarrolloweb.pdl
            </a>

            {/* Web */}
            <a
              href="https://www.desarrolloweb-pdl.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-accent transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="2" x2="22" y1="12" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              www.desarrolloweb-pdl.vercel.app
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 px-6 border-t border-border">
        <div className="flex flex-col items-center justify-center gap-3">
          <p className="text-center text-muted text-xs">
            © 2026 Carlos Daniel Pérego
          </p>
          <p className="footer-brand flex items-center gap-2 text-xs text-muted transition-colors hover:text-accent">
            <span
              id="footer-cube-icon"
              className="inline-flex w-4 h-4 shrink-0 transition-transform will-change-transform"
              style={{ transform: "scale(var(--cube-pop, 1))" }}
              aria-hidden="true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                fill="currentColor"
                className="w-full h-full"
              >
                <rect x="4" y="4" width="11" height="11" rx="2" opacity="1" />
                <rect x="17" y="4" width="11" height="11" rx="2" opacity="0.7" />
                <rect x="4" y="17" width="11" height="11" rx="2" opacity="0.5" />
                <rect x="17" y="17" width="11" height="11" rx="2" opacity="0.3" />
              </svg>
            </span>
            DesarrolloWeb-pdl
          </p>
        </div>
      </footer>

      <AboutModal open={aboutOpen} onClose={handleClose} />
      <ProjectModal project={projectModal} onClose={handleProjectClose} />
    </>
  );
}

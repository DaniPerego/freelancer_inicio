import { ThemeToggle } from "@/components/ThemeToggle";

const projects = [
  {
    name: "Tiempo Masa Madre",
    description:
      "E-commerce de panadería artesanal con sistema de preventa semanal, time-gating, carrito inteligente y pagos con Stripe y Mercado Pago.",
    url: "https://tiempomasamadre.vercel.app/",
    tags: ["Next.js", "TypeScript", "Prisma", "Tailwind", "Stripe"],
  },
  {
    name: "AlquiLibres",
    description:
      "Plataforma hiper-local de alquileres temporarios sin comisiones. Modelo de suscripción fija para propietarios, filtros locales y sistema de confianza.",
    url: "https://alqui-libres.vercel.app/",
    tags: ["Vue.js", "Firebase", "Vite", "Tailwind"],
  },
  {
    name: "Dividamos la Cuenta",
    description:
      "Aplicación móvil para dividir gastos entre amigos de forma rápida y sencilla.",
    url: "https://dividamos-la-cuenta.vercel.app/",
    tags: ["React Native", "Expo", "TypeScript"],
  },
  {
    name: "Bendito Cross",
    description:
      "Sitio web de gimnasio funcional con herramientas de entrenamiento: calculadora de RM, cronómetro, biblioteca de ejercicios y diccionario CrossFit.",
    url: "https://bendito-cross.vercel.app/",
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    name: "Escrutinio Carnaval 2026",
    description:
      "Sistema de escrutinio electoral para el Carnaval 2026 de Paso de los Libres.",
    url: "https://escrutinio-carnaval-2026.vercel.app/",
    tags: ["JavaScript", "Node.js"],
  },
];

const services = [
  {
    title: "Desarrollo Web",
    description:
      "Sitios modernos, rápidos y responsivos. Landing pages hasta plataformas completas.",
  },
  {
    title: "Aplicaciones Web",
    description:
      "Apps con backend, base de datos y lógica de negocio. Dashboards y sistemas a medida.",
  },
  {
    title: "E-commerce",
    description:
      "Tiendas online con carrito, pasarelas de pago y gestión de stock.",
  },
];

const skills = [
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
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <ThemeToggle />
      {/* Hero */}
      <header className="flex flex-col items-center justify-center min-h-[85vh] px-6 text-center">
        <p className="text-accent font-mono text-xs tracking-[0.2em] uppercase mb-6">
          Paso de los Libres, Corrientes
        </p>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-4">
          Carlos Daniel Pérego
        </h1>
        <h2 className="text-lg sm:text-xl text-muted font-light mb-10">
          Desarrollador Web
        </h2>
        <p className="max-w-md text-muted leading-relaxed mb-12">
          Construyo soluciones web que resuelven problemas reales. Desde
          e-commerce hasta plataformas SaaS.
        </p>
        <div className="flex gap-6">
          <a
            href="#proyectos"
            className="text-sm font-medium hover:text-accent transition-colors"
          >
            Proyectos
          </a>
          <a
            href="#contacto"
            className="text-sm font-medium hover:text-accent transition-colors"
          >
            Contacto
          </a>
        </div>
      </header>

      {/* Servicios */}
      <section id="servicios" className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-mono text-xs tracking-[0.2em] uppercase mb-4">
            Servicios
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-16">
            ¿Qué puedo hacer por vos?
          </h2>
          <div className="space-y-12">
            {services.map((service) => (
              <div key={service.title} className="group">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proyectos */}
      <section id="proyectos" className="py-32 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-mono text-xs tracking-[0.2em] uppercase mb-4">
            Proyectos
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-16">
            Trabajo seleccionado
          </h2>
          <div className="space-y-8">
            {projects.map((project) => (
              <a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block py-6 border-b border-border last:border-0 hover:border-accent/30 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-muted text-sm leading-relaxed mb-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs text-muted/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
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
                    className="text-muted group-hover:text-accent transition-colors shrink-0 mt-1.5"
                  >
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-mono text-xs tracking-[0.2em] uppercase mb-4">
            Stack
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-16">
            Tecnologías
          </h2>
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {skills.map((skill) => (
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
      <section id="contacto" className="py-32 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-accent font-mono text-xs tracking-[0.2em] uppercase mb-4">
            Contacto
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">
            Hablemos
          </h2>
          <p className="text-muted mb-12">
            ¿Tenés un proyecto en mente?
          </p>
          <a
            href="https://www.instagram.com/desarrolloweb.pdl"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors"
          >
            @desarrolloweb.pdl
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-border">
        <p className="text-center text-muted text-xs">
          © {new Date().getFullYear()} Carlos Daniel Pérego
        </p>
      </footer>
    </div>
  );
}

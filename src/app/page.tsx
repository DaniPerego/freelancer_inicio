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
    title: "Diseño Web",
    description:
      "Sitios web modernos, rápidos y responsivos. Desde landing pages hasta plataformas completas, siempre con foco en la experiencia del usuario.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 21a9 9 0 1 1 0 -18a9 8 0 0 1 9 8a4.5 4 0 0 1 -4.5 4h-2.5a2 2 0 0 0 -1 3.75a1.3 1.3 0 0 1 -1 2.25" />
        <circle cx="7.5" cy="10.5" r=".5" fill="currentColor" />
        <circle cx="12" cy="7.5" r=".5" fill="currentColor" />
        <circle cx="16.5" cy="10.5" r=".5" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Aplicaciones Web",
    description:
      "Apps completas con backend, base de datos y lógica de negocio. Dashboards, sistemas de gestión, herramientas a medida.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    title: "E-commerce",
    description:
      "Tiendas online con carrito de compras, pasarelas de pago (Stripe, Mercado Pago), gestión de stock y panel de administración.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="8" cy="21" r="1" />
        <circle cx="19" cy="21" r="1" />
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
      </svg>
    ),
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
      {/* Hero */}
      <header className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
        <p className="text-accent font-mono text-sm tracking-widest uppercase mb-4">
          Paso de los Libres, Corrientes
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
          Carlos Daniel Perego
        </h1>
        <h2 className="text-xl sm:text-2xl text-muted mb-8">
          Desarrollador Web
        </h2>
        <p className="max-w-xl text-muted leading-relaxed mb-10">
          Construyo soluciones web que resuelven problemas reales. Desde
          e-commerce hasta plataformas SaaS, siempre con tecnologías modernas y
          un enfoque en calidad.
        </p>
        <div className="flex gap-4">
          <a
            href="#proyectos"
            className="px-6 py-3 bg-accent text-background font-medium rounded-lg hover:bg-accent-hover transition-colors"
          >
            Ver proyectos
          </a>
          <a
            href="#contacto"
            className="px-6 py-3 border border-card-border rounded-lg hover:border-accent hover:text-accent transition-colors"
          >
            Contactar
          </a>
        </div>
      </header>

      {/* Servicios */}
      <section id="servicios" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Servicios</h2>
          <p className="text-muted text-center mb-16 max-w-2xl mx-auto">
            Cada proyecto es una oportunidad para construir algo que funcione de
            verdad.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-card border border-card-border rounded-xl p-8 hover:border-accent/50 transition-colors"
              >
                <div className="text-accent mb-5">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proyectos */}
      <section id="proyectos" className="py-24 px-6 bg-card/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Proyectos</h2>
          <p className="text-muted text-center mb-16 max-w-2xl mx-auto">
            Algunos de los proyectos que he construido y desplegado en Vercel.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-card border border-card-border rounded-xl p-6 hover:border-accent/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold group-hover:text-accent transition-colors">
                    {project.name}
                  </h3>
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
                    className="text-muted group-hover:text-accent transition-colors shrink-0 mt-1"
                  >
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </div>
                <p className="text-muted text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 bg-background border border-card-border rounded-md text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Stack Tecnológico
          </h2>
          <p className="text-muted text-center mb-16 max-w-2xl mx-auto">
            Tecnologías que uso para construir soluciones robustas y escalables.
          </p>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg-card border border-card-border rounded-lg text-sm font-medium hover:border-accent/50 hover:text-accent transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="py-24 px-6 bg-card/50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Contacto</h2>
          <p className="text-muted mb-10">
            ¿Tenés un proyecto en mente? Hablemos.
          </p>
          <a
            href="https://www.instagram.com/desarrolloweb.pdl"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-background font-medium rounded-lg hover:bg-accent-hover transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
            </svg>
            @desarrolloweb.pdl
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-card-border">
        <p className="text-center text-muted text-sm">
          &copy; {new Date().getFullYear()} Carlos Daniel Perego. Todos los
          derechos reservados.
        </p>
      </footer>
    </div>
  );
}

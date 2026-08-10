import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { LogoScroll } from "@/components/LogoScroll";
import { PageContent } from "@/components/PageContent";

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

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen">
      <ThemeToggle />
      <LanguageSwitcher />
      <PageContent projects={projects} />
    </div>
  );
}

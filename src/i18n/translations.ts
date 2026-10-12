export type Lang = "es" | "en" | "pt";

export const translations: Record<Lang, Record<string, string>> = {
  es: {
    // Hero
    location: "Paso de los Libres, Corrientes",
    subtitle: "Desarrollador Web",
    description:
      "Construyo soluciones web que resuelven problemas reales. Desde\u00A0e-commerce hasta plataformas SaaS.",
    navProjects: "Proyectos",
    navContact: "Contacto",
    navAbout: "Sobre mí",

    // Services
    servicesLabel: "Servicios",
    servicesTitle: "¿Qué puedo hacer por vos?",
    service1Title: "Desarrollo Web",
    service1Description:
      "Sitios modernos, rápidos y responsivos. Landing pages hasta plataformas completas.",
    service2Title: "Aplicaciones Web",
    service2Description:
      "Apps con backend, base de datos y lógica de negocio. Dashboards y sistemas a medida.",
    service3Title: "E-commerce",
    service3Description:
      "Tiendas online con carrito, pasarelas de pago y gestión de stock.",

    // Methodology
    methodologyLabel: "Metodología",
    methodologyTitle: "Cómo trabajo",
    method1Title: "Planificación con IA",
    method1Description:
      "Defino arquitectura y desglose de tareas con agentes de planificación antes de escribir una línea.",
    method2Title: "Desarrollo asistido",
    method2Description:
      "Pair programming en vivo con copilotos de código; los agentes generan, yo dirijo y decido.",
    method3Title: "Revisión adversarial",
    method3Description:
      "Agentes independientes revisan el código con lentes distintos: legibilidad, riesgo, resiliencia.",
    method4Title: "Verificación automatizada",
    method4Description:
      "Arneses de IA y tests continuos cierran el ciclo antes de entregar.",

    // Projects
    projectsLabel: "Proyectos",
    projectsTitle: "Trabajos desarrolloweb-pdl",
    project1Name: "Tiempo Masa Madre",
    project1Desc: "E-commerce de panadería artesanal con sistema de preventa semanal, time-gating, carrito inteligente y pagos con Stripe y Mercado Pago.",
    project2Name: "AlquiLibres",
    project2Desc: "Plataforma hiper-local de alquileres temporarios sin comisiones. Modelo de suscripción fija para propietarios, filtros locales y sistema de confianza.",
    project3Name: "Dividamos la Cuenta",
    project3Desc: "Aplicación móvil para dividir gastos entre amigos de forma rápida y sencilla.",
    project4Name: "Bendito Cross",
    project4Desc: "Sitio web de gimnasio funcional con herramientas de entrenamiento: calculadora de RM, cronómetro, biblioteca de ejercicios y diccionario CrossFit.",
    project5Name: "Escrutinio Carnaval 2026",
    project5Desc: "Sistema de escrutinio electoral para el Carnaval 2026 de Paso de los Libres.",
    project6Name: "Gestión Gimnasio",
    project6Desc: "Sistema integral de administración de gimnasios con control de socios, registro de asistencias, gestión de pagos y reportes financieros.",
    project7Name: "QR Creator",
    project7Desc: "Generador de códigos QR gratuito. Convierte texto o URLs en códigos QR descargables al instante.",

    // Skills
    skillsLabel: "Stack",
    skillsTitle: "Tecnologías",

    // Contact
    contactLabel: "Contacto",
    contactTitle: "Hablemos",
    contactSubtitle: "¿Tenés un proyecto en mente?",

    // About
    aboutTitle: "Sobre mí",
    aboutRole: "Desarrollador Front-End & Integración de IA",
    aboutEducation: "Formación",
    aboutEdu1: "Técnico Superior en Desarrollo de Software (2018)",
    aboutEdu2: "Formación continua en IA, ciberseguridad y analítica",
    aboutBio:
      "Soy Carlos, Técnico Superior en Desarrollo de Software con más de 10 años construyendo interfaces, sitios y sistemas web. Me especializo en Front-End e integración de Inteligencia Artificial en el flujo de trabajo real: ingeniería de prompts, pair programming en vivo con copilotos de código y orquestación de múltiples agentes autónomos. También administro redes informáticas y doy soporte técnico en el sector público.",
    aboutExperience: "Experiencia",
    aboutExp1: "+10 años construyendo productos web",
    aboutExp2: "Desarrollo asistido por IA (agentes y prompts)",
    aboutExp3: "Paso de los Libres, Argentina · Remoto",
    aboutStack: "Stack principal",

    // Footer
    copyright: "© 2026 Carlos Daniel Pérego",
  },

  en: {
    // Hero
    location: "Paso de los Libres, Corrientes",
    subtitle: "Web Developer",
    description:
      "I build web solutions that solve real problems. From\u00A0e-commerce to SaaS platforms.",
    navProjects: "Projects",
    navContact: "Contact",
    navAbout: "About me",

    // Services
    servicesLabel: "Services",
    servicesTitle: "What can I do for you?",
    service1Title: "Web Development",
    service1Description:
      "Modern, fast and responsive sites. From landing pages to full platforms.",
    service2Title: "Web Applications",
    service2Description:
      "Apps with backend, database and business logic. Dashboards and custom systems.",
    service3Title: "E-commerce",
    service3Description:
      "Online stores with cart, payment gateways and stock management.",

    // Methodology
    methodologyLabel: "Methodology",
    methodologyTitle: "How I work",
    method1Title: "AI Planning",
    method1Description:
      "I define architecture and task breakdown with planning agents before writing a single line.",
    method2Title: "AI-assisted development",
    method2Description:
      "Live pair programming with code copilots; agents generate, I lead and decide.",
    method3Title: "Adversarial review",
    method3Description:
      "Independent agents review the code through different lenses: readability, risk, resilience.",
    method4Title: "Automated verification",
    method4Description:
      "AI harnesses and continuous tests close the cycle before delivery.",

    // Projects
    projectsLabel: "Projects",
    projectsTitle: "Work desarrolloweb-pdl",
    project1Name: "Tiempo Masa Madre",
    project1Desc: "Artisan bakery e-commerce with weekly pre-sale system, time-gating, smart cart and Stripe & Mercado Pago payments.",
    project2Name: "AlquiLibres",
    project2Desc: "Hyper-local temporary rental platform with no commissions. Fixed subscription model for owners, local filters and trust system.",
    project3Name: "Split the Bill",
    project3Desc: "Mobile app to split expenses with friends quickly and easily.",
    project4Name: "Bendito Cross",
    project4Desc: "Functional gym website with training tools: RM calculator, stopwatch, exercise library and CrossFit dictionary.",
    project5Name: "Escrutinio Carnaval 2026",
    project5Desc: "Electoral scrutiny system for the 2026 Carnaval in Paso de los Libres.",
    project6Name: "Gym Management",
    project6Desc: "Complete gym management system with member control, attendance tracking, payment management and financial reports.",
    project7Name: "QR Creator",
    project7Desc: "Free QR code generator. Convert text or URLs into downloadable QR codes instantly.",

    // Skills
    skillsLabel: "Stack",
    skillsTitle: "Technologies",

    // Contact
    contactLabel: "Contact",
    contactTitle: "Let's talk",
    contactSubtitle: "Have a project in mind?",

    // About
    aboutTitle: "About me",
    aboutRole: "Front-End Developer & AI Integration",
    aboutEducation: "Education",
    aboutEdu1: "Higher Technician in Software Development (2018)",
    aboutEdu2: "Continuous training in AI, cybersecurity and analytics",
    aboutBio:
      "I'm Carlos, a Higher Technician in Software Development with 10+ years building web interfaces, sites and systems. I specialize in Front-End and Artificial Intelligence integration in real workflows: prompt engineering, live pair programming with code copilots and orchestration of multiple autonomous agents. I also manage IT networks and provide technical support in the public sector.",
    aboutExperience: "Experience",
    aboutExp1: "10+ years building web products",
    aboutExp2: "AI-assisted development (agents and prompts)",
    aboutExp3: "Paso de los Libres, Argentina · Remote",
    aboutStack: "Core stack",

    // Footer
    copyright: "© 2026 Carlos Daniel Pérego",
  },

  pt: {
    // Hero
    location: "Paso de los Libres, Corrientes",
    subtitle: "Desenvolvedor Web",
    description:
      "Construo soluções web que resolvem problemas reais.\nDe e-commerce a plataformas SaaS.",
    navProjects: "Projetos",
    navContact: "Contato",
    navAbout: "Sobre mim",

    // Services
    servicesLabel: "Serviços",
    servicesTitle: "O que posso fazer por você?",
    service1Title: "Desenvolvimento Web",
    service1Description:
      "Sites modernos, rápidos e responsivos. De landing pages a plataformas completas.",
    service2Title: "Aplicações Web",
    service2Description:
      "Apps com backend, banco de dados e lógica de negócios. Dashboards e sistemas sob medida.",
    service3Title: "E-commerce",
    service3Description:
      "Lojas online com carrinho, gateways de pagamento e gestão de estoque.",

    // Methodology
    methodologyLabel: "Metodologia",
    methodologyTitle: "Como trabalho",
    method1Title: "Planejamento com IA",
    method1Description:
      "Defino arquitetura e desglose de tarefas com agentes de planejamento antes de escrever uma linha.",
    method2Title: "Desenvolvimento assistido",
    method2Description:
      "Pair programming ao vivo com copilotos de código; os agentes geram, eu dirijo e decido.",
    method3Title: "Revisão adversarial",
    method3Description:
      "Agentes independentes revisam o código com lentes distintas: legibilidade, risco, resiliência.",
    method4Title: "Verificação automatizada",
    method4Description:
      "Arneses de IA e testes contínuos fecham o ciclo antes da entrega.",

    // Projects
    projectsLabel: "Projetos",
    projectsTitle: "Trabalhos desenvolvimentoweb-pdl",
    project1Name: "Tiempo Masa Madre",
    project1Desc: "E-commerce de padaria artesanal com sistema de pré-venda semanal, time-gating, carrinho inteligente e pagamentos com Stripe e Mercado Pago.",
    project2Name: "AlquiLibres",
    project2Desc: "Plataforma hiper-local de aluguéis temporários sem comissões. Modelo de assinatura fixa para proprietários, filtros locais e sistema de confiança.",
    project3Name: "Dividamos a Conta",
    project3Desc: "Aplicativo móvel para dividir despesas com amigos de forma rápida e simples.",
    project4Name: "Bendito Cross",
    project4Desc: "Site de academia funcional com ferramentas de treino: calculadora de RM, cronômetro, biblioteca de exercícios e dicionário CrossFit.",
    project5Name: "Escrutinio Carnaval 2026",
    project5Desc: "Sistema de escrutínio eleitoral para o Carnaval 2026 de Paso de los Libres.",
    project6Name: "Gestão Academia",
    project6Desc: "Sistema completo de administração de academias com controle de sócios, registro de presenças, gestão de pagamentos e relatórios financeiros.",
    project7Name: "QR Creator",
    project7Desc: "Gerador de QR codes gratuito. Converta textos ou URLs em QR codes baixáveis instantaneamente.",

    // Skills
    skillsLabel: "Stack",
    skillsTitle: "Tecnologias",

    // Contact
    contactLabel: "Contato",
    contactTitle: "Vamos conversar",
    contactSubtitle: "Tem um projeto em mente?",

    // About
    aboutTitle: "Sobre mim",
    aboutRole: "Desenvolvedor Front-End & Integração de IA",
    aboutEducation: "Formação",
    aboutEdu1: "Técnico Superior em Desenvolvimento de Software (2018)",
    aboutEdu2: "Formação contínua em IA, cibersegurança e análise de dados",
    aboutBio:
      "Sou Carlos, Técnico Superior em Desenvolvimento de Software com mais de 10 anos construindo interfaces, sites e sistemas web. Especializo-me em Front-End e integração de Inteligência Artificial no fluxo de trabalho real: engenharia de prompts, pair programming ao vivo com copilotos de código e orquestação de múltiplos agentes autônomos. Também administro redes de informática e ofereço suporte técnico no setor público.",
    aboutExperience: "Experiência",
    aboutExp1: "+10 anos construindo produtos web",
    aboutExp2: "Desenvolvimento assistido por IA (agentes e prompts)",
    aboutExp3: "Paso de los Libres, Argentina · Remoto",
    aboutStack: "Stack principal",

    // Footer
    copyright: "© 2026 Carlos Daniel Pérego",
  },
};

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
    methodologyGroup1: "Desarrollo con IA",
    methodologyGroup2: "Proyecto de punta a punta",
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
    process1Title: "Descubrimiento",
    process1Description:
      "Primera reunión sin compromiso. Entiendo tu problema, tu negocio y qué necesitás resolver.",
    process2Title: "Propuesta y alcance",
    process2Description:
      "Documento claro con alcance, cronograma y presupuesto cerrado. Sin sorpresas ni costos ocultos.",
    process3Title: "Desarrollo",
    process3Description:
      "Construyo con mi flujo asistido por IA. Comunicación periódica y avances visibles, no cajas negras.",
    process4Title: "Despliegue",
    process4Description:
      "Lanzamiento a producción con monitoreo. Proyecto funcionando, documentado y listo para escalar.",
    process5Title: "Soporte",
    process5Description:
      "Acompañamiento post-lanzamiento. Ajustes, mejoras y mantenimiento para que tu producto siga creciendo.",

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
    project8Name: "TVLIBRES",
    project8Desc: "App PWA para ver canales de TV argentinos oficiales en una sola aplicación. Sin publicidad, sin redirects, instalable desde el navegador.",
    project9Name: "Libres Cobros",
    project9Desc: "Sistema integral de cobros para clubes e instituciones: socios, cuotas, pagos online con Stripe y Mercado Pago, comprobantes, recordatorios por WhatsApp y reportes financieros.",
    project10Name: "Libres PDF",
    project10Desc: "Editor de PDF online. Agregá texto, imágenes, formas y anotaciones; dividí, uní y rotá páginas sin instalar nada.",

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

    // Project modal
    projectModalDemo: "Ver proyecto",
    modalCloseAria: "Cerrar",

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
    methodologyGroup1: "AI-assisted development",
    methodologyGroup2: "End-to-end project",
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
    process1Title: "Discovery",
    process1Description:
      "First meeting with no commitment. I understand your problem, your business and what you need to solve.",
    process2Title: "Proposal and scope",
    process2Description:
      "Clear document with scope, timeline and fixed budget. No surprises or hidden costs.",
    process3Title: "Development",
    process3Description:
      "I build with my AI-assisted workflow. Periodic communication and visible progress, no black boxes.",
    process4Title: "Deployment",
    process4Description:
      "Launch to production with monitoring. Working project, documented and ready to scale.",
    process5Title: "Support",
    process5Description:
      "Post-launch support. Adjustments, improvements and maintenance so your product keeps growing.",

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
    project8Name: "TVLIBRES",
    project8Desc: "PWA app to watch official Argentine TV channels in a single application. No ads, no redirects, installable from the browser.",
    project9Name: "Libres Cobros",
    project9Desc: "Complete billing system for clubs and institutions: members, fees, online payments with Stripe and Mercado Pago, receipts, WhatsApp reminders and financial reports.",
    project10Name: "Libres PDF",
    project10Desc: "Online PDF editor. Add text, images, shapes and annotations; split, merge and rotate pages without installing anything.",

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

    // Project modal
    projectModalDemo: "View project",
    modalCloseAria: "Close",

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
    methodologyGroup1: "Desenvolvimento com IA",
    methodologyGroup2: "Projeto de ponta a ponta",
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
    process1Title: "Descoberta",
    process1Description:
      "Primeira reunião sem compromisso. Entendo seu problema, seu negócio e o que você precisa resolver.",
    process2Title: "Proposta e escopo",
    process2Description:
      "Documento claro com escopo, cronograma e orçamento fechado. Sem surpresas ou custos ocultos.",
    process3Title: "Desenvolvimento",
    process3Description:
      "Construo com meu fluxo assistido por IA. Comunicação periódica e progresso visível, sem caixas-pretas.",
    process4Title: "Implantação",
    process4Description:
      "Lançamento em produção com monitoramento. Projeto funcionando, documentado e pronto para escalar.",
    process5Title: "Suporte",
    process5Description:
      "Suporte pós-lançamento. Ajustes, melhorias e manutenção para que seu produto continue crescendo.",

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
    project8Name: "TVLIBRES",
    project8Desc: "App PWA para assistir canais de TV argentinos oficiais em um único aplicativo. Sem anúncios, sem redirecionamentos, instalável pelo navegador.",
    project9Name: "Libres Cobros",
    project9Desc: "Sistema completo de cobranças para clubes e instituições: sócios, cotas, pagamentos online com Stripe e Mercado Pago, comprovantes, lembretes por WhatsApp e relatórios financeiros.",
    project10Name: "Libres PDF",
    project10Desc: "Editor de PDF online. Adicione texto, imagens, formas e anotações; divida, una e gire páginas sem instalar nada.",

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

    // Project modal
    projectModalDemo: "Ver projeto",
    modalCloseAria: "Fechar",

    // Footer
    copyright: "© 2026 Carlos Daniel Pérego",
  },
};

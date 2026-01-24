export const navItems = [
  { label: "Home", to: "/" },
  {
    label: "Agenda",
    children: [
      { label: "Aulas em grupo ao vivo", to: "/agenda#grupo" },
      { label: "Aulas particulares ao vivo", to: "/agenda#particular" }
    ]
  },
  {
    label: "Gravadas",
    children: [
      { label: "Aulas curtas", to: "/gravadas/aulas-curtas" },
      { label: "Iniciantes", to: "/gravadas/iniciantes" },
      { label: "Invertidas", to: "/gravadas/invertidas" }
    ]
  },
  { label: "Loja", children: [{ label: "Mandalas", to: "/loja" }] },
  { label: "Contato", to: "/contato" }
];

export const heroContent = {
  eyebrow: "Conecte-se com você mesmo.",
  title: "Caminho do Ser",
  teacher: "(Nome da Professora)",
  subtitle: "Se conecte com você",
  description: "Vivenciar o yoga para se descobrir e se conhecer através dele."
};

export const aboutContent = [
  "No Caminho do Ser, cada prática é um convite para desacelerar e ouvir o corpo com carinho. Unimos respiração, presença e movimentos conscientes para cultivar autoconhecimento.",
  "As aulas são pensadas para mulheres que desejam criar uma rotina de cuidado, reconexão interna e equilíbrio emocional. Aqui, o ritmo é respeitado e a experiência é acolhedora.",
  "Entre momentos ao vivo e conteúdos gravados, você encontra um espaço seguro para aprofundar sua prática e viver o yoga de forma autêntica."
];

export const agendaHighlights = [
  {
    title: "Jornada de Conexão - Aulas em grupo",
    description: "Turmas pequenas, energia coletiva e temas que acompanham o seu momento.",
    action: "/agenda#grupo"
  },
  {
    title: "Aulas Particulares ao vivo",
    description: "Planos personalizados para suas necessidades e objetivos individuais.",
    action: "/agenda#particular"
  }
];

export const recordedCategories = [
  {
    slug: "aulas-curtas",
    name: "Aulas curtas",
    description: "Práticas rápidas para encaixar na rotina com leveza.",
    assetKey: "categories.aulas-curtas"
  },
  {
    slug: "iniciantes",
    name: "Iniciantes",
    description: "Sequências guiadas com explicações detalhadas e suporte.",
    assetKey: "categories.iniciantes"
  },
  {
    slug: "invertidas",
    name: "Invertidas",
    description: "Fortaleça e explore novas perspectivas com segurança.",
    assetKey: "categories.invertidas"
  }
];

export const recordedLessons = [
  {
    id: "curta-1",
    categorySlug: "aulas-curtas",
    title: "Respiração consciente em 15 minutos",
    image: "/placeholders/placeholder-card.svg",
    duration: "15 min",
    level: "iniciante",
    requiresLogin: false
  },
  {
    id: "curta-2",
    categorySlug: "aulas-curtas",
    title: "Alongamento suave para o fim do dia",
    image: "/placeholders/placeholder-card.svg",
    duration: "20 min",
    level: "iniciante",
    requiresLogin: false
  },
  {
    id: "iniciante-1",
    categorySlug: "iniciantes",
    title: "Fundamentos de postura e alinhamento",
    image: "/placeholders/placeholder-card.svg",
    duration: "35 min",
    level: "iniciante",
    requiresLogin: true
  },
  {
    id: "invertida-1",
    categorySlug: "invertidas",
    title: "Preparação para invertidas com segurança",
    image: "/placeholders/placeholder-card.svg",
    duration: "40 min",
    level: "intermediário",
    requiresLogin: true
  }
];

export const groupClasses = [
  {
    days: "Segundas e Quartas",
    time: "20h",
    description: "Turma noturna com foco em equilíbrio emocional."
  },
  {
    days: "Quartas e Sextas",
    time: "08h30",
    description: "Acorde com leveza e intenção para o seu dia."
  }
];

export const shopProducts = [
  {
    id: "mandala-01",
    name: "Mandala Aurora",
    description: "Equilíbrio e serenidade para espaços sagrados.",
    price: "R$ 120,00",
    image: "/placeholders/placeholder-card.svg"
  },
  {
    id: "mandala-02",
    name: "Mandala Lua Nova",
    description: "Detalhes dourados para elevar a energia do ambiente.",
    price: "R$ 145,00",
    image: "/placeholders/placeholder-card.svg"
  },
  {
    id: "mandala-03",
    name: "Mandala Essência",
    description: "Arte manual que conecta intenção e presença.",
    price: "R$ 160,00",
    image: "/placeholders/placeholder-card.svg"
  }
];

export const footerLinks = [
  { label: "Home", to: "/" },
  { label: "Agenda", to: "/agenda" },
  { label: "Gravadas", to: "/gravadas" },
  { label: "Loja", to: "/loja" },
  { label: "Contato", to: "/contato" }
];

export const contactInfo = {
  email: "contato@caminhodoser.com",
  phone: "+55 (11) 99999-0000"
};

export const defaultSiteConfig = {
  assets: {
    homeHero: "/placeholders/placeholder-card.svg",
    categories: {
      "aulas-curtas": "/placeholders/placeholder-card.svg",
      iniciantes: "/placeholders/placeholder-card.svg",
      invertidas: "/placeholders/placeholder-card.svg"
    },
    plans: {
      group: "/placeholders/placeholder-card.svg",
      personal: "/placeholders/placeholder-card.svg"
    }
  },
  pricingGroup: [
    { period: "Anual", one: "R$ 120,00", two: "R$ 192,00" },
    { period: "Semestral", one: "R$ 127,00", two: "R$ 204,00" },
    { period: "Trimestral", one: "R$ 135,00", two: "R$ 216,00" },
    { period: "Mensal", one: "R$ 150,00", two: "R$ 240,00" }
  ],
  pricingPersonal: [
    { label: "Aula avulsa", value: "R$ 110,00" },
    { label: "Pacote com 4 aulas", value: "R$ 396,00" },
    { label: "Pacote com 8 aulas", value: "R$ 748,00" }
  ]
};

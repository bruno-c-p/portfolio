export type Lang = "en" | "pt-BR";

export const COPY = {
  en: {
    document_title: "Bruno Cardozo",
    description:
      "Full-stack engineer in Santa Catarina. I work on ecommerce and AI at Frengee, the marketplace behind the world's #1 powersports brand.",
    wordmark_aria: "Bruno Cardozo, back to top",
    skip_to_content: "Skip to content",
    language_label: "Language",
    lang_en: "EN",
    lang_pt: "PT",
    rail_role: "Full-stack engineer",
    rail_place: "Santa Catarina, Brazil",
    nav_about: "About",
    nav_work: "Work",
    nav_projects: "Projects",
    nav_contact: "Contact",
    hero_title: "I build the layer under the product.",
    hero_lede:
      "Five years in ecommerce and ERPs, now AI at work. I take a feature from the first sketch to production. If it's slow, I make it fast.",
    photo_caption: "At Frengee, walking through a new flow.",
    portrait_alt: "Bruno Cardozo presenting at Frengee",
    about_title: "About",
    about_one:
      "Most of my day is backend. Schemas, queues, APIs. The stretch from a bottleneck to something you can ship. React and TypeScript on the client. Node and Postgres behind it.",
    about_two:
      "At Frengee I lead product qualification with LLMs, matching a heavy catalog into Shopify categories. Before that I cut a pipeline from fifteen minutes to under one. At Wise I took endpoints that ran for minutes down to 800ms.",
    stack_label: "DAY to DAY",
    ai_tools_label: "AI TOOLS",
    work_title: "Work",
    work_frengee_period: "2025 to now",
    work_frengee_role: "Software engineer",
    work_frengee_place: "Los Angeles · remote",
    work_frengee_desc:
      "I work on Frengee's global ecommerce, the system behind the world's #1 powersports brand, over $1B a year in transactions. I shipped parts of three new market launches. Shopify price and inventory used to update one by one and the queues fell over, so I rebuilt that as bulk sync. Now I'm on AI category matching.",
    work_frengee_stat1: "new markets",
    work_frengee_stat2: "catalog pipeline",
    work_frengee_stat3: "platform",
    work_wise_period: "2022 to 2025",
    work_wise_role: "Software engineer",
    work_wise_place: "Curitiba · remote",
    work_wise_desc:
      "I built the APIs the business actually hits. New Postgres schemas, AWS queues, and a rewrite of Hibernate access that had been timing out in production. Endpoints that took six minutes now return in 800ms. That later made room for a 20% jump in active customers.",
    work_wise_stat1: "from 6+ minutes",
    work_wise_stat2: "requests / day",
    work_wise_stat3: "uptime",
    work_projedata_period: "2021 to 2022",
    work_projedata_role: "Software engineer",
    work_projedata_place: "Tubarão · remote",
    work_projedata_desc:
      "I helped take Iniflex off the desktop. Twenty years of ERP for plastics plants in Brazil and Latin America, now a web app. I wrote the Java backend and the PL/SQL that moved manufacturing, inventory, and finance records without stopping the shop floor.",
    work_projedata_stat1: "web platform",
    work_projedata_stat2: "records lost",
    projects_title: "Projects",
    project_link: "View on GitHub",
    project_orchestrate_kind: "Agent skill · 2026",
    project_orchestrate_desc:
      "The main agent talks to you and is the one that says the work is done. A sub-agent gets one job and the files it may touch. It does not merge. It does not deploy. It does not pick up extra files. I wrote the same skill for Codex, Grok, Claude, Cursor, OpenCode, and Gemini.",
    project_bstack_kind: "Agent skill · 2026",
    project_bstack_desc:
      "Playbooks for coding agents that prefer a small diff and a real check at the end. Not a model. Not a host. Skills any agent that reads SKILL.md can load. how, why, architect, tdd, unslop, verify.",
    project_theme_kind: "VS Code theme · 2025",
    project_theme_desc:
      "A dark VS Code theme with cool and warm hues from Western landscapes. I was tired of editors that look like a gaming PC. I wanted evening light.",
    contact_title: "Contact",
    contact_lede: "If a system is buckling, or you have a product to ship, write to me.",
    contact_email: "dev@brunocardozo.com.br",
    contact_linkedin: "LinkedIn",
    contact_github: "GitHub",
    contact_cv: "Download CV",
    footer_note: "Based in Santa Catarina. Working remotely.",
  },
  "pt-BR": {
    document_title: "Bruno Cardozo",
    description:
      "Engenheiro full stack em Santa Catarina. Trabalho com e-commerce e IA na Frengee, o marketplace da maior marca de powersports do mundo.",
    wordmark_aria: "Bruno Cardozo, voltar ao topo",
    skip_to_content: "Ir para o conteúdo",
    language_label: "Idioma",
    lang_en: "EN",
    lang_pt: "PT",
    rail_role: "Engenheiro full stack",
    rail_place: "Santa Catarina, Brasil",
    nav_about: "Sobre",
    nav_work: "Trabalho",
    nav_projects: "Projetos",
    nav_contact: "Contato",
    hero_title: "Eu construo a camada debaixo do produto.",
    hero_lede:
      "Cinco anos em e-commerce e ERPs, agora IA no trabalho. Eu pego uma feature do primeiro rascunho até produção. Se está lento, eu deixo rápido.",
    photo_caption: "Na Frengee, apresentando um fluxo novo.",
    portrait_alt: "Bruno Cardozo apresentando na Frengee",
    about_title: "Sobre",
    about_one:
      "A maior parte do meu dia é backend. Schemas, filas, APIs. O trecho de um gargalo até algo que dá para publicar. React e TypeScript no cliente. Node e Postgres atrás.",
    about_two:
      "Na Frengee eu lidero qualificação de produtos com LLMs, encaixando um catálogo pesado em categorias do Shopify. Antes, um pipeline de quinze minutos passou a menos de um. Na Wise, endpoints que levavam minutos passaram a 800ms.",
    stack_label: "DIA a DIA",
    ai_tools_label: "FERRAMENTAS de IA",
    work_title: "Trabalho",
    work_frengee_period: "2025 até agora",
    work_frengee_role: "Engenheiro de software",
    work_frengee_place: "Los Angeles · remoto",
    work_frengee_desc:
      "Trabalho no e-commerce global da Frengee, o sistema da maior marca de powersports do mundo, mais de US$ 1 bi em transações por ano. Entreguei partes do lançamento em três mercados novos. Preço e estoque no Shopify iam um a um e as filas caíram, então reconstruí isso em sync em massa. Agora estou no matching de categorias com IA.",
    work_frengee_stat1: "novos mercados",
    work_frengee_stat2: "pipeline do catálogo",
    work_frengee_stat3: "plataforma",
    work_wise_period: "2022 a 2025",
    work_wise_role: "Engenheiro de software",
    work_wise_place: "Curitiba · remoto",
    work_wise_desc:
      "Construí as APIs que o negócio de fato usa. Schemas novos no Postgres, filas na AWS, e uma reescrita do Hibernate que estava estourando timeout em produção. Endpoint de seis minutos agora responde em 800ms. Depois isso abriu espaço para um salto de 20% na base ativa.",
    work_wise_stat1: "de 6+ minutos",
    work_wise_stat2: "requisições / dia",
    work_wise_stat3: "uptime",
    work_projedata_period: "2021 a 2022",
    work_projedata_role: "Engenheiro de software",
    work_projedata_place: "Tubarão · remoto",
    work_projedata_desc:
      "Ajudei a tirar o Iniflex do desktop. Um ERP de vinte anos para plantas de plásticos no Brasil e na América Latina, hoje web. Escrevi o Java no backend e o PL/SQL que levou manufatura, estoque e financeiro sem parar o chão de fábrica.",
    work_projedata_stat1: "plataforma web",
    work_projedata_stat2: "registros perdidos",
    projects_title: "Projetos",
    project_link: "Ver no GitHub",
    project_orchestrate_kind: "Skill de agente · 2026",
    project_orchestrate_desc:
      "O agente principal fala com você e é quem diz que o trabalho acabou. Um sub-agente ganha uma tarefa e os arquivos que pode tocar. Não faz merge. Não faz deploy. Não pega arquivo extra. Escrevi a mesma skill para Codex, Grok, Claude, Cursor, OpenCode e Gemini.",
    project_bstack_kind: "Skill de agente · 2026",
    project_bstack_desc:
      "Playbooks para agentes de código que preferem um diff pequeno e uma prova no final. Não é modelo. Não é host. Skills que qualquer agente que lê SKILL.md consegue carregar. how, why, architect, tdd, unslop, verify.",
    project_theme_kind: "Tema do VS Code · 2025",
    project_theme_desc:
      "Um tema escuro de VS Code com tons frios e quentes de paisagens do Velho Oeste. Eu estava cansado de editor com cara de PC gamer. Queria luz de fim de tarde.",
    contact_title: "Contato",
    contact_lede: "Se um sistema está engasgando, ou você tem um produto para lançar, me escreve.",
    contact_email: "dev@brunocardozo.com.br",
    contact_linkedin: "LinkedIn",
    contact_github: "GitHub",
    contact_cv: "Baixar currículo",
    footer_note: "Moro em Santa Catarina. Trabalho remoto.",
  },
} as const;

export type Copy = (typeof COPY)[Lang];
export type CopyKey = keyof Copy;

export type WorkStat = {
  value: string;
  label: CopyKey;
};

export type WorkItem = {
  name: string;
  period: CopyKey;
  role: CopyKey;
  place: CopyKey;
  desc: CopyKey;
  stats: WorkStat[];
};

export const WORK: WorkItem[] = [
  {
    name: "Frengee",
    period: "work_frengee_period",
    role: "work_frengee_role",
    place: "work_frengee_place",
    desc: "work_frengee_desc",
    stats: [
      { value: "3", label: "work_frengee_stat1" },
      { value: "15m → 1m", label: "work_frengee_stat2" },
      { value: "$1B+", label: "work_frengee_stat3" },
    ],
  },
  {
    name: "Wise",
    period: "work_wise_period",
    role: "work_wise_role",
    place: "work_wise_place",
    desc: "work_wise_desc",
    stats: [
      { value: "800ms", label: "work_wise_stat1" },
      { value: "90k", label: "work_wise_stat2" },
      { value: "99.9%", label: "work_wise_stat3" },
    ],
  },
  {
    name: "Projedata",
    period: "work_projedata_period",
    role: "work_projedata_role",
    place: "work_projedata_place",
    desc: "work_projedata_desc",
    stats: [
      { value: "100%", label: "work_projedata_stat1" },
      { value: "0", label: "work_projedata_stat2" },
    ],
  },
];

export type ProjectItem = {
  name: string;
  kind: CopyKey;
  desc: CopyKey;
  href: string;
  tags: readonly string[];
};

export const PROJECTS: ProjectItem[] = [
  {
    name: "Orchestrate",
    kind: "project_orchestrate_kind",
    desc: "project_orchestrate_desc",
    href: "https://github.com/bruno-c-p/orchestrate",
    tags: ["Codex", "Grok", "Claude", "Cursor", "OpenCode", "Gemini"],
  },
  {
    name: "bstack",
    kind: "project_bstack_kind",
    desc: "project_bstack_desc",
    href: "https://github.com/bruno-c-p/bstack",
    tags: ["how", "why", "architect", "tdd", "unslop", "verify"],
  },
  {
    name: "Wild West Vibes",
    kind: "project_theme_kind",
    desc: "project_theme_desc",
    href: "https://github.com/bruno-c-p/wild-west-vibes-theme",
    tags: ["VS Code", "theme"],
  },
];

export const STACK = [
  "TypeScript",
  "React",
  "Node.js",
  "NestJS",
  "PostgreSQL",
  "MongoDB",
  "GraphQL",
  "Redis",
  "GCP",
  "AWS",
  "Kubernetes",
  "Shopify",
] as const;

export const AI_TOOLS = [
  "Grok",
  "GrokBot",
  "Claude Code",
  "Codex",
  "Cursor",
  "OpenCode",
] as const;

export const LINKS = {
  email: "mailto:dev@brunocardozo.com.br",
  linkedin: "https://www.linkedin.com/in/bruno-cardozo-pereira/",
  github: "https://github.com/bruno-c-p",
  cv: "/bruno-cardozo.pdf",
} as const;

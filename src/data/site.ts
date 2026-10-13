// All visible content, in English and Brazilian Portuguese.
// Sources: the current brunocardozo.com.br copy and Bruno's CV (bruno-cardozo.pdf).
// Nothing here is invented. Things the owner should confirm are listed in README.md:
//   - Exact month spans come from the CV (Projedata 04-2021 to 04-2022, Wise 05-2022 to 02-2025,
//     Frengee 03-2025 to now).
//   - The one-by-one vs bulk figure and the record grid are labeled as illustrations.

export type Lang = 'en' | 'pt';
export const langs: Lang[] = ['en', 'pt'];
type T = Record<Lang, string>;

export const site = {
  name: 'Bruno Cardozo',
  url: 'https://www.brunocardozo.com.br',
  email: 'dev@brunocardozo.com.br',
  linkedin: 'https://www.linkedin.com/in/bruno-cardozo-pereira/',
  github: 'https://github.com/bruno-c-p',
  cv: '/bruno-cardozo.pdf',
  timezone: 'America/Sao_Paulo',
};

/** Decimal years for the trace axis. */
export const axis = { from: 2021, to: 2027 };

export type Figure =
  | { kind: 'compare'; title: T; before: { ms: number; label: T }; after: { ms: number; label: T }; note: T }
  | { kind: 'batch'; title: T; slow: T; fast: T; note: T }
  | { kind: 'records'; title: T; note: T }
  | { kind: 'migration'; title: T; desktop: T; web: T; readout: T; note: T };

export type Job = {
  slug: string;
  name: string;
  start: number; // decimal year
  end: number | null; // null = still running
  period: T;
  role: T;
  place: T;
  result: T; // one line on the trace row
  summary: T;
  problem: T;
  work: T;
  outcome: T;
  stats: { value: string | T; label: T }[];
  figures: Figure[];
  stack: string[];
  description: T; // meta description
  headline: T; // page title: what the work was
};

export const jobs: Job[] = [
  {
    slug: 'projedata',
    name: 'Projedata',
    start: 2021 + 3 / 12,
    end: 2022 + 3 / 12,
    period: { en: 'Apr 2021 to Apr 2022', pt: 'abr 2021 a abr 2022' },
    role: { en: 'Software engineer', pt: 'Engenheiro de software' },
    place: { en: 'Tubarão, remote', pt: 'Tubarão, remoto' },
    result: { en: '0 records lost', pt: '0 registros perdidos' },
    summary: {
      en: 'I helped take Iniflex, a twenty-year-old ERP for plastics plants in Brazil and Latin America, off the desktop and onto the web.',
      pt: 'Ajudei a tirar o Iniflex do desktop e levar para a web: um ERP de vinte anos para fábricas de plástico no Brasil e na América Latina.',
    },
    problem: {
      en: 'Iniflex is the heart of the companies that run it. Manufacturing, inventory and finance all live there. Moving it to the web meant moving their records too, without stopping a shop floor.',
      pt: 'O Iniflex é o coração das empresas que rodam nele. Manufatura, estoque e financeiro moram ali. Levar para a web era levar os registros junto, sem parar o chão de fábrica.',
    },
    work: {
      en: 'I wrote Java backend components for the new web platform, and the PL/SQL that carried manufacturing, inventory and financial records across. I worked inside a mixed agile team, so the web app matched how plastics plants actually operate.',
      pt: 'Escrevi componentes Java do backend da nova plataforma web e o PL/SQL que levou os registros de manufatura, estoque e financeiro. Trabalhei num time ágil multidisciplinar, para a aplicação web bater com o jeito que as fábricas de plástico operam de verdade.',
    },
    outcome: {
      en: 'Iniflex became a fully web-based platform. Thousands of critical records moved over and every one of them arrived.',
      pt: 'O Iniflex virou uma plataforma 100% web. Milhares de registros críticos migraram e todos chegaram.',
    },
    stats: [
      { value: '0', label: { en: 'records lost in the migration', pt: 'registros perdidos na migração' } },
    ],
    figures: [
      {
        kind: 'migration',
        title: { en: 'Twenty years of desktop, one year to move', pt: 'Vinte anos de desktop, um ano para mudar' },
        desktop: { en: 'Iniflex on the desktop', pt: 'Iniflex no desktop' },
        web: { en: 'On the web', pt: 'Na web' },
        readout: { en: 'records lost at cutover', pt: 'registros perdidos na virada' },
        note: {
          en: 'Approximate scale: the desktop span covers the 20+ years Iniflex ran before the move; the web span is my year on it, Apr 2021 to Apr 2022.',
          pt: 'Escala aproximada: o trecho do desktop cobre os 20+ anos do Iniflex antes da mudança; o trecho web é o meu ano nele, abr 2021 a abr 2022.',
        },
      },
    ],
    stack: ['Java', 'PL/SQL', 'OracleDB', 'JavaScript'],
    headline: { en: 'Iniflex ERP, desktop to web', pt: 'ERP Iniflex, do desktop para a web' },
    description: {
      en: 'Projedata, 2021 to 2022: Bruno Cardozo on moving Iniflex, a twenty-year-old plastics ERP, from desktop to web with zero records lost.',
      pt: 'Projedata, 2021 a 2022: Bruno Cardozo levando o Iniflex, um ERP de plásticos com vinte anos, do desktop para a web sem perder registros.',
    },
  },
  {
    slug: 'wise',
    name: 'Wise',
    start: 2022 + 4 / 12,
    end: 2025 + 1 / 12,
    period: { en: 'May 2022 to Feb 2025', pt: 'mai 2022 a fev 2025' },
    role: { en: 'Software engineer', pt: 'Engenheiro de software' },
    place: { en: 'Curitiba, remote', pt: 'Curitiba, remoto' },
    result: { en: '6 min to 800 ms', pt: '6 min para 800 ms' },
    summary: {
      en: 'I built the APIs the business runs on, and made the slowest of them answer in 800 ms instead of six minutes.',
      pt: 'Construí as APIs em que o negócio roda, e fiz a mais lenta delas responder em 800 ms em vez de seis minutos.',
    },
    problem: {
      en: 'Several key endpoints sat on Hibernate access patterns that kept timing out in production. The worst of them took more than six minutes to answer a single request.',
      pt: 'Vários endpoints importantes dependiam de padrões de acesso do Hibernate que estouravam timeout em produção. O pior deles levava mais de seis minutos para responder uma única requisição.',
    },
    work: {
      en: 'I rewrote that data access. I designed new Postgres schemas from scratch for new product features, ran the AWS messaging between services on SQS and SNS, and later led the re-architecture of a core module.',
      pt: 'Reescrevi esse acesso a dados. Modelei schemas novos no Postgres do zero para features novas, cuidei da mensageria na AWS entre serviços com SQS e SNS, e depois liderei a rearquitetura de um módulo central.',
    },
    outcome: {
      en: 'The six-minute endpoint answers in 800 ms. The APIs carried more than 90,000 requests a day at 99.9% uptime, and the new module made room for the 20% jump in active customers that followed.',
      pt: 'O endpoint de seis minutos responde em 800 ms. As APIs passaram de 90 mil requisições por dia com 99,9% de uptime, e o módulo novo abriu espaço para o salto de 20% na base ativa que veio depois.',
    },
    stats: [
      { value: '800 ms', label: { en: 'from 6+ minutes', pt: 'antes 6+ minutos' } },
      { value: '90k', label: { en: 'requests a day', pt: 'requisições por dia' } },
      { value: '99.9%', label: { en: 'uptime', pt: 'uptime' } },
      { value: '20%+', label: { en: 'more active customers, after', pt: 'mais clientes ativos, depois' } },
    ],
    figures: [
      {
        kind: 'compare',
        title: { en: 'One endpoint, same data', pt: 'Um endpoint, os mesmos dados' },
        before: { ms: 360000, label: { en: 'Before the rewrite', pt: 'Antes da reescrita' } },
        after: { ms: 800, label: { en: 'After', pt: 'Depois' } },
        note: {
          en: 'To scale. At this width, 800 ms is about the thickness of a line.',
          pt: 'Em escala. Nessa largura, 800 ms tem mais ou menos a espessura de uma linha.',
        },
      },
    ],
    stack: ['Node.js', 'TypeScript', 'Java', 'PostgreSQL', 'Redis', 'AWS SQS', 'AWS SNS', 'S3', 'Docker', 'Sentry', 'React'],
    headline: { en: 'a six-minute endpoint at 800 ms', pt: 'um endpoint de seis minutos em 800 ms' },
    description: {
      en: 'Wise, 2022 to 2025: how Bruno Cardozo took a six-minute endpoint to 800 ms and kept APIs at 90k requests a day with 99.9% uptime.',
      pt: 'Wise, 2022 a 2025: como Bruno Cardozo levou um endpoint de seis minutos para 800 ms e manteve APIs com 90 mil requisições por dia.',
    },
  },
  {
    slug: 'frengee',
    name: 'Frengee',
    start: 2025 + 2 / 12,
    end: null,
    period: { en: 'Mar 2025 to now', pt: 'mar 2025 até agora' },
    role: { en: 'Software engineer', pt: 'Engenheiro de software' },
    place: { en: 'Los Angeles, remote', pt: 'Los Angeles, remoto' },
    result: { en: '15 min to under 1 min', pt: '15 min para menos de 1 min' },
    summary: {
      en: 'I work on the global ecommerce platform behind the world’s #1 powersports brand, more than $1B a year in transactions.',
      pt: 'Trabalho na plataforma global de e-commerce da maior marca de powersports do mundo, mais de US$ 1 bi por ano em transações.',
    },
    problem: {
      en: 'Price and inventory for tens of thousands of products went to Shopify one update at a time. At volume, those messages flooded the RabbitMQ queues and dragged the whole system down. A heavily used core feature also took fifteen minutes to process its data.',
      pt: 'Preço e estoque de dezenas de milhares de produtos iam para o Shopify uma atualização por vez. Com volume, essas mensagens afogavam as filas do RabbitMQ e derrubavam o sistema inteiro. Uma feature central muito usada também levava quinze minutos para processar os dados.',
    },
    work: {
      en: 'I designed and built a separate bulk sync service that sends price and inventory to Shopify in batches. I reworked the slow feature’s processing and its caching. I built features for three new international markets. Now I lead product qualification with LLMs, matching a heavy catalog into Shopify categories.',
      pt: 'Desenhei e construí um serviço separado de sync em massa que manda preço e estoque para o Shopify em lotes. Refiz o processamento e o cache da feature lenta. Construí features para três mercados internacionais novos. Agora lidero a qualificação de produtos com LLMs, encaixando um catálogo pesado nas categorias do Shopify.',
    },
    outcome: {
      en: 'The queues stopped falling over. The fifteen-minute job runs in under a minute, about 93% faster. The platform launched in three new markets.',
      pt: 'As filas pararam de cair. O processo de quinze minutos roda em menos de um, cerca de 93% mais rápido. A plataforma abriu em três mercados novos.',
    },
    stats: [
      { value: '< 1 min', label: { en: 'from 15 minutes', pt: 'antes 15 minutos' } },
      { value: '3', label: { en: 'new markets', pt: 'mercados novos' } },
      { value: '$1B+', label: { en: 'a year through the platform', pt: 'por ano pela plataforma' } },
    ],
    figures: [
      {
        kind: 'batch',
        title: { en: 'Price and inventory to Shopify', pt: 'Preço e estoque para o Shopify' },
        slow: { en: 'One by one', pt: 'Um a um' },
        fast: { en: 'Bulk sync', pt: 'Sync em massa' },
        note: {
          en: 'Illustration, not to scale. Every product used to be its own message on the queue.',
          pt: 'Ilustração, fora de escala. Cada produto era uma mensagem própria na fila.',
        },
      },
      {
        kind: 'compare',
        title: { en: 'The core feature’s data processing', pt: 'O processamento da feature central' },
        before: { ms: 900000, label: { en: 'Before', pt: 'Antes' } },
        after: { ms: 60000, label: { en: 'After, under a minute', pt: 'Depois, menos de um minuto' } },
        note: {
          en: 'To scale, with the after bar drawn at its one-minute ceiling.',
          pt: 'Em escala, com a barra de depois no teto de um minuto.',
        },
      },
    ],
    stack: ['TypeScript', 'NestJS', 'Node.js', 'React', 'PostgreSQL', 'MongoDB', 'RabbitMQ', 'Redis', 'GraphQL', 'Shopify', 'GCP', 'Kubernetes', 'ArgoCD', 'Elasticsearch'],
    headline: { en: 'bulk Shopify sync and three new markets', pt: 'sync em massa e três mercados novos' },
    description: {
      en: 'Frengee, 2025 to now: Bruno Cardozo on bulk Shopify sync, a fifteen-minute job cut to under one, three new markets and LLM category matching.',
      pt: 'Frengee, 2025 até agora: Bruno Cardozo no sync em massa com o Shopify, um processo de quinze minutos em menos de um e matching com LLMs.',
    },
  },
];

export const projects = [
  {
    name: 'Wild West Vibes',
    kind: { en: 'VS Code theme', pt: 'Tema de VS Code' },
    year: '2025',
    readout: { en: '12 stars on GitHub', pt: '12 estrelas no GitHub' },
    count: 12,
    href: 'https://github.com/bruno-c-p/wild-west-vibes-theme',
    desc: {
      en: 'A dark theme with the cool and warm hues of Western landscapes. I was tired of editors that look like a gaming PC and wanted evening light. Its palette is the one you are reading now.',
      pt: 'Um tema escuro com os tons frios e quentes das paisagens do Velho Oeste. Cansei de editor com cara de PC gamer e queria luz de fim de tarde. A paleta dele é a que você está lendo agora.',
    },
  },
];

export const stackDaily = ['TypeScript', 'React', 'Node.js', 'NestJS', 'PostgreSQL', 'MongoDB', 'GraphQL', 'Redis', 'GCP', 'AWS', 'Kubernetes', 'Shopify'];
export const stackAI = ['Claude Code', 'Codex', 'Cursor', 'OpenCode', 'Grok'];

export const copy = {
  en: {
    htmlLang: 'en',
    title: 'Bruno Cardozo, full-stack engineer',
    description: 'Full-stack engineer in Santa Catarina, Brazil. Ecommerce and AI at Frengee. I took a six-minute endpoint to 800 ms. If it is slow, I make it fast.',
    skip: 'Skip to content',
    role: 'Full-stack engineer',
    place: 'Santa Catarina, Brazil',
    home: 'Bruno Cardozo, home',
    nav: { work: 'Work', projects: 'Projects', about: 'About', contact: 'Contact' },
    menu: 'Menu',
    close: 'Close',
    language: 'Language',
    heroTitle: 'I build the layer under the product.',
    heroLede: 'Full-stack engineer in Santa Catarina, Brazil. Five years in ecommerce and ERPs, now AI at Frengee. If it’s slow, I make it fast.',
    heroSpan: 'Wise, one endpoint',
    heroBefore: 'before the rewrite',
    heroDuring: 'running the rewrite',
    heroAfter: 'after the rewrite',
    heroHint: 'Scroll to run the rewrite ↓',
    heroStatic: 'After the rewrite, the same endpoint answers in 800 ms.',
    realTime: 'real time',
    workTitle: 'Work',
    workLede: 'Five years on one axis, to scale. Each span opens its case.',
    now: 'now',
    running: 'still running',
    open: 'Open case',
    projectsTitle: 'Off the clock',
    projectsLede: 'Built after hours, for the way I work.',
    projectLink: 'View on GitHub',
    aboutTitle: 'About',
    aboutOne: 'Most of my day is backend. Schemas, queues, APIs: the stretch between a bottleneck and something you can ship. React and TypeScript on the client, Node and Postgres behind it.',
    aboutTwo: 'I like the part of the work nobody sees until it breaks, and I like owning a feature from the first sketch to production. These days that includes LLMs, where the hard part is still the data.',
    portraitAlt: 'Bruno Cardozo standing in a glass-walled office at Frengee, hands clasped, mid-presentation',
    portraitCaption: 'At Frengee, walking through a new flow.',
    daily: 'Day to day',
    ai: 'AI tools',
    school: 'Studies',
    schoolItems: ['Full-stack postgraduate, Rocketseat, 2025', 'Information Systems, UNIBAVE, 2020 to 2023'],
    studyTrace: [
      { name: 'UNIBAVE', what: 'BSc, Information Systems', start: 2020 + 1 / 12, end: 2024 },
      { name: 'Rocketseat', what: 'Postgraduate, full stack', start: 2025, end: 2026 },
    ],
    languages: 'Languages',
    languageItems: ['Portuguese, native', 'English, advanced'],
    contactTitle: 'Write to me.',
    contactLede: 'If a system is buckling, or you have a product to ship, I’d like to hear about it.',
    cv: 'Download CV',
    localTime: 'Local time in Santa Catarina',
    loadedIn: 'First paint on your connection',
    colophon: 'Set in Archivo and JetBrains Mono. Colors from Wild West Vibes, my VS Code theme. Built with Astro and GSAP.',
    caseProblem: 'The problem',
    caseWork: 'What I did',
    caseOutcome: 'What changed',
    caseNumbers: 'The numbers',
    caseStack: 'Stack',
    caseNext: 'Next span',
    caseBack: 'All work',
    notFoundTitle: 'Nothing ran here.',
    notFoundText: 'This path never got a response. The work is one request away.',
    notFoundBack: 'Back to the start',
  },
  pt: {
    htmlLang: 'pt-BR',
    title: 'Bruno Cardozo, engenheiro full stack',
    description: 'Engenheiro full stack em Santa Catarina. E-commerce e IA na Frengee. Levei um endpoint de seis minutos para 800 ms. Se está lento, eu deixo rápido.',
    skip: 'Ir para o conteúdo',
    role: 'Engenheiro full stack',
    place: 'Santa Catarina, Brasil',
    home: 'Bruno Cardozo, início',
    nav: { work: 'Trabalho', projects: 'Projetos', about: 'Sobre', contact: 'Contato' },
    menu: 'Menu',
    close: 'Fechar',
    language: 'Idioma',
    heroTitle: 'Eu construo a camada debaixo do produto.',
    heroLede: 'Engenheiro full stack em Santa Catarina. Cinco anos em e-commerce e ERPs, agora IA na Frengee. Se está lento, eu deixo rápido.',
    heroSpan: 'Wise, um endpoint',
    heroBefore: 'antes da reescrita',
    heroDuring: 'rodando a reescrita',
    heroAfter: 'depois da reescrita',
    heroHint: 'Role para rodar a reescrita ↓',
    heroStatic: 'Depois da reescrita, o mesmo endpoint responde em 800 ms.',
    realTime: 'tempo real',
    workTitle: 'Trabalho',
    workLede: 'Cinco anos num eixo só, em escala. Cada trecho abre o seu caso.',
    now: 'agora',
    running: 'em andamento',
    open: 'Abrir caso',
    projectsTitle: 'Fora do expediente',
    projectsLede: 'Feito fora do expediente, para o meu jeito de trabalhar.',
    projectLink: 'Ver no GitHub',
    aboutTitle: 'Sobre',
    aboutOne: 'A maior parte do meu dia é backend. Schemas, filas, APIs: o trecho entre um gargalo e algo que dá para publicar. React e TypeScript no cliente, Node e Postgres atrás.',
    aboutTwo: 'Gosto da parte do trabalho que ninguém vê até quebrar, e gosto de ser dono de uma feature do primeiro rascunho até produção. Hoje isso inclui LLMs, onde a parte difícil continua sendo o dado.',
    portraitAlt: 'Bruno Cardozo em pé num escritório de vidro na Frengee, mãos juntas, no meio de uma apresentação',
    portraitCaption: 'Na Frengee, apresentando um fluxo novo.',
    daily: 'Dia a dia',
    ai: 'Ferramentas de IA',
    school: 'Estudos',
    schoolItems: ['Pós-graduação full stack, Rocketseat, 2025', 'Sistemas de Informação, UNIBAVE, 2020 a 2023'],
    studyTrace: [
      { name: 'UNIBAVE', what: 'Bacharelado, Sistemas de Informação', start: 2020 + 1 / 12, end: 2024 },
      { name: 'Rocketseat', what: 'Pós-graduação, full stack', start: 2025, end: 2026 },
    ],
    languages: 'Idiomas',
    languageItems: ['Português, nativo', 'Inglês, avançado'],
    contactTitle: 'Me escreve.',
    contactLede: 'Se um sistema está engasgando, ou você tem um produto para lançar, quero saber.',
    cv: 'Baixar currículo',
    localTime: 'Hora local em Santa Catarina',
    loadedIn: 'Primeira pintura na sua conexão',
    colophon: 'Composto em Archivo e JetBrains Mono. Cores do Wild West Vibes, meu tema de VS Code. Feito com Astro e GSAP.',
    caseProblem: 'O problema',
    caseWork: 'O que eu fiz',
    caseOutcome: 'O que mudou',
    caseNumbers: 'Os números',
    caseStack: 'Stack',
    caseNext: 'Próximo trecho',
    caseBack: 'Todo o trabalho',
    notFoundTitle: 'Nada rodou aqui.',
    notFoundText: 'Este caminho nunca recebeu resposta. O trabalho está a uma requisição daqui.',
    notFoundBack: 'Voltar ao início',
  },
} as const;

export type Copy = (typeof copy)[Lang];

/** Path helpers: EN lives at the root, PT under /pt. */
export const prefix = (lang: Lang) => (lang === 'pt' ? '/pt' : '');
export const homePath = (lang: Lang) => (lang === 'pt' ? '/pt/' : '/');
export const casePath = (lang: Lang, slug: string) => `${prefix(lang)}/work/${slug}/`;
/** The same page in the other language. */
export const altPath = (path: string, to: Lang) => {
  const bare = path.replace(/^\/pt(\/|$)/, '/');
  return to === 'pt' ? `/pt${bare === '/' ? '/' : bare}` : bare;
};

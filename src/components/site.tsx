import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/language";
import { LINKS, AI_TOOLS, PROJECTS, STACK, WORK, type ProjectItem, type WorkItem } from "@/lib/site-copy";

export function Site() {
  const { lang, copy, setLang } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <div className="shell" id="top">
      <a className="skip-link" href="#main">
        {copy.skip_to_content}
      </a>

      <aside className="rail">
        <div className="rail-top">
          <div>
            <a className="wordmark" href="#top" aria-label={copy.wordmark_aria}>
              Bruno Cardozo
            </a>
            <p className="rail-meta">
              {copy.rail_role}
              <br />
              {copy.rail_place}
            </p>
          </div>
        </div>

        <nav className="rail-nav" aria-label="Primary">
          <a href="#about">{copy.nav_about}</a>
          <a href="#work">{copy.nav_work}</a>
          <a href="#projects">{copy.nav_projects}</a>
          <a href="#contact">{copy.nav_contact}</a>
        </nav>

        <div className="rail-foot">
          <div className="lang" role="group" aria-label={copy.language_label}>
            <button
              type="button"
              aria-pressed={lang === "en"}
              onClick={() => setLang("en")}
            >
              {copy.lang_en}
            </button>
            <button
              type="button"
              aria-pressed={lang === "pt-BR"}
              onClick={() => setLang("pt-BR")}
            >
              {copy.lang_pt}
            </button>
          </div>
          <a className="rail-mail" href={LINKS.email}>
            {copy.contact_email}
          </a>
        </div>
      </aside>

      <div className="canvas">
        <main id="main">
          <section className="hero" aria-labelledby="page-title">
            <div>
              <h1 id="page-title">{copy.hero_title}</h1>
              <p className="lede">{copy.hero_lede}</p>
            </div>
            <figure className="still">
              <Portrait alt={copy.portrait_alt} />
              <figcaption>{copy.photo_caption}</figcaption>
            </figure>
          </section>

          <section className="block" id="about" aria-labelledby="about-title">
            <h2 id="about-title">{copy.about_title}</h2>
            <div className="about-copy">
              <p>{copy.about_one}</p>
              <p>{copy.about_two}</p>
            </div>
            <div className="stack">
              <p className="stack-label">{copy.stack_label}</p>
              <ul className="stack-list">
                {STACK.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="stack">
              <p className="stack-label">{copy.ai_tools_label}</p>
              <ul className="stack-list">
                {AI_TOOLS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="block" id="work" aria-labelledby="work-title">
            <h2 id="work-title">{copy.work_title}</h2>
            <ol className="jobs">
              {WORK.map((item) => (
                <Job key={item.name} item={item} />
              ))}
            </ol>
          </section>

          <section className="block" id="projects" aria-labelledby="projects-title">
            <h2 id="projects-title">{copy.projects_title}</h2>
            <ol className="projects">
              {PROJECTS.map((item) => (
                <Project key={item.name} item={item} />
              ))}
            </ol>
          </section>

          <section className="block" id="contact" aria-labelledby="contact-title">
            <h2 id="contact-title">{copy.contact_title}</h2>
            <p className="contact-lede">{copy.contact_lede}</p>
            <a className="contact-mail" href={LINKS.email}>
              {copy.contact_email}
            </a>
            <nav className="contact-row" aria-label={copy.contact_title}>
              <a href={LINKS.linkedin} target="_blank" rel="noreferrer">
                {copy.contact_linkedin}
              </a>
              <a href={LINKS.github} target="_blank" rel="noreferrer">
                {copy.contact_github}
              </a>
              <a href={LINKS.cv} download="Bruno-Cardozo-CV.pdf">
                {copy.contact_cv}
              </a>
            </nav>
          </section>
        </main>

        <footer className="site-footer">
          <p>
            © {year} Bruno Cardozo. {copy.footer_note}
          </p>
        </footer>
      </div>
    </div>
  );
}

function Portrait({ alt }: { alt: string }) {
  return (
    <div className="still-frame">
      <picture>
        <source type="image/webp" srcSet="/portrait.webp" />
        <img
          className="still-photo"
          src="/portrait.jpg"
          alt={alt}
          width={640}
          height={869}
          fetchPriority="high"
          decoding="sync"
        />
      </picture>
    </div>
  );
}

function Job({ item }: { item: WorkItem }) {
  const { copy } = useLanguage();

  return (
    <li className="job">
      <p className="job-when">
        <span>{copy[item.period]}</span>
        <span>{copy[item.place]}</span>
      </p>
      <div className="job-body">
        <h3>{item.name}</h3>
        <p className="job-role">{copy[item.role]}</p>
        <p className="job-desc">{copy[item.desc]}</p>
        {item.stats.length > 0 ? (
          <dl className="job-stats">
            {item.stats.map((stat) => (
              <div className="stat" key={stat.value}>
                <dt>{stat.value}</dt>
                <dd>{copy[stat.label]}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </li>
  );
}

function Project({ item }: { item: ProjectItem }) {
  const { copy } = useLanguage();

  return (
    <li className="project">
      <h3>{item.name}</h3>
      <p className="project-kind">{copy[item.kind]}</p>
      <p className="project-desc">{copy[item.desc]}</p>
      <ul className="stack-list">
        {item.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <a
        className="job-link"
        href={item.href}
        target="_blank"
        rel="noreferrer"
      >
        {copy.project_link}
        <ArrowUpRight size={16} strokeWidth={2.2} aria-hidden="true" />
      </a>
    </li>
  );
}

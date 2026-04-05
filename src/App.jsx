import { useMemo, useState } from 'react';
import emailjs from '@emailjs/browser';
import './styles/globals.css';
import { I18nProvider, useI18n } from './i18n';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import whatsappLogo from './assets/whatsapp.png';
import { getPortfolioData } from './data/portfolioData';
import { AnimatedSection } from './components/portfolio/AnimatedSection';
import { Navbar } from './components/portfolio/Navbar';
import { SkillBadge } from './components/portfolio/SkillBadge';
import { ProjectCard } from './components/portfolio/ProjectCard';
import { TimelineItem } from './components/portfolio/TimelineItem';
import { Avatar, AvatarFallback } from './components/ui/avatar';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { Separator } from './components/ui/separator';

const SERVICE_ID = 'service_scjga6e';
const TEMPLATE_ID = 'template_ruw1dsg';
const PUBLIC_KEY = 'GVqjI4UVE1BT2-p0M';
const COOLDOWN_MS = 60_000;

function Portfolio() {
  const { t, lang, setLang } = useI18n();
  const { dark, toggle } = useTheme();
  const data = useMemo(() => getPortfolioData({ t, lang }), [t, lang]);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [lastSent, setLastSent] = useState(0);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const onHeroMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setSpotlight({ x, y });
  };

  const onChange = (event) => setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));

  const onSubmit = async (event) => {
    event.preventDefault();
    if (lastSent && Date.now() - lastSent < COOLDOWN_MS) {
      setStatus('error');
      return;
    }

    setStatus('sending');
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          user_name: form.name,
          user_email: form.email,
          message: form.message,
        },
        PUBLIC_KEY
      );

      setStatus('sent');
      setLastSent(Date.now());
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  const whatsappMessage = encodeURIComponent("Bonjour Mohammed, j'ai vu votre portfolio et je souhaiterais vous contacter.");

  return (
    <>
      <Navbar
        items={data.nav}
        labels={data.navLabels}
        onNavigate={scrollTo}
        onToggleLang={() => setLang(lang === 'fr' ? 'en' : 'fr')}
        onToggleTheme={toggle}
        lang={lang}
        dark={dark}
      />

      <main>
        <section
          id="hero"
          className="hero"
          onMouseMove={onHeroMove}
          style={{ '--spotlight-x': `${spotlight.x}%`, '--spotlight-y': `${spotlight.y}%` }}
        >
          <div className="hero__content">
            <p className="hero__availability">{data.hero.available}</p>
            <p className="hero__greeting reveal reveal--1">{data.hero.greeting}</p>
            <h1 className="hero__name reveal reveal--2">{data.name}</h1>
            <p className="hero__tagline reveal reveal--3">{data.hero.roles.join(' · ')}</p>
            <p className="hero__subtitle reveal reveal--4">{data.hero.subtitle}</p>

            <div className="hero__actions reveal reveal--5">
              <Button onClick={() => scrollTo('projects')}>{data.hero.ctaProjects}</Button>
              <Button variant="outline" onClick={() => scrollTo('contact')}>{data.hero.ctaContact}</Button>
              <a className="link-button" href={data.hero.resumeHref} download>{data.hero.ctaDownload}</a>
            </div>

            <div className="hero__stats reveal reveal--6">
              {data.hero.stats.map((item) => (
                <div key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <AnimatedSection id="about" className="section-block">
          <p className="section-index">{data.about.sectionIndex}</p>
          <h2>{data.about.title}</h2>
          <p className="section-subtitle">{data.about.description}</p>

          <div className="about-grid">
            <Card>
              <h3>{data.about.formationTitle}</h3>
              {data.about.formation.map((item) => (
                <div key={item.label} className="list-item">
                  <strong>{item.year}</strong>
                  <p>{item.label}</p>
                  <small>{item.org}</small>
                </div>
              ))}
            </Card>

            <Card>
              <h3>{data.about.languagesTitle}</h3>
              {data.about.languages.map((item) => (
                <div key={item.name} className="list-item">
                  <p>{item.flag} {item.name}</p>
                  <small>{item.level}</small>
                </div>
              ))}
            </Card>

            <Card>
              <h3>{data.about.softSkillsTitle}</h3>
              <div className="badge-wrap">
                {data.about.softSkills.map((item) => <Badge key={item}>{item}</Badge>)}
              </div>
              <Separator />
              <h3>{data.about.interestsTitle}</h3>
              <div className="badge-wrap">
                {data.about.interests.map((item) => <Badge key={item}>{item}</Badge>)}
              </div>
            </Card>
          </div>
        </AnimatedSection>

        <AnimatedSection id="skills" className="section-block section-alt">
          <p className="section-index">{data.skills.sectionIndex}</p>
          <h2>{data.skills.title}</h2>
          <p className="section-subtitle">{data.skills.subtitle}</p>

          <div className="skills-columns">
            {data.skills.categories.map((group) => (
              <Card key={group.category}>
                <h3>{group.label}</h3>
                <div className="skill-grid">
                  {group.skills.map((skill) => <SkillBadge key={skill.name} skill={skill} />)}
                </div>
              </Card>
            ))}
          </div>

          <p className="all-tech-label">{data.skills.allLabel}</p>
          <div className="skill-grid skill-grid--all">
            {data.skills.categories.flatMap((group) => group.skills).map((skill) => (
              <SkillBadge key={`all-${skill.name}`} skill={skill} />
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection id="projects" className="section-block">
          <p className="section-index">{data.projects.sectionIndex}</p>
          <h2>{data.projects.title}</h2>
          <p className="section-subtitle">{data.projects.subtitle}</p>

          <div className="project-grid">
            {data.projects.items.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                labels={{
                  inProgress: data.projects.inProgressLabel,
                  github: data.projects.githubLabel,
                  demo: data.projects.demoLabel,
                }}
              />
            ))}
            <Card className="github-card">
              <h3>{data.projects.githubCta.title}</h3>
              <p>{data.projects.githubCta.subtitle}</p>
              <a
                href="https://github.com/mohammedelmanssouri71-commits/"
                target="_blank"
                rel="noopener noreferrer"
                className="link-button"
              >
                {data.projects.githubCta.button}
              </a>
            </Card>
          </div>
        </AnimatedSection>

        <AnimatedSection id="experience" className="section-block section-alt">
          <p className="section-index">{data.experience.sectionIndex}</p>
          <h2>{data.experience.title}</h2>
          <p className="section-subtitle">{data.experience.subtitle}</p>

          <div className="timeline">
            {data.experience.items.map((item) => (
              <TimelineItem key={item.id} item={item} />
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection id="contact" className="section-block">
          <p className="section-index">{data.contact.sectionIndex}</p>
          <h2>{data.contact.title}</h2>
          <p className="section-subtitle">{data.contact.subtitle}</p>

          <div className="contact-grid">
            <Card>
              <form onSubmit={onSubmit} className="contact-form">
                <input aria-label={data.contact.name} name="name" value={form.name} onChange={onChange} placeholder={data.contact.name} required />
                <input aria-label={data.contact.email} name="email" type="email" value={form.email} onChange={onChange} placeholder={data.contact.email} required />
                <textarea aria-label={data.contact.message} name="message" rows={5} value={form.message} onChange={onChange} placeholder={data.contact.message} required />
                {status === 'error' && <p className="status status--error">⚠️ {data.contact.error}</p>}
                {status === 'sent' && <p className="status status--success">✅ {data.contact.success}</p>}
                <Button type="submit">{status === 'sending' ? data.contact.sending : data.contact.send}</Button>
              </form>
            </Card>

            <Card>
              <Avatar>
                <AvatarFallback>ME</AvatarFallback>
              </Avatar>
              <p>{data.contact.infoEmail}</p>
              <p>{data.contact.infoPhone}</p>
              <div className="social-links">
                {data.socialLinks.map((social) => (
                  <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="text-link">
                    {social.label}
                  </a>
                ))}
              </div>
            </Card>
          </div>
        </AnimatedSection>
      </main>

      <footer className="portfolio-footer">
        <p>© {new Date().getFullYear()} Mohammed El-Manssouri. {data.footer.rights}</p>
        <p>{data.footer.madeWith} ❤️</p>
      </footer>

      <a
        href={`https://wa.me/${data.whatsappNumber}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-floating"
        aria-label="WhatsApp"
      >
        <img src={whatsappLogo} alt="whatsapp" />
      </a>
    </>
  );
}

export default function App() {
  return (
    <I18nProvider defaultLang="fr">
      <ThemeProvider>
        <Portfolio />
      </ThemeProvider>
    </I18nProvider>
  );
}

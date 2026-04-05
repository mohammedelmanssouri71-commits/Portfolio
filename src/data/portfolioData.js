import { projectsData } from './projects';
import { skillsData } from './skills';
import { certificationsData } from './certifications';

export function getPortfolioData({ t, lang }) {
  return {
    name: 'Mohammed El-Manssouri',
    hero: {
      greeting: t('hero.greeting'),
      roles: t('hero.roles'),
      subtitle: t('hero.subtitle'),
      available: t('hero.available'),
      ctaProjects: t('hero.cta_projects'),
      ctaContact: t('hero.cta_contact'),
      ctaDownload: t('hero.cta_download'),
      stats: [
        { value: '1+', label: t('hero.stats.study') },
        { value: '10+', label: t('hero.stats.tech') },
        { value: '2', label: t('hero.stats.project') },
      ],
      resumeHref: `/cv-mohammed-elmanssouri-${lang}.pdf`,
    },
    about: {
      sectionIndex: t('about.section_index'),
      title: t('about.title'),
      description: t('about.description'),
      formationTitle: t('about.formation_title'),
      formation: t('about.formation'),
      languagesTitle: t('about.languages_title'),
      languages: t('about.languages'),
      softSkillsTitle: t('about.softskills_title'),
      softSkills: t('about.softskills'),
      interestsTitle: t('about.interests_title'),
      interests: t('about.interests'),
    },
    skills: {
      sectionIndex: t('skills.section_index'),
      title: t('skills.title'),
      subtitle: t('skills.subtitle'),
      allLabel: t('skills.all_label'),
      categories: skillsData.map((group) => ({
        ...group,
        label: t(`skills.categories.${group.category}`),
      })),
    },
    projects: {
      sectionIndex: t('projects.section_index'),
      title: t('projects.title'),
      subtitle: t('projects.subtitle'),
      demoLabel: t('projects.demo'),
      githubLabel: t('projects.github'),
      inProgressLabel: t('projects.in_progress'),
      githubCta: {
        title: t('projects.github_cta_title'),
        subtitle: t('projects.github_cta_sub'),
        button: t('projects.github_cta_btn'),
      },
      items: projectsData.map((project) => ({
        ...project,
        title: lang === 'en' ? project.title_en : project.title,
        description: lang === 'en' ? project.description_en : project.description,
      })),
    },
    experience: {
      sectionIndex: t('certifications.section_index'),
      title: t('certifications.title'),
      subtitle: t('certifications.subtitle'),
      items: certificationsData.map((item) => ({
        ...item,
        title: lang === 'en' ? item.title_en : item.title,
      })),
    },
    contact: {
      sectionIndex: t('contact.section_index'),
      title: t('contact.title'),
      subtitle: t('contact.subtitle'),
      name: t('contact.name'),
      email: t('contact.email'),
      message: t('contact.message'),
      send: t('contact.send'),
      sending: t('contact.sending'),
      error: t('contact.error'),
      success: t('contact.success'),
      infoEmail: t('contact.info_email'),
      infoPhone: t('contact.info_phone'),
    },
    nav: ['about', 'skills', 'projects', 'experience', 'contact'],
    navLabels: {
      about: t('nav.about'),
      skills: t('nav.skills'),
      projects: t('nav.projects'),
      experience: t('nav.certifications'),
      contact: t('nav.contact'),
    },
    socialLinks: [
      { label: 'GitHub', href: 'https://github.com/mohammedelmanssouri71-commits/' },
      { label: 'LinkedIn', href: 'https://linkedin.com/in/mohammed-el-manssouri-21120b33b' },
      { label: 'Email', href: 'mailto:mohammedelmanssouri71@gmail.com' },
    ],
    footer: {
      rights: t('footer.rights'),
      madeWith: t('footer.made_with'),
    },
    whatsappNumber: '212613967856',
  };
}

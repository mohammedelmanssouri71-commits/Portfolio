import { useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';

export function Navbar({ items, labels, onNavigate, onToggleLang, onToggleTheme, lang, dark }) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 100) setHidden(true);
    if (latest < previous) setHidden(false);
  });

  return (
    <motion.nav
      className="portfolio-nav"
      animate={{ y: hidden ? '-130%' : '0%' }}
      transition={{ duration: 0.3 }}
    >
      <button className="brand" onClick={() => onNavigate('hero')}>MOHAMMED</button>
      <div className="portfolio-nav__links">
        {items.map((item) => (
          <button key={item} onClick={() => onNavigate(item)} className="nav-item">
            {labels[item]}
          </button>
        ))}
      </div>
      <div className="portfolio-nav__actions">
        <button className="icon-btn" onClick={onToggleLang} aria-label="Toggle language">{lang === 'fr' ? 'EN' : 'FR'}</button>
        <button className="icon-btn" onClick={onToggleTheme} aria-label="Toggle theme">{dark ? '☀' : '☾'}</button>
      </div>
    </motion.nav>
  );
}

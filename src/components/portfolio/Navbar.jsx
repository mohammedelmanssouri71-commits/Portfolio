import { useEffect, useState } from 'react';

export function Navbar({ items, labels, onNavigate, onToggleLang, onToggleTheme, lang, dark }) {
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastY && currentY > 100) setHidden(true);
      if (currentY < lastY) setHidden(false);
      setLastY(currentY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastY]);

  return (
    <nav className={`portfolio-nav ${hidden ? 'portfolio-nav--hidden' : ''}`}>
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
    </nav>
  );
}

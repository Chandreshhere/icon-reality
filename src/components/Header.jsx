import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close mobile drawer on route change
  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="site-header__inner">
        <nav className="site-header__nav">
          <Link to="/about">About</Link>
          <Link to="/projects">Projects</Link>
        </nav>

        <Link to="/" className="site-header__brand" aria-label="Icon Realty home">
          <img src="/icon-logo.png" alt="Icon Realty" className="site-header__logo" />
        </Link>

        <div className="site-header__actions">
          <a href="mailto:iconrealty2@icloud.com?subject=Book%20a%20Site%20Visit" className="cta">Book a Site Visit</a>
          <button
            className={`hamburger ${open ? 'is-open' : ''}`}
            onClick={() => setOpen(o => !o)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      <div className={`site-header__sheet ${open ? 'is-open' : ''}`}>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/projects">Projects</Link>
          <a href="#testimonials">Testimonials</a>
          <a href="#contact">Contact</a>
        </nav>
        <a href="mailto:iconrealty2@icloud.com">iconrealty2@icloud.com</a>
      </div>
    </header>
  );
}

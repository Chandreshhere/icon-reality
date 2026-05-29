import { useEffect, useState } from 'react';
import Reveal from './Reveal';
import './ServicesGrid.css';

const services = [
  {
    title: 'PLOT LAYOUTS',
    image: '/images/service-plot.jpg',
    body: 'Wide planned roads and considered orientations — every plot is positioned to maximise light, air, and a quiet sense of arrival.',
    body2: 'Each block is laid out with intent: street widths sized for ease, corner plots reserved for landmark homes, and orientations chosen so morning light reaches the right rooms.',
    highlights: [
      'Plot sizes from 1,200 to 3,600 sq ft',
      'Vaastu-compliant orientations across all blocks',
      '40 ft and 60 ft internal roads',
      'Reserved frontage for landmark homes',
    ],
    stats: [
      { k: 'Plot range', v: '1,200 – 3,600 sq ft' },
      { k: 'Road width', v: 'up to 60 ft' },
      { k: 'Blocks', v: '6 thoughtfully zoned' },
    ],
    gallery: [
      '/images/projects/01.jpg',
      '/images/projects/02.jpg',
      '/images/projects/03.jpg',
    ],
  },
  {
    title: 'AMENITIES',
    image: '/images/service-amenities.jpg',
    body: 'Curated common spaces, landscaped gardens, and quiet community zones — designed for daily life, not the brochure.',
    body2: 'We design for the hours you actually live in. Spaces for morning walks, evening gatherings, kids who roam, and weekends that feel longer than they used to.',
    highlights: [
      'Clubhouse with lounge, café, and library',
      'Swimming pool, gym, and yoga deck',
      'Children\'s play park & senior\'s garden',
      '24×7 security with smart access',
    ],
    stats: [
      { k: 'Green cover', v: '38% of total area' },
      { k: 'Clubhouse', v: '12,000 sq ft' },
      { k: 'Security', v: 'Multi-tier' },
    ],
    gallery: [
      '/images/projects/04.jpg',
      '/images/projects/05.jpg',
      '/images/projects/06.jpg',
    ],
  },
  {
    title: 'LOCATION',
    image: '/images/service-location.jpg',
    body: 'A premium growth corridor — close to nature, away from noise, with the connectivity that protects long-term value.',
    body2: 'Close enough for the city to be useful, far enough for the calm to be real. Top schools, hospitals, and the highway all sit inside an easy radius.',
    highlights: [
      'Minutes from the new expressway',
      'Top-rated schools within 5 km',
      'Hospitals & retail in a 10-minute drive',
      'Surrounded by green belt and farmland',
    ],
    stats: [
      { k: 'To expressway', v: '8 min' },
      { k: 'To airport', v: '45 min' },
      { k: 'Schools nearby', v: '6 +' },
    ],
    gallery: [
      '/images/projects/07.jpg',
      '/images/projects/08.jpg',
      '/images/projects/09.jpg',
    ],
  },
  {
    title: 'INVESTMENT',
    image: '/images/service-investment.jpg',
    body: 'Buy early, hold long-term, watch appreciation — land you own, in a location with structural reasons to grow.',
    body2: 'Plotted developments in growth corridors have historically outperformed apartments on both appreciation and liquidity. Icon Realty\'s projects are positioned to be one of them.',
    highlights: [
      'Land you own outright — no depreciation',
      'Flexible build timelines',
      'Title-clear, RERA-registered project',
      'Resale or self-build, your call',
    ],
    stats: [
      { k: 'Corridor growth', v: '14% p.a. (5-yr avg)' },
      { k: 'Title status', v: 'Clear & RERA' },
      { k: 'Flexibility', v: 'Hold · build · resell' },
    ],
    gallery: [
      '/images/projects/10.jpg',
      '/images/projects/11.jpg',
      '/images/projects/12.jpg',
    ],
  },
];

export default function ServicesGrid() {
  const [openIdx, setOpenIdx] = useState(-1);
  // keeps the panel content mounted during slide-out animation
  const [displayed, setDisplayed] = useState(null);

  useEffect(() => {
    if (openIdx >= 0) {
      setDisplayed(services[openIdx]);
    } else {
      // wait for slide-out transition (~0.6s) before unmounting
      const t = setTimeout(() => setDisplayed(null), 650);
      return () => clearTimeout(t);
    }
  }, [openIdx]);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (openIdx >= 0) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [openIdx]);

  // ESC to close
  useEffect(() => {
    if (openIdx < 0) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpenIdx(-1); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openIdx]);

  const isOpen = openIdx >= 0;
  const open = displayed;

  return (
    <section className="services">
      <div className="services__shell">
        <div className="container services__inner">
          <div className="services__head">
            <Reveal as="h2" className="display services__title">What we<br/>offer.</Reveal>
            <Reveal as="p" className="services__lede" delay={0.05}>
              Give your investment more meaning — without compromising on quality, location, or the way the place actually feels.
            </Reveal>
          </div>

          <div className="services__list">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.05}>
                <button
                  className="services__row"
                  onClick={() => setOpenIdx(i)}
                  aria-label={`Open details for ${s.title}`}
                >
                  <div className="services__thumb">
                    <img src={s.image} alt="" />
                  </div>
                  <div className="services__row-main">
                    <span className="services__row-title">{s.title}</span>
                    <span className="services__row-plus" aria-hidden>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                      </svg>
                    </span>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="services__bars" aria-hidden />
      </div>

      {/* MODAL */}
      <div
        className={`service-modal ${isOpen ? 'is-open' : ''}`}
        onClick={(e) => { if (e.target === e.currentTarget) setOpenIdx(-1); }}
        aria-hidden={!isOpen}
      >
        <div className="service-modal__panel" role="dialog" aria-modal="true" aria-label={open?.title}>
          <button className="service-modal__close" onClick={() => setOpenIdx(-1)} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3 3L15 15M15 3L3 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </button>

          {open && (
            <>
              <div className="service-modal__carousel-wrap">
                <div className="service-modal__carousel">
                  <div className="service-modal__track">
                    {[...open.gallery, ...open.gallery, ...open.gallery].map((src, i) => (
                      <div key={i} className="service-modal__slide">
                        <img src={src} alt={`${open.title} ${i + 1}`} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="service-modal__body">
                <h3 className="service-modal__title display">{open.title}</h3>
                <p className="service-modal__copy">{open.body}</p>

                <ul className="service-modal__highlights">
                  {open.highlights.slice(0, 3).map((h, i) => (
                    <li key={i}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                        <path d="M2 7L5.5 10.5L12 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="service-modal__stat-row">
                  {open.stats.map((s, i) => (
                    <div key={i} className="service-modal__stat">
                      <span className="service-modal__stat-k">{s.k}</span>
                      <span className="service-modal__stat-v">{s.v}</span>
                    </div>
                  ))}
                </div>

                <a href="mailto:info@iconrealty.homes?subject=Book%20a%20Site%20Visit" className="cta service-modal__cta">
                  Book a Site Visit
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

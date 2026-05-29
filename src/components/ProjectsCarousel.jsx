import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal';
import './ProjectsCarousel.css';

const projects = [
  { name: 'OSCAR PALACE',     meta: 'Hingonia · 64 acres',          src: '/video/Oscar(R1)_1.mp4' },
  { name: 'OSCAR FORT',       meta: 'Bicholi · Royal estate',       src: '/video/Oscar(R2)_2.mp4' },
  { name: 'OSCAR BILLIONAIRE',meta: 'Bicholi · Premium plots',      src: '/video/Oscar(R3)_1.mp4' },
  { name: 'SAATVIK VIHAR',    meta: 'Manglia · Family living',      src: '/video/Oscar(R4)_1.mp4' },
  { name: 'SIDDHAYATAN',      meta: 'Manglia · Community-first',    src: '/video/Oscar(R5)_1.mp4' },
];

export default function ProjectsCarousel() {
  const [active, setActive] = useState(2); // start with the middle card
  const videoRefs = useRef([]);

  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === active) {
        v.currentTime = 0;
        const p = v.play();
        if (p && typeof p.catch === 'function') p.catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [active]);

  const prev = () => setActive((p) => (p - 1 + projects.length) % projects.length);
  const next = () => setActive((p) => (p + 1) % projects.length);

  return (
    <section className="carousel" id="views">
      <div className="carousel__shell">
        <div className="container carousel__head">
          <Reveal as="span" className="eyebrow carousel__eyebrow">Trending Now</Reveal>
          <Reveal as="h2" className="display carousel__title" delay={0.05}>
            Projects shaping<br/>the skyline.
          </Reveal>
          <Reveal as="p" className="carousel__lede" delay={0.1}>
            Five flagship developments across Indore — each one a quiet, considered statement. Pick a project to see how it moves.
          </Reveal>
        </div>

        <div className="carousel__accordion">
          {projects.map((p, i) => (
            <button
              key={p.name}
              className={`carousel__card ${i === active ? 'is-active' : ''}`}
              onClick={() => setActive(i)}
              aria-label={`Show ${p.name}`}
            >
              <video
                ref={(el) => (videoRefs.current[i] = el)}
                src={p.src}
                muted
                loop
                playsInline
                preload="metadata"
              />
              <div className="carousel__card-veil" />
              <div className="carousel__card-caption">
                <span className="carousel__card-label">{p.name}</span>
                <span className="carousel__card-meta">{p.meta}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="container carousel__controls">
          <div className="carousel__counter">
            <span className="is-current">{String(active + 1).padStart(2, '0')}</span>
            <span className="carousel__counter-sep" />
            <span>{String(projects.length).padStart(2, '0')}</span>
          </div>
          <div className="carousel__buttons">
            <button onClick={prev} aria-label="Previous">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="is-primary" onClick={next} aria-label="Next">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M8 4L14 10L8 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

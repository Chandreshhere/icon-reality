import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Reveal from '../components/Reveal';
import ProjectsCarousel from '../components/ProjectsCarousel';
import CompletedProjects from '../components/CompletedProjects';
import FinalCTA from '../components/FinalCTA';
import './ProjectsPage.css';

const trending = [
  { name: 'Oscar Palace',      location: 'Hingonia',       size: '64 acres',  plots: '5,000 – 20,000 sq ft', image: '/images/projects/01.jpg' },
  { name: 'Oscar Fort',        location: 'Bicholi',        size: 'Royal estate', plots: 'Premium villa plots',  image: '/images/projects/02.jpg' },
  { name: 'Oscar Billionaire', location: 'Bicholi',        size: 'Premium',   plots: 'Limited-edition plots', image: '/images/projects/03.jpg' },
  { name: 'Saatvik Vihar',     location: 'Manglia',        size: 'Township',  plots: 'Family-first plots',    image: '/images/projects/04.jpg' },
  { name: 'Siddhayatan',       location: 'Manglia',        size: 'Community', plots: 'Community-first plots', image: '/images/projects/05.jpg' },
  { name: 'Eden Garden',       location: 'Ambamoliya',     size: 'Plotted',   plots: 'Garden-themed plots',   image: '/images/projects/06.jpg' },
  { name: 'Labham City',       location: 'Super Corridor', size: 'Township',  plots: 'Connectivity-led',      image: '/images/projects/07.jpg' },
  { name: 'IIT Greens',        location: 'Bypass',         size: 'Premium',   plots: 'Education corridor',    image: '/images/projects/08.jpg' },
];

export default function ProjectsPage() {
  const lineRefs = useRef([]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const lines = lineRefs.current.filter(Boolean);
    if (!lines.length) return;
    gsap.set(lines, { yPercent: 110 });
    const tween = gsap.to(lines, {
      yPercent: 0, duration: 1.1, ease: 'power3.out', stagger: 0.14, delay: 0.1,
    });
    return () => tween.kill();
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="projects-hero">
        <div className="container projects-hero__inner">
          <h1 className="display projects-hero__title">
            <span className="projects-hero__line">
              <span className="projects-hero__line-inner" ref={(el) => (lineRefs.current[0] = el)}>
                Eight ongoing.
              </span>
            </span>
            <span className="projects-hero__line">
              <span className="projects-hero__line-inner" ref={(el) => (lineRefs.current[1] = el)}>
                Eight delivered.
              </span>
            </span>
          </h1>
          <Reveal as="p" className="projects-hero__lede" delay={0.6}>
            A portfolio shaped by patience — landmarks that age into the city, not against it. Browse the projects taking shape now and the ones already lived in.
          </Reveal>
        </div>
      </section>

      <ProjectsCarousel />

      {/* TRENDING LIST */}
      <section className="projects-list" id="projects">
        <div className="container projects-list__head">
          <Reveal as="span" className="eyebrow projects-list__eyebrow">All trending projects</Reveal>
          <Reveal as="h2" className="display projects-list__title" delay={0.05}>
            Currently building.
          </Reveal>
        </div>

        <div className="container">
          <div className="projects-list__grid">
            {trending.map((p, i) => (
              <Reveal key={p.name} className="projects-list__card" delay={i * 0.04}>
                <div className="projects-list__media">
                  <img src={p.image} alt={`${p.name} — ${p.location}`} loading="lazy" />
                  <span className="projects-list__badge">Trending</span>
                </div>
                <div className="projects-list__body">
                  <h3 className="projects-list__name">{p.name}</h3>
                  <div className="projects-list__meta">
                    <span>{p.location}</span>
                    <span className="projects-list__dot">·</span>
                    <span>{p.size}</span>
                  </div>
                  <p className="projects-list__plots">{p.plots}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CompletedProjects />
      <FinalCTA />
    </>
  );
}

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Reveal from './Reveal';
import './DisplayHeading.css';

const TRAIL_IMAGES = [
  '/images/projects/01.jpg',
  '/images/projects/02.jpg',
  '/images/projects/03.jpg',
  '/images/projects/04.jpg',
  '/images/projects/05.jpg',
  '/images/projects/06.jpg',
  '/images/projects/07.jpg',
  '/images/projects/08.jpg',
  '/images/projects/09.jpg',
  '/images/projects/10.jpg',
];

const SPAWN_DISTANCE = 90; // px of mouse movement before spawning next image

export default function DisplayHeading() {
  const sectionRef = useRef(null);
  const cursorRef = useRef(null);
  const trailRefs = useRef([]);
  const trailIdxRef = useRef(0);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const insideRef = useRef(false);
  const lineRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cursor = cursorRef.current;
    if (!section || !cursor) return;

    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    if (isCoarse) return; // no hover effect on touch devices

    gsap.set(cursor, { xPercent: -50, yPercent: -50, scale: 0, opacity: 0 });

    let zCounter = 1;

    const spawn = (x, y) => {
      const img = trailRefs.current[trailIdxRef.current];
      if (!img) return;
      trailIdxRef.current = (trailIdxRef.current + 1) % trailRefs.current.length;

      const rot = (Math.random() - 0.5) * 14; // -7 to +7 deg
      const offX = (Math.random() - 0.5) * 40;
      const offY = (Math.random() - 0.5) * 30;

      gsap.killTweensOf(img);
      gsap.set(img, {
        x: x + offX,
        y: y + offY,
        xPercent: -50,
        yPercent: -50,
        rotation: rot,
        scale: 0.85,
        opacity: 0,
        zIndex: zCounter++,
      });

      gsap.timeline()
        .to(img, { opacity: 1, scale: 1, duration: 0.18, ease: 'power2.out' })
        .to(img, { scale: 0.3, opacity: 0, duration: 0.32, ease: 'power2.in' }, '+=0.4');
    };

    const onEnter = () => {
      insideRef.current = true;
      gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.25, ease: 'power3.out' });
    };

    const onLeave = () => {
      insideRef.current = false;
      gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.2, ease: 'power3.in' });
    };

    const onMove = (e) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(cursor, { x, y, duration: 0.35, ease: 'power3.out', overwrite: 'auto' });

      const dx = x - lastPosRef.current.x;
      const dy = y - lastPosRef.current.y;
      const dist = Math.hypot(dx, dy);

      if (dist > SPAWN_DISTANCE) {
        spawn(x, y);
        lastPosRef.current = { x, y };
      }
    };

    section.addEventListener('mouseenter', onEnter);
    section.addEventListener('mouseleave', onLeave);
    section.addEventListener('mousemove', onMove);

    return () => {
      section.removeEventListener('mouseenter', onEnter);
      section.removeEventListener('mouseleave', onLeave);
      section.removeEventListener('mousemove', onMove);
    };
  }, []);

  useEffect(() => {
    const lines = lineRefs.current.filter(Boolean);
    if (!lines.length || !sectionRef.current) return;
    gsap.set(lines, { yPercent: 110 });
    const tween = gsap.to(lines, {
      yPercent: 0,
      duration: 1.1,
      ease: 'power3.out',
      stagger: 0.14,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });
    return () => {
      tween.scrollTrigger && tween.scrollTrigger.kill();
      tween.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="display-section" id="project">
      <div className="display-section__pool" aria-hidden>
        {TRAIL_IMAGES.map((src, i) => (
          <img
            key={src}
            ref={(el) => (trailRefs.current[i] = el)}
            src={src}
            alt=""
            className="display-section__trail-img"
            loading="lazy"
          />
        ))}
      </div>

      <div className="container display-section__inner">
        <h2 className="display display-section__heading">
          <span className="display-section__line">
            <span className="display-section__line-inner" ref={(el) => (lineRefs.current[0] = el)}>
              Premium plots
            </span>
          </span>
          <span className="display-section__line">
            <span className="display-section__line-inner" ref={(el) => (lineRefs.current[1] = el)}>
              for refined living.
            </span>
          </span>
        </h2>
        <Reveal as="p" className="display-section__lede" delay={0.05}>
          We rethink the standard of plotted living with thoughtful design and a long-term vision.
          From layout and amenities to surroundings and security, every detail is considered —
          so your space feels effortless, considered, and unmistakably your own.
        </Reveal>
      </div>

      <div ref={cursorRef} className="display-section__cursor" aria-hidden>
        <span>EXPLORE</span>
      </div>
    </section>
  );
}

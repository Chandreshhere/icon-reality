import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import { projectsList } from '../data/projects';
import './CompletedProjects.css';

const completed = projectsList
  .filter((p) => p.status === 'completed')
  .map((p) => ({
    slug: p.slug,
    name: p.name,
    location: p.location,
    image: p.thumbnail,
  }));

export default function CompletedProjects() {
  return (
    <section className="completed" id="completed">
      <div className="container completed__head">
        <Reveal as="span" className="eyebrow completed__eyebrow">Delivered & lived in</Reveal>
        <Reveal as="h2" className="display completed__title" delay={0.05}>
          Eight landmarks.<br/>Thousands of homes.
        </Reveal>
        <Reveal as="p" className="completed__lede" delay={0.1}>
          A snapshot of projects already completed across Indore — places where families now live, gardens have grown, and roads quietly fill with the rhythm of everyday life.
        </Reveal>
      </div>

      <div className="container">
        <div className="completed__grid">
          {completed.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.04}>
              <Link to={`/projects/${p.slug}`} className="completed__card">
                <div className="completed__media">
                  <img src={p.image} alt={`${p.name} — ${p.location}`} loading="lazy" />
                  <span className="completed__badge">Completed</span>
                </div>
                <div className="completed__body">
                  <h3 className="completed__name">{p.name}</h3>
                  <span className="completed__location">{p.location}</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

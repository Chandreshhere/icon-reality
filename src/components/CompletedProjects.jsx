import Reveal from './Reveal';
import './CompletedProjects.css';

const completed = [
  { name: 'Glamour Highway City', location: 'Pithampur',       image: '/images/projects/01.jpg' },
  { name: 'Glamour Hill City',    location: 'Rau',             image: '/images/projects/02.jpg' },
  { name: 'Ruchi Enclave',        location: 'Jhalaria',        image: '/images/projects/03.jpg' },
  { name: 'Ruchi Lifescapes',     location: 'Jhalaria',        image: '/images/projects/04.jpg' },
  { name: 'Singapore Corridor',   location: 'Super Corridor',  image: '/images/projects/05.jpg' },
  { name: 'Singapore Lifestyle 2',location: 'Super Corridor',  image: '/images/projects/06.jpg' },
  { name: 'Dream Victoria',       location: 'Super Corridor',  image: '/images/projects/07.jpg' },
  { name: 'Victoria Park',        location: 'Super Corridor',  image: '/images/projects/08.jpg' },
];

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
            <Reveal key={p.name} className="completed__card" delay={i * 0.04}>
              <div className="completed__media">
                <img src={p.image} alt={`${p.name} — ${p.location}`} loading="lazy" />
                <span className="completed__badge">Completed</span>
              </div>
              <div className="completed__body">
                <h3 className="completed__name">{p.name}</h3>
                <span className="completed__location">{p.location}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

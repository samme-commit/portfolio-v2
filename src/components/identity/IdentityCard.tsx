import './IdentityCard.css'

const profileDetails = [
  {
    label: 'Location',
    value: 'Piteå, Sweden',
  },
  {
    label: 'Focus',
    value: 'Digital experiences',
  },
  {
    label: 'Main stack',
    value: 'React & TypeScript',
  },
  {
    label: 'Currently',
    value: 'Building RiftScout',
  },
]

export function IdentityCard() {
  return (
    <article
      className="identity-card"
      aria-labelledby="identity-card-title"
    >
      <header className="identity-card__header">
        <a
          className="identity-card__mark"
          href="#home"
          aria-label="Samuel Oxenby, back to start"
        >
          SO
        </a>

        <div className="identity-card__availability">
          <span
            className="identity-card__availability-dot"
            aria-hidden="true"
          />

          Available for projects
        </div>

        <span className="identity-card__serial">
          Portfolio / 2026
        </span>
      </header>

      <div className="identity-card__body">
        <div className="identity-card__content">
          <p className="identity-card__eyebrow">
            Hej, jag är
          </p>

          <h1
            id="identity-card-title"
            className="identity-card__title"
          >
            samme
            <span>commit .</span>
          </h1>

          <p className="identity-card__description">
            Jag är en student och frontendutvecklare från Piteå
            som bygger moderna, genomtänkta och minnesvärda
            digitala upplevelser.
          </p>

          <div className="identity-card__actions">
            <a
              className="identity-card__button identity-card__button--primary"
              href="#work"
            >
              Utforska mina projekt

              <span aria-hidden="true">↘</span>
            </a>

            <a
              className="identity-card__button identity-card__button--secondary"
              href="https://github.com/samme-commit"
              target="_blank"
              rel="noreferrer"
            >
              GitHub

              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="identity-card__visual" aria-hidden="true">
          <div className="identity-card__orbit identity-card__orbit--outer">
            <span className="identity-card__tech identity-card__tech--react">
              React
            </span>

            <span className="identity-card__tech identity-card__tech--typescript">
              TypeScript
            </span>
          </div>

          <div className="identity-card__orbit identity-card__orbit--inner" />

          <div className="identity-card__avatar">
            <span className="identity-card__initials">SO</span>
            <span className="identity-card__role">
              Creative developer
            </span>
          </div>

          <span className="identity-card__spark identity-card__spark--one" />
          <span className="identity-card__spark identity-card__spark--two" />
          <span className="identity-card__spark identity-card__spark--three" />
        </div>
      </div>

      <dl className="identity-card__details">
        {profileDetails.map((detail) => (
          <div
            key={detail.label}
            className="identity-card__detail"
          >
            <dt>{detail.label}</dt>
            <dd>{detail.value}</dd>
          </div>
        ))}
      </dl>

      <footer className="identity-card__footer">
        <div className="identity-card__current-project">
          <span
            className="identity-card__project-pulse"
            aria-hidden="true"
          />

          <span>Currently building</span>

          <strong>RiftScout</strong>
        </div>

        <span className="identity-card__footer-note">
          Design · Development · Curiosity
        </span>
      </footer>
    </article>
  )
}
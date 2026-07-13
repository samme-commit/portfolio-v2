import type { PointerEvent as ReactPointerEvent } from 'react'

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
  function handlePointerMove(
    event: ReactPointerEvent<HTMLElement>,
  ) {
    if (event.pointerType === 'touch') {
      return
    }

    const card = event.currentTarget
    const bounds = card.getBoundingClientRect()

    const pointerX =
      ((event.clientX - bounds.left) / bounds.width) * 100

    const pointerY =
      ((event.clientY - bounds.top) / bounds.height) * 100

    const rotateY = ((pointerX - 50) / 50) * 2.5
    const rotateX = ((50 - pointerY) / 50) * 2

    card.style.setProperty('--pointer-x', `${pointerX}%`)
    card.style.setProperty('--pointer-y', `${pointerY}%`)
    card.style.setProperty('--rotate-x', `${rotateX}deg`)
    card.style.setProperty('--rotate-y', `${rotateY}deg`)
  }

  function handlePointerLeave(
    event: ReactPointerEvent<HTMLElement>,
  ) {
    const card = event.currentTarget

    card.style.setProperty('--pointer-x', '50%')
    card.style.setProperty('--pointer-y', '50%')
    card.style.setProperty('--rotate-x', '0deg')
    card.style.setProperty('--rotate-y', '0deg')
  }

  return (
    <article
      className="identity-card"
      aria-labelledby="identity-card-title"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <span
        className="identity-card__spotlight"
        aria-hidden="true"
      />

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
            <span> commit.</span>
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
          <div className="identity-card__orbit-track identity-card__orbit-track--outer">
            <span className="identity-card__orbit-tech identity-card__orbit-tech--react">
              <span>React</span>
            </span>

            <span className="identity-card__orbit-tech identity-card__orbit-tech--typescript">
              <span>TypeScript</span>
            </span>

            <span className="identity-card__orbit-tech identity-card__orbit-tech--next">
              <span>Next.js</span>
            </span>
          </div>

          <div className="identity-card__orbit-track identity-card__orbit-track--middle">
            <span className="identity-card__orbit-tech identity-card__orbit-tech--html">
              <span>HTML</span>
            </span>

            <span className="identity-card__orbit-tech identity-card__orbit-tech--css">
              <span>CSS</span>
            </span>

            <span className="identity-card__orbit-tech identity-card__orbit-tech--javascript">
              <span>JavaScript</span>
            </span>
          </div>

          <div className="identity-card__orbit-track identity-card__orbit-track--inner" />

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
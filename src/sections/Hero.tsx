import { useEffect, useRef } from 'react'

import { IdentityCard } from '../components/identity/IdentityCard'
import { Container } from '../components/layout/Container'
import { Section } from '../components/layout/Section'

import './Hero.css'

function clamp(
  value: number,
  minimum: number,
  maximum: number,
) {
  return Math.min(Math.max(value, minimum), maximum)
}

function smoothStep(progress: number) {
  return progress * progress * (3 - 2 * progress)
}

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const heroElement = heroRef.current

    if (!heroElement) {
      return
    }

    let animationFrame = 0

    function updateHeroProgress() {
      const bounds = heroElement.getBoundingClientRect()

      /*
       * Låt besökaren se hela kortet innan exit-animationen
       * börjar. Animationen startar först efter cirka 20vh.
       */
      const scrolledDistance = Math.max(-bounds.top, 0)
      const exitStart = window.innerHeight * 0.2
      const exitDistance = window.innerHeight * 0.7

      const rawProgress = clamp(
        (scrolledDistance - exitStart) / exitDistance,
        0,
        1,
      )

      const progress = smoothStep(rawProgress)

      const scale = 1 - progress * 0.12
      const opacity = 1 - progress * 0.78
      const translateY = progress * -3.5
      const translateZ = progress * -220
      const cueOpacity = clamp(
        1 - rawProgress * 3,
        0,
        1,
      )

      heroElement.style.setProperty(
        '--hero-scale',
        scale.toFixed(4),
      )

      heroElement.style.setProperty(
        '--hero-opacity',
        opacity.toFixed(4),
      )

      heroElement.style.setProperty(
        '--hero-translate-y',
        `${translateY}rem`,
      )

      heroElement.style.setProperty(
        '--hero-translate-z',
        `${translateZ}px`,
      )

      heroElement.style.setProperty(
        '--hero-cue-opacity',
        cueOpacity.toFixed(4),
      )

      animationFrame = 0
    }

    function requestUpdate() {
      if (animationFrame) {
        return
      }

      animationFrame = window.requestAnimationFrame(
        updateHeroProgress,
      )
    }

    updateHeroProgress()

    window.addEventListener('scroll', requestUpdate, {
      passive: true,
    })

    window.addEventListener('resize', requestUpdate)

    return () => {
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)

      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame)
      }
    }
  }, [])

  return (
    <Section
      ref={heroRef}
      id="home"
      className="hero"
      data-cursor-area
    >
      <div className="hero__stage">
        <div
          className="hero__ambient hero__ambient--left"
          aria-hidden="true"
        />

        <div
          className="hero__ambient hero__ambient--right"
          aria-hidden="true"
        />

        <Container className="hero__container">
          <div className="hero__card-shell">
            <IdentityCard />

            <div
              className="hero__scroll-cue"
              aria-hidden="true"
            >
              <span>Scroll to explore</span>
              <span className="hero__scroll-line" />
            </div>
          </div>
        </Container>
      </div>
    </Section>
  )
}
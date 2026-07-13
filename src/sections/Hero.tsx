import { useEffect, useRef } from 'react'

import { IdentityCard } from '../components/identity/IdentityCard'
import { Container } from '../components/layout/Container'
import { Section } from '../components/layout/Section'

import './Hero.css'

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum)
}

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const hero = heroRef.current

    if (!hero) {
      return
    }

    const reducedMotionQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    )

    if (reducedMotionQuery.matches) {
      return
    }

    let animationFrame = 0

    function updateHeroProgress() {
      if (!hero) {
        return
      }

      const bounds = hero.getBoundingClientRect()

      const scrollDistance = Math.max(
        hero.offsetHeight - window.innerHeight,
        1,
      )

      const progress = clamp(
        -bounds.top / scrollDistance,
        0,
        1,
      )

      const scale = 1 - progress * 0.13
      const opacity = 1 - progress * 0.72
      const translateY = progress * -4
      const translateZ = progress * -240
      const blur = progress * 2.2
      const cueOpacity = clamp(1 - progress * 2.2, 0, 1)

      hero.style.setProperty(
        '--hero-scale',
        scale.toFixed(4),
      )

      hero.style.setProperty(
        '--hero-opacity',
        opacity.toFixed(4),
      )

      hero.style.setProperty(
        '--hero-translate-y',
        `${translateY}rem`,
      )

      hero.style.setProperty(
        '--hero-translate-z',
        `${translateZ}px`,
      )

      hero.style.setProperty(
        '--hero-blur',
        `${blur}px`,
      )

      hero.style.setProperty(
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
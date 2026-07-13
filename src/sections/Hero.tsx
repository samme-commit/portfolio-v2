import { IdentityCard } from '../components/identity/IdentityCard'
import { Container } from '../components/layout/Container'
import { Section } from '../components/layout/Section'

import './Hero.css'

export function Hero() {
  return (
    <Section id="home" className="hero">
      <div
        className="hero__ambient hero__ambient--left"
        aria-hidden="true"
      />

      <div
        className="hero__ambient hero__ambient--right"
        aria-hidden="true"
      />

      <Container className="hero__container">
        <IdentityCard />

        <div className="hero__scroll-cue" aria-hidden="true">
          <span>Scroll to explore</span>
          <span className="hero__scroll-line" />
        </div>
      </Container>
    </Section>
  )
}
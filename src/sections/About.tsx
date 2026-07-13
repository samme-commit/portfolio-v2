import { Container } from '../components/layout/Container'
import { Section } from '../components/layout/Section'

import './About.css'

export function About() {
  return (
    <Section id="about" className="about">
      <Container>
        <div className="about__intro">
          <p className="about__eyebrow">
            01 / About me
          </p>

          <h2>
            More than
            <span> just code.</span>
          </h2>

          <p className="about__description">
            Jag bygger inte bara hemsidor. Jag gillar att förstå
            varför en upplevelse känns bra, hur detaljer påverkar
            helheten och hur en idé kan utvecklas till något som
            människor faktiskt minns.
          </p>
        </div>
      </Container>
    </Section>
  )
}
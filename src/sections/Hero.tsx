import { Container } from '../components/layout/Container'
import { Section } from '../components/layout/Section'

export function Hero() {
  return (
    <Section id="home" className="hero">
      <Container>
        <p>Portfolio V2</p>
        <h1>Hej, jag är Samuel.</h1>
      </Container>
    </Section>
  )
}
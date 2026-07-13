import { FloatingNav } from './components/navigation/FloatingNav'

import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Work } from './sections/Work'
import { Playground } from './sections/Playground'
import { Personal } from './sections/Personal'
import { Contact } from './sections/Contact'

function App() {
  return (
    <div className="site">
      <FloatingNav />

      <main>
        <Hero />
        <About />
        <Work />
        <Playground />
        <Personal />
        <Contact />
      </main>
    </div>
  )
}

export default App
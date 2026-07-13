const navigationItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Playground', href: '#playground' },
  { label: 'Contact', href: '#contact' },
]

export function FloatingNav() {
  return (
    <nav className="floating-nav" aria-label="Primary navigation">
      <div className="floating-nav__dots" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="floating-nav__links">
        {navigationItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  )
}
import { useEffect, useRef, useState } from 'react'

import './FloatingNav.css'

const navigationItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Play', href: '#playground' },
  { label: 'Contact', href: '#contact' },
]

export function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false)

  const navRef = useRef<HTMLElement>(null)
  const toggleButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node

      if (navRef.current && !navRef.current.contains(target)) {
        setIsOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') {
        return
      }

      setIsOpen(false)
      toggleButtonRef.current?.focus()
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  function handleMouseEnter() {
    const supportsHover = window.matchMedia(
      '(hover: hover) and (pointer: fine)',
    ).matches

    if (supportsHover) {
      setIsOpen(true)
    }
  }

  function handleMouseLeave() {
    const supportsHover = window.matchMedia(
      '(hover: hover) and (pointer: fine)',
    ).matches

    if (supportsHover) {
      setIsOpen(false)
    }
  }

  function handleBlur(event: React.FocusEvent<HTMLElement>) {
    const nextFocusedElement = event.relatedTarget as Node | null

    if (
      nextFocusedElement &&
      event.currentTarget.contains(nextFocusedElement)
    ) {
      return
    }

    setIsOpen(false)
  }

  return (
    <nav
      ref={navRef}
      className={`floating-nav${isOpen ? ' is-open' : ''}`}
      aria-label="Primary navigation"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocusCapture={() => setIsOpen(true)}
      onBlurCapture={handleBlur}
    >
      <button
        ref={toggleButtonRef}
        className="floating-nav__toggle"
        type="button"
        aria-expanded={isOpen}
        aria-controls="primary-navigation-links"
        aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
        onClick={() => setIsOpen((currentState) => !currentState)}
      >
        <span className="floating-nav__dot" />
        <span className="floating-nav__dot" />
        <span className="floating-nav__dot" />
      </button>

      <div
        id="primary-navigation-links"
        className="floating-nav__links"
      >
        {navigationItems.map((item) => (
          <a
            key={item.href}
            className="floating-nav__link"
            href={item.href}
            onClick={() => setIsOpen(false)}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  )
}
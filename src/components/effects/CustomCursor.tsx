import { useEffect, useRef } from 'react'

import './CustomCursor.css'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const labelElement = labelRef.current

    if (!cursor || !labelElement) {
      return
    }

    const finePointerQuery = window.matchMedia(
      '(hover: hover) and (pointer: fine)',
    )

    let isEnabled = finePointerQuery.matches

    function syncEnabledState() {
      isEnabled = finePointerQuery.matches

      if (!isEnabled) {
        cursor.classList.remove('is-visible', 'is-active')
      }
    }

    function handlePointerMove(event: PointerEvent) {
      if (!isEnabled) {
        return
      }

      const target =
        event.target instanceof Element ? event.target : null

      const cursorArea = target?.closest('[data-cursor-area]')

      if (!cursorArea) {
        cursor.classList.remove('is-visible', 'is-active')
        return
      }

      cursor.style.setProperty('--cursor-x', `${event.clientX}px`)
      cursor.style.setProperty('--cursor-y', `${event.clientY}px`)
      cursor.classList.add('is-visible')

      const cursorTarget = target?.closest(
        '[data-cursor]',
      ) as HTMLElement | null

      const cursorLabel = cursorTarget?.dataset.cursor ?? ''

      labelElement.textContent = cursorLabel

      cursor.classList.toggle(
        'is-active',
        Boolean(cursorLabel),
      )
    }

    function handlePointerDown() {
      cursor.classList.add('is-pressed')
    }

    function handlePointerUp() {
      cursor.classList.remove('is-pressed')
    }

    function hideCursor() {
      cursor.classList.remove(
        'is-visible',
        'is-active',
        'is-pressed',
      )
    }

    syncEnabledState()

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('pointerup', handlePointerUp)
    window.addEventListener('blur', hideCursor)

    document.documentElement.addEventListener(
      'mouseleave',
      hideCursor,
    )

    finePointerQuery.addEventListener(
      'change',
      syncEnabledState,
    )

    return () => {
      window.removeEventListener(
        'pointermove',
        handlePointerMove,
      )

      window.removeEventListener(
        'pointerdown',
        handlePointerDown,
      )

      window.removeEventListener('pointerup', handlePointerUp)
      window.removeEventListener('blur', hideCursor)

      document.documentElement.removeEventListener(
        'mouseleave',
        hideCursor,
      )

      finePointerQuery.removeEventListener(
        'change',
        syncEnabledState,
      )
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      aria-hidden="true"
    >
      <span className="custom-cursor__dot" />

      <span
        ref={labelRef}
        className="custom-cursor__label"
      />
    </div>
  )
}
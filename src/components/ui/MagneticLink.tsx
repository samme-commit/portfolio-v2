import type {
  AnchorHTMLAttributes,
  PointerEvent as ReactPointerEvent,
} from 'react'

type MagneticLinkProps =
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    strength?: number
  }

export function MagneticLink({
  children,
  className = '',
  strength = 18,
  onPointerMove: externalPointerMove,
  onPointerLeave: externalPointerLeave,
  ...props
}: MagneticLinkProps) {
  function handlePointerMove(
    event: ReactPointerEvent<HTMLAnchorElement>,
  ) {
    if (event.pointerType === 'touch') {
      return
    }

    const element = event.currentTarget
    const bounds = element.getBoundingClientRect()

    const offsetX =
      ((event.clientX - bounds.left) / bounds.width - 0.5) *
      strength

    const offsetY =
      ((event.clientY - bounds.top) / bounds.height - 0.5) *
      strength

    element.style.setProperty('--magnetic-x', `${offsetX}px`)
    element.style.setProperty('--magnetic-y', `${offsetY}px`)

    externalPointerMove?.(event)
  }

  function handlePointerLeave(
    event: ReactPointerEvent<HTMLAnchorElement>,
  ) {
    const element = event.currentTarget

    element.style.setProperty('--magnetic-x', '0px')
    element.style.setProperty('--magnetic-y', '0px')

    externalPointerLeave?.(event)
  }

  return (
    <a
      className={className}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      {...props}
    >
      {children}
    </a>
  )
}
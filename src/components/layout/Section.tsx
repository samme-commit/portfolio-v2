import {
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react'

type SectionProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  function Section(
    {
      children,
      className = '',
      ...props
    },
    ref,
  ) {
    return (
      <section
        ref={ref}
        className={`section ${className}`.trim()}
        {...props}
      >
        {children}
      </section>
    )
  },
)
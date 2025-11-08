import * as React from 'react'

import { cn } from '@/lib/utils'

const baseInputStyles =
  'file:text-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full min-w-0 rounded-lg border bg-[var(--ds-color-input)] text-[var(--ds-color-text)] shadow-xs outline-none transition-[color,box-shadow] file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:opacity-50'

const focusInputStyles =
  'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'

const placeholderStyles = 'placeholder:text-[color:color-mix(in_srgb,var(--ds-color-text)_60%,transparent)]'

const sizes = {
  sm: 'px-4 py-3 text-sm',
  md: 'px-6 py-4 text-base',
  lg: 'px-8 py-5 text-lg',
} as const

type InputSize = keyof typeof sizes

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  size?: InputSize
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, type = 'text', size = 'md', ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      type={type}
      data-slot="input"
      className={cn(baseInputStyles, focusInputStyles, placeholderStyles, sizes[size], className)}
      {...props}
    />
  )
})

export { Input }

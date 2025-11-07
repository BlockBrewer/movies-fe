import type { RefObject } from 'react'
import { useEffect } from 'react'

export function useAutofillBackground(
  refs: Array<RefObject<HTMLInputElement>>,
  options: { color?: string } = {},
) {
  const { color = '#224957' } = options

  useEffect(() => {
    const applyStyles = () => {
      refs.forEach((ref) => {
        const input = ref.current
        if (!input) return

        input.style.setProperty('background-color', color, 'important')
        input.style.setProperty('-webkit-box-shadow', `0 0 0 1000px ${color} inset`, 'important')
        input.style.setProperty('box-shadow', `0 0 0 1000px ${color} inset`, 'important')
      })
    }

    applyStyles()
    const interval = window.setInterval(applyStyles, 100)
    const timeouts = [100, 300, 500, 1000, 2000].map((delay) => window.setTimeout(applyStyles, delay))

    return () => {
      window.clearInterval(interval)
      timeouts.forEach((timeoutId) => window.clearTimeout(timeoutId))
    }
  }, [color, refs])
}


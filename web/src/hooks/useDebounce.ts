import { useEffect, useState } from 'react'

export default function useDebounce<T>(value: T, delay: number = 500) {
  const [debounce, setDebounce] = useState<T>(value)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounce(value)
    }, delay)

    return () => {
      clearTimeout(timeout)
    }
  }, [value, delay])

  return debounce
}

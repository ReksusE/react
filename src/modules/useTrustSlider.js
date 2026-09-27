import { useRef, useCallback } from 'react'

export default function useTrustSlider(scrollAmount = 320) {
  const sliderRef = useRef(null)

  const scroll = useCallback(
    (direction) => {
      if (!sliderRef.current) {return}
      sliderRef.current.scrollBy({
        left: direction === 'next' ? scrollAmount : -scrollAmount,
        behavior: 'smooth',
      })
    },
    [scrollAmount]
  )

  const scrollNext = useCallback(() => scroll('next'), [scroll])
  const scrollPrev = useCallback(() => scroll('prev'), [scroll])

  return { sliderRef, scrollNext, scrollPrev }
}
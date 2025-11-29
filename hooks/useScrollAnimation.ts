'use client'

import { useRef, useEffect, useState, RefObject } from 'react'

interface UseScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

interface UseScrollAnimationReturn<T extends HTMLElement> {
  ref: RefObject<T>
  isVisible: boolean
}

export function useScrollAnimation<T extends HTMLElement = HTMLElement>(
  options: UseScrollAnimationOptions = {}
): UseScrollAnimationReturn<T> {
  const { threshold = 0.2, rootMargin = '0px', once = true } = options
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) {
            observer.disconnect()
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return { ref, isVisible }
}

// Helper function to calculate staggered delay
export function getStaggerDelay(index: number, baseDelay: number = 0.4, stagger: number = 0.3): string {
  return `${baseDelay + index * stagger}s`
}

// Animation class names for consistent usage
export const animationClasses = {
  title: 'scroll-animate-title',
  card: 'scroll-animate-card',
  item: 'scroll-animate-item',
  fadeUp: 'scroll-animate-fade-up',
  fadeLeft: 'scroll-animate-fade-left',
  fadeRight: 'scroll-animate-fade-right',
  scale: 'scroll-animate-scale',
}


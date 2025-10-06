"use client"

import { useEffect } from "react"
import Lenis from "lenis"

export default function LenisProvider() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: false,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    ;(window as any).lenis = lenis

    return () => {
      lenis.destroy()
      ;(window as any).lenis = undefined
    }
  }, [])

  return null
}
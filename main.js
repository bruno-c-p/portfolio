import './style.css'
import { setupLenis } from './src/lenis'
import { setupScrollAnimations } from './src/scroll-animations'
import { setupAboutAnimations } from './src/about-animations'
import { setupHomeAnimations } from './src/home-animations'

setupScrollAnimations()

gsap.registerPlugin(ScrollTrigger)

gsap.from('.menu', 1, {
  opacity: 0,
  delay: 1,
  ease: Expo.easeIn
})

setupHomeAnimations()
setupAboutAnimations()
setupLenis()
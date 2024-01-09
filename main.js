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

const details = gsap.utils.toArray(".desktopContentSection:not(:first-child)")
const photos = gsap.utils.toArray(".desktopPhoto:not(:first-child)")
const allPhotos = gsap.utils.toArray(".desktopPhoto")
gsap.set(photos, { yPercent: 101 })

let mm = gsap.matchMedia()

mm.add("(min-width: 640px)", () => {
  ScrollTrigger.create({
    trigger: ".gallery",
    start: "top top",
    end: "bottom bottom",
    pin: ".right"
  })
  details.forEach((detail, index) => {
    let headline = detail.querySelector("h2")
    let animation = gsap.timeline()
      .to(photos[index], { yPercent: 0 })
      .set(allPhotos[index], { autoAlpha: 0 })
    ScrollTrigger.create({
      trigger: headline,
      start: "top 80%",
      end: "top 50%",
      animation: animation,
      scrub: true,
      markers: false,
    })
  })
})
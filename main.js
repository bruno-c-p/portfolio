import './style.css'

gsap.registerPlugin(ScrollTrigger)

gsap.utils.toArray('.gsap-container').forEach((container, index) => {
  gsap.to(container, {
    autoAlpha: 1,
    ease: 'power1.in',
    scrollTrigger: {
      trigger: container,
      pin: true,
      scrub: index === 0 ? false : true,
    }
  })
})

gsap.utils.toArray('.socials li').forEach((social, index) => {
  gsap.from(social, {
    opacity: 0,
    delay: 1.2 + index * .1,
    y: 20,
    ease: Expo.easeInOut
  })
})

gsap.utils.toArray('.stack li').forEach((stack, index) => {
  gsap.from(stack, {
    opacity: 0,
    delay: .4 + index * .1,
    x: -20,
    ease: Expo.easeInOut
  })
})

gsap.from(".message", 1, {
  opacity: 0,
  delay: .1,
  y: 20,
  ease: Expo.easeInOut
})

gsap.from(".name", 1, {
  opacity: 0,
  delay: .1,
  x: -30,
  ease: Expo.easeInOut
})

gsap.from(".job", 1, {
  opacity: 0,
  delay: .2,
  x: -30,
  ease: Expo.easeInOut
})
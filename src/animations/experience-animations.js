export function setupExperienceAnimations() {
  gsap.from("#experience img", 1, {
    opacity: 0,
    delay: .1,
    ease: Expo.easeInOut
  })

  gsap.from(".exp-stack", 1, {
    opacity: 0,
    delay: 1,
    y: 20,
    ease: Expo.easeInOut
  })

  gsap.from("#experience h1", 1, {
    opacity: 0,
    delay: .4,
    x: -30,
    ease: Expo.easeInOut
  })

  gsap.from("#experience h2", 1, {
    opacity: 0,
    delay: .5,
    x: -30,
    ease: Expo.easeInOut
  })
}
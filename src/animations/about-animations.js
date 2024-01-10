export function setupAboutAnimations() {
  gsap.from(".about", 1, {
    scrollTrigger: {
      trigger: '.about',
      start: 'top center'
    },
    x: -30,
    opacity: 0,
    delay: .1,
  })

  gsap.from(".about-title", 1, {
    scrollTrigger: {
      trigger: '.about',
      start: 'top center'
    },
    x: -30,
    opacity: 0,
    delay: .1,
  })

  gsap.from(".personal-info-title", 1, {
    scrollTrigger: {
      trigger: '.about',
      start: 'top center'
    },
    x: -30,
    opacity: 0,
    delay: .1,
  })

  gsap.utils.toArray('.about-text p').forEach((about, index) => {
    gsap.from(about, {
      scrollTrigger: {
        trigger: '.about',
        start: 'top center'
      },
      opacity: 0,
      delay: .4 + index * .3,
      y: 20,
      ease: Expo.easeInOut
    })
  })

  gsap.utils.toArray('.personal-info-item ').forEach((info, index) => {
    gsap.from(info, {
      scrollTrigger: {
        trigger: '.about',
        start: 'top center'
      },
      opacity: 0,
      delay: .4 + index * .1,
      y: 20,
      ease: Expo.easeInOut
    })
  })
}
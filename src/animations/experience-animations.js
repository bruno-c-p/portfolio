export function setupExperienceAnimations() {
  gsap.from("#experience img", 1, {
    opacity: 0,
    delay: 0.1,
    ease: Expo.easeInOut,
    scrollTrigger: {
      trigger: "#experience",
      start: "top center",
      repeat: -1,
      toggleActions: "restart none restart reset",
    },
  });

  gsap.from(".exp-stack", 1, {
    opacity: 0,
    delay: 1,
    y: 20,
    ease: Expo.easeInOut,
    scrollTrigger: {
      trigger: "#experience",
      start: "top center",
      repeat: -1,
      toggleActions: "restart none restart reset",
    },
  });

  gsap.from("#experience h1", 1, {
    opacity: 0,
    delay: 0.4,
    x: -30,
    ease: Expo.easeInOut,
    scrollTrigger: {
      trigger: "#experience",
      start: "top center",
      repeat: -1,
      toggleActions: "restart none restart reset",
    },
  });

  gsap.from("#experience h2", 1, {
    opacity: 0,
    delay: 0.5,
    x: -30,
    ease: Expo.easeInOut,
    scrollTrigger: {
      trigger: "#experience",
      start: "top center",
      repeat: -1,
      toggleActions: "restart none restart reset",
    },
  });
}

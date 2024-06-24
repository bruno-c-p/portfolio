export function setupContactAnimations() {
  gsap.from("#contact h1", 1, {
    opacity: 0,
    x: -30,
    delay: 0.1,
    ease: Expo.easeInOut,
    scrollTrigger: {
      trigger: "#contact",
      start: "top center",
      repeat: -1,
      toggleActions: "restart none restart reset",
    },
  });

  gsap.utils.toArray("#contact p").forEach((p, index) => {
    gsap.from(p, {
      opacity: 0,
      delay: 0.4 + index * 0.1,
      y: 20,
      ease: Expo.easeInOut,
      scrollTrigger: {
        trigger: "#contact",
        start: "top center",
        repeat: -1,
        toggleActions: "restart none restart reset",
      },
    });
  });

  gsap.utils.toArray("#contact a").forEach((a, index) => {
    gsap.from(a, {
      opacity: 0,
      delay: 1 + index * 0.5,
      y: 20,
      ease: Expo.easeInOut,
      scrollTrigger: {
        trigger: "#contact",
        start: "top center",
        repeat: -1,
        toggleActions: "restart none restart reset",
      },
    });
  });

  gsap.from("#contact span", {
    opacity: 0,
    delay: 1 + 1 * 1.5,
    ease: Expo.easeInOut,
    scrollTrigger: {
      trigger: "#contact",
      start: "top center",
      repeat: -1,
      toggleActions: "restart none restart reset",
    },
  });
}

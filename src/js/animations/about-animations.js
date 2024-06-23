export function setupAboutAnimations() {
  gsap.from("#about-text", 1, {
    scrollTrigger: {
      trigger: "#about-text",
      start: "top center",
      repeat: -1,
      toggleActions: "restart none restart reset",
    },
    x: -30,
    opacity: 0,
    delay: 0.1,
  });

  gsap.from("#about-text h1", 1, {
    scrollTrigger: {
      trigger: "#about-text",
      start: "top center",
      repeat: -1,
      toggleActions: "restart none restart reset",
    },
    x: -30,
    opacity: 0,
    delay: 0.1,
  });

  gsap.utils.toArray("#about-text > div > p").forEach((about, index) => {
    gsap.from(about, {
      scrollTrigger: {
        trigger: "#about-text",
        start: "top center",
        repeat: -1,
        toggleActions: "restart none restart reset",
      },
      opacity: 0,
      delay: 0.4 + index * 0.3,
      y: 20,
      ease: Expo.easeInOut,
    });
  });

  gsap.from("#personal-info h2", 1, {
    scrollTrigger: {
      trigger: "#personal-info",
      start: "top center",
      repeat: -1,
      toggleActions: "restart none restart reset",
    },
    x: -30,
    opacity: 0,
    delay: 0.1,
  });

  gsap.utils.toArray("#personal-info ul li").forEach((info, index) => {
    gsap.from(info, {
      scrollTrigger: {
        trigger: "#personal-info",
        start: "top center",
        repeat: -1,
        toggleActions: "restart none restart reset",
      },
      opacity: 0,
      delay: 0.4 + index * 0.1,
      y: 20,
      ease: Expo.easeInOut,
    });
  });
}

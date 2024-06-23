export function setupHomeAnimations() {
  gsap.from("#home img", 1, {
    opacity: 0,
    delay: 0.1,
    ease: Expo.easeInOut,
  });

  gsap.utils.toArray("#home > ul li").forEach((social, index) => {
    gsap.from(social, {
      opacity: 0,
      delay: 1.2 + index * 0.1,
      y: 20,
      ease: Expo.easeInOut,
    });
  });

  gsap.utils.toArray("#home > div > div > ul li").forEach((stack, index) => {
    gsap.from(stack, {
      opacity: 0,
      delay: 0.4 + index * 0.1,
      x: -20,
      ease: Expo.easeInOut,
    });
  });

  gsap.from("#home p", 1, {
    opacity: 0,
    delay: 0.1,
    y: 20,
    ease: Expo.easeInOut,
  });

  gsap.from("#home h1", 1, {
    opacity: 0,
    delay: 0.4,
    x: -30,
    ease: Expo.easeInOut,
  });

  gsap.from("#home h2", 1, {
    opacity: 0,
    delay: 0.5,
    x: -30,
    ease: Expo.easeInOut,
  });
}

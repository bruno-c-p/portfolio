import "./style.css";
import { setupLenis } from "./src/lenis";
import { setupMenuAnimations } from "./src/animations/scroll-animations";
import { setupAboutAnimations } from "./src/animations/about-animations";
import { setupHomeAnimations } from "./src/animations/home-animations";
import { setupProjectsAnimations } from "./src/animations/projects-animations";
import { setupContactAnimations } from "./src/animations/contact-animations";
import { setupExperienceAnimations } from "./src/animations/experience-animations";

setupMenuAnimations();

gsap.registerPlugin(ScrollTrigger);

gsap.from("#menu", 1, {
  opacity: 0,
  delay: 1,
  ease: Expo.easeIn,
});

setupHomeAnimations();
setupAboutAnimations();
setupExperienceAnimations();
setupProjectsAnimations();
setupContactAnimations();
setupLenis();

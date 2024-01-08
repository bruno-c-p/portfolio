import './style.css'
import { debounce } from './src/debounce';

const $navLinks = document.querySelectorAll('.nav__link')
const $sections = document.querySelectorAll('.section')
let currentSection = 'home'

const debounceScroll = debounce(() => {
  $sections.forEach(section => {
    if (window.scrollY >= (section.offsetTop - 150)) {
      currentSection = section.id;
    }
  });
  $navLinks.forEach(link => {
    if (link.href.includes(currentSection)) {
      $navLinks.forEach(navLink => {
        navLink.parentNode.classList.remove('active');
      });
      link.parentNode.classList.add('active');
    }
  });
}, 20);

window.addEventListener('scroll', debounceScroll);

gsap.registerPlugin(ScrollTrigger)

gsap.from('.menu', 1, {
  opacity: 0,
  delay: 1,
  ease: Expo.easeIn
})

gsap.from(".profile", 1, {
  opacity: 0,
  delay: .1,
  ease: Expo.easeInOut
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
  delay: .4,
  x: -30,
  ease: Expo.easeInOut
})

gsap.from(".job", 1, {
  opacity: 0,
  delay: .5,
  x: -30,
  ease: Expo.easeInOut
})

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

const lenis = new Lenis()

lenis.on('scroll', (e) => { })

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)
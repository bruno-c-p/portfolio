import { debounce } from '../debounce'

export function setupMenuAnimations() {
  const $navLinks = document.querySelectorAll('.nav__link')
  const $sections = document.querySelectorAll('.section')
  let currentSection = 'home'

  const debounceScroll = debounce(() => {
    $sections.forEach(section => {
      if (window.scrollY >= (section.offsetTop - 150)) {
        currentSection = section.id
      }
    })
    $navLinks.forEach(link => {
      if (link.href.includes(currentSection)) {
        $navLinks.forEach(navLink => {
          navLink.parentNode.classList.remove('active')
        })
        link.parentNode.classList.add('active')
      }
    })
  }, 20)

  window.addEventListener('scroll', debounceScroll)
}
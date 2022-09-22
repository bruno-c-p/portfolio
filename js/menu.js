const botaoMobile = document.querySelector("#botao-menu-mobile")

function toggleMenu(event) {
  if (event.type == "touchstart") {
    event.preventDefault()
  }

  const navegacao = document.querySelector("#navegacao")
  navegacao.classList.toggle("ativo")

  const ativo = navegacao.classList.contains("ativo")
  event.currentTarget.setAttribute("aria-expanded", ativo)

  if (ativo) {
    event.currentTarget.setAttribute("aria-label", "Fechar Menu")
  } else {
    event.currentTarget.setAttribute("aria-label", "Abrir Menu")
  }
}

botaoMobile.addEventListener("click", toggleMenu)
botaoMobile.addEventListener("touchstart", toggleMenu)

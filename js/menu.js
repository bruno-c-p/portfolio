const botaoMobile = document.querySelector("#botao-menu-mobile")
const opcoesMenu = document.querySelectorAll(".cabecalho__lista-link")

function toggleMenu(event) {
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

opcoesMenu.forEach((opcao) => {
  opcao.addEventListener("click", toggleMenu)
})

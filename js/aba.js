const abas = document.querySelectorAll(".experiencia__abas li")
const conteudos = document.querySelectorAll(".experiencia__aba-conteudos li")

abas.forEach((item) => {
  item.addEventListener("click", function () {
    const conteudo = document.querySelector(this.dataset.target)

    abas.forEach((i) => {
      i.classList.remove("ativo")
    })

    conteudos.forEach((i) => {
      i.classList.remove("ativo")
    })

    conteudo.classList.add("ativo")
    this.classList.add("ativo")
  })
})

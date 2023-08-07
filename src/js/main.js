const menuButton = document.querySelector("#menuButton");
const menuMobile = document.querySelector("#menuMobile");

menuButton.addEventListener("click", () => {
  handleIcon();
  menuMobile.classList.toggle("hidden");
});

function handleIcon() {
  const menuIcon = document.querySelector("#menuIcon");
  menuIcon.name = menuIcon.name === "menu" ? "close" : "menu";
}

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
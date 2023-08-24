import '/style.css';

document.addEventListener("DOMContentLoaded", () => document.getElementById("defaultOpen").click());

const linksMenuMobile = document.querySelectorAll(".link-menu-mobile");
const menuButton = document.querySelector("#menuButton");
const menuMobile = document.querySelector("#menuMobile");

linksMenuMobile.forEach(link => link.addEventListener("click", () => {
  handleIcon();
  menuMobile.classList.toggle("hidden");
}));

menuButton.addEventListener("click", () => {
  handleIcon();
  menuMobile.classList.toggle("hidden");
});

function handleIcon() {
  const menuIcon = document.querySelector("#menuIcon");
  menuIcon.name = menuIcon.name === "menu" ? "close" : "menu";
}

const buttons = document.querySelectorAll('.tablinks');

buttons.forEach(button => {
  button.addEventListener("click", function(event) {
    const companyName = event.currentTarget.getAttribute('data-company');
    const tabcontent = document.getElementsByClassName("tabcontent");
    const tablinks = document.getElementsByClassName("tablinks");
  
    for (let i = 0; i < tabcontent.length; i++) {
      tabcontent[i].classList.add("hidden");
    }
  
    for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].classList.remove(
        "bg-blue-950",
        "font-bold",
        "text-blue-400",
        "border-b-4",
        "sm:border-l-4",
        "sm:border-b-0",
        "border-blue-400"
      );
    }
  
    document.getElementById(companyName).classList.remove("hidden");
    event.currentTarget.classList.add(
      "bg-blue-950",
      "font-bold",
      "text-blue-400",
      "border-b-4",
      "sm:border-l-4",
      "sm:border-b-0",
      "border-blue-400"
    );
  });
})
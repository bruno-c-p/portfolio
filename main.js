import './style.css'

document.getElementById("defaultOpen").click();
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

function openExperience(event, companyName) {
  const tabcontent = document.getElementsByClassName("tabcontent");
  const tablinks = document.getElementsByClassName("tablinks");

  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].classList.add("hidden");
  }

  for (i = 0; i < tablinks.length; i++) {
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
}
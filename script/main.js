let userName = "";
let gameChoosen = "";
let games = document.querySelectorAll(".choices");

const userInput = document.getElementById("user-input");
const submitForm = document.getElementById("submitForm");

const choicesSound = new Audio("/assets/sounds/choiceSound.mp3");
const playSound = new Audio("/assets/sounds/playSound.mp3");

userInput.addEventListener("input", (e) => {
  userName = e.target.value;
});

games.forEach((game) => {
  game.addEventListener("click", (e) => {
    e.preventDefault();
    choicesSound.play();
    games.forEach((g) => {
      g.style.border = "";
      g.style.borderRadius = "";
    });
    gameChoosen = game.id;
    if (gameChoosen === "amongUs") {
      game.style.border = "3px solid #f4271c";
    } else {
      game.style.border = "3px solid #2ca912";
    }
    game.style.borderRadius = "0.3em";
  });
});

submitForm.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.setItem("userName", userName);
  console.log(userName.length);
  if (userName.length === 0) {
    alert("rentre un pseudo");
  } else {
    switch (gameChoosen) {
      case "amongUs":
        playSound.play();
        setTimeout(() => {
          window.location.href = "/amongUs.html";
        }, 3000);
        break;
      case "minecraft":
        window.location.href = "/minecraft.html";
        break;
      default:
        alert("Tu n'as pas sélectionné de jeu");
        break;
    }
  }
});

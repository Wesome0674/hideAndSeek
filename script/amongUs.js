import { spots } from "./spots.js";

const user = document.getElementById("user");
const layer = document.getElementById("layer");
const map = document.querySelector(".hiding-spots");
const dataVent = document.getElementById("info-data-vents");
const dataTry = document.getElementById("info-data-try");
const hud = document.querySelector(".game-info");
const dataWin = document.getElementById("info-data-win");
const dataLost = document.getElementById("info-data-lost");
const lostPanel = document.getElementById("lost-panel");
const winPanel = document.getElementById("win-panel");
let jerma = document.getElementById("jermaScreamer");
const replayButtons = document.querySelectorAll("#replay");
const emergencyButton = document.getElementById("buttonEmergency");

lostPanel.style.display = "none";
winPanel.style.display = "none";
jerma.style.display = "none";

let numberOfVents = 64;
let numberOfTries = 7;
let gameWon = 0;
let gameLost = 0;
let randomSpot;
let changeSpotsInterval;

let emergency = new Audio("/assets/sounds/emergencySound.mp3");
let wrong = new Audio("/assets/sounds/wrong.mp3");
let lostSound = new Audio("/assets/sounds/win.mp3");
let wonSound = new Audio("/assets/sounds/gameLost.mp3");
let ventIn = new Audio("/assets/sounds/ventIn.mp3");

user.innerHTML = localStorage.getItem("userName");
dataVent.innerHTML = numberOfVents;
dataTry.innerHTML = numberOfTries;
dataWin.innerHTML = gameWon;
dataLost.innerHTML = gameLost;

const changeSpots = () => {
  const motion = document.getElementById("motion");

  changeSpotsInterval = setInterval(() => {
    const availableSpots = spots.filter((spot) => !spot.wasClicked);
    ventIn.play();

    if (availableSpots.length > 0) {
      spots[randomSpot].isImposter = false;

      const newSpotIndex = Math.floor(Math.random() * availableSpots.length);
      const newSpot = availableSpots[newSpotIndex];

      randomSpot = spots.indexOf(newSpot);
      spots[randomSpot].isImposter = true;

      motion.style.display = "block";
      console.log("Nouvel emplacement de l'imposteur:", randomSpot);

      setTimeout(() => {
        motion.style.display = "none";
      }, 1000);
    }
  }, 5000);
};

const displaySpots = () => {
  map.innerHTML = spots
    .map((spot, index) => {
      return `
      <div id="spot-${index}" class="spot" style="position: absolute; left:${spot.posX}; top:${spot.posY}; width: 50px;">
        <img src="${spot.img}" />
        <img class="red-cross" src="/assets/img/png/cross-red.webp" />
      </div>`;
    })
    .join("");
};

const revealSpot = () => {
  spots[randomSpot].img = "/assets/img/png/jerma.png";
  displaySpots();
};

const setImposter = () => {
  randomSpot = Math.floor(Math.random() * spots.length);
  console.log("Spot imposter choisi:", randomSpot);
  spots[randomSpot].isImposter = true;
  console.log(spots);
  return randomSpot;
};

replayButtons.forEach((button) => {
  button.addEventListener("click", () => {
    lostPanel.style.display = "none";
    winPanel.style.display = "none";

    numberOfVents = 64;
    numberOfTries = 7;
    dataVent.innerHTML = numberOfVents;
    dataTry.innerHTML = numberOfTries;

    spots.forEach((spot) => {
      spot.isImposter = false;
      spot.wasClicked = false;
    });
    setImposter();

    const crosses = document.querySelectorAll(".red-cross");
    crosses.forEach((cross) => (cross.style.display = "none"));

    console.log("Le jeu a été réinitialisé pour une nouvelle partie !");
    changeSpots();
  });
});

function typeWriter(text) {
  let i = 0;
  const speed = 100;

  let txt = "";
  let targetElement = null;

  if (text === "lost") {
    txt = "You Just Lost";
    targetElement = document.querySelector(".lost-text");
  } else {
    txt = "You Just Won GG";
    targetElement = document.querySelector(".win-text");
  }

  if (targetElement) targetElement.innerHTML = "";

  function write() {
    if (i < txt.length) {
      targetElement.innerHTML += txt.charAt(i);
      i++;
      setTimeout(write, speed);
    }
  }

  write();
}

const isGameLost = () => {
  if (numberOfTries <= 1) {
    clearInterval(changeSpotsInterval);
    console.log("Jerma ne peut plus bouger : partie perdue.");
    revealSpot();
    lostSound.play();
    setTimeout(() => {
      lostPanel.style.display = "grid";
      typeWriter("lost");
      gameLost++;
      dataLost.innerHTML = gameLost;
    }, 3000);
  }
};

const isGameWon = () => {
  clearInterval(changeSpotsInterval);
  console.log("Jerma ne peut plus bouger : partie gagnée.");
  jerma.style.display = "none";
  winPanel.style.display = "grid";
  typeWriter("win");
  gameWon++;
  dataWin.innerHTML = gameWon;
};

emergencyButton.addEventListener("click", () => {
  emergencyButton.src = "/assets/img/png/emergencyButton2.png";
  emergency.play();
  setTimeout(() => {
    layer.style.display = "none";
    setImposter();
    changeSpots();
  }, 1000);
});

displaySpots();

const hiddingSpot = document.querySelectorAll(".spot");

hiddingSpot.forEach((spot, index) => {
  spot.addEventListener("click", () => {
    const cross = spot.querySelector(".red-cross");

    if (spots[index].wasClicked) {
      console.log("Ce spot a déjà été cliqué !");
      return;
    }
    spots[index].wasClicked = true;

    if (spots[index].isImposter) {
      console.log("C'est un imposter !");
      jerma.style.display = "block";
      wonSound.play();
      setTimeout(() => {
        isGameWon();
      }, 3000);
    } else {
      console.log("Ce n'est pas un imposter.");
      isGameLost();
      numberOfVents--;
      dataVent.innerHTML = numberOfVents;
      numberOfTries--;
      dataTry.innerHTML = numberOfTries;
      wrong.play();
      cross.style.display = "block";
    }
  });
});

motion.style.display = "none";

document.addEventListener("mousemove", (e) => {
  const distanceFromEdge = 100;
  const scrollSpeed = 30;

  if (e.clientY > window.innerHeight - distanceFromEdge) {
    window.scrollBy(0, scrollSpeed);
  }
  if (e.clientY < distanceFromEdge) {
    window.scrollBy(0, -scrollSpeed);
  }

  if (e.clientX > window.innerWidth - distanceFromEdge) {
    window.scrollBy(scrollSpeed, 0);
  }

  if (e.clientX < distanceFromEdge) {
    window.scrollBy(-scrollSpeed, 0);
  }
});

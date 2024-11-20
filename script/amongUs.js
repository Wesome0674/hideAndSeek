const spots = [
  {
    img: "assets/img/png/red-among.png",
    posX: "185px",
    posY: 0,
    isImposter: false,
  },
  {
    img: "assets/img/png/red-among.png",
    posX: 0,
    posY: 0,
    isImposter: false,
  },
  {
    img: "assets/img/png/red-among.png",
    posX: "185px",
    posY: "200px",
    isImposter: false,
  },
  {
    img: "assets/img/png/red-among.png",
    posX: "50px",
    posY: "200px",
    isImposter: false,
  },
  {
    img: "assets/img/png/red-among.png",
    posX: "300px",
    posY: "300px",
    isImposter: false,
  },
];

const user = document.getElementById("user");
const layer = document.getElementById("layer");
const map = document.querySelector(".hiding-spots");
const dataVent = document.getElementById("info-data-vents");
const dataTry = document.getElementById("info-data-try");
const hud = document.querySelector(".game-info");
const dataWin = document.getElementById("info-data-win");
const dataLost = document.getElementById("info-data-lost");

let numberOfVents = 64;
let numberOfTries = 7;
let gameWon = 0;
let gameLost = 0;

let emergency = new Audio("/assets/sounds/emergencySound.mp3");
let wrong = new Audio("/assets/sounds/wrong.mp3");
let lostSound = new Audio("/assets/sounds/win.mp3");
let wonSound = new Audio("/assets/sounds/gameLost.mp3");

user.innerHTML = localStorage.getItem("userName");
dataVent.innerHTML = numberOfVents;
dataTry.innerHTML = numberOfTries;
dataWin.innerHTML = gameWon;
dataLost.innerHTML = gameLost;

const emergencyButton = document.getElementById("buttonEmergency");

const isGameLost = () => {
  if (numberOfTries <= 1) {
    lostSound.play();
    hud.innerHTML = "";
    const jerma = document.createElement("div");
    jerma.className = "jerma";
    hud.appendChild(jerma);
    gameLost++;
    dataLost.innerHTML = gameLost;
  }
};

const isGameWon = () => {
  wonSound.play();
  hud.innerHTML = "";
  const jerma = document.createElement("div");
  jerma.className = "jerma";
  hud.appendChild(jerma);
  gameWon++;
  dataWin.innerHTML = gameWon;
};

emergencyButton.addEventListener("click", () => {
  emergencyButton.src = "/assets/img/png/emergencyButton2.png";
  emergency.play();
  setTimeout(() => {
    layer.style.display = "none";
  }, 1000);
});

// Création des spots et de la croix pour chaque spot
map.innerHTML = spots
  .map((spot, index) => {
    return `
      <div id="spot-${index}" class="spot" style="position: absolute; left:${spot.posX}; top:${spot.posY};">
        <img src="${spot.img}" />
        <img class="red-cross" src="/assets/img/png/cross-red.webp" />
      </div>`;
  })
  .join("");

// Fonction pour désigner un imposter aléatoirement
const setImposter = () => {
  let randomSpot = Math.floor(Math.random() * spots.length);
  console.log("Spot imposter choisi:", randomSpot);
  spots[randomSpot].isImposter = true;
  console.log(spots);
};

setImposter();

// Récupérer tous les spots
const hiddingSpot = document.querySelectorAll(".spot");

// Ajouter un événement de clic sur chaque spot
hiddingSpot.forEach((spot, index) => {
  spot.addEventListener("click", () => {
    const cross = spot.querySelector(".red-cross");
    if (spots[index].isImposter) {
      console.log("C'est un imposter !");
      isGameWon();
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

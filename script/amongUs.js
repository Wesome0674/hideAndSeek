const spots = [
  {
    img: "assets/img/png/red-among.png",
    posX: "185px",
    posY: 0,
    isImposter: false,
    wasClicked: false, // Nouveau champ
  },
  {
    img: "assets/img/png/red-among.png",
    posX: 0,
    posY: 0,
    isImposter: false,
    wasClicked: false, // Nouveau champ
  },
  {
    img: "assets/img/png/red-among.png",
    posX: "185px",
    posY: "200px",
    isImposter: false,
    wasClicked: false, // Nouveau champ
  },
  {
    img: "assets/img/png/red-among.png",
    posX: "50px",
    posY: "200px",
    isImposter: false,
    wasClicked: false, // Nouveau champ
  },
  {
    img: "assets/img/png/red-among.png",
    posX: "300px",
    posY: "300px",
    isImposter: false,
    wasClicked: false, // Nouveau champ
  },
  {
    img: "assets/img/png/red-among.png",
    posX: "500px",
    posY: "300px",
    isImposter: false,
    wasClicked: false, // Nouveau champ
  },
  {
    img: "assets/img/png/red-among.png",
    posX: "700px",
    posY: "300px",
    isImposter: false,
    wasClicked: false, // Nouveau champ
  },
  {
    img: "assets/img/png/red-among.png",
    posX: "900px",
    posY: "300px",
    isImposter: false,
    wasClicked: false, // Nouveau champ
  },
  {
    img: "assets/img/png/red-among.png",
    posX: "1100px",
    posY: "300px",
    isImposter: false,
    wasClicked: false, // Nouveau champ
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
const lostPanel = document.getElementById("lost-panel");
const winPanel = document.getElementById("win-panel");
let LobbyButton = document.getElementById("lobby");
let jerma = document.getElementById("jermaScreamer");

lostPanel.style.display = "none";
winPanel.style.display = "none";
jerma.style.display = "none";

let numberOfVents = 64;
let numberOfTries = 7;
let gameWon = 0;
let gameLost = 0;
let randomSpot;

let emergency = new Audio("/assets/sounds/emergencySound.mp3");
let wrong = new Audio("/assets/sounds/wrong.mp3");
let lostSound = new Audio("/assets/sounds/win.mp3");
let wonSound = new Audio("/assets/sounds/gameLost.mp3");

user.innerHTML = localStorage.getItem("userName");
dataVent.innerHTML = numberOfVents;
dataTry.innerHTML = numberOfTries;
dataWin.innerHTML = gameWon;
dataLost.innerHTML = gameLost;

const setImposter = () => {
  randomSpot = Math.floor(Math.random() * spots.length);
  console.log("Spot imposter choisi:", randomSpot);
  spots[randomSpot].isImposter = true;
  console.log(spots);
  return randomSpot;
};

const replayButtons = document.querySelectorAll("#replay");

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
      spot.wasClicked = false; // Réinitialiser la propriété
    });
    setImposter();

    const crosses = document.querySelectorAll(".red-cross");
    crosses.forEach((cross) => (cross.style.display = "none"));

    console.log("Le jeu a été réinitialisé pour une nouvelle partie !");
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

const emergencyButton = document.getElementById("buttonEmergency");

const isGameLost = () => {
  if (numberOfTries <= 1) {
    // Remplacer l'image de l'imposteur par celle de Jerma
    spots[randomSpot].img = "/assets/img/png/jerma.png";
    lostSound.play();

    setTimeout(() => {
      // Affichage du panneau de fin après 3 secondes
      lostPanel.style.display = "grid";
      typeWriter("lost");
      gameLost++;
      dataLost.innerHTML = gameLost;
    }, 3000);
  }
};

const isGameWon = () => {
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

setImposter();

// Récupérer tous les spots
const hiddingSpot = document.querySelectorAll(".spot");

// Ajouter un événement de clic sur chaque spot
hiddingSpot.forEach((spot, index) => {
  spot.addEventListener("click", () => {
    const cross = spot.querySelector(".red-cross");

    // Vérifier si le spot a déjà été cliqué
    if (spots[index].wasClicked) {
      console.log("Ce spot a déjà été cliqué !");
      return; // Ignorer le reste de l'action
    }

    // Marquer le spot comme cliqué
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

const changeSpots = () => {
  const motion = document.getElementById("motion");
  setInterval(() => {
    motion.style.display = "block";
    setTimeout(() => {
      motion.style.display = "none";
    }, 1000);
  }, 5000);
};

changeSpots();

document.addEventListener('mousemove', (e) => {
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

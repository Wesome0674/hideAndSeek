const spots = [
  {
    img: "assets/img/png/red-among.png",
    posX: "185px",
    posY: 0,
    isImposter: false
  },
  {
    img: "assets/img/png/red-among.png",
    posX: 0,
    posY: 0,
    isImposter: false
  },
  {
    img: "assets/img/png/red-among.png",
    posX: "185px",
    posY: "200px",
    isImposter: false
  },
  {
    img: "assets/img/png/red-among.png",
    posX: "50px",
    posY: "200px",
    isImposter: false
  },
  {
    img: "assets/img/png/red-among.png",
    posX: "300px",
    posY: "300px",
    isImposter: false
  },
];

const user = document.getElementById("user");
const layer = document.getElementById("layer");
const map = document.querySelector(".hiding-spots");

let emergency = new Audio("/assets/sounds/emergencySound.mp3");
let wrong = new Audio("/assets/sounds/wrong.mp3");

user.innerHTML = localStorage.getItem("userName");

const emergencyButton = document.getElementById("buttonEmergency");

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
}

setImposter();

// Récupérer tous les spots
const hiddingSpot = document.querySelectorAll(".spot");

// Ajouter un événement de clic sur chaque spot
hiddingSpot.forEach((spot, index) => {
  spot.addEventListener("click", () => {
    const cross = spot.querySelector(".red-cross");
    if (spots[index].isImposter) {
      console.log("C'est un imposter !");
    } else {
      console.log("Ce n'est pas un imposter.");
      wrong.play()
      cross.style.display = "block";
    }
  });
});

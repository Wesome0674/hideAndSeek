const spots = [
  {
    img: "assets/img/png/red-among.png",
    posX: "185px",
    posY: 0,
  },
  {
    img: "assets/img/png/red-among.png",
    posX: 0,
    posY: 0,
  },
  {
    img: "assets/img/png/red-among.png",
    posX: "185px",
    posY: "200px",
  },
];

const user = document.getElementById("user");
const layer = document.getElementById("layer");
const map = document.querySelector(".hiding-spots");

var emergency = new Audio("/assets/sounds/emergencySound.mp3");

user.innerHTML = localStorage.getItem("userName");

const emergencyButton = document.getElementById("buttonEmergency");

emergencyButton.addEventListener("click", () => {
  emergencyButton.src = "/assets/img/png/emergencyButton2.png";
  emergency.play();
  setTimeout(() => {
    layer.style.display = "none";
  }, 1000);
});

map.innerHTML = spots
  .map((spot) => {
    return `<div id="spot" style="position: absolute; left:${spot.posX}; top:${spot.posY};">
              <img src="${spot.img}" />
            </div>`;
  })
  .join("");

const spot = document.getElementById("spot");

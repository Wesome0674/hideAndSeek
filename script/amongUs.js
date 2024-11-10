const user = document.getElementById("user");
const layer = document.getElementById("layer");

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

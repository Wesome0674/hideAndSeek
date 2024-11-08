const user = document.getElementById("user")
const layer = document.getElementById("layer")

user.innerHTML = localStorage.getItem("userName")

const emergencyButton = document.getElementById("buttonEmergency")

emergencyButton.addEventListener("click", () =>  {
    emergencyButton.src = "/assets/img/png/emergencyButton2.png"
    setTimeout(() => {
        layer.style.display = "none"
    },1000)
}) 
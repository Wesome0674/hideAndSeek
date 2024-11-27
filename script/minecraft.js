let user1NumberHit = 0;
let user2NumberHit = 0;

let user1Hit = document.getElementById("user1Hit");
let user2Hit = document.getElementById("user2Hit");
let user1Jauge = document.getElementById("jaugeUser1");
let user2Jauge = document.getElementById("jaugeUser2");
let replayButton = document.getElementById("replay");
let winner = document.getElementById("winner");

user1Hit.innerHTML = user1NumberHit;
user2Hit.innerHTML = user2NumberHit;
replayButton.style.display = "none";

let lastHitTimeUser1 = Date.now();
let lastHitTimeUser2 = Date.now();

let decrementInterval;

const changeColorOfJauge = (userScore, userJauge) => {
  if (userScore < 25) {
    userJauge.style.backgroundColor = "green";
  } else if (userScore >= 25 && userScore < 50) {
    userJauge.style.backgroundColor = "yellow";
  } else if (userScore >= 50 && userScore < 75) {
    userJauge.style.backgroundColor = "orange";
  } else if (userScore >= 75 && userScore < 100) {
    userJauge.style.backgroundColor = "red";
  }
};

// Stop the game when a player reaches 100
const stopGame = () => {
  clearInterval(decrementInterval);
  document.removeEventListener("keyup", handleKeyPress);
  console.log("Jeu terminé !");
  if (user1NumberHit > user2NumberHit) {
    winner.innerHTML = "Winner: number 1";
  } else {
    winner.innerHTML = "Winner: number 2";
  }
  replayButton.style.display = "block";
};

// Reset game logic
const resetGame = () => {
  user1NumberHit = 0;
  user2NumberHit = 0;
  user1Hit.innerHTML = user1NumberHit;
  user2Hit.innerHTML = user2NumberHit;
  user1Jauge.style.height = "0%";
  user2Jauge.style.height = "0%";
  user1Jauge.style.backgroundColor = "green";
  user2Jauge.style.backgroundColor = "green";
  lastHitTimeUser1 = Date.now();
  lastHitTimeUser2 = Date.now();
  replayButton.style.display = "none";
  document.addEventListener("keyup", handleKeyPress);
  winner.innerHTML = "";
  startDecrement();
};

const handleKeyPress = (e) => {
  const currentTime = Date.now();

  if (user1NumberHit >= 100 || user2NumberHit >= 100) {
    stopGame();
    return;
  }

  if (e.key === "q" || e.key === "Q") {
    user1NumberHit++;
    user1Hit.innerHTML = user1NumberHit;
    user1Jauge.style.height = user1NumberHit + "%";
    changeColorOfJauge(user1NumberHit, user1Jauge);
    lastHitTimeUser1 = currentTime;
  } else if (e.key === "m" || e.key === "M") {
    user2NumberHit++;
    user2Hit.innerHTML = user2NumberHit;
    user2Jauge.style.height = user2NumberHit + "%";
    changeColorOfJauge(user2NumberHit, user2Jauge);
    lastHitTimeUser2 = currentTime;
  }
};

const startDecrement = () => {
  decrementInterval = setInterval(() => {
    const currentTime = Date.now();

    if (currentTime - lastHitTimeUser1 >= 200 && user1NumberHit > 0) {
      user1NumberHit--;
      user1Hit.innerHTML = user1NumberHit;
      user1Jauge.style.height = user1NumberHit + "%";
      changeColorOfJauge(user1NumberHit, user1Jauge);
    }

    if (currentTime - lastHitTimeUser2 >= 200 && user2NumberHit > 0) {
      user2NumberHit--;
      user2Hit.innerHTML = user2NumberHit;
      user2Jauge.style.height = user2NumberHit + "%";
      changeColorOfJauge(user2NumberHit, user2Jauge);
    }

    if (user1NumberHit >= 100 || user2NumberHit >= 100) {
      stopGame();
    }
  }, 200);
};

replayButton.addEventListener("click", resetGame);

startDecrement();

document.addEventListener("keyup", handleKeyPress);

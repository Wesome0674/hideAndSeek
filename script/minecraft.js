let user1NumberHit = 0;
let user2NumberHit = 0;
let numberOfBlocks = 4;

let blocksRemovedUser1 = 0;
let blocksRemovedUser2 = 0;

let user1Hit = document.getElementById("user1Hit");
let user2Hit = document.getElementById("user2Hit");
let user1Jauge = document.getElementById("jaugeUser1");
let user2Jauge = document.getElementById("jaugeUser2");
let replayButton = document.getElementById("replay");
let winner = document.getElementById("winner");
let pickax1 = document.getElementById("pickax1");
let pickax2 = document.getElementById("pickax2");
let blocks1 = document.getElementById("blocks1");
let blocks2 = document.getElementById("blocks2");

user1Hit.innerHTML = user1NumberHit;
user2Hit.innerHTML = user2NumberHit;
replayButton.style.display = "none";

let pickaxSound = new Audio("/assets/sounds/minecraft-pickaxe-sound.mp3");
let caveSound = new Audio("/assets/sounds/cave.mp3");
let winnerSound = new Audio("/assets/sounds/winner.mp3");

let lastHitTimeUser1 = Date.now();
let lastHitTimeUser2 = Date.now();

let decrementInterval;
let user1AnimationLock = false;
let user2AnimationLock = false;

const pickaxImg1 = [
  "/assets/img/png/pickax/Frame 26.png",
  "/assets/img/png/pickax/Frame 27.png",
  "/assets/img/png/pickax/Frame 28.png",
  "/assets/img/png/pickax/Frame 29.png",
  "/assets/img/png/pickax/Frame 30.png",
  "/assets/img/png/pickax/Frame 31.png",
];

const pickaxImg2 = [
  "/assets/img/png/pickax/pickax 1.png",
  "/assets/img/png/pickax/pickax 2.png",
  "/assets/img/png/pickax/pickax 3.png",
  "/assets/img/png/pickax/pickax 4.png",
  "/assets/img/png/pickax/pickax 5.png",
  "/assets/img/png/pickax/pickax 6.png",
];

const displayBlocks = (blocks) => {
  for (let index = 0; index < numberOfBlocks; index++) {
    let blockImg = document.createElement("img");
    blockImg.src = "/assets/img/png/diamondBlock.png";
    blocks.appendChild(blockImg);
  }
};

window.addEventListener("load", (event) => { 
  caveSound.play()
});


displayBlocks(blocks1);
displayBlocks(blocks2);

const removeBlocks = (userScore, blocks, userBlocksRemoved) => {
  const score = [25, 50, 75, 100];
  pickaxSound.play()
  for (let i = userBlocksRemoved; i < score.length; i++) {
    if (userScore >= score[i]) {
      if (blocks.children.length > 0) {
        blocks.removeChild(blocks.lastElementChild);
      }
      userBlocksRemoved++;
    }
  }

  return userBlocksRemoved;
};

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

const stopGame = () => {
  clearInterval(decrementInterval);
  document.removeEventListener("keyup", handleKeyPress);
  console.log("Jeu terminé !");
  winner.innerHTML =
    user1NumberHit > user2NumberHit ? "Winner: Player 1" : "Winner: Player 2";
  replayButton.style.display = "block";
  winnerSound.play()
};

const resetGame = () => {
  caveSound.play()
  user1NumberHit = 0;
  user2NumberHit = 0;
  blocksRemovedUser1 = 0;
  blocksRemovedUser2 = 0;

  user1Hit.innerHTML = user1NumberHit;
  user2Hit.innerHTML = user2NumberHit;
  user1Jauge.style.height = "0%";
  user2Jauge.style.height = "0%";
  user1Jauge.style.backgroundColor = "green";
  user2Jauge.style.backgroundColor = "green";

  blocks1.innerHTML = "";
  blocks2.innerHTML = "";
  displayBlocks(blocks1);
  displayBlocks(blocks2);

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
    blocksRemovedUser1 = removeBlocks(user1NumberHit, blocks1, blocksRemovedUser1);
    lastHitTimeUser1 = currentTime;

    if (!user1AnimationLock) {
      user1AnimationLock = true;
      updatePickaxImage(pickaxImg1, pickax1, () => {
        user1AnimationLock = false;
      });
    }
  } else if (e.key === "m" || e.key === "M") {
    user2NumberHit++;
    user2Hit.innerHTML = user2NumberHit;
    user2Jauge.style.height = user2NumberHit + "%";
    changeColorOfJauge(user2NumberHit, user2Jauge);
    blocksRemovedUser2 = removeBlocks(user2NumberHit, blocks2, blocksRemovedUser2);
    lastHitTimeUser2 = currentTime;

    if (!user2AnimationLock) {
      user2AnimationLock = true;
      updatePickaxImage(pickaxImg2, pickax2, () => {
        user2AnimationLock = false;
      });
    }
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

const updatePickaxImage = (tab, pickax, callback) => {
  tab.forEach((img, index) => {
    setTimeout(() => {
      pickax.src = img;
      if (index === tab.length - 1 && callback) {
        callback();
      }
    }, 200 * index);
  });
};

replayButton.addEventListener("click", resetGame);

startDecrement();

document.addEventListener("keyup", handleKeyPress);

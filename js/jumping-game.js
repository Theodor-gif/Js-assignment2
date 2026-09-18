const gameTerrain = document.querySelector(".gameTerrain");
const gameBase = document.querySelector(".gameBase");
const gameBeggin = document.querySelector("#starting-board");
const gameBoard = document.querySelector("#gameCanvas");
const player = document.querySelector("#player");
const lives = document.querySelector("#lives");
const score = document.querySelector("#score");
const controlBoard = document.querySelector("#control-container");

let gameOver = false;
let minorTerrainId = 0;
let majorTerrainId = 100000000000;
let livesAttemps = 3;
let scoreTotal = 0;
let minorTerrainInterval;
let majorTerrainInterval;
let jumpPlayer = true;

lives.innerHTML = livesAttemps;
score.innerHTML = scoreTotal;

function startGame() {
  jumpPlayer = true;
  gameBeggin.style.display = "none";
  controlBoard.style.display = "flex";
  minorTerrainInterval = setInterval(generateMinorTerrainElement, 400);
  majorTerrainInterval = setInterval(
    generateMajorTerrainElement,
    randomInterval(),
  );
  playerMove();
}

function generateMinorTerrainElement() {
  const minorTerrainElement = document.createElement("div");
  const width = randomWidth(5);
  minorTerrainElement.style.width = width + "px";
  minorTerrainElement.style.height = "3px";
  minorTerrainElement.style.position = "absolute";
  minorTerrainElement.style.right = "0px";
  minorTerrainElement.style.top = randomLocation() + "px";

  minorTerrainElement.id = minorTerrainId;
  gameTerrain.appendChild(minorTerrainElement);
  minorTerrainId++;
  let xMoveCounter = 0;
  let terrainInterval = setInterval(() => {
    if (xMoveCounter < 900 - width) {
      xMoveCounter++;
      minorTerrainElement.style.right = xMoveCounter + "px";
    } else {
      const element = document.getElementById(minorTerrainElement.id);
      gameTerrain.removeChild(element);
      clearInterval(terrainInterval);
    }
  }, 1);
}

function generateMajorTerrainElement() {
  const majorTerrainElement = document.createElement("div");
  const width = 50;
  majorTerrainElement.style.width = width + "px";
  majorTerrainElement.style.height = "100px";
  majorTerrainElement.style.position = "absolute";
  majorTerrainElement.style.right = "0px";
  majorTerrainElement.style.bottom = "0";
  majorTerrainElement.style.backgroundImage = `url("../assets/tree.png")`;
  majorTerrainElement.style.backgroundSize = "cover";
  majorTerrainElement.style.backgroundRepeat = "no-repeat";
  majorTerrainElement.id = majorTerrainId;
  gameBase.appendChild(majorTerrainElement);
  majorTerrainId++;
  let xMoveCounter = 0;
  let terrainInterval = setInterval(() => {
    if (xMoveCounter < 900 - width) {
      xMoveCounter++;
      majorTerrainElement.style.right = xMoveCounter + "px";
    } else {
      const element = document.getElementById(majorTerrainElement.id);
      gameBase.removeChild(element);
      clearInterval(terrainInterval);
      scoreTotal++;
      score.innerHTML = scoreTotal;
    }
  }, 1);
}

function randomWidth(size, constant = 0) {
  return Math.floor(Math.random() * size) + constant;
}

function randomLocation() {
  return Math.floor(Math.random() * 8) + 3;
}

function randomInterval() {
  return Math.floor(Math.random() * 4000) + 1000;
}

// Function playerMove() is for the player to jump

function playerMove() {
  document.addEventListener("keydown", function (e) {
    if (e.code === "Space" && jumpPlayer) {
      player.style.bottom = "130px";
      setTimeout(() => {
        player.style.bottom = "0px";
      }, 600);
    }
  });
}

// Pause the game

function pauseGame() {
  clearInterval(minorTerrainInterval);
  clearInterval(majorTerrainInterval);
  jumpPlayer = false;
}

function resumeGame() {
  startGame();
}

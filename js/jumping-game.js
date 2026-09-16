const gameTerrain = document.querySelector(".gameTerrain");
const gameBase = document.querySelector(".gameBase");

let gameOver = false;
let minorTerrainId = 0;
let majorTerrainId = 100000000000;

function generateMinorTerrainElement() {
  const minorTerrainElement = document.createElement("div");
  const width = randomWidth(5);
  minorTerrainElement.style.width = width + "px";
  minorTerrainElement.style.height = "2px";
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
  const width = randomWidth(20,10);
  majorTerrainElement.style.width = width + "px";
  majorTerrainElement.style.height = "80px";
  majorTerrainElement.style.position = "absolute";
  majorTerrainElement.style.right = "0px";
  majorTerrainElement.style.bottom = "0";
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
    }
  }, 1);
}
setInterval(generateMinorTerrainElement, 400);
setInterval(generateMajorTerrainElement, randomInterval());

function randomWidth(size,constant =0 ) {
  return Math.floor(Math.random() * size) + constant;
}

function randomLocation() {
  return Math.floor(Math.random() * 8) + 3;
}

function randomInterval() {
  return Math.floor(Math.random() * 4000) + 1000;
}

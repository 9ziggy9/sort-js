// GLOBAL CONSTANTS
const SEGS = 10;

// GLOBAL STATE
let HEIGHTS = [1,2,3,4,5,6,7,8,9,10];

// Grab button DOM elements
// BUTTONS
const runButton = document.getElementById("run");
const randButton = document.getElementById("randomize");
// SELECT
const sortSelect = document.getElementById("sorts");
// GRID
const grid = document.getElementById("bar-board");

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function init() {
  for (let x = 0; x < SEGS; x++) {
    for (let y = 0; y < SEGS; y++) {
      const cell = document.createElement("div");
      cell.setAttribute("id", `${x}-${y}`);
      cell.setAttribute("class", "free");
      grid.appendChild(cell);
    }
  }
}

function clear() {
  for (let x = 0; x < SEGS; x++) {
    for (let y = 0; y < SEGS; y++) {
      cell = document.getElementById(`${x}-${y}`);
      cell.classList.remove("fill");
      cell.classList.remove("occupied");
    }
  }
}

function shuff(xs) {
  for (let i = 0; i < xs.length - 1; i++) {
    const rand = Math.floor((xs.length - i) * Math.random()) + i;
    [xs[i], xs[rand]] = [xs[rand], xs[i]];
  }
  return xs;
}

async function draw() {
  for (let x = 0; x < SEGS; x++) {
    await sleep(50);
    for (let y = SEGS-1; y >= 0; y--) {
      cell = document.getElementById(`${y}-${x}`);
      if (cell.classList.contains("occupied")) cell.classList.toggle("fill");
    }
  }
}

// BUTTONS
runButton.addEventListener("click", () => {
  console.assert(false, "TODO: Implement run!");
});
randButton.addEventListener("click", async () => {
  clear();
  shuff(HEIGHTS);
  for (let x = 0; x < SEGS; x++) {
    for (let y = 0; y < SEGS; y++) {
      const cell = document.getElementById(`${x}-${y}`);
      if ((SEGS-x-1) < HEIGHTS[y]) cell.classList.toggle("occupied");
    }
  }
  await draw();
});

// OPTIONS
sortSelect.addEventListener("change", (e) => {
  console.log(e.target.value);
});

// RUN
init();

// GLOBAL CONSTANTS
const SEGS = 10;

// GLOBAL STATE
let HEIGHTS = [1,2,3,4,5,6,7,8,9,10];
let DESIRED_SORT = "bubble";

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

async function draw(ms) {
  for (let x = 0; x < SEGS; x++) {
    await sleep(ms);
    for (let y = SEGS-1; y >= 0; y--) {
      cell = document.getElementById(`${y}-${x}`);
      if (cell.classList.contains("occupied")) cell.classList.toggle("fill");
    }
  }
}

// WARNING: PURE FUNCTION
const bubbleUp = (xs) => xs.length > 1
      ? xs.length === 2
	? xs[0] < xs[1]
	  ? [xs[0], xs[1]]
	  : [xs[1], xs[0]]
      : xs[0] < xs[1]
	? [xs[0], ...bubbleUp(xs.slice(1))]
	: [xs[1], ...bubbleUp([xs[0], ...xs.slice(2)])]
      : xs;

async function bubbleSort(xs) {
  let count = xs.length;
  while (count-- > 0) {
    clear();
    occupy();
    await draw(100);
    HEIGHTS = bubbleUp(HEIGHTS);
  }
}

// BUTTONS
runButton.addEventListener("click", async () => {
  switch(DESIRED_SORT) {
  case "bubble":
    await bubbleSort(HEIGHTS);
    await draw(50);
    break;
  default:
    console.assert(false, "THAT IS NOT A VALID SORT");
  }
});

const occupy = () => {
  for (let x = 0; x < SEGS; x++) {
    for (let y = 0; y < SEGS; y++) {
      const cell = document.getElementById(`${x}-${y}`);
      if ((SEGS-x-1) < HEIGHTS[y]) cell.classList.toggle("occupied");
    }
  }
};

randButton.addEventListener("click", async () => {
  clear();
  shuff(HEIGHTS);
  occupy();
  await draw(50);
});

// OPTIONS
sortSelect.addEventListener("change", (e) => {
  DESIRED_SORT = e.target.value;
});

// RUN
init();

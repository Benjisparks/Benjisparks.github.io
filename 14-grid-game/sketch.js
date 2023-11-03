// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let GRID_SIZE = 16;
let titleFont;
let titleSize;
let theBackground;
let gmScreen = "start";
let grid;
let cellSize;

function preload(){
  titleFont = loadFont("1989.ttf");
  theBackground = loadImage("bg.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = generateGrid(GRID_SIZE,GRID_SIZE);
  titleSize = width/4;
  if (height > width) {
    cellSize = width/GRID_SIZE;
  }
  else {
    cellSize = height/GRID_SIZE;
  }
}

function draw() {
  background(220);
  //displayGrid();
  startText();
}

function runGame(){
  if( gmScreen === "start"){
    //displayBg();
    startText();
  }
  // else if(gmScreen === "game"){
  //   playGame();
  // }
}

// function playGame(){

// }

function generateGrid(cols,rows){
  let theGrid = [];
  for(let y = 0; y < cols; y++){
    theGrid.push([]);
    for(let x = 0; x < rows; x++){
      theGrid[y].push(0);
    }
  }
  return theGrid;
}

// function placeMines(){

// }

function displayGrid(){
  for(let y = 0; y < GRID_SIZE; y++){
    for(let x = 0; x < GRID_SIZE; x++){
      fill("white");
      rect(x*cellSize,y*cellSize,cellSize,cellSize);
    }
  }
}

function keyTyped(){
  if( key === ENTER){
    if(gmScreen === "start"){
      gmScreen = "game";
    }
  }
}

function startText() {
  textFont(titleFont);
  textSize(titleSize);
  text("MINESWEEPER",width/2,height/4);
  textAlign(CENTER,CENTER);
}
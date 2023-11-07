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
  placeMines();
  titleSize = width/8;
  if (height > width) {
    cellSize = width/GRID_SIZE;
  }
  else {
    cellSize = height/GRID_SIZE;
  }
}

function draw() {
  //background(220);
  displayGrid();
  //displayBackground();
  //startText();
  //runGame();
}

// function runGame(){
//   if( gmScreen === "start"){
//     displayBackground();
//     startText();
//   }
//   else if(gmScreen === "game"){
//     //playGame();
//   }
//   else if(gmScreen === "lose"){
//     gameOver();
//   }
// }

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

function placeMines(){
  for(let y = 0; y < GRID_SIZE; y++){
    for(let x = 0; x <GRID_SIZE; x++){
      if (random(100) < 15){
        grid[y][x] = 1;
      }
    }
  }
}

function displayGrid(){
  for(let y = 0; y < GRID_SIZE; y++){
    for(let x = 0; x < GRID_SIZE; x++){
      if (grid[y][x] === 0){
        fill("white");        
      }
      else if (grid[y][x] ===1){
        fill("black");
      }
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

function mousePressed(){
  
}

function startText() {
  textFont(titleFont);
  textSize(titleSize);
  textAlign(CENTER,CENTER);
  text("MINESWEEPER",width/2,height/4);

}

function displayBackground(){
  image(theBackground,0,0,width,height);
}
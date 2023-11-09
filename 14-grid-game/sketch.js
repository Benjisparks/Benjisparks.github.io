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
let mineSfx;
let loseSound = false;
let gmScreen = "start";
let grid;
let cellSize;

function preload(){
  titleFont = loadFont("1989.ttf");
  theBackground = loadImage("bg.png");
  mineSfx = loadSound("8bit_bomb_explosion.wav");
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
  //displayGrid();
  //displayBackground();
  //startText();
  runGame();
}

function runGame(){
  if( gmScreen === "start"){
    displayBackground();
    fill("white");
    startText();
  }
  else if(gmScreen === "game"){
    background(220);
    displayGrid();
  }
  else if(gmScreen === "lose"){
    revealGrid();
    if(loseSound === true){
      mineSfx.play();
      loseSound = !loseSound;
    }
    gameOver();
  }    
}

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
        fill("white");
      }
      else if(grid[y][x] === 2){
        fill("gray");
      }
      rect(x*cellSize,y*cellSize,cellSize,cellSize);
    }
  }
}

function revealGrid(){
  for(let y = 0; y < GRID_SIZE; y++){
    for(let x = 0; x < GRID_SIZE; x++){
      if (grid[y][x] === 0){
        fill("white");        
      }
      else if (grid[y][x] ===1){
        fill("black");
      }
      else if(grid[y][x] === 2){
        fill("gray");
      }
      rect(x*cellSize,y*cellSize,cellSize,cellSize);
    }
  }
}

function keyTyped(){
  if( key === " "){
    if(gmScreen === "start"){
      gmScreen = "game";
    }
    else if(gmScreen === "lose"){
      gmScreen = "start";
      grid = generateGrid(GRID_SIZE,GRID_SIZE);
      placeMines();
    }
  }
}

function mousePressed(){
  if(gmScreen === "game"){
    let y = Math.floor(mouseY / cellSize);
    let x = Math.floor(mouseX / cellSize);

    checkTile(x,y);
  }
}

function checkTile(x,y){
  if (x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE) {
    if(grid[y][x] === 0){
      //checkAdjacent();
      grid[y][x] = 2;
    }
    else if(grid[y][x] === 1){
      gmScreen = "lose";
      loseSound = true;
    }
  }
}

// function checkAdjacent(y,x){
//   let closeMines = 0;
//   for (let i = -1; i <= 1; i++) {
//     for (let j = -1; j <= 1; j++) {
//       //detect edge cases
//       if (y+i >= 0 && y+i < GRID_SIZE && x+j >= 0 && x+j < GRID_SIZE) {
//         closeMines += 1;//grid[y+i][x+j];
//       }
//     }
//   }  
// }

function startText() {
  textFont(titleFont);
  textSize(titleSize);
  textAlign(CENTER,CENTER);
  text("MINESWEEPER",width/2,height/4);

}

function displayBackground(){
  image(theBackground,0,0,width,height);
}

function gameOver(){
  fill("red");
  textFont(titleFont);
  textSize(titleSize);
  textAlign(CENTER,CENTER);
  text("GAME OVER",width/2,height/4);
}
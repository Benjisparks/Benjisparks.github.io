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
        grid[y][x] = -1;
      }
    }
  }
}

function displayGrid(){
  for(let y = 0; y < GRID_SIZE; y++){
    for(let x = 0; x < GRID_SIZE; x++){
      if (grid[y][x] === 0){
        fill("white"); 
        rect(x*cellSize,y*cellSize,cellSize,cellSize);       
      }
      else if (grid[y][x] === -1){
        fill("white");
        rect(x*cellSize,y*cellSize,cellSize,cellSize);
      }
      else if(grid[y][x] === -2){
          fill("gray");
          rect(x*cellSize,y*cellSize,cellSize,cellSize);
      }
      else{
        fill("gray");
        rect(x*cellSize,y*cellSize,cellSize,cellSize);
        fill("black");
        textAlign(CENTER,CENTER);
        textSize(cellSize);
        text(grid[y][x],(x*cellSize)+20,(y*cellSize)+20);

      }
    }
  }
}

function revealGrid(){
  for(let y = 0; y < GRID_SIZE; y++){
    for(let x = 0; x < GRID_SIZE; x++){
      if (grid[y][x] === 0){
        fill("white"); 
        rect(x*cellSize,y*cellSize,cellSize,cellSize);       
      }
      else if (grid[y][x] === -1){
        fill("black");
        rect(x*cellSize,y*cellSize,cellSize,cellSize);
      }
      else if(grid[y][x] === -2){
          fill("gray");
          rect(x*cellSize,y*cellSize,cellSize,cellSize);
      }
      else{
        fill("gray");
        rect(x*cellSize,y*cellSize,cellSize,cellSize);
        fill("black");
        textAlign(CENTER,CENTER);
        textSize(cellSize);
        text(grid[y][x],(x*cellSize)+20,(y*cellSize)+20);

      }
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
      let nearMines = checkAdjacent(x,y);
      if(nearMines === 0){
        //grid[y][x] = -2;
        fillEmptyCells(x,y);
      }
      else{
        grid[y][x] = nearMines;
      }
    }
    else if(grid[y][x] === -1){
      gmScreen = "lose";
      loseSound = true;
    }
  }
}

function fillEmptyCells(x,y){
  grid[y][x] = -2;
  // for(let i = -1; i <= 1; i++){
  //   for(let j = -1; j <= 1; j++){
  //     fillEmptyCells(x+j,y+i);
  //   }
  // }
  fillEmptyCells(x,y-1);
  fillEmptyCells(x,y+1);
  fillEmptyCells(x-1,y);
  fillEmptyCells(x-1,y-1);
  fillEmptyCells(x-1,y+1);
  fillEmptyCells(x+1,y);
  fillEmptyCells(x+1,y-1);
  fillEmptyCells(x+1,y+1);
}

function checkAdjacent(x,y){ 
  let closeMines = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      let newX = x + i;
      let newY = y + j;

      if(newY >= 0 && newY < GRID_SIZE && newX >= 0 && newX < GRID_SIZE) {
        if(grid[newY][newX] === -1){
          closeMines += 1;
        }
      }
    }
  }
  return closeMines;
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

function gameOver(){
  fill("red");
  textFont(titleFont);
  textSize(titleSize);
  textAlign(CENTER,CENTER);
  text("GAME OVER",width/2,height/4);
}
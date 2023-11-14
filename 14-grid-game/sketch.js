// Grid Game Assignment - Minesweeper
// Ben Sparks
// Due: 11/13/2023
//
// Press Space to play and restart game. Click to reveal tiles
//This project was a fun challenge to make, and I would like to comew back and revisit the flood fill algorithm to make it work
//I attempted a flood fill but each time there would be some kind of problem, so I scrapped it to make the game work better
//Previous functions would fill all blank tiles diagnally or in a straight line, and the final one just reveals the whole screen


//Declaring global variables
let GRID_SIZE = 16; //Constant for how many cells up and down in grid 16x16
let titleFont;
let titleSize; //Text screen variables
let theBackground; //Image of background
let mineSfx; //Sound effect on loss
let loseSound = false;  //bool value so that the sound doesnt loop
let gmScreen = "start"; //Global screen variable
let grid; //Global grid variable
let cellSize; //How big the cells should be, based on the window size

function preload(){ //Preloading assets into game
  titleFont = loadFont("1989.ttf");
  theBackground = loadImage("bg.png");
  mineSfx = loadSound("8bit_bomb_explosion.wav");
}

function setup() { //Creating canvas
  createCanvas(windowWidth, windowHeight);
  grid = generateGrid(GRID_SIZE,GRID_SIZE); //Generating first grid 
  placeMines(); //Placing mines in first grid
  titleSize = width/8;
  if (height > width) {
    cellSize = width/GRID_SIZE;  //Setting sizes based on window
  }
  else {
    cellSize = height/GRID_SIZE;
  }
}

function draw() { //Main draw loop for p5js
  runGame();
}

function runGame(){  //Main game function
  if( gmScreen === "start"){ //start screen
    displayBackground();
    fill("white");
    startText();
  }
  else if(gmScreen === "game"){ //Main game loop
    background(220);
    displayGrid();
  }
  else if(gmScreen === "lose"){
    checkAllTiles();
    revealGrid();                //on a loss, display the full grid and play sound
    if(loseSound === true){
      mineSfx.play();
      loseSound = !loseSound;
    }
    gameOver();      //losing text
  }    
}

function generateGrid(cols,rows){  //Creates 2d array 16x16 full of 0's
  let theGrid = [];
  for(let y = 0; y < cols; y++){
    theGrid.push([]);
    for(let x = 0; x < rows; x++){
      theGrid[y].push(0);
    }
  }
  return theGrid;
}

function placeMines(){    //inserts mines into board with a 15/100 chance each time
  for(let y = 0; y < GRID_SIZE; y++){
    for(let x = 0; x <GRID_SIZE; x++){
      if (random(100) < 15){
        grid[y][x] = -1;
      }
    }
  }
}

function displayGrid(){  //Draws the grid to the screen
  for(let y = 0; y < GRID_SIZE; y++){
    for(let x = 0; x < GRID_SIZE; x++){
      if (grid[y][x] === 0){                  //If the value is 0 display a white square
        fill("white"); 
        rect(x*cellSize,y*cellSize,cellSize,cellSize);       
      }
      else if (grid[y][x] === -1){              //White for bombs as well
        fill("white");
        rect(x*cellSize,y*cellSize,cellSize,cellSize);
      }
      else if(grid[y][x] === -2){                   //Empty cells after being cleared, no mines connected
          fill("gray");
          rect(x*cellSize,y*cellSize,cellSize,cellSize);
      }
      else{                                           //Gray square with the number of nearby mines 
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

function revealGrid(){             //Same as displayGrid but all mines are revealed
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


function keyTyped(){              //Press space to start and restart Game
  if( key === " "){
    if(gmScreen === "start"){
      gmScreen = "game";
    }
    else if(gmScreen === "lose"){
      gmScreen = "start";
      grid = generateGrid(GRID_SIZE,GRID_SIZE);
      placeMines();
      //checkAllTiles()
    }
  }
}

function mousePressed(){  //Mouse clicking function
  if(gmScreen === "game"){        //Reads where the mouse is on the grid 
    let y = Math.floor(mouseY / cellSize);
    let x = Math.floor(mouseX / cellSize);

    checkTile(x,y); // calls checkTile
  }
}

function checkTile(x,y){           //Checks if tile is a mine, if not than counts adjacent mines
  if (x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE) {
    if(grid[y][x] === 0){
      let nearMines = checkAdjacent(x,y);
      if(nearMines === 0){
        //fillEmptyCells(x,y);
        grid[y][x] = -2;
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

function checkAllTiles(x,y){    //Checks all tiles if tile is a mine, if not than counts adjacent mines and sets to a value
  for(let y = 0; y <GRID_SIZE; y++){
    for(let x = 0;x < GRID_SIZE; x ++ ){
      if (x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE) {
        if(grid[y][x] === 0){
          let nearMines = checkAdjacent(x,y);
          grid[y][x] = nearMines;
        }
      } 
    }
  }       
}

// function fillEmptyCells(x,y){   //Attempted recursive floodfill function 
                                    //Works too well and reveals every single tile on the grid
//   if(y >= 0 && y < GRID_SIZE && x >= 0 && x< GRID_SIZE) {
//     if(grid[y][x] === 0){
//       grid[y][x] = -2;
//       fillEmptyCells(x+1,y);
//       fillEmptyCells(x-1,y);
//       fillEmptyCells(x,y-1);
//       fillEmptyCells(x,y+1);
//     }

//   }
// }

function checkAdjacent(x,y){ //checks around in a 3x3 grid for mines
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


function startText() {  //Title screen text
  textFont(titleFont);
  textSize(titleSize);
  textAlign(CENTER,CENTER);
  text("MINESWEEPER",width/2,height/4);

}

function displayBackground(){ //Title screen background
  image(theBackground,0,0,width,height);
}

function gameOver(){  //Game over text
  fill("red");
  textFont(titleFont);
  textSize(titleSize);
  textAlign(CENTER,CENTER);
  text("GAME OVER",width/2,height/4);
}
// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let GRID_SIZE = 16;
let titleFont;
let theBackground;
let gmScreen = "start";

function preload(){
  titleFont = loadFont("1989.ttf");
  theBackground = loadImage("bg.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
}

function generateGrid(cols,rows){
  let theGrid = [];
  for(let y = 0; y < cols; y++){
    theGrid.push([]);
    for(let x = 0; x < rows; x++){
      
    }
  }
}

function startText() {

}

function keyTyped(){
  if( key === ENTER){
    if(gmScreen === "start"){
      gmScreen = "game";
    }
  }
}

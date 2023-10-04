///Benjamin Sparks CS30 Interactive Scene Assignment
///Simon Says Game in p5js
// 10/2/23
//Press 1 for Yellow, 2 for Red, 3 for Blue, 4 for Green

let txtSize = 50; //Size of text
let buttW = 50;  // width of button
let buttL = 200; //length of button
let theScreen = "start"; //state variable for what screen the game is on
let pattern = []; //empty pattern for color sequence
let patternLength = 7; //Max amount of turns
let theTime = 500; //Delay time for functions
let turn = 0; //Starts game on CPU turn
let moves = []; //Empty player pattern
let setupSquares = true; //boolean for whether or not to draw colored squares

//Load in fonts
function preload(){
  let myFont = loadFont("Square.ttf");
  let myOtherFont = loadFont("Squareo.ttf");
  let mySfx = loadSound("button.mp3");
}

function setup() {
  createCanvas(400, 400);
}

//Draws background when necessary and runs the game
function draw() {
  if (theScreen === "start"){
    background(220);
    console.log(screen);
  }
  if (theScreen === "gameover"){
    background(220);
    gameOver();
  }
  runGame();  
}

//Sets up the game to be played
function runGame(){
  if (theScreen === "start"){
    setupSquares = true;
    startText();
    startButton();
  }
  else if (theScreen === "game"){
    if (setupSquares === true){
      drawSquares();
      setupSquares = false;
    }
    playGame();
  }
}
//Main game sequence
function playGame(){
  if (turn === 0){
    setPattern();
    oppTurn();
  }
  playerTurn();
}
//Sets order of squares in array
function setPattern(){
  if (pattern.length < patternLength){
    let theMove = random([1,2,3,4]);
    append(pattern,theMove);
  }
}
//Shows Sequence of squares (NOT FULLY FUNCTIONAL squares all light up at the same time)
function oppTurn(){
  noLoop();
  for (let i of pattern){
    lightUp(i);
    setTimeout(drawSquares,200);
  }
  setTimeout(loop,theTime);
}
//Lights up square in relation to the key pressed
function keyTyped(){
  if (keyCode === 49 && turn === 1){
    append(moves, 1);
    lightUp(1);
    console.log(moves);
    setTimeout(drawSquares,theTime);
  }
  else if (keyCode === 50 && turn === 1){
    append(moves,2);
    lightUp(2);
    console.log(moves);
    //noLoop();
    setTimeout(drawSquares,theTime);
  }
  else if (keyCode === 51 && turn === 1){
    append(moves,3);
    lightUp(3);
    console.log(moves);
    //noLoop();
    setTimeout(drawSquares,theTime);
  }
  else if (keyCode === 52 && turn === 1){
    append(moves, 4);
    lightUp(4);
    console.log(moves);
    //noLoop();
    setTimeout(drawSquares,theTime);
  }
} 

//Checks if the player inputted correct sequence
function playerTurn(){
  turn = 1;
  if (moves.length === pattern.length){
    if (JSON.stringify(moves) !== JSON.stringify(pattern)){ //Converts both arrays into strings to check if they are the same 
      theScreen = "gameover";
      turn = 0;
    }
    else{
      setTimeout(flipTurn,theTime);
      moves = [];
    }
  } 
}
//Resets turn to 0 (opponent)
function flipTurn(){
  turn = 0;
}

//Draws a lighter colored rectangle to the screen in place of whichever previous square
function lightUp(n){
  if(n === 1){
    fill(255,255,150);
    rect(0,0,width/2,height/2); 
  }
  else if(n===2){ 
    fill(255,100,60);
    rect(width/2,0,width/2,height/2);
  }
  else if(n===3){
    fill(0,191,255);    
    rect(0,height/2,width/2,height/2);
  }
  else if(n===4){
    fill(124,252,0);
    rect(width/2,height/2,width/2,height/2);    
  }
}


//Creates and draws the 4 colored squares
function drawSquares(){
  let squareColors = ["red","blue","green","yellow"];
  stroke("black");
  fill(squareColors[3]);
  rect(0,0,width/2,height/2);  
  fill(squareColors[0]);
  rect(width/2,0,width/2,height/2);
  fill(squareColors[1]);
  rect(0,height/2,width/2,height/2);
  fill(squareColors[2]);
  rect(width/2,height/2,width/2,height/2);
}

//Displays title text
function startText(){
  textSize(txtSize);
  textFont(myFont);
  text("Simon Says", width/2,height/4 );
  fill(0, 0, 0);
  textAlign(CENTER,CENTER);
}

//Displays Clickable start button
function startButton(){
  let buttX = width/2 -buttL/2;
  let buttY = height*0.5;
  textFont(myFont);
  rect(buttX,buttY,buttL,buttW);  
  fill(255);
  text("Click Me",width/2,height*0.5 + buttW/2);
  fill(0);
  if (mouseX >= buttX && mouseX <= buttY + buttW && mouseY > buttY && mouseY < buttY + buttL && mouseIsPressed){
    theScreen = "game";
  }
  else {
    theScreen = "start";
  }
}

//display game over text on screen
function gameOver(){
  textSize(txtSize);
  textFont(myFont);
  text("GAME OVER", width/2,height/4 );
  fill(0, 0, 0);
  textAlign(CENTER,CENTER);
}

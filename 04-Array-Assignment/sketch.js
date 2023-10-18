// Array and Object Assignment
// Benjamin Sparks
// 10/18/2023
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let playerBarrel;
let myFont;
let txtSize;
let gameScreen = "start";
let apple, pear, lemon, orange, pineapple, barrel, bomb;
let fruitOrder = [];
let collectedFruit = [];
let currFruit;
let goodSound, badSound;

function preload(){
  myFont = loadFont("NEONLEDLight.otf");
  apple = loadImage("Apple.png");
  pear = loadImage("Pear.png");
  lemon = loadImage("Lemon.png");
  pineapple = loadImage("Pineapple.png");
  barrel = loadImage("Barrel.png");
  bomb = loadImage("Bomb.png");
  goodSound = loadSound("GoodSFX.wav");
  //badSound = loadSound();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  playerBarrel = createBarrel();
  txtSize = windowWidth/10;
}

function draw() {
  background(220);
  runGame();
}

function createBarrel(){
  let theBarrel = {
    x: mouseX,
    y: windowHeight - 100,
    image: barrel,
  };
  return theBarrel;
}

function play(){
  moveBarrel();
  displayBarrel();
  setInterval(setFruit(),500);
  displayFruit();
  setInterval(resetFruit(),5000);
}
function displayBarrel(){
  image(playerBarrel.image,playerBarrel.x,playerBarrel.y);
}

function moveBarrel(){
  playerBarrel.x = mouseX;
}

function startText(){
  textSize(txtSize);
  textFont(myFont);
  text("Fruit Master", width/2,height/4 );
  fill(0, 0, 0);
  textAlign(CENTER,CENTER);
}

function playButton(){
  textFont(myFont); 
  fill(255);
  text("Click To Play",width/2,height*0.5);
  fill(0);
}

function mousePressed(){
  if( gameScreen === "start"){
    gameScreen = "game";
  }
}

function runGame(){
  if (gameScreen === "start"){
    startText();
    playButton();
  }
  else if(gameScreen === "game"){
    play();
  }
  else{
    endScreen();
    setTimeout(restartGame(),2000);
  }
}

function restartGame(){
  gameScreen = "start";
}

function endScreen(){
  textSize(txtSize);
  textFont(myFont);
  text("Fruit Master", width/2,height/4 );
  fill(0, 0, 0);
  textAlign(CENTER,CENTER);
}

function setFruit(){
  fruitOrder.push(random(3));
}

function resetFruit(){
  fruitOrder = [];
}

function displayFruit(){
  for(let i of fruitOrder){
    if (i === 0){
      currFruit = "apple";
    }
    else if(i === 1){
      currFruit = "pear";
    }
    else if(i === 2){
      currFruit =  "lemon";
    }
    else if(i === 3){
      currFruit = "orange";
    }
  }
}
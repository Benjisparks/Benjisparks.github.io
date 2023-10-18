// Array and Object Assignment
// Benjamin Sparks
// 10/18/2023
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let someBall;
let myFont;
let txtSize;
let gameScreen = "start";
let apple, pear, lemon, orange, pineapple, barrel, bomb;
let fruitOrder = [];
let collectedFruit = [];

function preload(){
  myFont = loadFont("NEONLEDLight.otf");
  apple = loadImage("Apple.png");
  pear = loadImage("Pear.png");
  lemon = loadImage("Lemon.png");
  pineapple = loadImage("Pineapple.png");
  barrel = loadImage("Barrel.png")
  bomb = loadImage("Bomb.jpg")
  goodSound = loadSound("GoodSFX.wav")
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  someBall = createBall();
  txtSize = windowWidth/10;
}

function draw() {
  background(220);
  runGame();
  //moveBall();
  //displayBall();
}

function createBall(){
  let theBall = {
    x: windowWidth/5,
    y: windowHeight/8,
    radius: 30,
    dy: 3,
    color: "orange",
  };
  return theBall;
}
function play(){
  
}
function displayBall(){
  noStroke();
  fill(someBall.color);
  circle(someBall.x,someBall.y,someBall.radius*2);
}

function moveBall(){
  someBall.y += someBall.dy;
  if (someBall.y >= windowHeight - 100 || someBall.y <= 50){
    someBall.dy = someBall.dy * -1;
  }
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
    play()
  }
  else{
    endScreen();
    setTimeout(restartGame(),2000);
  }
}

function restartGame(){
  gameScreen = "start"
}


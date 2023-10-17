// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//let balls = [];
let someBall;
let myFont;
let txtSize;
let gameScreen = "start";
let buttX;
let buttY;
let buttW;
let buttL;

function preload(){
  myFont = loadFont("NEONLEDLight.otf");
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
  text("Timing Practice", width/2,height/4 );
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
}
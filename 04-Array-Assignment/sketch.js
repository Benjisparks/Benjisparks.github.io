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
  startText();
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

// function usercreateBall(){
//   let theBall = {
//     x: mouseX,
//     y: mouseY,
//     radius: 30,
//     color: "orange",
//   };
//   return theBall;
// }

// function mouseClicked(){
//   let userBall = createBall();
//   displayBall(userBall);
// }


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
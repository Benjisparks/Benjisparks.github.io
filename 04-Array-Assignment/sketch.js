// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let balls = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  displayBall();
}

function createBall(){
  let theBall = {
    x: mouseX,
    y: mouseY,
    radius: 30,
  };
  balls.push(theBall);
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

function mouseClicked(){
  let userBall = createBall();
  displayBall(userBall);
}

// function mouseClicked(){
//   someBall = usercreateBall();
//   displayBall();
// }

function displayBall(){
  for(let someBall of balls){
    circle(someBall.x,someBall.y,someBall.radius*2);
  }
}
// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let ballArray = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnBall();
  background(220);
  window.setInterval(spawnBall,2000);
}

function draw() {
  //background(220);
  noStroke();
  for(let theBall of ballArray){
    theBall.x = noise(theBall.time)*width;
    theBall.y = noise(theBall.time + 300)*height;
    fill(theBall.color);
    circle(theBall.x,theBall.y,theBall.size);
    theBall.time+= 0.01;
  }
}

function mouseClicked(){
  spawnBall();
}

function spawnBall(){
  let ball = {
    x: random(width),
    y: random(height),
    size: random(10,50),
    color: color(random(255),random(255),random(255),random(255)),
    time: random(1000),
  };
  ballArray.push(ball);
}
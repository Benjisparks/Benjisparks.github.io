// Ball Object Notation Demo
//Oct 5, 2023

let balls = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  let theBall = spawnBall();
  balls.push(theBall);
}

function draw() {
  background(220);
  moveBall();
  displayBall();
}

function keyTyped(){
  if (key === " "){
    let someBall = spawnRandomBall();
    balls.push(someBall);
  }
}
function mouseClicked(){
  let someBall = spawnBall();
  balls.push(someBall);
}

function moveBall(){
  for(let i = 0; i< balls.length; i++){
    let theBall = balls[i];
    theBall.x += theBall.dx;
    theBall.y += theBall.dy;

    if (theBall.x - theBall.radius > width){
      theBall.x = 0 - theBall.radius;
    }
    else if(theBall.x < 0 - theBall.radius){
      theBall.x = width + theBall.radius;
    }
    if(theBall.y - theBall.radius > height){
      theBall.y = 0 - theBall.radius;
    }
    else if(theBall.y < 0 - theBall.radius){
      theBall.y = height + theBall.radius;
    }
  }
}

function spawnBall(){
  let theBall = {
    x: mouseX,
    y: mouseY,
    radius: random(15,30),
    r: random(255),
    g: random(255),
    b: random(255),
    dx: random(-5,5),
    dy: random(-5,5),
  };
  return theBall;  
}

function spawnRandomBall(){
  let theBall = {
    x: random(width),
    y: random(height),
    radius: random(15,30),
    r: random(255),
    g: random(255),
    b: random(255),
    dx: random(-5,5),
    dy: random(-5,5),
  };  
  return theBall;
}

function displayBall(){
  for(let i = 0; i< balls.length; i++){
    let theBall = balls[i];
    fill(theBall.r,theBall.g,theBall.b);
    circle(theBall.x,theBall.y,theBall.radius*2);
  }
}
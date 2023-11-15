// Project Title

class Ball {
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.radius = random(15, 30);
    this.dx = random(-5, 5);
    this.dy = random(-5, 5);
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
    if (this.x + this.radius > width || this.x < 0 +this.radius){
      this.dx = this.dx * -1;
    }
    if(this.y + this.radius > height || this.y - this.radius < 0){
      this.dy = this.dy * -1; 
    }
  }

  display(){
    fill(this.r,this.g,this.b);
    circle(this.x,this.y,this.radius * 2);
  }

  bounceOff(otherBall){
    let radiiSum = this.radius + otherBall.radius;
    let distanceApart = dist(this.x,this.y,otherBall.x,otherBall.y);
    if( radiiSum > distanceApart){
      let tempDx = this.dx;
      let tempDy = this.dy;

      this.dx = otherBall.dx;
      this.dy = otherBall.dy;
      otherBall.dx = tempDx;
      otherBall.dy = tempDy;
      // this.r = 255;
      // this.b = 0;
      // this.g = 0;
    }
  }
}

let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  let theBall = new Ball(width/2, height/2);
  ballArray.push(theBall);
}

function draw() {
  background(220);
  for( let someBall of ballArray){
    someBall.move();
    for(let otherBall of ballArray){
      if (someBall !== otherBall){
        someBall.bounceOff(otherBall);
      }      
    }
    someBall.display();
  }
}

function mousePressed(){
  let theBall = new Ball(mouseX,mouseY);
  ballArray.push(theBall);
}
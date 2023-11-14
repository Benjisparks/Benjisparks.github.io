// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

class Walker {
  constructor(x,y,color) {
    this.x = x;
    this.y =y;
    this.color = color;
    this.speed = 5;
    this.size = 5;
  }

  display() {
    noStroke();
    fill(this.color);
    circle(this.x,this.y,this.size);
  }

  move() {
    let theChoice = random(100);
    if(theChoice < 25){
      this.y += this.speed;
    }
    else if(theChoice < 50){
      this.y -= this.speed;
    }
    else if(theChoice< 75){
      this.x -= this.speed;
    }
    else{
      this.x += this.speed;
    }
  }
}

let gabe;
// let emma;
let theWalkers = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  gabe = new Walker(width/2,height/2,"blue");
  theWalkers.push(gabe);
  // emma = new Walker(200,400,"red");
}

function draw() {
  for(let person of theWalkers) {
    person.move();
    person.display();
  }
  // gabe.move();
  // emma.move();
  // gabe.display();
  // emma.display();
}

function mousePressed(){
  let gabe = new Walker(mouseX,mouseY,"green");
  theWalkers.push(gabe);  
}
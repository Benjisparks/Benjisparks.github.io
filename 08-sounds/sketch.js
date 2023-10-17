// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let gabe;
let coinSound;
let backgroundMusic;

function preload(){
  gabe = loadImage("nohl.png");
  coinSound = loadSound("Auye1.ogg");
  backgroundMusic = loadSound("high tech lab.flac");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  image(gabe,mouseX,mouseY);
  
}

function mouusePressed(){
  //coinSound.play();
  backgroundMusic.play();
}
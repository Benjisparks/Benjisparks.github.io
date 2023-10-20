// Array and Object Assignment
// Benjamin Sparks
// 10/19/2023
//
// A simple game in which the player uses the mouse to control a barrel while trying to catch fruit falling down
// All sprites and sound effect used in this project are fair use from opengameart.com
//This Game is Unfinished, as the collision does not work as intended. I would like to come back to this project at some point to fix the collision

let playerBarrel;
let myFont;
let txtSize;
let gameScreen = "start";
let appleImg, pearImg, lemonImg, orangeImg, barrelImg, bombImg; // declare global variables
let appleObj,pearObj,lemonObj,orangeObj,bombObj;
let fruitOrder = [];
let collectedFruit = [];
let currFruit;
let goodSound, badSound;
let theX;
let score = 0;

function preload(){
  myFont = loadFont("NEONLEDLight.otf");
  appleImg = loadImage("Apple.png");
  pearImg = loadImage("Pear.png");
  lemonImg = loadImage("Lemon.png");
  orangeImg = loadImage("Orange.png"); //Load Images, sound effects, and fonts using p5js preload
  barrelImg = loadImage("Barrel.png");
  bombImg = loadImage("Bomb.png");
  goodSound = loadSound("GoodSFX.wav");
  badSound = loadSound("lose sound 2 - 1_0.wav");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  playerBarrel = createBarrel();
  txtSize = windowWidth/10;
  appleObj = createAppleObj();
  pearObj = createPearObj();
  lemonObj =  createLemonObj();
  orangeObj = createOrangeObj(); //Call functions to create objects for fruits and player barrel
  bombObj = createBombObj();  
  setInterval(setFruit,4000);
  setInterval(resetFruit,20000); //set the timing for fruits being created and falling down
  setInterval(sortFruit,4000);
}

function draw() {
  background(220); //main draw loop for p5js
  runGame();
}

function createBarrel(){ //Creating the player barrel object
  let theBarrel = {
    x: mouseX,
    y: windowHeight - 100,
    image: barrelImg, 
    scaleX: barrelImg.width *4,
    scaleY: barrelImg.height*4,
    width: barrelImg.width *4,
  };
  return theBarrel;
}

function createAppleObj(){ // Creating fruit objects
  theApple = {
    y: 0,
    dy: 4,
    image: appleImg,
    scaleX: appleImg.height*1.5,
    scaleY: appleImg.width*1.5,
    width: appleImg.width*1.5,
  };
  return theApple;
}

function createPearObj(){
  thePear = {
    y: 0,
    dy: 4,
    image: pearImg,
    scaleX: pearImg.height*1.5,
    scaleY: pearImg.width*1.5,
    width: pearImg.width*1.5,
  };
  return thePear;
}

function createLemonObj(){
  theLemon = {
    y: 0,
    dy: 5,
    image: lemonImg,
    scaleX: lemonImg.height*1.5,
    scaleY: lemonImg.width*1.5,
    width: lemonImg.width*1.5,
  };
  return theLemon;
}

function createOrangeObj(){
  theOrange = {
    y: 0,
    dy: 5,
    image: orangeImg,
    scaleX: orangeImg.height*1.5,
    scaleY: orangeImg.width*1.5,
    width: orangeImg.width*1.5,
  };
  return theOrange;
}

function createBombObj(){
  theBomb = {
    y: 0,
    dy: 5,
    image: bombImg,
    scaleX: bombImg.height*1.5,
    scaleY: bombImg.width*1.5,
    width: bombImg.width*1.5,
  };
  return theBomb;
}

function play(){ //The main game loop
  moveBarrel();
  displayBarrel();
  moveFruit();
  displayFruit();
  scoreText();
  if(checkCollision()){
    handleCollision();
  }
}

function displayBarrel(){ // draws the player to the screen
  image(playerBarrel.image,playerBarrel.x,playerBarrel.y,playerBarrel.scaleX,playerBarrel.scaleY);
}

function moveBarrel(){ // moves the barrel X coordinate to mouse x
  playerBarrel.x = mouseX;
  if (playerBarrel.x >= windowWidth - playerBarrel.scaleX){
    playerBarrel.x = windowWidth - playerBarrel.scaleX;
  }
}

function startText(){ // Starting screen text
  textSize(txtSize);
  textFont(myFont);
  text("Fruit Master", width/2,height/4 );
  fill(0, 0, 0);
  textAlign(CENTER,CENTER);
}

function playButton(){ // More Starting screen text
  textFont(myFont); 
  fill(255);
  text("Click To Play",width/2,height*0.5);
  fill(0);
}

function mousePressed(){ // Starts the game when the mouse is clicked
  if( gameScreen === "start"){
    gameScreen = "game";
  }
}

function runGame(){ //Swutches the game screens
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

function restartGame(){ // resets the game
  gameScreen = "start";
}

function endScreen(){ //End screen text
  textSize(txtSize);
  textFont(myFont);
  text("Fruit Master", width/2,height/4 );
  fill(0, 0, 0);
  textAlign(CENTER,CENTER);
}

function setFruit(){ //adds next fruit into the array at random
  fruitOrder.push(int(random(5)));
}

function resetFruit(){ // resets the fruit order array 
  fruitOrder = [];
}

function sortFruit(){ //runs through the fruitorder array to find what fruit to display, also picks x value for fruit
  for(let i of fruitOrder){
    if (i === 0){
      currFruit = "apple";
      pickX();
    }
    else if(i === 1){
      currFruit = "pear";
      pickX();
    }
    else if(i === 2){
      currFruit =  "lemon";
      pickX();
    }
    else if(i === 3){
      currFruit = "orange";
      pickX();
    }
    else if(i===4){
      currFruit = "bomb";
      pickX();
    }
  }
}

function pickX(){ // chooses an x value at random 
  theX = random(windowWidth)
  return theX;
}

function moveFruit() { //Moves the fruits down the screen
  if (currFruit === "apple") {
    appleObj.y += appleObj.dy;
    if (appleObj.y > windowHeight + 200){
      appleObj.y = 0;
    }
  } else if (currFruit === "pear") {
    pearObj.y += pearObj.dy;
    if (pearObj.y > windowHeight + 200){
      pearObj.y = 0;
    }
  } else if (currFruit === "lemon") {
    lemonObj.y += lemonObj.dy;
    if (lemonObj.y > windowHeight + 200){
      lemonObj.y = 0;
    }
  } else if (currFruit === "orange") {
    orangeObj.y += orangeObj.dy;
    if (orangeObj.y > windowHeight + 200){
      orangeObj.y = 0;
    }
  } else if (currFruit === "bomb") {
    bombObj.y += bombObj.dy;
    if (bombObj.y > windowHeight + 200){
      bombObj.y = 0;
    }
  }
}

function displayFruit(){ //Draws the fruits to the screen
  if(currFruit === "apple"){
    image(appleObj.image,theX,appleObj.y,appleObj.scaleX,appleObj.scaleY);
  }
  else if(currFruit === "pear"){
    image(pearObj.image,theX,pearObj.y,pearObj.scaleX,pearObj.scaleY);
  }
  else if(currFruit === "lemon"){
    image(lemonObj.image,theX,lemonObj.y,lemonObj.scaleX,lemonObj.scaleY);
  }
  else if(currFruit === "orange"){
    image(orangeObj.image,theX,orangeObj.y,orangeObj.scaleX,orangeObj.scaleY);
  }
  else if(currFruit === "bomb"){
    image(bombObj.image,theX,bombObj.y,bombObj.scaleX,bombObj.scaleY);
  }  
}

function checkCollision(){ // UNFINISHED DUE TO TIME CONSTRAINTS. WOULD LIKE TO COME BACK TO IN FUTURE
  if(currFruit === "apple"){
    d = dist(appleObj.x,appleObj.y,playerBarrel.x,playerBarrel.y); //trying to calculate distance between fruit and barrel
    if(d < appleObj.width + playerBarrel.width){ // seeing if they are intersecting, return true or false
      return true;
    }
    else{
      return false;
    }
  }
  else if(currFruit === "pear"){
    d = dist(pearObj.x,pearObj.y,playerBarrel.x,playerBarrel.y);
    if(d < pearObj.width + playerBarrel.width){
      return true;
    }
    else{
      return false;
    }
  }
  else if(currFruit === "lemon"){
    d = dist(lemonObj.x,lemonObj.y,playerBarrel.x,playerBarrel.y);
    if(d < lemonObj.width + playerBarrel.width){
      return true;
    }
    else{
      return false;
    }
  }
  else if(currFruit === "orange"){
    d = dist(orangeObj.x,orangeObj.y,playerBarrel.x,playerBarrel.y);
    if(d < orangeObj.width + playerBarrel.width){
      return true;
    }
    else{
      return false;
    }
  }
  else if(currFruit === "bomb"){
    d = dist(bombObj.x,bombObj.y,playerBarrel.x,playerBarrel.y);
    if(d < bombObj.width + playerBarrel.width){
      return true;
    }
    else{
      return false;
    }
  }
}

function handleCollision(){ //Checks to see if the collision was with a fruit or bomb
  if(currFruit === "bomb"){
    screen = "gameover"
    badSound.play();
  }
  else{
    fruitCollected();
  }
}

function fruitCollected(){ // plays SFX and Increases score
  goodSound.play();
  score +=1;
}

function scoreText(){ // Displays score board to screen
  textSize(txtSize*0.25) 
  text("Score: " + score, 100, 20);
}
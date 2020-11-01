var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game, rank1,rank2,rank3,start;

var cars, car1, car2, car3, car4;

var track, car1_img, car2_img, car3_img, car4_img;
var trackplus
var rankY
var rankX
function preload(){
  track = loadImage("images/track.jpg");
  trackplus = loadImage("images/track.png");
  ground = loadImage("images/ground.png");
  start= loadImage("images/begin.jpg");

  car1_img = loadImage("images/car1.png");
  car2_img = loadImage("images/car2.png");
  car3_img = loadImage("images/car3.png");
  car4_img = loadImage("images/car4.png");
  
  rank1 = loadImage("images/rank1.png")
  rank2 = loadImage("images/rank2.png")
  rank3 = loadImage("images/rank3.png")
}

function setup(){
  canvas = createCanvas(displayWidth, displayHeight);
  
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start(); 

  rankY = displayHeight - 5000
  rankX=random(200,displayWidth)    
}


function draw(){
  background(rgb(65,65,65));

  image(start,0,0,displayWidth, displayHeight); 

  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
    
  }
}

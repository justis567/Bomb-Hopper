// assaining variables for game State
var PLAY = 1;
var END = 0;
var gameState = PLAY;
// assining variable for gameover and restart State
var gameover,restart
var gameoverImage,restartImage
// assining variable for trex and ground
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
// assining variable for cloud 
var cloudsGroup, cloudImage,backgroundImg,background;
// assining varibale for obstacles
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

// function preload
function preload(){
// loadImages for trex
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  
  // loadImage for ground
  groundImage = loadImage("ground2.png");
  //loadImage for cloud
  cloudImage = loadImage("cloud.png");
  // loadImage for obstacles
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
 
  
}
// function setup
function setup() {
  createCanvas(1000,750);
  
  // trex Sprite 
  trex = createSprite(50,180,20,50);
  trex.scale=0.2
  // trex addAnimation
  trex.addAnimation("yo", trex_running);
  
  trex.scale = 0.5;
  // ground Sprite
  ground = createSprite(300,600,400,20);

  ground.scale=0.6
  // addImage for ground 
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  // invisable ground Sprite
  invisibleGround = createSprite(200,500,400,10);
  invisibleGround.visible = false;
 
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
  
  console.log("Hello" + 5);
  
  trex.setCollider("circle",0,0,40);
  trex.debug = false
  
  score = 0
}
// function draw
function draw() {
  // add background color
  background(241);
  //displaying score
  text("Score: "+ score, 50,50);
  
  console.log("this is ",gameState)
  
  // game State for PLAY 
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -4;
    //scoring
    score = score + Math.round(frameCount/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& trex.y >=100) {
        trex.velocityY = -13;
    }
    
    //add gravity
    trex.velocityY = trex.velocityY + 0.8
  
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles on the ground
    spawnObstacles();
    // Game end if trex is Touching obstacles
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
    }
  }
  // game State for END
   else if (gameState === END) {
     // ground and trex velocity
      ground.velocityX = 0;
     trex.velocityY = 0;
     // changeAnimation for trex
     trex.changeAnimation("collided",trex_collided)
     // Lifetime of clouds and obstacles
     obstaclesGroup.setLifetimeEach(-1)
     cloudsGroup.setLifetimeEach(-1)
     // set volocity
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
   }
  
 
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  
  
  // drawSprites
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 100 === 0){
   var obstacle = createSprite(750,Math.round(random(505, 505)), 10, 40);
   obstacle.velocityX = -6;
   obstacle.scale=0.2
   
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnClouds() {
  //write code here to spawn the clouds
   if (frameCount % 60 === 0) {
     cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.9;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //adding cloud to the group
   cloudsGroup.add(cloud);
    }
}


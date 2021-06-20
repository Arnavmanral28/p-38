
var monkey , monkey_running,ground
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score = 0;
var gameState = 1;
var PLAY = 1;
var END=0; 
var num; 
var survivalTime = 0; 
var back,backImage; 
function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  backImage = loadImage("jungle.jpg"); 
 
}



function setup() {
  createCanvas(windowWidth,windowHeight); 
  num = prompt("Enter your name");
  back = createSprite(200,200,windowWidth,windowHeight); 
  back.addImage("jungle",backImage); 
  back.scale = 4;
  monkey = createSprite(80,470,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.2; 
  //camera.position.x = monkey.x;
  //camera.position.y = monkey.y;
  
  ground = createSprite(400,800,2000000000,10); 
  back.x = back.width/2;
  ground.visible = false; 
     
  foodGroup = createGroup(); 
  obstacleGroup = createGroup();
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height); 
  
  
}


function draw() {
  background(255); 
  
  
  
  if(gameState===PLAY){
  //  back.velocityX = -7;
    //if(back.x<0){
    //back.x = back.width/2;
     
     //}
    if(score===10){
    monkey.scale = 0.12;
  } else if(score===20){
         monkey.scale = 0.14;   
  } else if(score===30){
      monkey.scale = 0.16;
  } else if(score===40){
        monkey.scale = 0.18;    
  } 
    if(keyDown("space")&&monkey.y>=140){
    monkey.velocityY = -12; 
  }
  if(keyDown("right_arrow")){
    monkey.x= monkey.x+5;

  }
  if(foodGroup.isTouching(monkey)){
    foodGroup.destroyEach(); 
    score = score+1; 
    
     
  }
  monkey.velocityY = monkey.velocityY + 0.8; 
    
    if(obstacleGroup.isTouching(monkey)){
       gameState = END; 
       }
    Obstacle(); 
  Food();
  } else if(gameState===END){
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0); 
     monkey.velocityY = 0;
    
    obstacleGroup.setLifetimeEach(-1); 
    foodGroup.setLifetimeEach(-1);
    background("red")
    textSize(50); 
    fill("black"); 
    text("GAME OVER",windowWidth/2-300,windowHeight/2);
    back.visible = false; 
    textSize(20); 
    text("PRESS SPACE TO RESTART THE GAME",windowWidth/2-300,windowHeight/2+40)
    monkey.visible = false; 
    obstacleGroup.destroyEach();
    foodGroup.destroyEach(); 
    //ground.visible = false; 
    if(keyDown("space")&gameState===END){
     gameState= PLAY;
     monkey.visible = true; 
     back.visible = true;
     background("white"); 
     score = 0;
     
     monkey.x = 80;
     monkey.y = 470;
      
    }
    
  }
  monkey.collide(ground);
  
 drawSprites();
  textSize(50); 
  fill("black")
  text(num+"'s Score:"+score,windowWidth/2+600,windowHeight/2-400); 
   
  
}

function Obstacle(){
  if(frameCount%150===0){
    obstacle = createSprite(windowWidth,770,20,20); 
    
    obstacle.velocityX= -(8+score/1);
    obstacle.addAnimation("obstacle",obstacleImage);
    obstacle.scale = 0.2; 
     obstacle.lifetime = windowWidth-1000; 
    obstacleGroup.add(obstacle); 
     }
  
}
function Food(){
  if(frameCount%120===0){
    food = createSprite(windowWidth,180,30,30);
    food.y = Math.round(random(300,700));
    food.velocityX = -(10+score/1); 
    food.addAnimation("banana",bananaImage);
    food.lifetime = windowWidth-1000; 
    food.scale = 0.1;
    foodGroup.add(food); 
  }
}





var bg,bg1;
var balloon,balloonanime;
var topground,bottomground;
var obstaclebottom;
var score=0;
var PLAY=1;
var END=0;
var gamestate=PLAY;
var diesound,jumpsound;

function preload()
{
  bg = loadImage("./assets/bg.png")
  balloonanime =loadAnimation("./assets/balloon1.png","./assets/balloon2.png","./assets/balloon3.png")
  topobsimg1=loadImage("./assets/obsTop1.png")
  topobsimg2=loadImage("./assets/obsTop2.png")
  obsbottomimg1 =loadImage("./assets/obsBottom1.png")
  obsbottomimg2 =loadImage("./assets/obsBottom2.png")
  obsbottomimg3 =loadImage("./assets/obsBottom3.png")
  restartimg = loadImage("./assets/restart.png")
  gameoverimg = loadImage("./assets/gameOver.png")
  diesound=loadSound("./assets/die.mp3")
  jumpsound=loadSound("./assets/jump.mp3")
  bg2=loadImage("./assets/bgImg2.jpg")
}

function setup()
{
  createCanvas(400,400)
 bg1 = createSprite(200,200,1,1)
// bg1.addImage(bg)

 getbackgroundimg();

 balloon =createSprite(100,200,20,50)
 balloon.addAnimation("balloon",balloonanime)
 balloon.scale = 0.2

 topground = createSprite(200,100,400,20)
 topground.visible = false;
  
 bottomground = createSprite(200,390,400,20)
 bottomground.visible = false; 

 bottomobsgrp=new Group()
 topobsgrp=new Group()
 bargrp=new Group()


 gameover = createSprite(220,200)
 gameover.addImage(gameoverimg)
 gameover.scale=0.5
 gameover.visible=false;

 restart = createSprite(220,240)
 restart.addImage(restartimg)
 restart.scale=0.5
 restart.visible=false;

}
function draw()
{
  if(gamestate===PLAY)
  {
    if(keyDown("space"))
    {
     balloon.velocityY = -6;
     jumpsound.play()
    }
    balloon.velocityY+=2;
 spawnobstaclestop()
 spwanobstaclesbottom()
 bar()
 if(topobsgrp.isTouching(balloon) ||balloon.isTouching(topground)||bottomobsgrp.isTouching(balloon)||balloon.isTouching(bottomground))
 {
 gamestate=END;
 diesound.play()
 }
  }
 if(gamestate===END)
 {
  gameover.visible=true;
  restart.visible=true;
  gameover.depth+=1
  restart.depth+=1
  balloon.velocityX =0
  balloon.velocityY =0
  topobsgrp.setVelocityXEach(0)
  bottomobsgrp.setVelocityXEach(0)
  bargrp.setVelocityXEach(0)
  topobsgrp.setLifetimeEach(-1)
  bottomobsgrp.setLifetimeEach(-1)
  balloon.y =200;
if(mousePressedOver(restart))
{
 reset()
}
 }
 drawSprites()
scoreclc()
}
function reset()
{
  gamestate=PLAY;
  gameover.visible=false;
  restart.visible=false;
  topobsgrp.destroyEach();
  bottomobsgrp.destroyEach();
  score=0;
}

function spwanobstaclesbottom()
{
  if(frameCount%60===0)
  {
    var bottomobstacle=createSprite(400,350,20,30)
    var ran = Math.round(random(1,3))
    switch(ran){
      case 1:
        bottomobstacle.addImage(obsbottomimg1)
        break;
 
        case 2:
          bottomobstacle.addImage(obsbottomimg2)
          break;

         case 3:
          bottomobstacle.addImage(obsbottomimg3)
          break;

         default:
           break;
    }
    bottomobstacle.velocityX=-3;
    bottomobstacle.scale=0.07;
    bottomobstacle.lifetime = 400/3;
    bottomobstacle.depth = balloon.depth
    balloon.depth+=1
    bottomobsgrp.add(bottomobstacle)
  }
}

function spawnobstaclestop()
{
 if(frameCount%60===0)
 {
   var topobstacle=createSprite(400,50,20,30)
   var ran = Math.round(random(1,2))
   switch(ran){
     case 1:
       topobstacle.addImage(topobsimg1)
       break;

       case 2:
         topobstacle.addImage(topobsimg2)
         break;

        default:
          break;
   }
   topobstacle.velocityX=-3;
   topobstacle.scale=0.1;
   topobstacle.y = Math.round(random(10,100))
   topobstacle.lifetime = 400/3;
   topobstacle.depth = balloon.depth
   balloon.depth+=1
   topobsgrp.add(topobstacle)
 }
}
function bar()
{
 if(frameCount%60==0)
 {
  var bar = createSprite(400,200,10,800)
  bar.velocityX=-6;
  bar.lifetime=100
  bar.depth = balloon.depth+1
  bar.visible=false;
  bargrp.add(bar)
 }
}
function scoreclc()
{
 if(balloon.isTouching(bargrp))
 {
  score=score+6;
 }
 textSize(25)
 textFont("algerian")
 fill(0)
 text("Score: "+score,260,40)

}

async function getbackgroundimg()
{
 var response =await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata")
 var reposejson=await response.json()
 var datetime=reposejson.datetime
 var hour=datetime.slice(11,13)
 if(hour>=06 && hour<=17)
 {
  bg1.addImage(bg)
  bg1.scale=1.3;
 }
 else
 {
  bg1.addImage(bg2)
  bg1.scale=1.3;
  bg1.x =200;
  bg1.y=200;
 }
}
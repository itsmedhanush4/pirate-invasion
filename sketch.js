const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world,ground;
var backgroundImg,tower,towerimg,cannon,angle,boat
var boats=[]
var balls =[]

var boatAnimation = []
var boatSpritesheet, boatSpritedata
var brokenBoatAnimation=[], brokenBoatSpritesheet, brokenBoatSpritedata
var watersplashAnimation=[],watersplashSpritesheet,watersplashspritedata
var score=0
var bgsound,cesound,cwsound,plsound

var isGameOver= false
var isLaughing = false
//make variables for brokenBoatAnimation, brokenBoatSpritesheet, brokenBoatSpritedata

//same for watersplash as well


function preload() {
  backgroundImg=loadImage("assets/background.gif")
  towerimg=loadImage("assets/tower.png")

  boatSpritesheet= loadImage("assets/boat/boat.png")
  boatSpritedata= loadJSON("assets/boat/boat.json")
 


  //preload all 4 images and json here..
  brokenBoatSpritesheet= loadImage("assets/boat/brokenboat.png")
  brokenBoatSpritedata= loadJSON("assets/boat/brokenboat.json")
  watersplashSpritesheet= loadImage("assets/waterSplash/waterSplash.png")
  watersplashspritedata= loadJSON("assets/waterSplash/waterSplash.json")
  bgsound=loadSound("assets/background_music.mp3")
  cesound=loadSound("assets/cannon_explosion.mp3")
  cwsound=loadSound("assets/cannon_water.mp3")
  plsound=loadSound("assets/pirate_laugh.mp3")
}
function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;

  var boatFrames=boatSpritedata.frames
  for(var i=0 ; i< boatFrames.length; i++){
    var pos=boatFrames[i].position;
    var img= boatSpritesheet.get(pos.x,pos.y,pos.w,pos.h)
    boatAnimation.push(img)
  }

  //brokenboats
  var brokenBoatFrames=brokenBoatSpritedata.frames
  for(var i=0;i<brokenBoatFrames.length;i++){
    var pos=brokenBoatFrames[i].position;
    var img=brokenBoatSpritesheet.get(pos.x,pos.y,pos.w,pos.h)
    brokenBoatAnimation.push(img)
  }




  //watersplash
  var waterSplashFrames=watersplashspritedata.frames
  for(var i=0; i<waterSplashFrames.length;i++){
    var pos=waterSplashFrames[i].position;
    var img=watersplashSpritesheet.get(pos.x,pos.y,pos.w,pos.h)
    watersplashAnimation.push(img)
  }

  



  

  angleMode(DEGREES)
  angle=15
  
 options={
 isStatic:true
 }
 
 ground= Bodies.rectangle(0,height-1, width*2,1,options);
 World.add(world,ground);
 tower=Bodies.rectangle(160,350,160,310,options);
 World.add(world,tower)

 cannon= new Cannon(180,110,130,100,angle)
 


}

function draw() {
  background(189);
  image(backgroundImg,0,0,1200,600)
  Engine.update(engine);
  showBoats()
  textSize(30)
  text("score="+score,1000,40)
 
 rect(ground.position.x, ground.position.y,width*2,1);
 
  push ()
  imageMode(CENTER)
  image(towerimg,tower.position.x,tower.position.y,160,310)
  pop ()
   
  cannon.display()
  
  
  
  for(var i = 0 ; i < balls.length ; i++){
    showcannonballs(balls[i],i)
    collisionWithBoat(i)
  }
  if(!bgsound.isPlaying()){
    bgsound.play()
    bgsound.setVolume(0.2)
    
  }

}

function keyReleased(){
  if(keyCode == RIGHT_ARROW){
    balls[balls.length-1].shoot()
    cesound.play()
    cesound.setVolume(0.3)
  }
}


function keyPressed(){
  var cannonBall= new Cannonball(cannon.x,cannon.y);
  balls.push(cannonBall)
}


function showcannonballs(ball,i){
  if(ball){
    ball.display()
    if(ball.body.position.x > width || ball.body.position.y > height - 50){
      ball.remove(i)
    }
  }
}

function showBoats(){
  if(boats.length>0){
   if(boats[boats.length - 1] === undefined ||
    boats[boats.length - 1].body.position.x < width - 300){
    var positions=[-60,-50,-77,-56,-67,-76,-65]
    var position=random(positions)
    var boat= new Boat(width,height-50,170,170,position, boatAnimation)
    boats.push(boat)
   }
   for (var i=0 ; i<boats.length ; i++){
    if(boats[i]){
      
      Matter.Body.setVelocity(boats[i].body,{x:-1,y:0})
      boats[i].display()
      boats[i].animate()
      var collision=Matter.SAT.collides(tower,boats[i].body)
      if(collision.collided && !boats[i].isBroken){
        if(!isLaughing && !plsound.isPlaying()){
          plsound.play()
          isLaughing=true
        }
      
        isGameOver=true
        gameover()
      }
    }
    else{
      boats[i]
    }
   }
    
   }
  else{
    var boat= new Boat(width,height-50,170,170,-80,boatAnimation)
    boats.push(boat)
  }
}

function collisionWithBoat(index){
  for (var i=0 ; i<boats.length ; i++){
    if(balls[index]!==undefined && boats[i]!== undefined){
      var collision=Matter.SAT.collides(balls[index].body,boats[i].body)
      if(collision.collided){
        boats[i].remove(i)
        Matter.World.remove(world,balls[index].body)
        delete balls[index]
        score=score+1
        cwsound.play()
        cwsound.setVolume(0.3)
      }
    }
  }
}


function gameover(){
  swal(
    {
      title: `Game Over!!!`,
      text: "Thanks for playing!!",
      imageUrl:
        "https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
      imageSize: "150x150",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
  
}

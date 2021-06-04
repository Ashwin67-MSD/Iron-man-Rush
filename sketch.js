var ironman,ironimage

var gameState=0
var d=0
var thanos
function preload(){
  ironimage = loadAnimation("iron1.png","iron2.png","iron3.png","iron4.png","iron5.png")
  ironmanImage =loadAnimation("fire1.png","fire2.png")
  Ironmandead =
    loadAnimation("dead.png")
  Ultronimage= loadAnimation("u1.png","u2.png","u3.png","u4.png "," u5.png")
  Ultrondead=
    loadAnimation("udead.png")
  repulsor=
    loadSound("Iron Man Repulsor.mp3")
 
  thanosImage=
    loadAnimation("Thanos.1.png","Thanos.2.png","Thanos.3.png","Thanos.4.png")
  thanosdead=
    loadAnimation("tdead.png")
  skulimage= loadAnimation("red1.png","red2.png","red3.png","red4.png")
  skuldead=
    loadAnimation("reddead.png")
  bg=loadImage("entry.jpg")
  opt1Img=loadImage("u1.png")
  opt2Img=loadImage("Thanos.1.png")
  opt3Img=loadImage("red1.png")
  bg1=loadImage("levels.jpg")
  bg2 =loadImage("Avengers_Tower.png")
  bg3 = loadImage("Ultron background.png")
  bg4 = loadImage("Redskull123.jpg")
                  
}



function setup() {
    createCanvas(400, 400);
  back1=createSprite(200,200,400,400)
  back1.addImage(bg2)
  back1.scale=0.5
  back1.visible=false
    ironman=createSprite(200,200,10,10)
    ironman.addAnimation("run",ironimage)
    ironman.visible=false
  
    skul=createSprite(100,200,10,10)
    skul.addAnimation("runs",skulimage)
    skul.scale=1.5
    skul.visible=false

    button = createButton("PLAY")
    button.position(170,150)

    opt1=createSprite(100,100)
    opt1.addImage(opt1Img)
    opt1.visible=false
  opt1.scale=1.3

    opt2=createSprite(330,200)
    opt2.addImage(opt2Img)
    opt2.visible=false
  opt2.scale=1.5
  
    opt3=createSprite(100,320)
    opt3.addImage(opt3Img)
    opt3.visible=false
    opt3.scale=1.5
  
  

    reset = createButton("RESET")
    reset.position(300,5)
  
  
    thanosGroup=createGroup()
  ultronGroup=createGroup()
  skullGroup=createGroup()
}

function draw() {
  
  if(gameState===0){
      background(bg);
      textFont("Georgia")
      textSize(20)
      strokeWeight(4)
      stroke("red")
      fill("yellow")
      text("Press play to start",125,100)
      strokeWeight(3)
    textSize(15)
    text("NOTE : Use space key to fight the enemies",100,300)
    //reset.hide()
  }
  button.mousePressed(function(){
    gameState=1
  })
  
  //Characters page
  if(gameState===1){
      background(bg1)
    back1.visible=false
      button.hide()
      opt1.visible=true
      opt2.visible=true
      opt3.visible=true
      ironman.visible=false
    textFont("Georgia")
      textSize(13)
      strokeWeight(4)
    stroke("black")
      fill("Yellow")
      text("Click on ultron if you want to fight with him!",125,100)
    text("Click on thanos if you want to fight with him!",5,200)
    text("Click on RedSkull if you want to fight with him!",120,320)
  //  reset.hide()
    

      if(mousePressedOver(opt2)){
        gameState=2
      }
      else if(mousePressedOver(opt1)){
      gameState=3
      } 
      if(mousePressedOver(opt3)){
      gameState=4
      }
    ironman.changeAnimation("run",ironimage)
  }
  
  //Thanos
  if(gameState===2){
      back1.visible=true
    back1.scale=2
    back1.velocityX=-3
    Reset()
     // ironman.changeAnimation("run")
      ironman.visible=true
      opt1.visible=false
      opt2.visible=false
      opt3.visible=false
      spawnThanos()
      moves()
      if(thanosGroup.isTouching(ironman)&&d>=1){
        thanos.addAnimation("tdaed",thanosdead)
        thanos.changeAnimation("tdaed",thanosdead)
        thanosGroup.destroyEach()
        d=0
      }
       if(thanosGroup.isTouching(ironman)&&d==0){
        
         gameState=5
         thanosGroup.destroyEach()
         ironman.addAnimation("dead",Ironmandead)
         ironman.changeAnimation("dead")

      }
    
      reset.position(300,50)
      reset.mousePressed(()=>{
          gameState=1
          reset.hide()
         thanosGroup.destroyEach()
    })
  }
  
  //Ultron
  else if(gameState===3){
      back1.addImage("b",bg3)
    back1.changeImage("b",bg3)
    back1.visible=true
    back1.scale=1.2
    back1.velocityX=-3
    Reset()
     
      ironman.visible=true
      opt1.visible=false
      opt2.visible=false
      opt3.visible=false
      spawnUltron()
      reset.position(300,50)
      reset.mousePressed(()=>{
          gameState=1
          reset.hide()
         ultronGroup.destroyEach()
    })
    moves()
      if(ultronGroup.isTouching(ironman)&&d>=1){
     
        ultronGroup.destroyEach()
        d=0
      }
       if(ultronGroup.isTouching(ironman)&&d==0){
        
         gameState=5
         ultronGroup.destroyEach()
         ironman.addAnimation("dead",Ironmandead)
         ironman.changeAnimation("dead")

      }
  }
  
  //Red skull
  if (gameState===4){
    
 
    ironman.visible=true
    opt1.visible=false
    opt2.visible=false
    opt3.visible=false
    spawnSkull()
     back1.addImage("b",bg4)
    back1.changeImage("b",bg4)
    back1.visible=true
    back1.scale=1.2
    back1.velocityX=-3
    Reset()
    moves()
      if(skullGroup.isTouching(ironman)&&d>=1){
        
        skullGroup.destroyEach()
        d=0
      }
       if(skullGroup.isTouching(ironman)&&d==0){
        
         gameState=5
         skullGroup.destroyEach()
         ironman.addAnimation("dead",Ironmandead)
         ironman.changeAnimation("dead")

      }
reset.position(300,50)
      reset.mousePressed(()=>{
          gameState=1
          reset.hide()
         ultronGroup.destroyEach()
    })    
  }
  
  
  
  //End state
   if(gameState===5){
    background("Red")
    thanosGroup.setVelocityXEach(0)
     textFont("Georgia")
      textSize(25)
      fill("yellow")
      text("Iron man is dead",100,100)
     reset.position(300,50)
      reset.mousePressed(()=>{
          gameState=1
          //reset.hide()
      
    })
     back1.visible=false
    
  }
  drawSprites()
  //Text instruction for restarting the game
    if (gameState===2||gameState===3||gameState===4){
      textFont("Georgia")
      textSize(15)
      strokeWeight(4)
      stroke("red")
      fill("yellow")
      text("Click on Reset/Reload to choose anyother character",28,350)
           text("Refresh the game :)",132,370)
      }
  
}
function spawnThanos(){
  if (frameCount % 120 === 0) {
     thanos = createSprite(600,200,40,10);
    thanos.addAnimation("thanosrun",thanosImage);
    thanos.scale = 1.3;
    thanos.velocityX = -3;
    
     //assign lifetime to the variable
    thanos.lifetime = 200;
    
    //adjust the depth
    thanos.depth = ironman.depth;
    ironman.depth = ironman.depth + 1;
    
    //add each cloud to the group
    thanosGroup.add(thanos);
  }
}
function spawnUltron(){
  if (frameCount % 120 === 0) {
    var ultron = createSprite(600,200,40,10);
    ultron.addAnimation("ultronrun",Ultronimage);
    ultron.scale = 1.2;
    ultron.velocityX = -3;
    
     //assign lifetime to the variable
    ultron.lifetime = 200;
    
    //adjust the depth
    ultron.depth = ironman.depth;
    ironman.depth = ironman.depth + 1;
    
    //add each cloud to the group
    ultronGroup.add(ultron);
  }
}
 function spawnSkull(){
  if (frameCount % 120 === 0) {
    var skull = createSprite(600,200,40,10);
    skull.addAnimation("skullrun",skulimage);
    skull.scale = 1.4;
    skull.velocityX = -3;
    
     //assign lifetime to the variable
    skull.lifetime = 200;
    
    //adjust the depth
    skull.depth = ironman.depth;
    ironman.depth = ironman.depth + 1;
    
    //add each cloud to the group
    skullGroup.add(skull);
  }
}



//Iron man controls
function moves(){
  if(keyWentDown("space")){
    ironman.addAnimation("fire",ironmanImage)
    ironman.changeAnimation("fire")
    d+=1
    repulsor.play()
  }
  else if(keyWentUp("space")){
     ironman.changeAnimation("run")
    repulsor.stop()
  }
}
function Reset(){
  if(back1.x<0){
    back1.x=300
  }
}
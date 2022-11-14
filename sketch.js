
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

let engine;
let world;
var rope,shirt,ground;

var rope3;

var bg_img;

var air;
var canW;
var canH;

var button,button2,button3;

var basket;

var goodjob;
function setup() {
  createCanvas(400,400);

  engine = Engine.create();
  world = engine.world;

  bg_img = loadImage('1200px-Italian_hanging_laundry.jpg');

  shirt = loadImage('image-removebg-preview(2).png');

  basket = loadImage('image-removebg-preview(3).png');

  goodjob = loadImage('image-removebg-preview(4).png');

  goodjob.visible = false;
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile){
    canW = displayWidth; 
    canH = displayHeight; 
    createCanvas(displayWidth+80, displayHeight);
  } 
  else {
    canW = windowWidth; 
    canH = windowHeight; 
    createCanvas(windowWidth, windowHeight);
  } 

  rope = new Rope(8,{x:40,y:30});
  rope2 = new Rope(7,{x:370,y:40});
  rope3 = new Rope(4,{x:400,y:225});

  ground = new Ground(200,canH,600,20);
  
  Matter.Composite.add(rope.body,shirt);

  fruit_con = new Link(rope,shirt);
  fruit_con_2 = new Link(rope2,shirt);
  fruit_con_3 = new Link(rope3,shirt);

  button = createImg('image-removebg-preview (1).png');
  button.position(20,30);
  button.size(50,50);
  button.mouseClicked(drop);

   //btn 2
   button2 = createImg('image-removebg-preview (1).png');
   button2.position(330,35);
   button2.size(60,60);
   button2.mouseClicked(drop2);
 
   //btn3
   button3 = createImg('image-removebg-preview (1).png');
   button3.position(360,200);
   button3.size(60,60);
   button3.mouseClicked(drop3);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
}


function draw() 
{
  background(51);
  image(bg_img,0,0,displayWidth,displayHeight);
  Engine.update(engine);
  push();
  imageMode(CENTER);
  if(shirt!=null){
    image(shirt,shirt.position.x,shirt.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();
  rope3.show();

  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(shirt,basket)==true)
  {
    shirt.visible=false;
    goodjob.visible=true;
  }


  
}

function drop()
{
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
}

function drop2()
{
  rope2.break();
  fruit_con_2.detach();
  fruit_con_2 = null;
}

function drop3()
{
  rope3.break();
  fruit_con_3.detach();
  fruit_con_3 = null;
}

function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}
function setup() {
  createCanvas(800, 600);
  player = new ship();
  frameRate(60);
   var r = random (1,10);
  for (var i = 0; i < r; i++) {
    squareAster[i] = new sqAster();
    asterCount++;
  }
}


function draw() {
  background(0);
  checkTimers();

  for (var a = 0; a < squareAster.length; a++) {

    squareAster[a].update();
    squareAster[a].offScreen();
    squareAster[a].render();
  }

  for (var i = 0; i < squareAster.length; i++) {
    if (player.shield.strength > 0) {
      if (player.shieldHit(squareAster[i])) {
        player.shield.hitArc(squareAster[i], frameCount);
        player.shield.strength -= (squareAster[i].h + squareAster[i].w)/20;
        player.bounce(squareAster[i]);
      }
    } else {
      if (player.hitsAster(squareAster[i])) {
        player.hurt = true;
        player.hurtTimer = frameCount;
        player.bounce(squareAster[i]);
        player.life -= (squareAster[i].h + squareAster[i].w)/20;
      }
    }
  }

  for (p = partGens.length-1;p>=0;p-- ){
    partGens[p].update();
    partGens[p].render();
    if (partGens[p].done()){
        partGens.splice(p,1);
    }
  }
  if (player.life<=0){
    endgame();
  }
  else if (squareAster.length <=0){
    winGame();
  }
  player.turn();
  player.update();
  player.render();
  player.offScreen();
  HUD();


}

function keyPressed() {
  if (key == ' ') {
    player.addLaser();
  } else if (keyCode == RIGHT_ARROW) {
    player.setRotation(0.06);
  } else if (keyCode == LEFT_ARROW) {
    player.setRotation(-0.06);
  } else if (keyCode == UP_ARROW) {
    player.move();
    player.changeMoving(true);
  } else if (key == 's') {
    loop();
  }else if (keyCode == DOWN_ARROW) {
    //player.vel.mult(0.8);
  } else if(key =='a'){noLoop();}
  else if(key =='r'){window.location.reload();}
}


function keyReleased() {
  if (keyCode == RIGHT_ARROW || keyCode == LEFT_ARROW) {
    player.setRotation(0);
  }
  if (keyCode == UP_ARROW) {
    player.changeMoving(false);
  }
}

function checkTimers() {
  if (frameCount > player.hurtTimer + 30) {
    player.hurtTimer = 0;
    player.hurt = false;

  }
  if (frameCount > player.shield.hitTimer + 30) {
    player.shield.hitTimer = 0;
    player.shield.hit = false;
  }

}

function endgame(){
  strokeWeight (2);
  textSize(24);
  stroke(255);
  text ("GAME OVER \n Press R to retry", width/2, height/2);
  noLoop();
}

function winGame(){
  strokeWeight (2);
  textSize(24);
  stroke(255);
  text ("YOU WIN \n" +"SCORE: " +score+"\n Press R to replay", width/2, height/2);
  noLoop();

}

function HUD() {
  strokeWeight (1);
  textSize(16);
  stroke(255);
  text ("Sheild: " + floor(max(player.shield.strength,0)) +
        "\n Hull: " + floor(max(player.life,0)), width/3, height-24);
  text ("Score: " + score, width*2/3, height -16);

}

class ship {
  constructor() {
    this.pos = createVector(width / 2, height / 2);
    this.r = 10;
    this.rotation = 0;
    this.heading = 0;
    this.vel = createVector(0, 0);
    this.maxSpeed = 3;

    this.moving = false;
    this.lasers = [];
    this.exl = [];

    this.hurt = false;
    this.hurtTimer = 0;
    this.life = 100;

    this.shield = new Shield(this.pos, this.r);
    this.mass = 1;
  }

  addLaser() {
    this.lasers.push(new Laser(this.pos.x, this.pos.y, this.heading, millis()));
  }

  hitsAster(aster) {

    return Circle_Rect(this.pos.x, this.pos.y, this.r*1.5, aster.pos.x,
      aster.pos.y, aster.w, aster.h);
  }

  shieldHit(aster){
      var s_hit =Circle_Rect(this.pos.x, this.pos.y, this.r*2,
aster.pos.x, aster.pos.y, aster.w, aster.h);
      return s_hit;
  }

  update() {
    this.checkLasers();

    if (this.moving) 
      {this.move();}
    this.pos.add(this.vel);
    this.vel.mult(0.98);
    

    //this.shield.update(this.pos);
  }

  move(){
    var force = p5.Vector.fromAngle(this.heading);
    this.vel.add(force);
    if (this.vel.mag() > this.maxSpeed ){
      this.vel.setMag(this.maxSpeed)
    }
  }

  changeMoving(b) {this.moving = b;}


  render() {
    for (var j = 0; j < this.lasers.length; j++) {
      this.lasers[j].render();
    }
    for (var l = 0; l < this.exl.length; l++) {
      this.exl[l].render();
    }
    push();
      translate(this.pos.x, this.pos.y);
      rotate(this.heading);
      noFill();
      strokeWeight(1);
      if (this.hurt) {
        stroke(255, 0, 0, 150);
      } else {
        stroke(255);
      }
      triangle( -2 / 3 * this.r, -this.r,
                -2 / 3 * this.r, this.r,
                4 / 3 * this.r, 0);
    pop();
    if(this.shield.strength>0){
    this.shield.render();
  }
  }

  offScreen () {
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
    } else if (this.pos.x < -this.r) {
        this.pos.x = width + this.r;
    } else if (this.pos.y > height + this.r) {
        this.pos.y = -this.r;
    } else if (this.pos.y < -this.r) {
        this.pos.y = height + this.r;
  }

}

 checkLasers(){
      for (var j = this.lasers.length - 1; j >= 0; j--) {
      this.lasers[j].updates();
      this.lasers[j].edges();
      var removed = false;
      if (this.lasers[j].expired()) {
        this.lasers.splice(j, 1);
        removed = true;
      }
      for (var k = squareAster.length - 1; k >= 0 && !removed; k--) {
        if (this.lasers[j].hits(squareAster[k])) {
          this.lasers[j].explode();
          this.lasers.splice(j, 1);
          removed = true;
          score +=  (squareAster[k].h+squareAster[k].w)/2;
          squareAster[k].explode();

          if (squareAster[k].w >=asterSize[1] || squareAster[k].h >=asterSize[1]) {
            var newA = squareAster[k].breakUp();
            squareAster = squareAster.concat(newA);
          }
          squareAster.splice(k, 1);
        }
      }
    }
 }

setRotation (a) {
  this.rotation = a;
}

turn (a) {
  this.heading += this.rotation;
}

bounce (aster) {
  this.vel.mult(0);
  var temp = aster.vel.copy().mult(4);
  this.vel.add(temp);
}
}

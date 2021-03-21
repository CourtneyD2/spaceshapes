class particle{

  constructor(x,y,color, size){
    this.pos = createVector (x,y);
    this.lifespan = 100;
    this.decay = 0.9;
    this.color = color;
    //this.alpha = a;
    this.size =  size || 1 ;
    //this.velVariance;

    this.vel = p5.Vector.random2D();
    this.vel.mult(random (0.1,5));
    this.acc = createVector(0,0);
  }

   applyForce (force) {
      this.acc.add(force);
    }

    update (){
      this.vel.mult (0.90);
      this.lifespan -= random(1,5);
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0)
    }

    done () {
      if (this.lifespan<0) {
        return true;
      } else {return false;}
    }

    show  () {
      this.size *= this.decay;
      strokeWeight(this.size);
      stroke(this.color, 0+this.lifespan);
      point(this.pos.x, this.pos.y);
    }

}

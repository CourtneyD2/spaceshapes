class Laser  {
  constructor(x,y, a, m){
  this.pos = createVector(x,y);
  this.prepos =this.pos.copy();

  this.vel = p5.Vector.fromAngle(a);
  this.vel.mult(10);

  this.created = m;
  this.duration = 1250;
  this.color = color(255,100,100);

  this.parts = [];

  }

  updates (){
    //this.prepos = this.pos.copy();
    this.prepos = this.pos.copy();
    this.pos.add(this.vel);
  }

  expired(){
    if (millis() >this.created+this.duration){return true;}
    return false;
  }

  edges (){
    if (this.pos.x > width){
      this.pos.x = -5;
    }
    else if (this.pos.x < 0){
      this.pos.x = width+5;
    }
    else if (this.pos.y > height ){
      this.pos.y = -5;
    }
    else if (this.pos.y < 0){
      this.pos.y = height+5;
    }
  }

  render (){
    push();
      stroke(255, 75,75,255);
      strokeWeight(5);
      point(this.pos.x, this.pos.y);
      //point();
    pop();
  }

  hits (aster) {
    var p1 = this.pos.copy();
    var p2 = this.prepos.copy();
    var v =this.vel.copy();
    v.mult(0.5);
    p1.add(v); p2.add(v.mult(-1));
    return Line_Rect (p1.x, p1.y, p2.x, p2.y, aster.pos.x, aster.pos.y, aster.w, aster.h);
    //return Point_Rect(this.pos.x,this.pos.y, aster.pos.x,aster.pos.y, aster.w,aster.h);
  }

  explode (){
    var r = 16;
    partGens.push(new particleGenerator(this.pos.copy(), this.color,1));
    partGens[partGens.length-1].explode(r);
    //console.log(partGens);
  }

}

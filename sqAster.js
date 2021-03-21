class sqAster {
  constructor(p, w, h, c) {
    this.pos = p || createVector(random(width), random(height));
    this.w = w || random(asterSize);
    if (h) {this.h = h;}
    else {
      if (random(0,1) >0.25){
        this.h = this.w;}
      else {this.h = random(asterSize);}
    }
    this.vel = p5.Vector.random2D();
    this.color = c || color(random(50,255),random(50,255),random(50,255));
    this.ID = asterCount;
  }

  render() {
    push();
    strokeWeight(2);
    stroke(this.color);
    noFill();
    rect(this.pos.x, this.pos.y, this.w, this.h);
    pop();
    }


  update() {
    this.pos.add(this.vel);
    }

  breakUp() {
    var newA = [];
    var nw = this.w/2;
    var nh = this.h/2;
    var pos1 = this.pos.copy();
    var pos2 = this.pos.copy(); pos2.x += nw;
    var pos3 = this.pos.copy(); pos3.x += nw; pos3.y += nh;
    var pos4 = this.pos.copy(); pos4.y+=nh;

    newA[0] = new sqAster(pos1, nw, nh, this.color);
    newA[1] = new sqAster(pos2, nw, nh, this.color);
    newA[2] = new sqAster(pos3, nw, nh, this.color);
    newA[3] = new sqAster(pos4, nw, nh, this.color);

    return newA;
  }

  offScreen() {
    if (this.pos.x< -this.w){
         this.pos.x = width;
    }
    else if (this.pos.x>width){
      this.pos.x = - this.w;
    }
    else if (this.pos.y<-this.h){
      this.pos.y = height;
    }
    else if (this.pos.y > height) {
      this.pos.y = -this.h;
    }
  }

  bounce() {
   this.vel =  p5.Vector.random2D();
  }

  explode (){
    var r = 16;
    partGens.push(new particleGenerator(this.pos.copy(), this.color,4));
    partGens[partGens.length-1].explode(r);
  }
  slide (p){
    var r = 16;
    partGens.push(new particleGenerator(p.copy(), this.color, 4));
    partGens[partGens.length-1].explode(r);
  }
}

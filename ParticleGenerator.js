class particleGenerator {

    constructor(pos, c, size){
      this.pos = pos;
      this.color = c;
      this.size = size;
      this.particles =[];
      this.activated = false;
      this.force = 0.001;
    }

    update(){
      for (var i = this.particles.length -1; i>=0;i--) {
        this.particles[i].applyForce(this.force);
        this.particles[i].update();
        if(this.particles[i].done ()){
          this.particles.splice (i, 1);
        }
      }
    }

    render() {
      for (var i = 0; i<this.particles.length;i++) {
        this.particles[i].show();
      }
    }

    done(){
      if (this.particles.length <=0){return true;}
      return false;
    }

    explode(r){
      for (var i = 0; i<r;i++) {
        var p = new particle (this.pos.x, this.pos.y, this.color, this.size);
        this.particles.push(p);
      }
    }


}

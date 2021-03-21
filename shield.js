class Shield {
  constructor(p, r, c) {
    this.pos = p;
    this.r = r;

    this.strength = 100;
    this.color = color (255,0,0);

    this.hit = false;
    this.hitTimer = 0;
    this.sideHit = 0;
  }

  render() {
    strokeWeight(2);
    stroke(100, 100, 255, 100);
    noFill();
    circle(this.pos.x, this.pos.y, this.r * 2);
    if (this.hit && this.sideHit != 0) {
      this.renderArc();
    }
  }

  update(pos) {
    //this.pos = pos;
  }

  hitArc(aster, fc) {
    this.sideHit = Circle_SideHit(this.pos.x, this.pos.y, this.pos.r,
                                  aster.pos.x, aster.pos.y, aster.w, aster.h);
    aster.slide(this.pos);
    this.slide(this.pos);
    this.hit = true;
    this.hitTimer = fc;
    //this.strength -= 1;
  }

  renderArc() {
    stroke(100, 100, 255);
    strokeWeight(2);
    noFill();
    var start = 0,
      end = 0;

    switch (this.sideHit) {
      case "right":
        start = -QUARTER_PI;
        end = QUARTER_PI;
        break;
      case "left":
        start = HALF_PI + QUARTER_PI;
        end = QUARTER_PI + PI;
        break;

      case "top":
        start = QUARTER_PI + PI;
        end = -QUARTER_PI;
        break;

      case "bottom":
        start = QUARTER_PI;
        end = HALF_PI + QUARTER_PI;
        break;
      default:
        start = 0;
        end = 0;
    }
    arc(player.pos.x, player.pos.y, this.r * 4, this.r * 4, start, end);
  }
  slide (p){
    var r = 16;
    partGens.push(new particleGenerator(p.copy(), this.color, 4));
    partGens[partGens.length-1].explode(r);
  }
}

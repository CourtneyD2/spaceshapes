//Functions for collision detection, created my own for now so I can better //understand what is going on. Though of course could use a library, and its //even possible the lib will have similar results or better results.

function Point_Point (x1, y1, x2, y2){
  return (x1==x2 && y1==y2) ? true:false;
}

function Point_Circle(px,py, cx,cy,r){
  var dX = px - cx;
  var dY = py - cy;
  var dist = Math.sqrt( (dX*dX) + (dY*dY) );

  if (dist <= r) {
    return true;
  }
  return false;
}

function Circle_Circle(c1x,c1y,c1r,c2x,c2y,c2r){
  var dX = c1x - c2x;
  var dY = c1y - c2y;
  var dist = Math.sqrt( (dX*dX) + (dY*dY) );

  if (dist <= cr1+cr2) {
    return true;
  }
  return false;
}

function Point_Rect(px,py, rx,ry,rw,rh,b){
  if (px+(1) >= rx &&
      px+(1) <= rx + rw &&
      py+(1) >= ry &&
      py+(1) <= ry + rh){
      return true;
  }
  else if (px-1 >= rx &&
           px-1 <= rx + rw &&
           py-1 >= ry &&
           py-1 <= ry + rh){
      return true;
  }
    return false;
}

function Rect_Rect(r1x, r1y, r1h,r1w, r2x,r2y,r2h,r2w){
  if (r1x + r1w >= r2x &&
      r1x <= r2x + r2w &&
      r1y + r1h >= r2y &&
      r1y <= r2y + r2h){
    return true;
  }
    return false;
}

function Circle_Rect(cx, cy, cr, rx, ry, rw, rh){
  var tX = cx;
  var tY = cy;

  if (cx < rx)         {tX = rx;  }
  else if (cx > rx+rw) {tX = rx+rw;}

  if (cy < ry)         {tY = ry;     }
  else if (cy > ry+rh) {tY = ry+rh;  }

  var dx = cx-tX;
  var dy = cy -tY;

  var dist = Math.sqrt((dx*dx)+(dy*dy));
  if (dist <=cr){
     return true;
  }
    return false;
}

function Line_Point(lx1, ly1, lx2, ly2, px, py ){
  var lineL = dist(lx1,ly1, lx2, ly2);
  var d1 = dist(lx1,ly1, px,py);
  var d2 = dist(lx2,ly2, px,py);
  var buffer = 0.1;

  if (d1+d2 >= lineL+buffer && d1+d2<=lineL-buffer){
   return true;
  }
  return false;
}

function Line_Circle(x1,y1,x2,y2, cx,cy,r){
  var inside1 = Point_Circle(x1,y1, cx,cy,r);
  var inside2 = Point_Circle(x2,y2, cx,cy,r);
  if (inside1 || inside2) {return true;}

  dX = x1 - x2;
  dY = y1 - y2;
  len = Math.sqrt( (dX*dX) + (dY*dY) );

  var dot = ( ((cx-x1)*(x2-x1)) + ((cy-y1)*(y2-y1)) ) / Math.pow(len,2);

  var closestX = x1 + (dot * (x2-x1));
  var closestY = y1 + (dot * (y2-y1));

  var onSegment = Line_Point(x1,y1,x2,y2, closestX,closestY);
  if (!onSegment) {return false;}

  dX = closestX - cx;
  dY = closestY - cy;
  var dist = Math.sqrt( (dX*dX) + (dY*dY) );
  if (dist <=r) {return true;}
  return false;

}

function Line_Line(x1,y1,x2,y2,x3,y3,x4,y4){
  var uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));

  var uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
  if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
    return true;
  }
  return false;

}

function Line_Rect(x1, y1, x2, y2, rx, ry, rw, rh){

  var left =   Line_Line(x1,y1,x2,y2, rx,ry,rx, ry+rh);
  var right =  Line_Line(x1,y1,x2,y2, rx+rw,ry, rx+rw,ry+rh);
  var top =    Line_Line(x1,y1,x2,y2, rx,ry, rx+rw,ry);
  var bottom = Line_Line(x1,y1,x2,y2, rx,ry+rh, rx+rw,ry+rh);

  if (left || right || top || bottom) {
    return true;
  }
  return false;
}

function Poly_Point(){
}

function Poly_Rect(){

}

function Poly_Line(){

}
function Poly_Poly(){
}

function Triangle_Point(){

}

function Circle_SideHit(cx, cy, cr, rx, ry, rw, rh){  
  if (cx < rx)         {return "right"  }
  else if (cx > rx+rw) {return "left"}

  if (cy < ry)         {return "bottom"}
  else if (cy > ry+rh) {return "top"  }

   return "inside";
}

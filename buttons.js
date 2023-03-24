class Buttons{
    constructor(x,y,w,h){
        this.pos = createVector(x,y);
        this.size = createVector(w,h);
        let box;
    }
    draw(){
        fill(250, 147, 12);
        strokeWeight(3);
        stroke(245, 26, 0);
        box = rect(this.pos.x, this.pos.y, this.pos.x + this.size.x, this.pos.y + this.size.y, 5);
    }
}
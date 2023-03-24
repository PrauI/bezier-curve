class Vehicle{
    constructor(){
        this.pos = createVector(50,300);
        this.vel = createVector(0,0);
        this.acc = createVector(0.5,0.5);
        this.maxSpeed = 4;
        this.maxforce = 3;
    }

    draw(){
        fill(100,150,250,250);
        strokeWeight(2);
        ellipse(this.pos.x, this.pos.y, 10,10);

    }

    update() {
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.set(0, 0);
      }

      addForce(force){
        force.limit(this.maxforce);
        this.acc.add(force);
      }

      

}
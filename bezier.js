class Bezier {
    constructor(a,b,c,d){
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;

        this.len = 100;
        this.arcLengths = new Array();
        this.arcLengths[0] = 0;

        this.points = new Array();


        this.calPoints();
    }

    x(t) {
        return ((1 - t) * (1 - t) * (1 - t)) * this.a.x
               + 3 * ((1 - t) * (1 - t)) * t * this.b.x
               + 3 * (1 - t) * (t * t) * this.c.x
               + (t * t * t) * this.d.x;
    }
    
    y(t) {
        return ((1 - t) * (1 - t) * (1 - t)) * this.a.y
               + 3 * ((1 - t) * (1 - t)) * t * this.b.y
               + 3 * (1 - t) * (t * t) * this.c.y
               + (t * t * t) * this.d.y;
    }

    draw(){
        beginShape()
        noFill();
        strokeWeight(4);
        for(let i = 0; i < this.points.length; i++){
            let x = this.points[i].x;
            let y = this.points[i].y;
            vertex(x,y);
        }
        endShape();

        if(editmode){
            noStroke();
            fill(50,100, 220, 250);
            ellipse(this.b.x, this.b.y, 7);
            ellipse(this.c.x, this.c.y, 7);

            strokeWeight(1);
            stroke(50,100, 220, 250);
            line(this.a.x, this.a.y, this.b.x, this.b.y);
            line(this.d.x, this.d.y, this.c.x, this.c.y);

            strokeWeight(1);
            stroke(250);
            fill(150);
            rect(this.a.x - 5, this.a.y - 5, 10);
            rect(this.d.x - 5, this.d.y - 5, 10);
        }
    }

    calPoints(){
        this.points = [];
        var ox = this.x(0), oy = this.y(0), clen = 0;

        for(var i = 0; i <= 1.000001; i += 1/this.len){
            var x = this.x(i), y = this.y(i);
            var dx = ox - x, dy = oy - y;
            clen += Math.sqrt(dx * dx + dy * dy);
            this.arcLengths[Math.floor(i * this.len)] = clen;
            ox = x, oy = y;
        }
        this.length = clen;

        for(let u = 0; u <= 1.000001; u+= 0.02){
            // console.log(this.map(i));
           let x = this.x(this.map(u));
           let y = this.y(this.map(u));
           this.points.push(createVector(x,y));
           // console.log(x,y);
       }
       this.points.push(createVector(this.d.x, this.d.y));
    }

    map(u){
        let desiredLength = u * this.arcLengths[this.len - 1];
        let smallestDiff = 100;
        let smallestIndex;

        for(let index = 0; index < this.arcLengths.length; index++){
            let currLen = this.arcLengths[index];

            // calculate difference between lengths
            let diff = Math.abs(currLen - desiredLength);
            // console.log(desiredLength);
            if(diff < smallestDiff){
                smallestDiff = diff;
                smallestIndex = index;
            }
        }
        // console.log(smallestIndex);
        let t = smallestIndex / this.arcLengths.length;
        // console.log(smallestIndex);
        return t;
    }
    
}
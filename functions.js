
class Rectangle{
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.cornerRadius = 0;
    }
    draw(){
        rect(this.x, this.y, this.x + this.width, this.y + this.height, this.cornerRadius);
        this.checkEvents();
    }
    checkEvents(){
        if(mouseX < this.x + this.width && mouseX > this.x && mouseY < this.y + this.height && mouseY > this.y){
            console.log(true);
        }
    }
}

class Oval{
    constructor(x,y,r){
        this.x = x;
        this.y = y;
        this.radius = r;
        
    }
    draw(){
        ellipse(this.x, this.y, this.radius, this.radius);
        this.checkEvents();
    }
    checkEvents(){
        let mouse = createVector(mouseX, mouseY);
        let pos = createVector(this.x, this.y);
        if(p5.Vector.dist(mouse,pos) < this.radius){
            console.log(true);
        }
    }
}






function tangent(list, t, a){
    let x = 
    list[a + 0].x * (-3 * Math.pow(t,2) + 6 * t - 3)+
    list[a + 1].x * (9 * Math.pow(t,2) - 12 * t + 3)+
    list[a + 2].x * (-9 * Math.pow(t,2) + 6 * t) +
    list[a + 3].x * (3 * Math.pow(t,2));
    let y = 
    list[a + 0].y * (-3 * Math.pow(t,2) + 6 * t - 3)+
    list[a + 1].y * (9 * Math.pow(t,2) - 12 * t + 3)+
    list[a + 2].y * (-9 * Math.pow(t,2) + 6 * t) +
    list[a + 3].y * (3 * Math.pow(t,2));
    let tangent = createVector(x,y);
    return tangent.normalize();
}

function cubic(list, t, a){
    let x = list[a + 0].x * (-1*(Math.pow(t,3)) + 3 * Math.pow(t, 2) - 3 * t + 1) +
            list[a + 1].x * (3*Math.pow(t,3) - 6*Math.pow(t,2) + 3*t) +
            list[a + 2].x * (-3*Math.pow(t,3) + 3* Math.pow(t, 2))+
            list[a + 3].x * (Math.pow(t,3));
    let y = list[a + 0].y * (-1*(Math.pow(t,3)) + 3 * Math.pow(t, 2) - 3 * t + 1) +
            list[a + 1].y * (3*Math.pow(t,3) - 6*Math.pow(t,2) + 3*t) +
            list[a + 2].y * (-3*Math.pow(t,3) + 3* Math.pow(t, 2))+
            list[a + 3].y * (Math.pow(t,3));
    return createVector(x,y);
}

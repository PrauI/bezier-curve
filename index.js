
let beziers;
let editmode = true;
let newBezier = false;
let pointInfo;
let car;
let deltaTime;
let newPoints = [null, null];
let cnv;
let collision;
let editButton;
let canvas;

function setup(){
    cnv = createCanvas(600,600);
    beziers = new Array();

    let a = createVector(50,300);
    let b = createVector(600,250);
    let c = createVector(100,100);
    let d = createVector(600,200);
    beziers[0] = new Bezier(a,b,c,d);
    canvas = document.getElementById("defaultCanvas0");
    console.log(canvas);
    canvas.addEventListener("click", newPoint);
    

}

function draw(){
    let start = millis();
    background(150);
    noFill();
    stroke(255);
    strokeWeight(2);


    // drawCubicBezier(beziers[0].path, editmode);
    for(let i = 0; i < beziers.length; i++){
        edit(beziers[i].a, beziers[i].b, beziers[i].c, beziers[i].d, i);
        beziers[i].draw();
    }


    // beziers[0].calculateBoundingBox(0);
    

    // carShit();
    deltaTime = millis() - start;
    // console.log(deltaTime);
}



function mouseReleased(){
    
}

function edit(a,b,c,d, j){
    // if mouse is over
    let points = [a,b,c,d]
    for(let i = 0; i < points.length; i++){
        let point = points[i];
        let mouse = createVector(mouseX, mouseY);
        collision = twoCircleCollision(point, mouse, 10,1);
        if(mouseIsPressed){
            if(collision){
                pointInfo = [points[i], i, j];
            }
        }    
    }
}

function mouseDragged(){
    // console.log(dragpoint);
    let dragpoint = pointInfo[0];
    let i = pointInfo[1];
    let j = pointInfo[2];


    if(i == 0 || i == 3){
        // ancor Point
        dragpoint.x = mouseX;
        dragpoint.y = mouseY;
        
    }else{
        dragpoint.x = mouseX;
        dragpoint.y = mouseY;
    }
    if(pointInfo){
        beziers[j].calPoints();
    }
}

function mouseReleased(){
    pointInfo = null;
}


function newPoint(){
    if(newBezier){
        let x = mouseX;
        let y = mouseY;
        for(let i = 0; i < newPoints.length; i++){
            if(!newPoints[i]){
                newPoints[i] = createVector(x,y);
                if(i == 1){
                    let a = newPoints[0];
                    let d = newPoints[1];
                    let b = createVector((d.x - a.x)* 0.3 + a.x, (d.y - a.y)* 0.3 + a.y);
                    let c = createVector((a.x - d.x)* 0.3 + d.x, (a.y - d.y)* 0.3 + d.y);
                    let bez = new Bezier(a,b,c,d);
                    beziers.push(bez);
                    newPoints = [null,null];
                    newBezier = false;
                }
                break;
            }
        }
    }
}

newBezierButton.onclick = function(event){
    newBezier = true;
}

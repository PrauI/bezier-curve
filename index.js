
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
let paths;

function setup(){
    cnv = createCanvas(600,600);
    paths = new Array();

    paths[0] = new Path();

    let a = createVector(50,300);
    let b = createVector(600,250);
    let c = createVector(100,100);
    let d = createVector(600,200);
    let bezier = new Bezier(a,b,c,d);
    paths[0].beziers.push(bezier);
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
    for(let i = 0; i < paths.length; i++){
      for(let j = 0; j < paths[i].beziers.length; j++){
        let bezier = paths[i].beziers[j];
        edit(bezier.a, bezier.b, bezier.c, bezier.d, j, i);
        bezier.draw();
      }
    }


    // beziers[0].calculateBoundingBox(0);
    

    // carShit();
    deltaTime = millis() - start;
    // console.log(deltaTime);
}




function edit(a,b,c,d, j, i){
    // if mouse is over and pressed Possition of updatet Point gets stored in pointInfo
    // j = number of Bezier in Path (class) Array
    // i = number of Path in paths (variable) Array
    // n = number of Point (is Necessary to know what kind of point it is)
    let points = [a,b,c,d]
    for(let n = 0; n < points.length; n++){
        let point = points[n];
        let mouse = createVector(mouseX, mouseY);
        collision = twoCircleCollision(point, mouse, 10,1);
        if(mouseIsPressed){
            if(collision){
                pointInfo = [points[n], n, i, j];
            }
        }    
    }
}

function mouseDragged(){

    let dragpoint = pointInfo[0];
    let n = pointInfo[1];
    let i = pointInfo[2];
    let j = pointInfo[3];


    if(n == 0 || n == 3){
        // ancor Point
        dragpoint.x = mouseX;
        dragpoint.y = mouseY;
        
    }else{
        dragpoint.x = mouseX;
        dragpoint.y = mouseY;
    }
    if(pointInfo){
      let bezier = paths[i].beziers[j];
      bezier.calPoints();
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
                    paths[0].beziers.push(bez);
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
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

function setup() {
  cnv = createCanvas(600, 600);
  paths = new Array();

  paths[0] = new Path();

  // let a = createVector(50,300);
  // let b = createVector(600,250);
  // let c = createVector(100,100);
  // let d = createVector(600,200);
  // let bezier = new Bezier(a,b,c,d);
  // paths[0].beziers.push(bezier);
  canvas = document.getElementById("defaultCanvas0");
  console.log(canvas);
  canvas.addEventListener("click", test);
}

function draw() {
  let start = millis();
  background(150);
  noFill();
  stroke(255);
  strokeWeight(2);

  // drawCubicBezier(beziers[0].path, editmode);
  for (let i = 0; i < paths.length; i++) {
    for (let j = 0; j < paths[i].beziers.length; j++) {
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

function edit(a, b, c, d, j, i) {
  // if mouse is over and pressed Possition of updatet Point gets stored in pointInfo
  // j = number of Bezier in Path (class) Array
  // i = number of Path in paths (variable) Array
  // n = number of Point (is Necessary to know what kind of point it is)
  let points = [a, b, c, d];
  for (let n = 0; n < points.length; n++) {
    let point = points[n];
    let mouse = createVector(mouseX, mouseY);
    collision = twoCircleCollision(point, mouse, 10, 1);
    if (mouseIsPressed) {
      if (collision) {
        pointInfo = [points[n], n, i, j];
      }
    }
  }

}

function mouseDragged() {
  let dragpoint = pointInfo[0];
  let n = pointInfo[1];
  let i = pointInfo[2]; // number of Path in paths
  let j = pointInfo[3]; // number of Bezier in Path

  let coPo1 = null;
  let coPo2 = null;

  if (n == 0) {
    // ancor Point
    dragpoint.x = mouseX;
    dragpoint.y = mouseY;
    let bezier = paths[i].beziers[j];
    let vec = createVector(dragpoint.x - paths[i].beziers[j].a.x, dragpoint.y - paths[i].beziers[j].a.y);

    if(j == 0){
      let contPo = paths[i].beziers[i].b;
      contPo.x += vec.x;
      contPo.y += vec.y;
      bezier.calPoints();
    }
  } else if(n == 3){

  }else {
    dragpoint.x = mouseX;
    dragpoint.y = mouseY;
  }
  if (pointInfo) {
    bezier.calPoints();
  }
}

function mouseReleased() {
  pointInfo = null;
}

newBezierButton.onclick = function (event) {
  newBezier = true;
};

function test(){
  if (newBezier) {
    let x = mouseX;
    let y = mouseY;
    for (let i = 0; i < newPoints.length; i++) {
      if (!newPoints[i]) {
        newPoints[i] = createVector(x, y);
        if (i >= 1) {
          console.log(i);
          let a = newPoints[i - 1];
          let d = newPoints[i];
          let b,c;

          b = createVector(
            (d.x - a.x) * 0.3 + a.x,
            (d.y - a.y) * 0.3 + a.y
            );
          c = createVector(
            (a.x - d.x) * 0.3 + d.x,
            (a.y - d.y) * 0.3 + d.y
            );

          let prevBezier = paths[0].beziers[paths[0].beziers.length - 1];
          if(paths[0].beziers.length >= 1){
            let vec =  createVector(a.x - prevBezier.c.x, a.y - prevBezier.c.y);
            b = createVector(a.x + vec.x, a.y + vec.y);
          }
          let bez = new Bezier(a, b, c, d);
          paths[0].beziers.push(bez); // Hier muss noch die null irgendwann geändert werden in eine variable
          newPoints = [newPoints[1], null];
        }
        break;
      }
    }
  }
}

document.addEventListener('keydown', function(event){
  if(event.key = "Enter"){
    newBezier = false;
  }
});
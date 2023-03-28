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
      bezier.calPoints();
      bezier.draw();
    }
  }

  // beziers[0].calculateBoundingBox(0);

  // carShit();
  deltaTime = millis() - start;
  // console.log(deltaTime);
}


function mouseDragged() {
  let dragpoint = pointInfo[0];
  let n = pointInfo[1];
  let i = pointInfo[2]; // number of Path in paths
  let j = pointInfo[3]; // number of Bezier in Path

  let coPo1 = null;
  let coPo2 = null;

  // Erste Bezier
  if(j == 0){
    switch (n) {
      case 0:
        coPo1 = paths[i].beziers[j].b;
        coPo2 = null;
        break;
      case 1:
        coPo1 = null;
        coPo2 = null;
        break;
      case 2:
        if(paths[i].beziers.length > 1){
          coPo1 = paths[i].beziers[1].b;
          coPo2 = null;
        }
        break;
      case 3:
        coPo1 = paths[i].beziers[j].c;
        if(paths[i].beziers.length > 1){
          coPo2 = paths[i].beziers[1].b;
        }else{
          coPo2 = null;
        }
        break;

      default:
        break;
    }
  }
  // Letzte Bezier
  else if(j == paths[i].beziers.length - 1){
    switch (n) {
      case 0:
        coPo1 = paths[i].beziers[j - 1].c;
        coPo2 = paths[i].beziers[j].b;
        break;
      case 1:
        coPo1 = paths[i].beziers[j - 1].c;
        coPo2 = null;
        break;
      case 2:
        coPo1 = null;
        coPo2 = null;
        break;
      case 3:
        coPo1 = paths[i].beziers[j].c;
        coPo2 = null;
        break;
    
      default:
        break;
    }
  }
  // Mittlere Beziers
  else{
    switch (n) {
      case 0:
        coPo1 = paths[i].beziers[j - 1].c;
        coPo2 = paths[i].beziers[j].b;
        break;
      case 1:
        coPo1 = paths[i].beziers[j - 1].c;
        coPo2 = null;
        break;
      case 2:
        coPo1 = paths[i].beziers[j + 1].b;
        coPo2 = null;
        break;
      case 3:
        coPo1 = paths[i].beziers[j].c;
        coPo2 = paths[i].beziers[1].b;
        break;
    
      default:
        break;
    }
  }

  let contPoints = [coPo1, coPo2];

  if(n == 0 || n == 3){
    for(let i = 0; i < 2; i++){
      let coPo = contPoints[i];
      if(coPo){
        coPo.x -= dragpoint.x - mouseX;
        coPo.y -= dragpoint.y - mouseY;
      }
    }
  }else{
    for(let i = 0; i < 2; i++){
      let coPo = contPoints[i];
      if(coPo){
        coPo.x += dragpoint.x - mouseX;
        coPo.y += dragpoint.y - mouseY;
      }
    }
  }

  dragpoint.x = mouseX;
  dragpoint.y = mouseY;
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
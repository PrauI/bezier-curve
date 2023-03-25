if(i == 0){
    coPo = beziers[0].path[1];
}else if(i == beziers[0].path.length-1){
    coPo = beziers[0].path[i - 1];
}else{
    coPo = beziers[0].path[i - 1];
    coPo2 = beziers[0].path[i + 1];
}
direction = createVector(coPo.x - dragpoint.x, coPo.y - dragpoint.y);
if(coPo2){
    direction2 = createVector(coPo2.x - dragpoint.x, coPo2.y - dragpoint.y);
}
dragpoint.x = mouseX;
dragpoint.y = mouseY;
if(coPo2){
    coPo2.x = dragpoint.x + direction2.x;
    coPo2.y = dragpoint.y + direction2.y;
}
coPo.x = dragpoint.x + direction.x;
coPo.y = dragpoint.y + direction.y;

// controll Points
// controll Point
let ancorPoint;
let couplePoint;
if(i == 1 || i == beziers[0].path.length - 2){
    dragpoint.x = mouseX;
    dragpoint.y = mouseY;
}else if(i % 3 == 1){
    // zweiter contp
    couplePoint = beziers[0].path[i-2];
    ancorPoint = beziers[0].path[i-1];
    dragpoint.x = mouseX;
    dragpoint.y = mouseY;
    vec1 = createVector(ancorPoint.x - dragpoint.x, ancorPoint.y - dragpoint.y);
    vec2 = createVector(couplePoint.x - ancorPoint.x, couplePoint.y - ancorPoint.y);
    let deg = vec1.heading();
    vec2.setHeading(deg);
    line(ancorPoint.x, ancorPoint.y, vec2.x, vec2.y);
    couplePoint.x = ancorPoint.x + vec2.x;
    couplePoint.y = ancorPoint.y + vec2.y;

    
}else if(i % 3 == 2){
    // zweiter contp#
    couplePoint = beziers[0].path[i+2];
    ancorPoint = beziers[0].path[i+1];
    dragpoint.x = mouseX;
    dragpoint.y = mouseY;
    vec1 = createVector(ancorPoint.x - dragpoint.x, ancorPoint.y - dragpoint.y);
    vec2 = createVector(couplePoint.x - ancorPoint.x, couplePoint.y - ancorPoint.y);
    let deg = vec1.heading();
    vec2.setHeading(deg);
    line(ancorPoint.x, ancorPoint.y, vec2.x, vec2.y);
    couplePoint.x = ancorPoint.x + vec2.x;
    couplePoint.y = ancorPoint.y + vec2.y;
}

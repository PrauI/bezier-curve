
function twoCircleCollision(a,b,r1,r2){
    let distance = p5.Vector.dist(a,b);
    if(distance < r1 + r2){
        return true;
    }
    return false;
}

function boxCollision(a,b,c,d){
    
    return true;
}
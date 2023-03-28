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
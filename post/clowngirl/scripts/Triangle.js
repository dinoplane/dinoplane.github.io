class Triangle{
  constructor(position_=[0.0, 0.0, 0.0],
    color_=[1.0,1.0,1.0,1.0], size_=5.0, vertices_=[]){
    this.type = 'triangle';
    if (vertices_.length == 6)
      this.position = vertices_[0];
    else this.position = position_;
    this.color = color_;
    this.size = size_;
    this.vertices = vertices_;
  }

  render(){
    var xy = this.position;
    var size = this.size;
    var rgba = this.color;

    // Pass the position of a point to a_Position variable
    gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);

    // Pass the size of a point to u_Size variable
    gl.uniform1f(u_Size, size);

    // Pass the color of a point to u_FragColor variable
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    
    // Draw triangle
    if (this.vertices.length == 6){
      drawTriangle(this.vertices);
    } else {
      var d = this.size/200.0;
      drawTriangle([xy[0], xy[1], xy[0]+d, xy[1], xy[0], xy[1]+d]);
    }
  }
}

function drawTriangle(vertices) {
  var n = 3; // The number of vertices

  // Create a buffer object
  var vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }

  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  // Write date into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);

  // Assign the buffer object to a_Position variable
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_Position);

  gl.drawArrays(gl.TRIANGLES, 0, n);
  //return n;
}




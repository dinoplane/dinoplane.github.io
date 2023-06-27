class Solid {
    constructor(type_='', color_=[1.0, 1.0, 1.0,1.0], matrix_=new Matrix4()) {
      if (this.constructor == Solid) {
        throw new Error("Abstract classes can't be instantiated.");
      }
      this.buffer = gl.createBuffer();
      if (!this.buffer) {
        console.log('Failed to create the buffer object');
        return -1;
      }
      this.type = type_;
      this.color = color_;
      this.matrix = matrix_;


      this.reset();
    }

    reset(){
        this.triangles = [];
        this.tricolors = [];
    }
  
    setMatrix(matrix_){
        this.matrix = matrix_;
    }

    translate(...a){
        this.matrix.translate(...a);
    }

    scale(...a){
        this.matrix.scale(...a);
    }

    rotate(...a){
        this.matrix.rotate(...a);
    }

    calculateVerts(){
        throw new Error("Method 'calculateVerts()' must be implemented.");
    }

    pushTriangle3D(vertices){
        this.triangles.push(new Float32Array(vertices));
    }

    render(){

        console.assert(this.tricolors.length == this.triangles.length, this.type,
                        this.tricolors.length, "colors and", this.triangles.length, "triangles...")
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements)
        for (let i = 0; i < this.triangles.length; i++){
            gl.uniform4f(u_FragColor, this.tricolors[i][0], this.tricolors[i][1], this.tricolors[i][2], this.tricolors[i][3]);
            this.drawTriangle3D(this.triangles[i]);
        }
    }

    drawTriangle3D(vertices) {
        var n = vertices.length/3; // The number of vertices
      
        // Bind the buffer object to target
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        // Write date into the buffer object
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.DYNAMIC_DRAW);
      
        // Assign the buffer object to a_Position variable
        gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
      
        // Enable the assignment to a_Position variable
        gl.enableVertexAttribArray(a_Position);
      
        gl.drawArrays(gl.TRIANGLES, 0, n);
    }
  }
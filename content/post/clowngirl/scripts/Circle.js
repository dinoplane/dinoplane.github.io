class Circle{
    constructor(position_=[0.0, 0.0, 0.0],
      color_=[1.0,1.0,1.0,1.0], size_=5.0, segments_=10){
      this.type = 'circle';
      this.position = position_;
      this.color = color_;
      this.size = size_;
      this.segments = segments_;
    }
  
    render(){
      var xy = this.position;
      var rgba = this.color;
  
      gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

      var d = this.size/200.0;

      let angleStep = 360/this.segments;
      let centerPt = [xy[0], xy[1]];
      let nextAngle;
      let vec1, vec2, pt1, pt2;

      for (let currAngle = 0; currAngle < 360; currAngle += angleStep){
        nextAngle = currAngle+angleStep;
        vec1 = [Math.cos(currAngle*Math.PI/180)*d, Math.sin(currAngle*Math.PI/180)*d];
        vec2 = [Math.cos(nextAngle*Math.PI/180)*d, Math.sin(nextAngle*Math.PI/180)*d];

        pt1 = [centerPt[0]+vec1[0], centerPt[1]+vec1[1]];
        pt2 = [centerPt[0]+vec2[0], centerPt[1]+vec2[1]];

        drawTriangle([...xy, ...pt1, ...pt2]);
      }
    }
  }
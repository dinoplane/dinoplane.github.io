class Pyramid extends Solid{
    constructor( numV_=4, h_=1.0, color_=[1.0, 1.0, 1.0, 1.0], matrix_= new Matrix4(), noface_=false){
        super('pyramid', color_, matrix_);
        this.r = 1.0;
        this.numV = numV_
        this.cangle=360/numV_;
        this.h = h_;
        this.apex = [0, 0]
        this.botface = [];
        this.noface = noface_;
        
        this.calculateVerts(); // You really only need to compute the vertices once!
    }


    setMaxWidth(w){
        this.r = w/2; // guaranteed
        this.calculateVerts();
    }

    setSideLength(s){
        this.r = (0.5*s)/Math.sin(this.cangle*Math.PI/360);
        this.calculateVerts();
    }

    setHeight(h_){
        this.h = h_;
        this.calculateVerts()
    }

    calculateVerts(){
        this.reset();
        this.botface=[];
        // Calculate regular polygon
        
        let startAng = -(180-this.cangle)/2;
        for (let currAngle = -startAng; currAngle < 360-startAng; currAngle += this.cangle){
            // let nextAngle = currAngle+angleStep;
            this.botface.push([Math.cos(currAngle*Math.PI/180)*this.r, 
                        Math.sin(currAngle*Math.PI/180)*this.r]);
        }

        let rgba = this.color.slice();
        let v = this.numV;

        
        let f = this.h/2;

        // Draw lateral faces
        for (let i = 0; i < this.numV; i++){
            rgba.forEach(function(item, index, array){
                if (index < 3){
                    if (i % 2) array[index] *= 1.25;
                    else array[index] *= 0.8;
                }
            });
            this.tricolors.push([rgba[0], rgba[1], rgba[2], rgba[3]]);

            this.pushTriangle3D([this.botface[i][0],     -f, this.botface[i][1], 
                            this.botface[(i+1)%this.numV][0],   -f, this.botface[(i+1)%this.numV][1],
                            this.apex[0],    f, this.apex[1]]); // bot lateral
        }

        rgba.forEach(function(item, index, array){
            if (index < 3) array[index] = 0.7*item;
        })

        this.tricolors.push([rgba[0], rgba[1], rgba[2], rgba[3]]);

        // Draw bottom face
        let botface = [];
        for (let i = 1; i <= this.numV - 2; i++){
            botface.push(this.botface[i][0],     -f, this.botface[i][1], 
                            this.botface[i+1][0],   -f, this.botface[i+1][1],
                            this.botface[0][0],     -f, this.botface[0][1]);
        }
        this.pushTriangle3D(botface);
    }

    scaleFace(scale){
        this.botface.forEach(function(item, index, array){
            array[index][0] *= scale;
            array[index][1] *= scale;
        })
    }

    // translateFace(x, z){
    //     this.botface.forEach(function(item, index, array){
    //         array[index][0] += x;
    //         array[index][1] += z;
    //     })
    // }

    // translateApex(x, y, z){
    //     // Do i need this?
    // }
}
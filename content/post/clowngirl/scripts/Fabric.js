// Idea

// Create a square mesh...
// points may get updated...
// draw quads for each 
// set of 4 


// USE NOISE TO GENERATE A FABRIC FEEL?

// Make a propagation function
// Start at left side and sweep to the right
// does each point also need a delta?
// figre that out later...
// first do the mesh, then the animation.

// then you are set!


class Fabric extends Solid{
    constructor(size_,r_, c_, color_=[1.0, 1.0, 1.0, 1.0], matrix_= new Matrix4(), fixed=true){
        super('fabric', color_, matrix_);

        this.r= r_;
        this.c = c_;
        this.size = size_;
        this.thickness = 0.01; // thickness
        this.fixed = true;
        this.length = this.size*this.r;
        this.width = this.size*this.c;
        
        // offsets
        //this.tl = [posX, posY, posZ];

        
        //this.br = [0,0,0];
        //this.pos = [];
        // for (let i = 0; i < this.c; i++){
        //     let p = [];
        //     for (let j =0; j < this.r;j++)
        //         p.push([ 0, ]);
        //     this.pos.push(p);
        // }
        this.calculateVerts();

    }

    calculateVerts(){
        this.reset();
        let rgba = this.color.slice();
        let s = this.size/2;
        let h = this.thickness/2;
        this.tlx = -(this.size*this.c)/2;
        this.tly = -(this.size*this.r)/2;
        
        let x = this.tlx;
        let z = this.tly;
        this.pos = [];
        for (let j = 0; j < this.r+1; j++){
            let p = [];
            x = this.tlx;
            for (let i = 0; i < this.c+1; i++){
                p.push([x, 0, z]);
                x+= this.size;
            } this.pos.push(p);
            z += this.size;
        }
        //console.log(this.pos);


        // Only need lateral of sides
 
        for (let j = 0; j < this.r; j++){
            for (let i = 0; i < this.c; i++){
                //console.log(j*this.c + i);
                if (j == 0)
                this.tricolors.push([1,1,1,1]);
                else if ((j % 2) == (i % 2) )
                    this.tricolors.push([rgba[0], rgba[1], rgba[2], rgba[3]]);
                else this.tricolors.push([rgba[0]*0.9, rgba[1]*0.9, rgba[2]*0.9, rgba[3]]);
                // tl, tr, bl, br    ->   
                this.pushTriangle3D([...this.pos[j][i], ...this.pos[j][i+1], ...this.pos[j+1][i+1], // tl, tr, br
                                     ...this.pos[j][i], ...this.pos[j+1][i+1], ...this.pos[j+1][i]]);  // tl, br, bl
            }
        }

        // this.tricolors.push([rgba[0]*0.2, rgba[1], rgba[2], rgba[3]]);
        // this.pushTriangle3D([-s, -h,   s,        s, -h, -s,       s,  -h,   s, 
        //                         -s, -h,   s,      -s, -h, -s,       s,  -h, -s]);
    }

    updateOffset(i, j, v){ // vertex so.. we have from 0 to this.r and 0 to this.c inclusive

        this.pos[j][i] = v;

        // Find the 6 triangles affected

        // find current tile (tl)
        let n = this.getTilefromCoords(i, j);
        if (n >= 0) {
            //this.tricolors[n] = [0,0,1,1];
            this.triangles[n][1] = v;
            this.triangles[n][10] = v;
        }
        
        // Find top left (br)
        let tl = this.getTilefromCoords(i-1, j-1);
        if (tl >= 0) {
            //this.tricolors[tl] = [0,1,0,1];
            this.triangles[tl][7] = v;
            this.triangles[tl][13] = v;
        }
        
        // Find top right (bl)
        let tr = this.getTilefromCoords(i, j-1);
        if (tr >= 0) {
            //this.tricolors[tr] = [0,1,1,1];
            this.triangles[tr][16] = v;
        }

        // Find bot left (tr)
        let bl = this.getTilefromCoords(i-1, j);
        if (bl >= 0) {
            //this.tricolors[bl] = [1,0,1,1];
            this.triangles[bl][4] = v;
        }

    }

    getVertfromCoords(i, j) { // vert from coords if coords are correct
        if (i >= 0 && i <= this.c && j >= 0 && j <= this.r)
            return j*this.c + i;
        return -1;
    }

    getTilefromCoords(i, j) { // top left coord of a tile if it exists
        if (i >= 0 && i < this.c && j >= 0 && j < this.r)
            return j*this.c + i;
        return -1;
    }

    animate(tween=(s, i, j) => { return 0.1*Math.sin(s*20 + 0.5*j); }, s=g_seconds) { // for now lets animate by the y
        if (this.fixed)
            this.matrix.translate(0, -0.2*tween(s, 0, 0), 0);
        
        for (let j = 0; j <= this.r; j++){
            for (let i = 0; i <= this.c; i++){
                this.updateOffset(i,j,tween(s, i, j))
            }
        }
    }
    resetAnim(){
        this.animate((s, i, j)=> { return 0; });
    }


}
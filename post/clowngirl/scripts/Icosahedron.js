
const PHI = (1 + Math.sqrt(5)) / 2;

class Icosahedron extends Solid{
    constructor(color_=[1.0, 0.1, 1.0, 1.0], matrix_= new Matrix4(), pole=false){
        super('icosahedron', color_, matrix_);
        this.s = 1.0;
        this.pole = pole;
        this.remesh(pole); // You really only need to compute the vertices once!
    }

    remesh(pole=false){
        let l = 0.5;
        let w = 1/(2*PHI);
        this.vertices = [];
        
        // generate the 12 vertices
        // First number the icosahedron's vertices based off of rectangle used
        // An algorithmic way to draw it entails having 4 layers of vertices: a apex, 2 layers of pentagons, and a bottom vertex
        // Draw the caps then middle layers.
        // An easy way is to number the vertices so that one layer is odd number from 2-10 and the other 3-11
        
        this.apex = [ 0,  l,  w]; // 1
        this.bott = [ 0, -l, -w]; // 2

        this.vertices.push([ 0,  l, -w]);    // 0    0
        this.vertices.push([ w,  0, -l]);    // 11   1
        this.vertices.push([ l, +w,  0]);    // 5    2
        this.vertices.push([ l, -w,  0]);    // 7    3
        this.vertices.push([ w,  0,  l]);    // 9    4
        this.vertices.push([ 0, -l,  w]);    // 3    5
        this.vertices.push([-w,  0,  l]);    // 8    6
        this.vertices.push([-l, -w,  0]);    // 6    7
        this.vertices.push([-l, +w,  0]);    // 4    8
        this.vertices.push([-w,  0, -l]);    // 10   9

        if (pole){
            let a = Math.atan(w/l);
            let c = Math.cos(a);
            let s = Math.sin(a);
            
            let x = this.apex[1];
            let y = this.apex[2];
            this.apex[1] = x*c - y*s;
            this.apex[2] = x*s + y*c;
    
            x = this.bott[1];
            y = this.bott[2];
            this.bott[1] = x*c - y*s;
            this.bott[2] = x*s + y*c;
    
            for (let i = 0; i < this.vertices.length; i++){
                 x = this.vertices[i][1];
                 y = this.vertices[i][2]; 
                 this.vertices[i][1] = x*c - y*s;
                 this.vertices[i][2] = x*s + y*c;
            }    
        }
        this.calculateVerts();
    }

    // Is there an algorithmic way of generating 20 triangles? A: yes

    calculateVerts(){

        let c1 = this.color.slice();
        let c2 = [this.color[0]*2.2, this.color[1]*2.2, this.color[2]*2.2, this.color[3]]
        let c3 = [this.color[0]*3, this.color[1]*3, this.color[2]*3, this.color[3]]
        let c4 = [this.color[0]*0.8, this.color[1]*0.7, this.color[2]*0.7, this.color[3]]
        let c5 = [this.color[0]*0.5, this.color[1]*0.5, this.color[2]*0.5, this.color[3]]
        let tbc = [c1, c2, c3, c4, c5];
        
        for (let i = 0; i < 20; i++){
            this.tricolors.push(tbc[i % 5]);
        }


        /*
        this.tricolors.push([1, 0, 0, 1]);
        this.pushTriangle3D([
            ...this.vertices[0], 
            ...this.bott,
            ...this.apex
        ]);

        this.pushTriangle3D([
            ...this.bott,
            ...this.vertices[5],
            ...this.apex
        ]);

        this.tricolors.push([0, 0, 1, 1]);
        this.pushTriangle3D([
            ...this.vertices[8],
            ...this.vertices[7], 
            ...this.vertices[2]
        ]);
        this.pushTriangle3D([
            ...this.vertices[7],
            ...this.vertices[3], 
            ...this.vertices[2]
        ]);

        this.tricolors.push([0, 1, 0, 1]);
        this.pushTriangle3D([
            ...this.vertices[6],
            ...this.vertices[9], 
            ...this.vertices[4]
        ]);
        this.pushTriangle3D([
            ...this.vertices[9],
            ...this.vertices[1], 
            ...this.vertices[4]
        ]);*/
        let j = 0;
        for (let i = 0; i < 10; i+=2){
            this.pushTriangle3D([...this.apex, 
                ...this.vertices[i],
                ...this.vertices[(i+2) % 10]]); // top layer

            this.pushTriangle3D([...this.vertices[i],
                ...this.vertices[i+1],
                ...this.vertices[(i+2) % 10]]); // middle top lateral

            this.pushTriangle3D([...this.vertices[i+1],
                ...this.vertices[(i+3) % 10], 
                ...this.vertices[(i+2) % 10]]); // middle bot lateral

            this.pushTriangle3D([...this.vertices[i+1],
                ...this.bott,
                ...this.vertices[(i+3) % 10]]); // bot layer
        }     
    }
}
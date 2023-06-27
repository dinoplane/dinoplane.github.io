
function drawSegment(x1, y1, x2, y2, wavy=true, weightVal=false, w=3.9, u=0.1){
    if (x2 -x1 == 0) return plotVertical(x1, y1, x2, y2, wavy, weightVal, w, u);
    let m = (y2-y1)/(x2-x1);
    if (Math.abs(m) > 1){
        return plotVertical(x1, y1, x2, y2, wavy, weightVal, w, u);
    } else {
        return plotHorizontal(x1, y1, x2, y2, wavy, weightVal, w, u);
    }
}
  
  
// // drawing lines is more complicated than I expected...

function weight(t, x, a, b){
    if (b < a) {
        return  weight(t, x, b, a);
    }
    let mid = (b-a)/2;
    let g = (t > mid+a) ? Noise.fade((b-t)/mid) :  Noise.fade((t-a)/mid);
    return g*x;
}

function plotHorizontal(x1, y1, x2, y2, wavy=true, weightVal=false, w=3.9, u=0.1){
    if (x2 < x1){
        let ret =  plotHorizontal(x2, y2, x1, y1, wavy, weightVal, w, u);
        return [ret[2], ret[3], ret[0], ret[1]];
    }

    let m = (y2-y1)/(x2-x1);

    let i = x1;
    let j = y1;

    let dy = m/(60-g_selectedSize);
    let dx = 1/(60-g_selectedSize);
    let ny;

    let g = (weightVal) ? weight(i, Noise.perlin(w*(i+1)/2, w*(j+1)/2, 0, false), x1, x2) :
                                Noise.perlin(w*(i+1)/2, w*(j+1)/2, 0, false);
    let sy = j+(wavy)*u*g;
    addPoint(i, sy);
    i+=dx, j+=dy;

    for (;i < x2; i+=dx, j+=dy){
        g = (weightVal) ? weight(i, Noise.perlin(w*(i+1)/2, w*(j+1)/2, 0, false), x1, x2) :
                                Noise.perlin(w*(i+1)/2, w*(j+1)/2, 0, false);
        ny = j+(wavy)*u*g;
        addPoint(i, ny);
    }
    return [x1, sy, i-dx, ny];
}

function plotVertical(x1, y1, x2, y2, wavy=true, weightVal=false, w=3.9, u=0.1){
    if (y2 < y1){
        let ret =  plotVertical(x2, y2, x1, y1, wavy, weightVal, w, u);
        return [ret[2], ret[3], ret[0], ret[1]];
    }

    let m = (x2-x1)/(y2-y1);

    let i = x1;
    let j = y1; 
    let dx = m/(60-g_selectedSize);
    let dy = 1/(60-g_selectedSize);
    let nx;
    let g = (weightVal) ? weight(j, Noise.perlin(w*(i+1)/2, w*(j+1)/2, 0, false), y1, y2): 
            Noise.perlin(w*(i+1)/2, w*(j+1)/2, 0, false);
    let sx = i+wavy*u*g;
    addPoint(sx, j);
    j+=dy, i+=dx;
    
    for (;j < y2; j+=dy, i+=dx){
        g = (weightVal) ? weight(j, Noise.perlin(w*(i+1)/2, w*(j+1)/2, 0, false), y1, y2): 
            Noise.perlin(w*(i+1)/2, w*(j+1)/2, 0, false);
        nx = i+wavy*u*g;
        addPoint(nx, j);
    }
    return [sx, y1, nx, j-dy];
}

// similar to drawcircle
function drawArc(cx, cy, r, startangle, endangle, wavyx=true, wavyy=true, weightVal=false, w=3.9, u=0.1){
    let startrad = startangle*Math.PI/180;
    let endrad = endangle*Math.PI/180;
    // range of selected size is 40-5
    // 
    let incrad = (Math.PI/180)*(g_selectedSize/5)/r;
    let noisex, noisey;
    let starti, startj;
    
    // loop unroll once
    let d = startrad;
    let i = cx+Math.cos(d)*r;
    let j = cy+Math.sin(d)*r;
    let g, h;

    // noisex = wavyx*0.1*Noise.perlin(3.9*(i+1)/2, 3.9*(j+1)/2, 0, false);
    // noisey = wavyy*0.1*Noise.perlin(3.9*(i+1)/2, 3.9*(j+1)/2, 0, false);
    
    starti = i;
    startj = j;

    addPoint(starti, startj);
    d+=incrad;

    for (; d < endrad; d+=incrad){
        i = cx+Math.cos(d)*r;
        j = cy+Math.sin(d)*r;
        
        g = (weightVal) ? weight(d, Noise.perlin(w*(i+1)/2, w*(j+1)/2, 0, false), startrad, endrad) : 
                                    Noise.perlin(w*(i+1)/2, w*(j+1)/2, 0, false);
        h = (weightVal) ? weight(d, Noise.perlin(w*(i+1)/2, w*(j+1)/2, 0, false), startrad, endrad) : 
                                    Noise.perlin(w*(i+1)/2, w*(j+1)/2, 0, false);
        noisex = wavyx*u*g;
        noisey = wavyy*u*h;
        
        addPoint(i+noisex, j+noisey);
    }
    return [starti, startj, i, j]; // to prevent discontinuities.
}
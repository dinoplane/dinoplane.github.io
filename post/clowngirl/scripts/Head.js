class Head extends Cube{
    constructor(color_=[1.0, 1.0, 1.0, 1.0], matrix_= new Matrix4()){
        super(color_, matrix_);
        this.isExploded = false;
        this.duration = 10;
        this.currTime = 10; 
        this.transformExtra();
    }

    calculateVerts(){
        this.extra = {};

        super.calculateVerts();
    }

    transformExtra(){

    }

    explode(){
        this.isExploded = true;
        this.currTime = 0;
    }

    setMatrix(matrix_){
        this.matrix = matrix_;
        this.transformExtra();
    }

    render(){
        if (!this.isExploded){
            super.render();
            for (let part in this.extra){
                //console.log(part)
                this.extra[part].render();
            }    
        } else {
            this.currTime +=0.001;
            if (this.currTime == this.duration){
                this.isExploded = false;
            }
        }
    }
}
class Cannon{

    constructor (x,y,w,h, angle){
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
        this.angle=angle;

        this.cannon_base= loadImage("assets/cannonBase.png");
        this.cannonImg=loadImage("assets/canon.png")
    }

    display(){
        
        if(keyIsDown(DOWN_ARROW) && this.angle< 65 ){
            this.angle=this.angle+1
        }
        if (keyIsDown(UP_ARROW)  && this.angle > -40) {
            this.angle=this.angle-1
        }
        image(this.cannon_base,70,25,200,200)

        push ()
        translate(this.x,this.y)
        rotate(this.angle)
        imageMode(CENTER)  
        image (this.cannonImg,0,0,this.w,this.h)   
         pop ()
    }
}
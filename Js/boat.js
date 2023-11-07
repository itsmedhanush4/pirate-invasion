class Boat{
    constructor(x,y,w,h, boatPos, boatAnimation){
        var options={
            restitution : 0.8,
            density:1,
            friction:1
        }
        this.body= Bodies.rectangle(x,y,w,h,options)
        World.add(world,this.body) 
        this.animation = boatAnimation;
        this.w=w
        this.h=h
        this.boatPos=boatPos
        this.image=loadImage("assets/boat.png")
        this.speed= 0.05
        this.isBroken=false
    }

    animate(){
        this.speed+=0.05
    }


    display(){
        var pos=this.body.position;
        var angle= this.body.angle;
        var index= floor(this.speed % this.animation.length)
        push()
        translate (pos.x,pos.y)
        rotate(angle)
        imageMode (CENTER)
        image(this.animation[index],0,this.boatPos,this.w,this.h)
        pop()
    }
    remove(index){
        this.animation=brokenBoatAnimation
        this.speed=0.05
        this.w=300
        this.h=300
        this.isBroken=true
        setTimeout(()=>{
            Matter.World.remove(world,boats[index].body)
            delete boats[index]
        },500)
    }
}
class Cannonball{
    constructor(x,y){

        this.r=30;
        var options={
            isStatic:true
        }
        this.body=Bodies.circle (x,y,this.r,options)
        World.add(world,this.body)
        this.image= loadImage("assets/cannonball.png")
        this.animation=[this.image]
        this.path=[]
        this.sink=false
        this.speed=0.05

    }

    animate(){
        this.speed+=0.05
    }
    
    display(){
        var pos=this.body.position
        var angle= this.body.angle
        var index= floor(this.speed % this.animation.length)
        push()
        translate(pos.x,pos.y)
        rotate(angle)
        imageMode(CENTER)
        image(this.animation[index],0,0,this.r,this.r)
        pop()
        if(this.body.velocity.x>0 && this.body.position.x>250){
            var positions=[this.body.position.x,this.body.position.y]
            this.path.push(positions)
        }
        for (var i=0;i<this.path.length;i++) {
            image(this.image,this.path[i][0],this.path[i][1],5,5)
            
        }

    }
    
    shoot(){
        var newAngle= cannon.angle-28
        newAngle = newAngle *(3.14/180)     //convert radians to degrees
        var velocity= p5.Vector.fromAngle(newAngle)
        velocity.mult(0.5)              // to increase angle values

        Matter.Body.setStatic(this.body,false)
        Matter.Body.setVelocity(this.body,{x:velocity.x *(180/3.14), y: velocity.y * (180/3.14)})

    }
    remove(index){
        Matter.Body.setVelocity(this.body,{x:0,y:0})
        this.animation=watersplashAnimation
        this.sink=false
        this.speed=0.05
        this.r=150 //100 & 50
        setTimeout(()=>{
            Matter.World.remove(world,this.body)
            delete balls[index]
        },500)
    }
       
}

function Explosion(pos) {
    this.pos = pos ? pos.copy() : createVector(random(width), random(height));
    
    this.r = 10;
    this.exploding = true;
    this.speedExplosion = 1.1;

    this.update = () => {
        if(this.exploding)
          this.r *= this.speedExplosion;
    };

    this.hits = (ship) => {
        return false;
    }

    this.outsideWindow = () => {
        if(this.r > width) 
            return true;
    }
    
    this.render = () => {
        push();
        stroke(255);
        noFill();
        translate(this.pos.x, this.pos.y);
        //ellipse(0, 0, this.r*2);
        for(var i=0;i<20;i++) {
            var angle = map(i,0,20,0,TWO_PI);
            push();
            var p = createVector(this.r,0);
            rotate(angle);
            fill(i * 255 / 20, 255 - i * 255 / 20, 0);
            ellipse(p.x, p.y, this.r/10);
            pop();
        }
        pop();
    }
}
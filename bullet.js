function Bullet(posPlayer, motion) {
    this.speed = 10;
    this.pos = posPlayer ? posPlayer.copy() : createVector(random(width), random(height));
    this.motion = motion ? motion.copy() : createVector(random(-1,1), random(-1,1));
    
    if(this.motion.x === 0 && this.motion.y === 0)
      this.motion = createVector(random(1), random(1));

    this.motion.normalize().mult(this.speed);

    this.r = 30;

    console.log("%s %s %s", this.pos.x, this.pos.y, this.motion.x, this.motion.y);

    this.render = () => {
        fill(255);
        circle(this.pos.x, this.pos.y, this.r);
    }

    this.outsideWindow = function () {
        if(this.pos.x > width - this.r / 2) {
            // console.log("from right to left");
            return true;
        }
        if(this.pos.x < this.r / 2) {
            // console.log("from left to right");
            return true;
        }
        if(this.pos.y > height + this.r / 2) {
            // console.log("from right to left");
            return true;
        }
        if(this.pos.y < 0) {
            // console.log("from left to right");
            return true;
        }
    }

    this.update = () => {
        this.pos.add(this.motion);
        console.log("%s %s %s", this.pos.x, this.pos.y, this.motion.x, this.motion.y);
    }
}
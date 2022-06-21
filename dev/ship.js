function Ship() {
    this.pos = createVector(width/2, height/2);
    this.r = 30;
    this.heading = 0;
    this.rotation = 0;
    this.isBoosting = false;
    this.vel = createVector(0,0);
    this.death = false;

    this.update = function() {
        if(this.isBoosting)
          this.boost();
        this.pos.add(this.vel);
        this.vel.mult(0.95);
    }

    this.boost = () => {
        var force = p5.Vector.fromAngle(this.heading);
        force.mult(0.99);
        this.vel.add(force);
    }

    this.die = () => {
        this.death = true;
    }

    this.render = function() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.heading + PI/2);
        fill(0);
        stroke(this.death ? 155 : 255);
        triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
        fill(this.death ? 155 : 255);
        triangle(-this.r * 0.3, this.r, this.r * 0.3, this.r, 0, -this.r);
        pop();
    }
    
    this.hits = (asteroid) => {
        var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
        return d < this.r + asteroid.r;
    }

    this.edges = function () {
        if(this.pos.x > width + this.r) {
            // console.log("from right to left");
            this.pos.x = 0;
        } else if(this.pos.x < 0) {
            // console.log("from left to right");
            this.pos.x = width + this.pos.x;
        } else if(this.pos.y > height + this.r) {
            // console.log("from right to left");
            this.pos.y = 0;
        } else if(this.pos.y < 0) {
            // console.log("from left to right");
            this.pos.y = height + this.pos.y;
        }
    }

    this.turn = () => this.heading += this.rotation;
    this.setRotation = (angle) => this.rotation = angle;
    this.boosting = (b) => this.isBoosting = b;
}
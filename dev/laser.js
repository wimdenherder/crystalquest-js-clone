function Laser(shipPos, angle) {
    this.pos = createVector(shipPos.x, shipPos.y);
    this.vel = p5.Vector.fromAngle(angle);
    this.vel.mult(10);

    this.update = () => {
        this.pos.add(this.vel);
    }

    this.offscreen = () => {
        return (this.pos.x > width || this.pos.y > height
            || this.pos.x < 0 || this.pos.y < 0);
    }

    this.render = () => {
        push();
        stroke(255);
        strokeWeight(4);
        point(this.pos.x, this.pos.y);
        pop();
    }

    this.hits = (asteroid) => {
        var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
        return d < asteroid.r;
    }
}
function EnemyBullet(position, motion, r) {
  this.speed = 10;
  this.pos = position
    ? position.copy()
    : createVector(random(width), random(height));
  this.motion = motion
    ? motion.copy()
    : createVector(random(-1, 1), random(-1, 1));

  this.motion.normalize().mult(this.speed);
  this.r = r || 10;

  this.render = () => {
    // fill(255, 0, 0);
    // circle(this.pos.x, this.pos.y, this.r);
    console.log("render enemyBullet");
    image(
      bullet,
      this.pos.x - this.r / 2,
      this.pos.y - this.r / 2,
      this.r,
      this.r
    );
  };

  this.outsideWindow = function () {
    if (this.pos.x > width - this.r / 2) {
      return true;
    }
    if (this.pos.x < this.r / 2) {
      return true;
    }
    if (this.pos.y > height + this.r / 2) {
      return true;
    }
    if (this.pos.y < 0) {
      return true;
    }
  };

  this.update = () => {
    console.log("update enemyBullet");
    this.pos.add(this.motion);
  };
}

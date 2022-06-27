function PlayerBullet(posPlayer, motion) {
  this.speed = 10;
  this.pos = posPlayer
    ? posPlayer.copy()
    : createVector(random(width), random(height));
  this.motion = motion
    ? motion.copy()
    : createVector(random(-1, 1), random(-1, 1));

  this.motion.normalize().mult(this.speed);
  this.r = 30;

  this.render = () => {
    fill(255);
    circle(this.pos.x, this.pos.y, this.r);
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
    this.pos.add(this.motion);
  };
}

function Player() {
  this.pos = createVector(width / 2, height / 2);
  this.motion = createVector(0, 0);
  this.maxSpeed = 40;
  this.r = 100;
  this.sensitivityMouse = 0.03;

  this.render = () => {
    fill(255, 0, 0);
    circle(this.pos.x, this.pos.y, this.r);
    // stroke(0,0,255);
    // noFill();
    // circle(this.pos.x, this.pos.y, this.r);
    // image(flora, this.pos.x - this.r/2, this.pos.y - this.r/2, this.r, this.r);
  };

  this.update = () => {
    this.pos.x += this.motion.x;
    this.pos.y += this.motion.y;
  };

  this.hits = (crystal) => {
    var d = dist(this.pos.x, this.pos.y, crystal.pos.x, crystal.pos.y);
    return d < this.r / 2 + crystal.r / 2;
  };

  this.edges = function () {
    if (this.pos.x > width - this.r / 2) {
      // console.log("from right to left");
      this.pos.x = width - this.r / 2;
      this.motion.x = 0;
    }
    if (this.pos.x < this.r / 2) {
      // console.log("from left to right");
      this.pos.x = this.r / 2;
      this.motion.x = 0;
    }
    if (this.pos.y > height + this.r / 2) {
      // console.log("from right to left");
      this.pos.y = height - this.r / 2;
      this.motion.y = 0;
    }
    if (this.pos.y < 0) {
      // console.log("from left to right");
      this.pos.y = this.r / 2;
      this.motion.y = 0;
    }
  };

  this.setMotion = (changeX, changeY) => {
    this.motion.x = changeX * this.sensitivityMouse;
    this.motion.y = changeY * this.sensitivityMouse;
    //console.log("motion to %s %s", this.motion.x, this.motion.y);
  };
}

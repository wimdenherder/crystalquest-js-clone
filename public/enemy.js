function Enemy1() {
  this.r = 100;
  this.pos = createVector(random(2) > 1 ? width - this.r : this.r, height / 2);
  this.maxSpeed = 1;
  this.motion = createVector(0, 0);
  this.periodChangeMotion = random(100, 1000);
  this.timeStampLastChangeMotion = 0;
  this.scoreEnemy = 25;

  this.render = () => {
    // fill(255);
    // circle(this.pos.x, this.pos.y, this.r);
    image(
      giel,
      this.pos.x - this.r / 2,
      this.pos.y - this.r / 2,
      this.r,
      this.r
    );
  };

  this.hits = (bullet) => {
    var d = dist(this.pos.x, this.pos.y, bullet.pos.x, bullet.pos.y);
    return d < this.r / 2 + bullet.r / 2;
  };

  this.getScore = () => this.scoreEnemy;

  this.changeMotion = () => {
    this.motion.x = random(this.maxSpeed * 2) - this.maxSpeed;
    this.motion.y = random(this.maxSpeed * 2) - this.maxSpeed;
    this.motion.normalize().mult(2);
    this.timeStampLastChangeMotion = millis();
  };

  this.update = () => {
    if (millis() - this.timeStampLastChangeMotion > this.periodChangeMotion)
      this.changeMotion();
    this.checkEdges();
    this.pos.add(this.motion);
  };

  this.checkEdges = function () {
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
}

function Enemy2(player) {
  this.r = 30;
  this.pos = createVector(random(2) > 1 ? width - this.r : this.r, height / 2);
  this.maxSpeed = 1;
  this.motion = createVector(0, 0);
  this.periodChangeMotion = random(100, 1000);
  this.timeStampLastChangeMotion = 0;
  this.scoreEnemy = 50;

  this.render = () => {
    image(
      giel,
      this.pos.x - this.r / 2,
      this.pos.y - this.r / 2,
      this.r,
      this.r
    );
  };

  this.hits = (bullet) => {
    var d = dist(this.pos.x, this.pos.y, bullet.pos.x, bullet.pos.y);
    return d < this.r / 2 + bullet.r / 2;
  };

  this.getScore = () => this.scoreEnemy;

  this.changeMotion = () => {
    this.motion.x = player.pos.x - this.pos.x;
    this.motion.y = player.pos.y - this.pos.y;
    this.motion.normalize().mult(this.speed);
    // this.motion.x = random(this.maxSpeed*2) - this.maxSpeed;
    // this.motion.y = random(this.maxSpeed*2) - this.maxSpeed;
    this.timeStampLastChangeMotion = millis();
  };

  this.update = () => {
    if (millis() - this.timeStampLastChangeMotion > this.periodChangeMotion)
      this.changeMotion();
    this.checkEdges();
    this.pos.add(this.motion);
  };

  this.checkEdges = function () {
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
}

function Enemy3(player) {
  this.r = 30;
  this.pos = createVector(random(2) > 1 ? width - this.r : this.r, height / 2);
  this.maxSpeed = 3;
  this.motion = createVector(0, 0);
  this.periodChangeMotion = random(100, 1000);
  this.timeStampLastChangeMotion = 0;

  this.render = () => {
    image(
      giel,
      this.pos.x - this.r / 2,
      this.pos.y - this.r / 2,
      this.r,
      this.r
    );
  };

  this.hits = (bullet) => {
    var d = dist(this.pos.x, this.pos.y, bullet.pos.x, bullet.pos.y);
    return d < this.r / 2 + bullet.r / 2;
  };

  this.changeMotion = () => {
    this.motion.x = player.pos.x - this.pos.x;
    this.motion.y = player.pos.y - this.pos.y;
    this.motion.normalize().mult(3);
    // this.motion.x = random(this.maxSpeed*2) - this.maxSpeed;
    // this.motion.y = random(this.maxSpeed*2) - this.maxSpeed;
    this.timeStampLastChangeMotion = millis();
  };

  this.update = () => {
    if (millis() - this.timeStampLastChangeMotion > this.periodChangeMotion)
      this.changeMotion();
    this.checkEdges();
    this.pos.add(this.motion);
  };

  this.getScore = () => this.scoreEnemy;

  this.checkEdges = function () {
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
}

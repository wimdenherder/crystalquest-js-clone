function Mine() {
  this.width = 70;

  // within a-b or c-d interval
  this.random = (a, b, c, d) => {
    if (a >= b || b >= c || c >= d) return null;
    const x = random(a, d);
    if (x >= b && x <= c) return this.random(a, b, c, d);
    else return x;
  };
  this.getRandomPosition = () => {
    let x = this.random(
      this.width,
      width / 2 - this.width,
      width / 2 + this.width,
      width - this.width
    );
    let y = this.random(
      this.width,
      height / 2 - this.width,
      height / 2 + this.width,
      height - this.width
    );
    return createVector(x, y);
  };

  this.pos = this.getRandomPosition();

  this.render = () => {
    // fill(150, 150, 0);
    // rect(this.pos.x, this.pos.y, this.width, this.width);
    // stroke(255,0,0);
    // noFill();
    // rect(this.pos.x, this.pos.y, this.width, this.width);
    image(explosive, this.pos.x, this.pos.y, this.width, this.width);
  };

  this.hits = (player) => {
    return collideRectCircle(
      this.pos.x,
      this.pos.y,
      this.width,
      this.width,
      player.pos.x,
      player.pos.y,
      player.r
    );
  };
}

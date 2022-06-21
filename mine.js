function Mine() {
  this.width = 70;
  this.pos = createVector(
    random(this.width, width - this.width),
    random(this.width, height - this.width)
  );

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

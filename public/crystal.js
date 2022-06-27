function Crystal() {
  this.pos = createVector(random(width), random(height));
  this.r = 80;

  this.render = () => {
    // fill(0, 255, 0);
    // circle(this.pos.x, this.pos.y, this.r);
    image(
      ijsje,
      this.pos.x - this.r / 2,
      this.pos.y - this.r / 2,
      this.r,
      this.r
    );
  };

  this.getScore = () => 10;
}

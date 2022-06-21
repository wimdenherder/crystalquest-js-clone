function Gate() {
    this.widthGate = 100;
    this.heightGate = 15;
    this.pos = createVector(width/2,height);
    this.open = false;

    this.render = () => {
        if(!this.open)
          rect(this.pos.x - this.widthGate/6, this.pos.y - this.heightGate, this.widthGate * 1/3, this.heightGate);
        triangle(this.pos.x - this.widthGate/2, this.pos.y, 
            this.pos.x - this.widthGate/6, this.pos.y - this.heightGate,
            this.pos.x - this.widthGate/6, this.pos.y);
        triangle(this.pos.x + this.widthGate/2, this.pos.y, 
            this.pos.x + this.widthGate/6, this.pos.y - this.heightGate,
            this.pos.x + this.widthGate/6, this.pos.y);
    }

    this.receives = (player) => {
        // console.log("y %s", player.pos.y + player.r/2 >= this.pos.y);
        // console.log("x %s", player.pos.x - player.r/2 > this.pos.x - this.widthGate/6);
        // console.log("x %s", player.pos.x + player.r/2 < this.pos.x + this.widthGate/6);
        if(this.open && player.pos.y + player.r/2 >= this.pos.y
            && player.pos.x - player.r/2 > this.pos.x - this.widthGate/6
            && player.pos.x + player.r/2 < this.pos.x + this.widthGate/6) {
                return true;
        } else {
            return false;
        }
    }
}
function Asteroid(pos, r) {
    var rWidth = random(width), rHeight = random(height);
    this.pos = pos ? pos.copy() : createVector(rWidth, rHeight);
    this.vel = p5.Vector.random2D().mult(3);
    this.color = getRandomRGB();
    console.log(this.color);
    
    this.heading = random(PI);
    this.r = r || random(5,15);
    this.total = floor(random(5,15));
    this.offset = [];
    for(var i=0;i<this.total;i++) {
        this.offset.push(random(-this.r*0.6,this.r*0.6));
    }

    this.update = () => {
        this.pos.add(this.vel);
    };
    
    this.render = () => {
        push();
        stroke(...this.color);
        noFill();
        translate(this.pos.x, this.pos.y);
        //ellipse(0, 0, this.r*2);
        beginShape();
        for(var i=0;i<this.total;i++) {
            var angle = map(i,0,this.total,0,TWO_PI);
            var r = this.r + this.offset[i];
            var x = r * cos(angle);
            var y = r * sin(angle);
            vertex(x, y);
        }
        endShape(CLOSE);
        pop();
    }

    this.hits = (asteroid2) => {
        // merge
        var d = dist(this.pos.x, this.pos.y, asteroid2.pos.x, asteroid2.pos.y);
        var hit = d < this.r + asteroid2.r;;
        // if(hit) {
        //     console.log("asteroid hits astroid");
        //     console.log(d);
        //     console.log(this.pos.x, this.pos.y, asteroid2.pos.x, asteroid2.pos.y);
        // }
        return d < this.r + asteroid2.r;
    }

    this.merge = (asteroid2) => {
        var newAsteroid = new Asteroid(inBetween(this.pos,asteroid2.pos), this.r + asteroid2.r);
        return newAsteroid;
    }

    this.breakup = () => {
        if(this.r < 15)
          return [];
        var newAsteroids = [];
        for(var i=0;i<2;i++) {
            newAsteroids.push(new Asteroid(this.pos, this.r/2));
        }
        return newAsteroids;
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

    var inBetween = (pos1, pos2) =>
        createVector((pos1.x+pos2.x) * 0.5, (pos1.y+pos2.y) * 0.5);

    function getRandomRGB() {
        var colors = [floor(random(2)) * 255, 
            floor(random(2)) * 255, 
            floor(random(2)) * 255];
        return colors;
    }
}
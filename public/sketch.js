let player;
let mousePrevX, mousePrevY;
let crystals = [];
let enemies = [];
let timeStampCreationLastEnemy = 0;
let gate;
let enemyGate;
let videoBack;
let explosions = [];
let bullets = [];
let mines = [];
let level = 1;
let life = 5;
let score = 0;
let flora, giel, background, nouSound, appel, explosive;
let coin, warp, dieSound, breakSound;

let cfg = {
  enemyAfter: randomBetween(0, 1 * 1000),
  enemyEvery: randomBetween(1 * 1000, 2 * 1000),
};

function preload() {
  explosive = loadImage("img/explosive.png");
  giel = loadImage("img/giel.png");
  backgroundImg = loadImage("img/backgroundImg.jpg");
  backgroundMusic = loadSound("assets/backgroundmusic.mp3");
  coin = loadSound("assets/coin.mp3");
  warp = loadSound("assets/Warp.wav");
  dieSound = loadSound("assets/Die.wav");
  breakSound = loadSound("assets/Break.wav");
}

function setup() {
  backgroundMusic.play();
  //frameRate(60); // Attempt to refresh at starting FPS
  console.log("cfg %s", JSON.stringify(cfg, null, 2));
  var cvs = createCanvas(windowWidth - 30, windowHeight - 30);
  player = new Player();
  gate = new Gate();
  for (var i = 0; i < 10; i++) {
    crystals.push(new Crystal());
  }
  for (var i = 0; i < 3; i++) {
    mines.push(new Mine());
  }
  videoBack = createVideo(["landscapes.webm"]);
  videoBack.hide();
  nouSound = loadSound("assets/nou.mp3");
  reset();
}

function reset() {
  (mousePrevX = undefined), (mousePrevY = undefined);
  enemies = [];
  timeStampCreationLastEnemy = 0;
  video = undefined;
  explosions = [];
  bullets = [];
  player.pos = createVector(width / 2, height / 2);
  player.motion = createVector(0, 0);
}

function restartLevel() {
  console.log("nou!");
  nouSound.play();
  if (life <= 0) noLoop();
  reset();
}

function drawBackground() {
  image(backgroundImg, 0, 0, width, height);
  image(videoBack, 0, 0, 1000, 1000);
}

function draw() {
  drawBackground();
  createEnemies(); // every x seconds
  processEnemies();
  processBullets();
  processCrystals();
  processMines();
  checkGate();
  player.edges();
  player.render();
  player.update();
  gate.render();
  drawExplosions();
  drawScores();
}

function drawScores() {
  fill(255);
  text("Level: " + level + " Lives: " + life + " Score: " + score, 10, 20);
}

function processMines() {
  for (var i = mines.length - 1; i >= 0; i--) {
    mine = mines[i];
    if (mine.hits(player)) {
      die();
    }
    mine.render();
  }
}

function processCrystals() {
  for (var i = crystals.length - 1; i >= 0; i--) {
    crystal = crystals[i];
    if (player.hits(crystal)) {
      score += crystal.getScore();
      crystals.splice(i, 1);
      coin.play();
    } else {
      crystal.render();
    }
  }
}

function mousePressed() {
  bullets.push(new Bullet(player.pos, player.motion));
}

function checkGate() {
  if (crystals.length === 0) gate.open = true;
  if (gate.receives(player)) {
    console.log("GAME GEHAALD");
    noLoop();
  }
}

function createEnemies() {
  if (
    (!timeStampCreationLastEnemy && millis() > cfg.enemyAfter) ||
    (timeStampCreationLastEnemy &&
      millis() - timeStampCreationLastEnemy > cfg.enemyEvery)
  ) {
    console.log("new enemy!");
    enemies.push(new Enemy1(player)); //Enemy());
    timeStampCreationLastEnemy = millis();
  }
}

function drawExplosions() {
  for (var i = explosions.length - 1; i >= 0; i--) {
    var explosion = explosions[i];
    if (explosion.outsideWindow()) {
      console.log("explosion window bullet");
      explosions.splice(i, 1);
    }
    explosion.update();
    explosion.render();
  }
}

function processEnemies() {
  for (var i = enemies.length - 1; i >= 0; i--) {
    var enemy = enemies[i];
    enemy.update();
    enemy.render();
    if (player.hits(enemy)) {
      die();
    }
  }
}

function processBullets() {
  for (var i = bullets.length - 1; i >= 0; i--) {
    var bullet = bullets[i];
    bullet.update();
    bullet.render();
    if (bullet.outsideWindow()) {
      console.log("outside window bullet");
      bullets.splice(i, 1);
    }
    for (var k = enemies.length - 1; k >= 0; k--) {
      var enemy = enemies[k];
      if (enemy.hits(bullet)) {
        score += enemy.getScore();
        enemies.splice(k, 1);
      }
    }
  }
}

function die() {
  console.log("death");
  explosions.push(new Explosion(player.pos));
  life--;
  restartLevel();
}

function atombomb() {
  background(255);
  enemies.forEach((enemy) => {
    score += enemy.getScore();
  });
  enemies = [];
  timeStampCreationLastEnemy = 0;
  explosions = [];
  bullets = [];
}

function mouseMoved() {
  if (mousePrevX && mousePrevY) {
    var changeX = mouseX - width / 2;
    var changeY = mouseY - height / 2;
    //console.log("%s %s",changeX, changeY);
    player.setMotion(changeX, changeY);
  }
  mousePrevX = mouseX;
  mousePrevY = mouseY;
}

function keyReleased() {}

function keyPressed() {
  if (key === " ") {
    console.log("spacebar");
    atombomb();
  }
  if (key === "p") {
    console.log("play!");
    videoBack.loop(); // set the video to loop and start playing
  }
}

function randomBetween(a, b) {
  return Math.floor((b - a + 1) * Math.random()) + a;
}

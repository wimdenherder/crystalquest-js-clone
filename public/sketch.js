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
let enemyBullets = [];
let mines = [];
let level = 1; // with enemey bullets testing
let life = 5;
let score = 0;
let flora, giel, deadSound, ijsje, explosive, playerImg, bullet, stars;
let crystalSound,
  warp,
  dieSound,
  breakSound,
  macSound,
  enemySound,
  enemyDeadSound,
  diamondSound,
  bombSound,
  enemyShootSound,
  backgroundMusic;
let firstTimeFullscreen = true;
let paused = true;

let cfg = {
  enemyAfter: randomBetween(0, 1 * 1000),
  enemyEvery: randomBetween(1 * 1000, 2 * 1000),
};

function fromTo(lowEnd, highEnd) {
  var list = [];
  for (var i = lowEnd; i <= highEnd; i++) {
    list.push(i);
  }
  return list;
}

function preload() {
  obstacle1 = loadImage("img/obstacle1.png");
  obstacle2 = loadImage("img/obstacle2.png");
  obstacle3 = loadImage("img/obstacle3.png");
  mariodead = loadImage("img/mariodead.png");
  explosive = loadImage("img/explosive.png");
  stars = loadImage("img/stars.jpg");
  giel = loadImage("img/giel.png");
  playerImg = loadImage("img/player.png");
  bullet = loadImage("img/bullet.png");
  ijsje = loadImage("img/ijsje.png");
  // backgroundImages = fromTo(1, 26).map((x) =>
  //   loadImage("img/levels/level" + x + ".jpg")
  // );
  // defaultBackground = loadImage("img/levels/level1.jpg");
  backgroundMusic = loadSound("assets/backgroundmusic.mp3");
  crystalSound = loadSound("assets/crystal.wav");
  macSound = loadSound("assets/mac.mp4");
  warp = loadSound("assets/Warp.wav");
  dieSound = loadSound("assets/Die.wav");
  breakSound = loadSound("assets/Break.wav");
  // diamondSound = loadSound("assets/diamond.wav"); //* to do
  levelSound = loadSound("assets/level.wav");
  enemySound = loadSound("assets/enemy.wav");
  enemyShootSound = loadSound("assets/enemyshoot.wav");
  bombSound = loadSound("assets/bomb.wav");
  enemyDeadSound = loadSound("assets/enemydead.wav");
  deadSound = loadSound("assets/dead.wav");
  shootSound = loadSound("assets/shoot.wav");
  // videoBack = createVideo("img/sky.mp4");
  // videoBack.speed(0.1);
  // videoBack.loop();
  // videoBack.volume(0);
  // videoBack.hide();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  reset();
}

function setup() {
  backgroundMusic.play();
  backgroundMusic.loop();
  var cvs = createCanvas(windowWidth, windowHeight);
  macSound.play();
  reset();
}

function restartGame() {
  life = 5;
  reset();
}

function reset() {
  crystals = [];
  mines = [];
  gate = new Gate();
  for (var i = 0; i < 10; i++) {
    crystals.push(new Crystal());
  }
  for (var i = 0; i < 3; i++) {
    mines.push(new Mine());
  }
  tryAgain();
}

function tryAgain() {
  player = new Player();
  (mousePrevX = undefined), (mousePrevY = undefined);
  enemies = [];
  timeStampCreationLastEnemy = 0;
  video = undefined;
  explosions = [];
  bullets = [];
  enemyBullets = [];
  player.pos = createVector(width / 2, height / 2);
  player.motion = createVector(0, 0);
}

function nextLevel() {
  levelSound.play();
  level++;
  reset();
}

function drawBackground() {
  fill(0);
  rect(0, 0, width, height);
  image(stars, 0, 0, width, height);
  // image(
  //   backgroundImages[13 + level - 1] || defaultBackground,
  //   0,
  //   0,
  //   width,
  //   height
  // );
  // if (level === 3) image
  // image(videoBack, 0, 0, width, height);
}

function draw() {
  if (paused) return;
  drawBackground();
  createEnemies(); // every x seconds
  const newEnemyBullets = processEnemies();
  if (newEnemyBullets.length > 0) {
    enemyBullets = enemyBullets.concat(newEnemyBullets);
    console.log({ enemyBullets });
  }
  processBullets();
  processEnemyBullets();
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
      crystalSound.play();
    } else {
      crystal.render();
    }
  }
}

function shoot() {
  const playerBullet = new PlayerBullet(player.pos, player.motion);
  bullets.push(playerBullet);
  shootSound.play();
  console.log(bullets.length);
}

function checkGate() {
  if (crystals.length === 0) gate.open = true;
  if (gate.receives(player)) {
    console.log("GAME GEHAALD");
    nextLevel();
  }
}

function createEnemies() {
  if (
    (!timeStampCreationLastEnemy && millis() > cfg.enemyAfter) ||
    (timeStampCreationLastEnemy &&
      millis() - timeStampCreationLastEnemy > cfg.enemyEvery)
  ) {
    console.log("new enemy!");
    const enemiesLib = [Enemy1, Enemy2, Enemy3, Enemy4];
    let newEnemy;
    const upTo = Math.floor(level / 2) % enemiesLib.length;

    if (level / 2 >= enemiesLib.length) {
      newEnemy = enemiesLib[Math.floor(Math.random() * enemiesLib.length)];
    } else {
      if (level % 2 === 1) {
        newEnemy = enemiesLib[upTo];
      } else {
        // take mix
        const mix = enemiesLib.slice(0, upTo);
        newEnemy = mix[Math.floor(Math.random() * mix.length)];
      }
    }
    enemies.push(new newEnemy(player)); //Enemy());
    enemySound.play();
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
  const newEnemyBullets = [];
  for (var i = enemies.length - 1; i >= 0; i--) {
    var enemy = enemies[i];
    if (!enemy) continue;
    newEnemyBullet = enemy.update();
    if (newEnemyBullet) newEnemyBullets.push(newEnemyBullet);
    enemy.render();
    if (enemy.hits(player)) {
      die();
    }
  }
  return newEnemyBullets;
}

function processEnemyBullets() {
  for (var i = enemyBullets.length - 1; i >= 0; i--) {
    const enemyBullet = enemyBullets[i];
    console.log({ enemyBullet });
    enemyBullet.update();
    enemyBullet.render();
    if (enemyBullet.outsideWindow()) {
      console.log("outside window enemyBullet: destroyed");
      enemyBullets.splice(i, 1);
    }
    if (player.hits(enemyBullet)) {
      enemyBullets.splice(i, 1);
      return die();
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
        enemyDeadSound.play();
        enemies.splice(k, 1);
        bullets.splice(i, 1);
      }
    }
  }
}

function die() {
  console.log("death");
  explosions.push(new Explosion(player.pos));
  life--;
  deadSound.play();
  if (life <= 0) {
    noLoop();
  }
  tryAgain();
}

function atombomb() {
  background(255);
  bombSound.play();
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
    var changeX = mouseX - width / 1.5;
    var changeY = mouseY - height / 1.5;
    //console.log("%s %s",changeX, changeY);
    player.setMotion(changeX, changeY);
  }
  mousePrevX = mouseX;
  mousePrevY = mouseY;
}

function keyReleased() {}

function keyPressed() {
  switch (key) {
    case " ":
      console.log("spacebar");
      atombomb();
      break;
    case "x":
      shoot();
      break;
    case "r":
      restartGame();
      break;
    case "q":
    case "p":
      paused = !paused;
      break;
    case "f":
      startGame();
      break;
    case "k":
      console.log("play background video!");
      videoBack.loop(); // set the video to loop and start playing
      break;
  }
}

function startGame() {
  openFullscreen();
  window.setTimeout(() => {
    paused = false;
  }, 200);
}

function randomBetween(a, b) {
  return Math.floor((b - a + 1) * Math.random()) + a;
}

function openFullscreen() {
  const elem = document.body;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
}

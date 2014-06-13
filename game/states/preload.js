
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype.preload = function() {
  var self = this;
  this.load.onLoadComplete.addOnce(function() {
    self.ready = true;
  }, this);

  this.loader = this.add.sprite(this.width/2,this.height/2, 'preloader');
  this.loader.anchor.setTo(0.5, 0.5);
  this.load.setPreloadSprite(this.loader);

  this.load.spritesheet("bird", "assets/fly.png", 41, 36, 3);
  this.load.spritesheet("pipe", "assets/pipes.png", 54, 320, 2);

  this.load.image("background", "assets/background.png");
  this.load.image("ground", "assets/ground.png");
  this.load.image("startButton", "assets/start-button.png");
  this.load.image("title", "assets/broccoliTitle.png");
  this.load.image('instructions', 'assets/instructions.png');
  this.load.image('getReady', 'assets/get-ready.png');

  this.load.image('scoreboard', 'assets/scoreboard.png');
  this.load.image('gameover', 'assets/gameover.png');
  this.load.spritesheet('medals', 'assets/medals.png', 44, 46, 2);
  this.load.image('particle', 'assets/particle.png');

  this.load.bitmapFont('flappyfont', 'assets/fonts/flappyfont/flappyfont.png', 'assets/fonts/flappyfont/flappyfont.fnt');

  this.load.audio('score', 'assets/score.wav');
  this.load.audio('flap', 'assets/flap.wav');
  this.load.audio('pipeHit', 'assets/pipe-hit.wav');
  this.load.audio('groundHit', 'assets/ground-hit.wav');
};

Preload.prototype.update = function() {
  if(!!this.ready) {
    this.game.state.start('menu');
  }
}

module.exports = Preload;

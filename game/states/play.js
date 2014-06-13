var Fly = require("../prefabs/fly");
var Ground = require("../prefabs/ground");
var PipeGroup = require("../prefabs/pipeGroup");
var Scoreboard = require("../prefabs/scoreboard");

function Play() {}

Play.prototype = {
  create: function() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 1200;

    this.background = this.game.add.sprite(0, 0, "background");

    this.fly = new Fly(this.game, 100, this.game.height / 2);
    this.game.add.existing(this.fly);

    this.ground = new Ground(this.game, 0, 400, 335, 112);
    this.game.add.existing(this.ground);

    this.pipes = this.game.add.group();

    // Stop propagation
    this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

    var flappyKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    flappyKey.onDown.addOnce(this.start, this);
    flappyKey.onDown.add(this.fly.flap, this.fly);

    this.input.onDown.addOnce(this.start, this);
    this.input.onDown.add(this.fly.flap, this.fly);


    this.instructionGroup = this.game.add.group();
    this.instructionGroup.add(this.game.add.sprite(this.game.width/2, 100,'getReady'));
    this.instructionGroup.add(this.game.add.sprite(this.game.width/2, 325,'instructions'));

    this.instructionGroup.setAll('anchor.x', 0.5);
    this.instructionGroup.setAll('anchor.y', 0.5);

    this.score = 0;
    this.running = false;

    this.scoreText = this.game.add.bitmapText(this.game.width / 2, 10, 'flappyfont', this.score.toString(), 24);
    this.scoreText.visible = false;
  },

  update: function() {
    this.game.physics.arcade.collide(this.fly, this.ground);

    this.game.physics.arcade.collide(this.fly, this.ground, this.death, null, this);

    this.pipes.forEach(function(pipeGroup) {
      this.checkScore(pipeGroup);
      this.game.physics.arcade.collide(this.fly, pipeGroup, this.death, null, this);
    }, this);
  },

  generatePipes: function() {
    /*
    var yPos = this.game.rnd.integerInRange(-100, 100);

    var pipeGroup = this.pipes.getFirstExists(false);

    if (!pipeGroup) {
      // Add to group
      pipeGroup = new PipeGroup(this.game, this.pipes);
    }

    pipeGroup.reset(this.game.width + pipeGroup.width / 2, yPos);
    */

    // Recycling won't work...

    var pipeY = this.game.rnd.integerInRange(-100, 100);
    var pipeGroup = new PipeGroup(this.game, this.pipes);
    pipeGroup.x = this.game.width;
    pipeGroup.y = pipeY
  },

  checkScore: function(pipeGroup) {
    if (pipeGroup.exists && !pipeGroup.hasPassed && pipeGroup.topPipe.world.x <= this.fly.world.x) {
      pipeGroup.hasPassed = true;
      this.score++;
      this.scoreText.setText(this.score.toString());
    }
  },

  start: function() {
    if (!this.running) {
      this.running = true;
      this.fly.body.allowGravity = true;
      this.fly.alive = true;
      this.pipeGenerator = this.game.time.events.loop(1250, this.generatePipes, this);
      this.pipeGenerator.timer.start();

      this.instructionGroup.destroy();

      this.scoreText.visible = true;
    }
  },

  death: function() {
    if (this.fly.alive) {
      this.running = false;
      this.fly.alive = false;
      this.ground.stopScroll();
      this.pipeGenerator.timer.stop();
      this.pipes.forEach(function(pipeGroup) {
        pipeGroup.setAll("body.velocity.x", 0);
      });

      this.scoreboard = new Scoreboard(this.game);
      this.game.add.existing(this.scoreboard);
      this.scoreboard.show(this.score);
    }
  },

  shutdown: function() {
    this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
    this.fly.destroy();
    this.pipes.destroy();
    this.scoreboard.destroy();
  }
};

module.exports = Play;

function Menu() {}

Menu.prototype = {
  preload: function() {

  },

  create: function() {
    /** Background **/
    this.background = this.game.add.sprite(0, 0, "background");

    this.ground = this.game.add.tileSprite(0, 400, 335, 112, 'ground');
    this.ground.autoScroll(-200, 0);

    /** Title **/

    // Group of title text + bird, so they can be animated as one.
    this.menuGroup = this.game.add.group();
    this.menuGroup.x = 10;
    this.menuGroup.y = 60;

    this.title = this.game.add.sprite(0, 0, "title");
    this.menuGroup.add(this.title);
    this.fly = this.game.add.sprite(200, 40, "bird");
    this.menuGroup.add(this.fly);

    this.fly.animations.add("flap");
    this.fly.animations.play("flap", 12, true);

    // Up and down motion of the bird...
    this.game.add.tween(this.menuGroup)
    .to({y: 70}, 350, Phaser.Easing.Linear.NONE, true, 0, 1000, true);
    // his.game.add.tween(object).to(properties, duration, ease, autoStart, delay, repeat, yoyo);

    /** Button **/

    this.startButton = this.game.add.button(this.game.width / 2, 280, "startButton", this.startClick, this);
    // (.., callback, context)
    this.startButton.anchor.setTo(0.5, 0.5);
  },

  startClick: function() {
    this.game.state.start("play");
  },

  update: function() {

  }
}

module.exports = Menu;

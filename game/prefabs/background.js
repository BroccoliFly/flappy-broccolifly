var Background = function(game, x, y, width, height) {
  Phaser.TileSprite.call(this, game, x, y, width, height, 'background');

  this.autoScroll(-20, 0);
  this.game.physics.arcade.enableBody(this);

  // Does not fall.
  this.body.allowGravity = false;
  this.body.immovable = true;
};

Background.prototype = Object.create(Phaser.TileSprite.prototype);
Background.prototype.constructor = Background;

Background.prototype.update = function() {

};

module.exports = Background;

var Fly = function(game, x, y, frame) {
  // Inherit
  Phaser.Sprite.call(this, game, x, y, 'bird', frame);

  // The point of rotation.
  this.anchor.setTo(0.5, 0.5);

  this.animations.add("flap");
  this.animations.play("flap", 12, true);

  this.alive = false;

  this.game.physics.arcade.enableBody(this);
  this.body.allowGravity = false;
};

Fly.prototype = Object.create(Phaser.Sprite.prototype);
Fly.prototype.constructor = Fly;

Fly.prototype.flap = function() {
  this.body.velocity.y = -400;

  this.game.add.tween(this)
  .to({angle: -40}, 100).start();
}

Fly.prototype.update = function() {

  if (this.alive && this.angle < 60) {
    this.angle += 2;
  }

};

module.exports = Fly;

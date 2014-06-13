## Flappy Broccoli Fly

![](https://raw.githubusercontent.com/BroccoliFly/flappy-broccolifly/master/meta/screenshot-1.png)
![](https://raw.githubusercontent.com/BroccoliFly/flappy-broccolifly/master/meta/screenshot-2.png)

## About

This Game was made using the [Phaser](http://phaser.io) game engine.

It is based on the yeoman phaser-official generator (using Browserify).

I found out to use Phaser by following the [Flappy Bird](http://www.codevinsky.com/phaser-2-0-tutorial-flappy-bird-part-5/) tutorial.

The assets are taken from [this place](http://lanica.co/flappy-clone/), which I guess were directly taken from the game, and the bird was coloured.
They will be changed later.

The font is called 04B_19. Someone mentioned it as the "Flappy Bird Font", but it is obvious that it isn't it. At least it is similar.

`grunt` will not start the server (bug in generator?), so use `gulp serve` as well.

### Useful Phaser Info

* game/states/* are bundled by Browserify. Every file represents a state in the game
* States are basically classes. The main methods are preload, create, and update.
* Preload is called before the game is started, to fetch assets and init stuff.
* Create initializes the game scene.
* Update is called on each rendered frame.

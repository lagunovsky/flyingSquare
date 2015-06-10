Game.Blocks = function (state) {
  Game.Blocks.state = state;
  Game.Blocks.blockGroup = game.add.group();
  Game.Blocks.blockGroup.enableBody = true;
  Game.Blocks.blockGroup.createMultiple(300, game.cache.getBitmapData('block'));
  Game.Blocks.blockSize = 20;
  Game.Blocks.block = 0;

  this.fillScreen(0, true);
};

Game.Blocks.prototype.update = function () {
  var xMin = 100,
    xMax = 0;
  Game.Blocks.blockGroup.forEachAlive(function (block) {
    if (Game.Blocks.state.hasStarted) {
      block.body.velocity.x = Game.Blocks.state.speed;
    }
    xMin = Math.min(xMin, block.body.x + Game.Blocks.blockSize);
    xMax = Math.max(xMax, block.body.x + Game.Blocks.blockSize);
  });
  Game.Blocks.blockGroup.forEachAlive(function (block) {
    if (block.x + block.body.width < 0) {
      block.kill();
    }
  });
  this.fillScreen(xMax, false);
};

Game.Blocks.prototype.fillScreen = function (width, initial) {
  if (initial || Game.Blocks.state.hasStarted) {
    while (width < game.width + Game.Blocks.blockSize - Game.Blocks.state.speed) {
      Game.Blocks.block++;
      Game.Blocks.tracer = Game.Map[Game.Blocks.block];
      var
        blockTopY,
        blockTopH,
        blockBotY,
        blockBotH;

      blockTopY = 0;
      blockTopH = Game.Blocks.tracer.y;
      blockBotY = blockTopH + Game.Blocks.tracer.h;
      blockBotH = game.height - blockBotY;

      newBlockTop = this.createOne(width, blockTopY, Game.Blocks.blockSize, blockTopH);
      newBlockBot = this.createOne(width, blockBotY, Game.Blocks.blockSize, blockBotH);
      if (!initial) {
        newBlockTop.body.velocity.x = Game.Blocks.state.speed;
        newBlockBot.body.velocity.x = Game.Blocks.state.speed;
      }
      width += Game.Blocks.blockSize;
    }
  }
};
Game.Blocks.prototype.createOne = function (x, y, w, h) {
  if (Game.Blocks.blockGroup.countDead()) {
    var block = Game.Blocks.blockGroup.getFirstDead();
  } else {
    var block = Game.Blocks.blockGroup.create(x, y, game.cache.getBitmapData('block'));
  }
  block.reset(x, y);
  block.body.allowGravity = false;
  block.body.immovable = true;
  block.scale.x = w + 10;
  block.scale.y = h + 10;
  return block;
};
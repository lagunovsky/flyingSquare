var
  config = require("nconf").argv().file({file: 'config.json'}),
  debug = require("debug")('game');

var game = {
  colors: config.get("game:colors"),
  tracers: [],
  players: {
    count: -1
  },
  evenLoopFlag: false,
  updateTime: config.get("game:updateTime"),
  createEvenLoop: function(){
    setTimeout(function(){

    },this.updateTime);
  },
  addPlayer: function (id) {
    game.players.count++;
    if (game.players.count < 4) {
      game.players[id] = {
        color: game.getPlayerColor(),
        start: false
      };
      debug('add %s; players: %o', id, game.players);
      return id;
    } else {
      debug('add close %s;', id);
      return false;
    }
  },
  delPlayer: function (id) {
    game.players.count--;
    game.colors.push(game.players[id].color);
    delete(game.players[id]);
    debug('del %s; players: %o', id, game.players);
  },
  getPlayerColor: function () {
    return game.colors.pop(game.colors.indexOf());
  },
  start: function (id) {
    game.players[id].start = true;
    debug('start %s; players: %o', id, game.players);
    this.evenLoopFlag = true;
    for (var player in game.players) {
      if (player != 'count') {
        if (game.players[player].start == false) {
          this.evenLoopFlag = false;
          break;
        }
      }
    }
    return this.evenLoopFlag;
  },
  started: function () {
    this.evenLoopFlag = true;
    for (var player in game.players) {
      game.players[player].start = false;
    }
  },
  generateMap: function (height) {
    this.generateHeightTracers = height;
    var tracer = {
      y: height / 2 - 300,
      yMin: 150,
      yMax: height - 100,
      yVariance: 30,
      h: 500,
      hMin: 300,
      hMax: 700,
      hVariance: 30,
      variance: 30
    };

    for (var i = 0; i < 10000; i++) {
      if (i % 200 == 0 && tracer.variance <= 145) {
        tracer.variance += 5;
      }

      tracer.y += this.randomInteger(-tracer.variance, tracer.variance);
      tracer.y = Math.min(Math.max(tracer.yMin, tracer.y), tracer.yMax);

      tracer.h += this.randomInteger(-tracer.variance, tracer.variance);
      tracer.h = Math.min(Math.max(tracer.hMin, tracer.h), tracer.hMax);

      if (tracer.y + tracer.h > tracer.yMax) {
        var halfDiff = ( tracer.y + tracer.h - tracer.yMax ) / 2;
        tracer.y -= halfDiff;
        tracer.h -= halfDiff;
      }

      this.tracers.push({
        y: tracer.y,
        variance: tracer.variance,
        yMin: tracer.yMin,
        yMax: tracer.yMax,
        yVariance: tracer.variance,
        h: tracer.h,
        hMin: tracer.hMin,
        hMax: tracer.hMax,
        hVariance: tracer.variance
      });
    }
    return this.tracers;
  },
  getMap: function (height) {
    if (this.tracers.length == 0) {
      debug('generateMap');
      return this.generateMap(height);
    } else {
      var tempTracers = [];
      var corrector = height - this.generateHeightTracers;
      if (corrector != 0) {
        debug('reGenerateMap');
        for (var i = 0; i < 10000; i++) {
          tempTracers.push({
            y: this.tracers[i].y - corrector,
            variance: this.tracers[i].variance,
            yMin: this.tracers[i].yMin,
            yMax: this.tracers[i].yMax,
            yVariance: this.tracers[i].variance,
            h: this.tracers[i].h - corrector,
            hMin: this.tracers[i].hMin,
            hMax: this.tracers[i].hMax,
            hVariance: this.tracers[i].variance
          });
        }
        return tempTracers;
      } else {
        debug('send generatedMap');
        return this.tracers;
      }
    }
  },
  randomInteger: function (min, max) {
    min = min * 1000;
    max = max * 1000;
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand / 1000;
  }
};

module.exports = game;
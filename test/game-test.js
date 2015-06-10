var
  assert = require('assert'),
  game = require('../core/game');


describe('game', function() {
  describe('#createEventLoop()', function() {
    it('Создает таймер опроса игроков', function() {
      game.createEventLoop();
      assert.notEqual(game.eventLoopTimer, null);
    });
  });

  describe('#destroyEventLoop()', function() {
    it('Останавливает таймер опроса игроков', function() {
      game.destroyEventLoop();
      assert.equal(game.eventLoopTimer[0], null);
    });
  });

  describe('#addPlayer()', function() {
    var temp;
    it('добавляет игрока', function() {
      temp = game.players.count + 1;
      game.addPlayer('newPlayer-1');
      assert.notEqual(game.players['newPlayer-1'], undefined);
    });
    it('Увеличивает счетчик игроков при добавлеии', function() {
      assert.equal(temp, 0, 'Количество игроков не увеличилось');
    });
    it('Не допускает добавление 4 игрока', function() {
      game.addPlayer('newPlayer-2');
      game.addPlayer('newPlayer-3');
      game.addPlayer('newPlayer-4');
      temp = game.players.count;
      assert.equal(game.addPlayer('newPlayer'), false, '4 игрок добавлен');
      assert.equal(game.players.count, temp, '4 игрок при добавлении увеличил количество пользователей');
    });
  });

  describe('#delPlayer()', function() {
    it('Удаляет игрокоа', function() {
      var temp = game.players.count - 1;
      game.delPlayer('newPlayer-1');
      assert.equal(game.players['newPlayer-1'], undefined, 'Игрок не удален');
      assert.equal(temp, 2, 'Количество игроков не уменьшилось');
    });
  });

  describe('#getColor()', function() {
    var temp;
    it('возвращает цвет из game.colors[]', function() {
      temp = game.colors.length - 1;
      assert.equal(typeof game.getColor(), typeof "");
    });
    it('удаляет цвет из game.colors[]', function() {
      assert.equal(temp, game.colors.length);
    });
  });

  describe('#addColor()', function() {
    it('добавляет цвет в game.colors[]', function() {
      game.addColor('newColor');
      assert.equal(game.colors[game.colors.length - 1], 'newColor');
    });
  });

  describe('#start()', function() {
    it('делает пользователя готовым к игре и проверят готовы ли остальные игроки', function() {
      game.addPlayer('newPlayer-1');
      assert.equal(game.start('newPlayer-1'), false, 'Готовность игроков не верна (есть не готовые)');
      game.start('newPlayer-2');
      game.start('newPlayer-3');
      assert.equal(game.start('newPlayer-4'), true, 'Готовность игроков не верна (все готовы)');
    });
  });

  describe('#started()', function() {
    it('устанавливает всем пользователям статус недоступности к игре', function() {
      game.started();
      for (var player in game.players) {
        if(player != 'count')
          assert.equal(game.players[player].start, false, 'Есть готовые пользователи');
      }
    });
  });

  describe('#generateMap()', function() {
    it('Генерирует карту', function() {
      assert.equal(typeof game.generateMap(100), typeof []);
    });
  });

  describe('#getMap()', function() {
    var mapOne, mapTwo;
    it('Возвращает карту', function() {
      mapOne = game.getMap(100);
      assert.equal(typeof mapOne, typeof []);
    });
    it('Создает новую карту при новой высоте', function() {
      mapTwo = game.getMap(200);
      assert.notEqual(mapTwo[100].y, mapOne[100].y);
    });
  });

});
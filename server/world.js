var Snake = require('./snake.js');
function build() {
  var snakes = [];
  var WIDTH = 80;
  var HEIGHT = 60;

  function addPlayer(playerId) {
    var newSnake = Snake.build(playerId);
    newSnake.setLocation(40,30);
  }

  return {
    width: WIDTH,
    height: HEIGHT,
    addPlayer: addPlayer
  };
}

module.exports = {
  build: build
};

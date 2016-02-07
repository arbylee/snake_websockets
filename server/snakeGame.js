var Snake = require('./snake.js');
var World = require('./world.js')

function build() {
  var players = [];
  var world = World.build();
  var snakesMap = {};

  function handlePlayerInput(id, msg) {
    snakesMap[id].changeDirection(msg);
  }

  function addPlayer(id) {
    var newSnake = Snake.build(id);
    newSnake.setLocation(40,30);
    snakesMap[id] = newSnake;
  }

  function getState(){
    return {snakes: getSnakes()};
  }

  function getSnakes() {
    var result = [];
    for (var id in snakesMap) {
      if (snakesMap.hasOwnProperty(id)) {
        result.push(snakesMap[id].getState());
      }
    }
    return result;
  }

  function update(){
    for (var id in snakesMap) {
      if (snakesMap.hasOwnProperty(id)) {
        snakesMap[id].move();
      }
    }
    //snakeController.checkCollision(snakes);
    //snakeController.checkOutOfBounds(snakes, world);
  }

  return {
    handlePlayerInput: handlePlayerInput,
    addPlayer: addPlayer,
    getState: getState,
    update: update
  };
};

module.exports = {
  build: build
}

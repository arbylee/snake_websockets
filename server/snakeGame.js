var Snake = require('./snake.js');
var World = require('./world.js');

function build() {
  var players = [];
  var world = World.build();
  var snakesMap = {};
  var snakes = [];
  var foodCount = 0;
  var food = [];

  function handlePlayerInput(id, msg) {
    snakesMap[id].changeDirection(msg);
  }

  function addPlayer(id) {
    var newSnake = Snake.build(id);
    newSnake.setLocation(20,20);
    snakesMap[id] = newSnake;
    snakes.push(newSnake);
    return newSnake;
  }

  function removePlayer(id) {
    for (var i = 0; i < snakes.length; i++) {
      if (snakes[i].id === id) {
        snakes.splice(snakes.indexOf(snakes[i]), 1)
        break;
      }
    }
    delete snakesMap[id];
  }

  function getState(){
    return {
      snakes: getSnakes(),
      food: food
    };
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
      if(food.length < 1){
        var emptyCoords = world.getEmptySpace(snakes);
        var newFood = {x: emptyCoords.x, y: emptyCoords.y}
        food.push(newFood);
      }
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
    removePlayer: removePlayer,
    getState: getState,
    update: update
  };
};

module.exports = {
  build: build
}

var Snake = require('./snake.js');
var World = require('./world.js');

function build(socket) {
  var players = [];
  var world = World.build();
  var snakesMap = {};
  var snakes = [];
  var foodCount = 0;
  var food = [];
  var socket = socket;
  var foodCounter = 0;

  function handlePlayerInput(id, msg) {
    if(snakesMap[id]) {
      snakesMap[id].changeDirection(msg);
    }
  }

  function addPlayer(id) {
    var newSnake;
    if(snakes[id] === undefined) {
      newSnake = Snake.build(id);
      newSnake.setLocation(20,20);
      snakesMap[id] = newSnake;
      snakes.push(newSnake);
      socket.emit('playerAdded', {'id': id, 'snake': newSnake.getState()});
    } else {
      newSnake = snakes[id];
    }
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
    socket.emit('playerRemoved', id);
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
        var newFood = {x: emptyCoords.x, y: emptyCoords.y, id: foodCounter};
        foodCounter++;
        food.push(newFood);
        socket.emit('foodAdded', newFood);
      }
      if (snakesMap.hasOwnProperty(id)) {
        snakesMap[id].move();
      }
    }
    checkSnakeSelfCollision(snakes);
    checkOutOfBounds(snakes, world);
    checkFoodEaten(snakes, food);
  }

  function checkFoodEaten(snakes, food) {
    for(var i=0; i<snakes.length; i++) {
      var snake = snakes[i];
      for(var j=0; j<food.length; j++) {
        if(food[j].x == snake.getHead().x && food[j].y == snake.getHead().y){
          socket.emit('foodEaten', food[j].id);
          food.splice(j, 1);
          snake.grow();
          socket.emit('snakeGrown', snake.getState())
          break;
        };
      }
    }
  };
  function checkSnakeSelfCollision(snakes){
    for(var i=0; i<snakes.length; i++) {
      var body = snakes[i].getBody();
      var head = body[0];
      for(var j=0; j<body.length; j++) {
        if(j==0){
          continue;
        }

        if(body[j].x === head.x && body[j].y === head.y) {
          removePlayer(snakes[i].getId());
          break;
        }
      }
    }
  }
  function checkOutOfBounds(snakes, world){
    for(var i=0; i<snakes.length; i++){
      var head = snakes[i].getState().body[0];
      if (head.x < 0||
          head.x >= world.width ||
          head.y < 0 ||
          head.y >= world.height){
        removePlayer(snakes[i].getId());
      }
    }
  }
  function checkSnakeCollision(snakes, food){
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

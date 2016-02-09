var PIXI = require('pixi.js');
var renderer = new PIXI.WebGLRenderer(800, 600);
var square__image = require('../images/square.png');
var squareBlue__image = require('../images/squareBlue.png');


// The renderer will create a canvas element for you that you can then insert into the DOM.
document.body.appendChild(renderer.view);

// You need to create a root container that will hold the scene you want to draw.
var stage = new PIXI.Container();

// load the texture we need

var squareTexture = PIXI.Texture.fromImage(square__image);
var squareBlueTexture = PIXI.Texture.fromImage(squareBlue__image);

var snakes = {};
var food = [];

function newSnakeFrom(snakeData) {
  var result = [];
  var body = snakeData.body
  for(var i=0; i<body.length; i++){
    var square = newSquare(body[i].x, body[i].y)
    result.push(square);
    stage.addChild(square);
  }

  return result;
}

function newSquare(x, y) {
  var square = new PIXI.Sprite(squareTexture);
  square.scale.x = 0.25;
  square.scale.y = 0.25;
  square.x = x * 8;
  square.y = y * 8;
  return square;
}

function growSnake(snake) {
  var lastBodyPart = snake.body[snake.body.length-1];
  var square = newSquare(lastBodyPart.x, lastBodyPart.y);
  snakes[snake.id].push(square);

  stage.addChild(square);
}

function newFood(id, x, y) {
  var square = new PIXI.Sprite(squareBlueTexture);
  square.scale.x = 0.25;
  square.scale.y = 0.25;
  square.x = x * 8;
  square.y = y * 8;
  square.id = id;
  stage.addChild(square);

  return square;
}

function update(data){
  for(var i=0; i<data.snakes.length; i++) {
    var id = data.snakes[i].id;
    var body = data.snakes[i].body;
    var currentSnake = snakes[id];
    for(var j=0; j<body.length; j++){
      currentSnake[j].x = body[j].x * 8;
      currentSnake[j].y = body[j].y * 8;
    }
  }

  for(var i=0; i<data.food.length; i++) {
    if(food[i] !== undefined){
      food[i].x = data.food[i].x * 8;
      food[i].y = data.food[i].y * 8;
    }
  }

  renderer.render(stage);
}

function addPlayer(id, snake) {
  if(snakes[id] === undefined){
    snakes[id] = newSnakeFrom(snake);
  }
}

function removePlayer(id) {
  var bodyArray = snakes[id];
  if(bodyArray) {
    for(var i=0; i<bodyArray.length; i++) {
      stage.removeChild(bodyArray[i]);
    }
    delete snakes[id];
  }
}

function addFood(addedFood) {
  food.push(newFood(addedFood.id, addedFood.x, addedFood.y));
}

function removeFood(id) {
  for(var i=0; i<food.length; i++) {
    if(food[i].id == id){
      stage.removeChild(food[i]);
      food.splice(i, 1);
      break;
    }
  }
}

function setInitialGameState(data) {
  for(var i=0; i<data.snakes.length; i++){
    var id = data.snakes[i].id;
    addPlayer(id, data.snakes[i])
  }
  for(var j=0; j<data.food.length; j++){
    addFood(data.food[j].x, data.food[j].y);
  }
}

module.exports = {
  update: update,
  addPlayer: addPlayer,
  removePlayer: removePlayer,
  addFood: addFood,
  removeFood: removeFood,
  growSnake: growSnake,
  setInitialGameState: setInitialGameState
}

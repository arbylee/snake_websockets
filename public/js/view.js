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
    var square = new PIXI.Sprite(squareTexture);
    square.scale.x = 0.25;
    square.scale.y = 0.25;
    square.x = body[i].x * 8;
    square.y = body[i].y * 8;
    result.push(square);
    stage.addChild(square);
  }

  return result;
}

function newFood(x, y) {
  var square = new PIXI.Sprite(squareBlueTexture);
  square.scale.x = 0.25;
  square.scale.y = 0.25;
  square.x = x * 8;
  square.y = y * 8;
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
    if(food[i] === undefined){
      food.push(newFood(data.food[i].x, data.food[i].y));
    }
    food[i].x = data.food[i].x * 8;
    food[i].y = data.food[i].y * 8;
  }

  renderer.render(stage);
}

function addPlayer(id, snake) {
  if(snakes[id] === undefined){
    snakes[id] = newSnakeFrom(snake);
  }
}

function removePlayer(id) {
  stage.removeChild(snakes[id][0]);
}

function setInitialGameState(data) {
  for(var i=0; i<data.snakes.length; i++){
    var id = data.snakes[i].id;
    if(snakes[id] === undefined){
      snakes[id] = newSnakeFrom(data.snakes[i]);
    }
  }
}

module.exports = {
  update: update,
  addPlayer: addPlayer,
  removePlayer: removePlayer,
  setInitialGameState: setInitialGameState
}

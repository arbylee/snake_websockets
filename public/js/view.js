var PIXI = require('pixi.js');
var renderer = new PIXI.WebGLRenderer(800, 600);
var square__image = require('../images/square.png');


// The renderer will create a canvas element for you that you can then insert into the DOM.
document.body.appendChild(renderer.view);

// You need to create a root container that will hold the scene you want to draw.
var stage = new PIXI.Container();

// load the texture we need

var squareTexture = PIXI.Texture.fromImage(square__image);

var snakes = {};

function newSnake() {
  var square = new PIXI.Sprite(squareTexture);
  square.scale.x = 0.5;
  square.scale.y = 0.5;
  stage.addChild(square);

  return [ square ]
}

function newSnakeFrom(snakeData) {
  var square = new PIXI.Sprite(squareTexture);
  square.scale.x = 0.5;
  square.scale.y = 0.5;
  square.x = snakeData.x;
  square.y = snakeData.y;
  stage.addChild(square);

  return [ square ]
}

function update(data){
  for(var i=0; i<data.snakes.length; i++) {
    var id = data.snakes[i].id;
    snakes[id][0].x = data.snakes[i].x * 8;
    snakes[id][0].y = data.snakes[i].y * 8;
  }
  renderer.render(stage);
}

function addPlayer(id) {
  snakes[id] = newSnake();
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

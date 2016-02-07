var PIXI = require('pixi.js');
var renderer = new PIXI.WebGLRenderer(800, 600);
var square__image = require('../images/square.png');


// The renderer will create a canvas element for you that you can then insert into the DOM.
document.body.appendChild(renderer.view);

// You need to create a root container that will hold the scene you want to draw.
var stage = new PIXI.Container();

// load the texture we need

var squareTexture = PIXI.Texture.fromImage(square__image);
var square = new PIXI.Sprite(squareTexture);
stage.addChild(square);

exports.update = function (data){
  console.log(data.snakes);
  for(var i=0; i<data.snakes.length; i++) {
    square.x = data.snakes[0].x;
    square.y = data.snakes[0].y;
  }
  renderer.render(stage);
}

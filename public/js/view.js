var PIXI = require('pixi.js');
var renderer = new PIXI.WebGLRenderer(800, 600);
var circle__image = require('../images/circle.png');


// The renderer will create a canvas element for you that you can then insert into the DOM.
document.body.appendChild(renderer.view);

// You need to create a root container that will hold the scene you want to draw.
var stage = new PIXI.Container();

// load the texture we need
PIXI.loader.add('circle', circle__image).load(function (loader, resources) {
  // This creates a texture from a 'circle.png' image.
  var circle = new PIXI.Sprite(resources.circle.texture);

  // Setup the position and scale of the circle
  circle.position.x = 400;
  circle.position.y = 300;

  circle.scale.x = 2;
  circle.scale.y = 2;

  // Add the circle to the scene we are building.
  stage.addChild(circle);

  // kick off the animation loop (defined below)
  animate(circle);
});

function animate(circle) {
  // start the timer for the next animation loop
  requestAnimationFrame(animate);

  // each frame we spin the circle around a bit
  circle.rotation += 0.01;

  // this is the main render call that makes pixi draw your container and its children.
  renderer.render(stage);
}

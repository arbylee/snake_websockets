var allTheCss = require("../styles/app.scss");
var $ = require('jquery');
var io = require('socket.io-client');
var socket = io('/gameInput');
var view = require('./view.js');

var CONTROL_KEYS = {
  87: 'up', //w
  65: 'left', //a
  83: 'down', //s
  68: 'right', //d
}

$('body').keydown(function(event) {
  if(CONTROL_KEYS[event.which]) {
    socket.emit('controls', CONTROL_KEYS[event.which]);
  };
});

socket.on('viewUpdate', function(msg) {
  view.update(msg);
});

socket.on('playerAdded', function(data){
  view.addPlayer(data.id, data.snake);
})

socket.on('playerRemoved', function(id){
  view.removePlayer(id);
})

socket.on('initialGameState', function(data){
  view.setInitialGameState(data);
})

socket.on('foodAdded', function(data){
  view.addFood(data);
})

socket.on('foodEaten', function(id){
  view.removeFood(id);
})

socket.on('snakeGrown', function(snake){
  view.growSnake(snake);
})

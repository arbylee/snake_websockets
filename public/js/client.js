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

socket.on('playerAdded', function(id){
  view.addPlayer(id);
})

socket.on('playerRemoved', function(id){
  view.removePlayer(id);
})

socket.on('initialGameState', function(id){
  view.setInitialGameState(id);
})

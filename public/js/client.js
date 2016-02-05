var allTheCss = require("../styles/app.scss");
var $ = require('jquery');
var io = require('socket.io-client');
var socket = io('/chat');

$('form').submit(function(){
  socket.emit('chat message', $('#m').val());
  $('#m').val('');
  return false;
});

socket.on('chat message', function(msg){
  $('#messages').append($('<li>').text(msg));
});

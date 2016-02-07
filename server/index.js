var express = require('express');
var app = express();
var http = require('http')
var server = http.Server(app);
var io = require('socket.io')(server);
var path = require('path');
var SnakeGame = require('./snakeGame.js');

app.use(express.static(__dirname + '/../dist'));

app.get('/', function(req, res){
  res.sendFile(path.resolve(__dirname + '/../dist/index.html'));
});

var gameIo = io.of('/gameInput');
var snakeGame;

gameIo.on('connection', function(socket){
  console.log('a user connected');
  newSnake = snakeGame.addPlayer(socket.id);
  gameIo.emit('playerAdded', {'id': socket.id, 'snake': newSnake.getState()});

  socket.emit('initialGameState', snakeGame.getState());

  socket.on('disconnect', function(){
    snakeGame.removePlayer(socket.id);
    gameIo.emit('playerRemoved', socket.id);
    console.log('user disconnected');
  });

  socket.on('controls', function(msg){
    snakeGame.handlePlayerInput(socket.id, msg);
  });
});

server.listen(3000, function(){
  console.log('listening on *:3000');
  snakeGame = SnakeGame.build();
  setInterval(function(){
    snakeGame.update();
    gameIo.emit('viewUpdate', snakeGame.getState());
  }, 100)
});


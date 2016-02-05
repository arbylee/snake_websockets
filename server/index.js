var express = require('express');
var app = express();
var http = require('http')
var server = http.Server(app);
var io = require('socket.io')(server);
var path = require('path');

app.use(express.static(__dirname + '/../dist'));

app.get('/', function(req, res){
    res.sendFile(path.resolve(__dirname + '/../dist/index.html'));
});

chatIo = io.of('/chat');

chatIo.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

chatIo.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});

chatIo.on('connection', function(socket){
  socket.on('chat message', function(msg){
    chatIo.emit('chat message', msg);
  });
});

server.listen(3000, function(){
    console.log('listening on *:3000');
});


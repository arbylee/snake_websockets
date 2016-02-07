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

gameIo = io.of('/gameInput');

gameIo.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('controls', function(msg){
    console.log(msg);
    socket.emit('viewUpdate', {'data': 'yeah'});
  });
});

server.listen(3000, function(){
  console.log('listening on *:3000');
});


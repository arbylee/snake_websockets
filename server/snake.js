function build(id) {
  var x, y, chosenDirection,
      id = id;
  var body = [
    {x: null, y: null, velocityX: 1, velocityY: 0},
    {x: null, y: null, velocityX: 1, velocityY: 0},
    {x: null, y: null, velocityX: 1, velocityY: 0}
  ];
  var head = body[0];


  function changeDirection(direction){
    if(direction == 'up'){
      head.velocityX = 0;
      head.velocityY = -1;
    }else if(direction == 'right'){
      head.velocityX = 1;
      head.velocityY = 0;
    }else if(direction == 'down'){
      head.velocityX = 0;
      head.velocityY = 1;
    }else if(direction == 'left'){
      head.velocityX = -1;
      head.velocityY = 0;
    }
  }

  function move() {
    for(var i=0; i<body.length; i++){
      body[i].x += body[i].velocityX;
      body[i].y += body[i].velocityY;
    }

    for(var j=body.length-1; j>0; j--){
      body[j].velocityX = body[j-1].velocityX;
      body[j].velocityY = body[j-1].velocityY;
    };
  }

  function setLocation(newX, newY) {
    for(var i=0; i<body.length; i++) {
      body[i].x = newX - i;
      body[i].y = newY;
    }
  }

  function getState() {
    return {
      id: id,
      body: body
    }
  }

  return {
    setLocation: setLocation,
    getState: getState,
    changeDirection: changeDirection,
    move: move
  };
}

module.exports = {
  build: build
}

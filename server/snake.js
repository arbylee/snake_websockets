function build(id) {
  var x, y, chosenDirection,
      id = id;
  var body = [
    {x: null, y: null, velocityX: 1, velocityY: 0},
    {x: null, y: null, velocityX: 1, velocityY: 0},
    {x: null, y: null, velocityX: 1, velocityY: 0}
  ];
  var head = body[0];
  var UP = 'up', DOWN = 'down', LEFT = 'left', RIGHT = 'right';

  function getCurrentDirection() {
    if(head.velocityX === 0 && head.velocityY === -1) {
      return UP;
    } else if (head.velocityX === 1 && head.velocityY === 0){
      return RIGHT;
    } else if (head.velocityX === 0 && head.velocityY === 1){
      return DOWN;
    } else if (head.velocityX === -1 && head.velocityY === 0){
      return LEFT;
    }
  }

  function changeDirection(direction){
    var currentDirection = getCurrentDirection();
    if(direction === UP && currentDirection != DOWN){
      head.velocityX = 0;
      head.velocityY = -1;
    }else if(direction === RIGHT && currentDirection != LEFT){
      head.velocityX = 1;
      head.velocityY = 0;
    }else if(direction === DOWN && currentDirection != UP){
      head.velocityX = 0;
      head.velocityY = 1;
    }else if(direction === LEFT && currentDirection != RIGHT){
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

  function getId() {
    return id;
  }

  function getState() {
    return {
      id: id,
      body: body
    }
  }

  function getBody() {
    return body;
  }

  function getHead() {
    return body[0];
  }

  function grow() {
    var lastBodyPart = body[body.length-1];
    body.push({
      x: lastBodyPart.x - lastBodyPart.velocityX,
      y: lastBodyPart.y - lastBodyPart.velocityY,
      velocityX: lastBodyPart.velocityX,
      velocityY: lastBodyPart.velocityY
    });
  };

  return {
    setLocation: setLocation,
    getId: getId,
    getHead: getHead,
    getBody: getBody,
    getState: getState,
    changeDirection: changeDirection,
    move: move,
    grow: grow
  };
}

module.exports = {
  build: build
}

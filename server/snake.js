function build(id) {
  var x, y, chosenDirection,
      id = id;
  var body = [
    {x: null, y: null, velocityX: 0, velocityY: 0}
  //  {x: null, y: null, velocityX: 0, velocityY: 0},
  //  {x: null, y: null, velocityX: 0, velocityY: 0}
  ];
  var head = body[0];


  function changeDirection(direction){
    console.log('changing direction ' + direction)
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
    console.log('bout to move')
    console.log(body);
    console.log('move')
    for(var i=0; i< body.length; i++){
      console.log(body[i])
      body[i].x += body[i].velocityX;
      body[i].y += body[i].velocityY;
    }
  }

  function setLocation(newX, newY) {
    head.x = newX;
    head.y = newY;
    //for(var i=0; i++; i<body.length) {
    //  body[i].x = newX - i;
    //  body[i].y = newX - i;
    //}
  }

  function getState() {
    return {
      id: id,
      x: head.x,
      y: head.y
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

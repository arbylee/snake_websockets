function build(id) {
  var x, y;
  //var body = [
  //  {x: null, y: null, velocityX: 0, velocityY: 0},
  //  {x: null, y: null, velocityX: 0, velocityY: 0},
  //  {x: null, y: null, velocityX: 0, velocityY: 0}
  //];
  //var head = body[0];

  function setLocation(newX, newY) {
    x = newX;
    y = newY;
    //for(var i=0; i++; i<body.length) {
    //  body[i].x = newX - i;
    //  body[i].y = newX - i;
    //}
  }

  return {
    setLocation: setLocation,
    id: id
  };
}

module.exports = {
  build: build
}

function build() {
  var WIDTH = 80;
  var HEIGHT = 60;

  function getState() {
    return {
      width: width,
      height: height
    }
  }

  function getEmptySpace(snakes) {
    var randomX = Math.floor(Math.random() * (WIDTH-1));
    var randomY = Math.floor(Math.random() * (HEIGHT-1));
    if(!spaceIsOccupied(randomX, randomY, snakes)){
      return {x: randomX, y: randomY};
    } else {
      return getEmptySpace();
    };
  }

  function spaceIsOccupied(x, y, snakes){
    var isOccupied = false;
    for(var i=0; i<snakes.length; i++){
      var currentBody = snakes[i].getState().body;
      if(isOccupied){
        break;
      }
      for(var j=0; j<currentBody.length; j++) {
        if(currentBody[j].x == x && currentBody[j].y == y){
          isOccupied = true;
          break;
        };
      }
    }
    return isOccupied;
  };

  return {
    width: WIDTH,
    height: HEIGHT,
    getEmptySpace: getEmptySpace
  };
}

module.exports = {
  build: build
};

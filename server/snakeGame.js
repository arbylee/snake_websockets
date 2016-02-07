var World = require('./world.js')
function build() {
  var players = [];
  var world = World.build();

  function handlePlayerInput() {
  }
  function addPlayer(id) {
    world.addPlayer(id);
  }
  function printSomething(){
    console.log("something!!!!!!!!!")
  }

  return {
    handlePlayerInput: handlePlayerInput,
    addPlayer: addPlayer,
    printSomething: printSomething
  };
};

module.exports = {
  build: build
}

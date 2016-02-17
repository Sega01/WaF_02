//makes the game itself
game = new Phaser.Game(600, 600, Phaser.AUTO, "game");

//adds the game states
game.state.add("load", loadState);
game.state.add("play", playState);
game.state.add("menu", menuState);
game.state.add("shop", shopState);
game.state.add("help", helpState);

game.state.start("load");
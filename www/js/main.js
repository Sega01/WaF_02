//### TO DOS ###
// Timer
// Objekte
// Zufallsgenerierung (Zeit)
// Collisionsabfrage
// Punktevergabe



game = new Phaser.Game("100%", "90%", Phaser.CANVAS, 'game');
game.state.add("load", loadState);
game.state.add("play", playState);
game.state.add("menu", menuState);
game.state.add("gameover", gameoverState);
//game.state.add("menu", menuState);
//game.state.add("shop", shopState);
//game.state.add("help", helpState);

game.state.start("load");



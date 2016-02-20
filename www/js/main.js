//### TO DOS ###
// Timer
// Objekte
// Zufallsgenerierung (Zeit)
// Collisionsabfrage
// Punktevergabe



//game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.AUTO, 'game');
game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.CANVAS, 'game');

game.state.add("load", loadState);
game.state.add("play", playState);
game.state.add("menu", menuState);
game.state.add("gameover", gameoverState);


game.state.start("load");



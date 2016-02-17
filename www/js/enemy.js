//for adding enemies and stuff
addMore = function() {
	var x;
	var y;
	var velX;

	//decides which side the robots will spawn in
	if (Math.random() > 1/2 ) {
		x = playState.game.width - 10;
		y = 150;
		velX = -350;
	} else {
		x = playState.game.width - 10;
		y = 350;
		velX = -350;
	};

	//rings
	var ring = playState.rings.create(x, y, "ring");
	playState.game.physics.enable(ring, Phaser.Physics.ARCADE);
    ring.body.velocity.x = velX;
    ring.outOfBoundsKill = true;

    ring.checkWorldBounds = true;
    ring.events.onOutOfBounds.add(missEnemy, this);
}
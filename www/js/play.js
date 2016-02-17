playState = {


	//creates everything
	create:function() {
		game.stage.backgroundColor = '#f7f7f7';
	    line1 = new Phaser.Line(0, 200, window.innerWidth, 200);
	    line2 = new Phaser.Line(0, 400, window.innerWidth, 400);

	    this.rings = this.game.add.group();
	    //timer
        this.timer = this.game.time.events.loop(750, addMore, this); 


        var circlePositionY = 400;
        //this.level = 1;
        this.circle = game.add.sprite(50, circlePositionY, 'circle');
	    this.circle.anchor.set(0.5);
	    this.game.physics.enable(this.circle, Phaser.Physics.ARCADE);
	    
	    this.scoreText = this.game.add.text(20, 60, "");
	    this.sfx_hit = this.game.add.audio('sfx_hit');
	    this.sfx_miss = this.game.add.audio('sfx_miss');
	    this.sfx_cheer = this.game.add.audio('sfx_cheer');
	    this.sfx_game = this.game.add.audio('sfx_game',1,true);
	    
		
	    if (this.level !== 1)
	    {
	    	this.sfx_game.play();
	    	game.time.events.add(Phaser.Timer.SECOND * 10, switchHands, this);
		}
		if (this.level === 1)
	    {
	    	this.sfx_game.pause();
	    	game.time.events.add(Phaser.Timer.SECOND * 10, gameOver, this);
	    }
	},

	render:function() {
	    game.debug.geom(line1, '#4bd1db');
	    game.debug.geom(line2, '#4bd1db');
	},

	//updates the game
	update:function() {
	this.scoreText.setText("Score: " + this.score);
		if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
	    {
	        this.circle.y = 200;
	    }
	    else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
	    {
	        this.circle.y = 400;
	    }



	    game.physics.arcade.overlap(this.circle, this.rings, hitEnemy, null, this);
	}

	
	
};

gamePause = function() {
	game.paused = true;
	console.log("Pause");
}
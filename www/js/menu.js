//THE MENU STATE
menuState = {
	create:function() {
		console.log("gestartet");
		game.stage.backgroundColor = '#4bd1db';
		
		text = this.game.add.text(0, 0, "Well done!\nTime to switch hands…", textStyle);
		text.setTextBounds(0, 50, window.innerWidth, 50);

		this.success = game.add.sprite(150, window.innerHeight-800, 'success_slim');
		playState.level = 1;
		//5 Sekunden Pause für Handwechsel
		game.time.events.add(Phaser.Timer.SECOND * 5, resumeGame, this);
	},




	update:function() {

	}

	

};

gameoverState = {
	create:function() {
		game.stage.backgroundColor = '#4bd1db';
		
		textSuccessHeadline = this.game.add.text(0, 0, "Great!", textStyle);
		textSuccesscontent = this.game.add.text(0, 0, "Your partner's arm muscles\nhave grown by 10%.", textStyleSmall);
		textSuccessHeadline.setTextBounds(0, 50, window.innerWidth, 50);
		textSuccesscontent.setTextBounds(0, 180, window.innerWidth, 50);

		this.success = game.add.sprite(30, window.innerHeight-800, 'muscleGrowth1');
		playState.sfx_cheer.play();
		
	},




	update:function() {
	    
	}

	

};

//play button
	resumeGame = function() {
		game.state.start("play");
		//this.sfx_game.resume();
	},

	switchHands = function() {
		playState.level = 1;
		game.state.start("menu");
	}
	gameOver = function() {
		playState.level = 2;
		//playState.this.sfx_game.destroy();
		game.state.start("gameover");
	}
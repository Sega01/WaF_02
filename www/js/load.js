loadState = {
	//loads everything
	preload:function() {
		textStyle = {
			font: "64px Prime",
			fill: "#ffffff",
			boundsAlignH: "center",
			align: "center"
			//wordWrap: true,
			//wordWrapWidth: 480
		};

		textStyleSmall = {
			font: "32px Prime",
			fill: "#ffffff",
			boundsAlignH: "center",
			align: "center"
			//wordWrap: true,
			//wordWrapWidth: 480
		};

		game.stage.backgroundColor = '#f7f7f7';
		game.load.image('ring', "img/ring.png");
    	game.load.image('circle', "img/circle.png");
    	game.load.image('success_slim', "img/success.png");
    	game.load.image('muscleGrowth1', "img/muscle_growth_1.png");

    	game.load.audio('sfx_hit', 'audio/hit.mp3');
    	game.load.audio('sfx_miss', 'audio/miss.mp3');
    	game.load.audio('sfx_game', 'audio/game_music.mp3');
    	game.load.audio('sfx_cheer', 'audio/cheer.mp3');

	},
	create:function() {
		game.state.start("play");
		playState.score = 0;
	}


};
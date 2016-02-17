angular.module('starter.controllers', [])

.controller('StartCtrl', function($scope) {

})

.controller('GameCtrl', function($scope) {

  $scope.$on("$ionicView.beforeEnter", function() {

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

//when a player hits the enemies

hitEnemy = function(circle, ring) {
  
    ring.kill();
    this.score = this.score + 100;
    this.sfx_hit.play();
};

missEnemy = function(ring) {
    ring.destroy();
    console.log("Miss");
    this.score = this.score -500;
    this.sfx_miss.play();
}



    game = new Phaser.Game("100%", "90%", Phaser.CANVAS, 'game');
    game.state.add("load", loadState);
    game.state.add("play", playState);
    game.state.add("menu", menuState);
    game.state.add("gameover", gameoverState);
    //game.state.add("menu", menuState);
    //game.state.add("shop", shopState);
    //game.state.add("help", helpState);

    game.state.start("load");

});


})

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

 
})


.controller('SettingsCtrl', function($scope) {

var macAddress = "20:13:07:18:02:77";
  
$scope.connectBlue = function() {
   bluetoothSerial.connect(macAddress, alert("verbunden"), alert("verbindung fehlgeschlagen"));
  };

$scope.disconnectBlue = function() {
   bluetoothSerial.disconnect(alert("getrennt"), alert("trennung fehlgeschlagen"));
  };

$scope.subscribe = function() {
  // subscribe for incoming data
  bluetoothSerial.subscribeData(readingData(), alert("iwas geht nicht"));
  resultDiv.innerHTML = ""; 
};

$scope.readingData = function() {
  bluetoothSerial.read(function (data) {
    resultDiv.innerHTML = resultDiv.innerHTML + "Received: " + data + "<br/>";
    resultDiv.scrollTop = resultDiv.scrollHeight;
  }); 
};

/*
  bluetoothSerial.isEnabled(function () {
        //$('#status').css({'color': 'green'});
        alert("Bluetooth is Enabled.");
      }, function () {
        //$('#status').css({'color': 'red'});
        alert("Bluetooth is *not* Enabled.");
      }
    );
*/
});

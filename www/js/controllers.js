angular.module('starter.controllers', [])

.controller('StartCtrl', function($scope, $timeout) {
  
  
timerArms = 0;
timerTorso = 0;
timerLegs = 0;

$scope.updateArms = function(){
  if (timerArms == 1){
    return true;
  } else {
    return false;
  }
}

$scope.updateTorso = function(){
  if (timerTorso == 1){
    return true;
  } else {
    return false;
  }
}

$scope.updateLegs = function(){
  if (timerLegs == 1){
    return true;
  } else {
    return false;
  }
}
 
$timeout(function() {
  timerArms = 1;
}, 5000)
/*
$timeout(function() {
       timerTorso = 1;
    }, 10000)
$timeout(function() {
       timerLegs = 1;
    }, 15000)*/

})

.controller('MainCtrl', function($scope, $state, $timeout) {
  console.log('MainCtrl');
  
  $scope.toIntro = function(){
    $state.go('intro');
  }

})

.controller('IntroCtrl', function($scope, $state, $ionicModal, $ionicSlideBoxDelegate) {
 
  // Called to navigate to the main app
  $scope.startApp = function() {
    $state.go('main');
  };
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };


  // Wizard abbrechen
  $ionicModal.fromTemplateUrl('templates/cancel.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.closeCancellation = function() {
    $scope.modal.hide();
  };

  $scope.cancelWizzard = function() {
    $scope.modal.show();
  };

  $scope.backHome = function(){
    $state.go('app.rezepte');
    $scope.modal.hide();
  };

})


.controller('GameCtrl', function($scope, $state, $ionicHistory,$ionicViewSwitcher) {


  var macAddress = "20:13:07:18:02:77";
    
  bluetoothSerial.connect(macAddress, alert("verbunden"), alert("verbindung fehlgeschlagen"));

  $scope.$on("$ionicView.beforeEnter", function() {

    loadState = {
  //loads everything
  preload:function() {
    textStyle = {
      font: "64px Titillium Semibold",
      fill: "#ffffff",
      boundsAlignH: "center",
      align: "center"
      //wordWrap: true,
      //wordWrapWidth: 480
    };

    textStyleSmall = {
      font: "32px Titillium Regular",
      fill: "#ffffff",
      boundsAlignH: "center",
      align: "center"
      //wordWrap: true,
      //wordWrapWidth: 480
    };
    buttonText = {
      font: "32px Titillium Regular",
      fill: "#4bd1db",
      //fill: "#FF0000",
      boundsAlignH: "center",
      align: "center"
    };

    game.stage.backgroundColor = '#f7f7f7';
    game.load.image('ring', "img/ring.png");
      game.load.image('circle', "img/circle.png");
      game.load.image('success_slim', "img/success.png");
      game.load.image('muscleGrowth1', "img/muscle_growth_1.png");
      game.load.image('button', "img/button.png");

      game.load.audio('sfx_hit', 'audio/hit.mp3');
      game.load.audio('sfx_miss', 'audio/miss.mp3');
      game.load.audio('sfx_game', 'audio/game_music.m4a'/*,'audio/game_music.ogg'*/);
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
    
      //this.sounds = [ this.sfx_hit, this.sfx_miss, this.sfx_game, this.sfx_cheer ];
    //game.sound.setDecodedCallback(this.sounds, this);

    
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

      /*game.debug.soundInfo(this.sfx_game, 32, 200);

      if (this.sfx_game.isDecoding)
      {
          game.debug.text("Decoding MP3 ...", 32, 400);
      }*/
  },



  //updates the game
  update:function() {
    //bluetoothSerial.clear;
    bluetoothSerial.readUntil('\n', function (data) {
      var movingArduino = data;
      movingArduino = parseInt(movingArduino);
      if (movingArduino == 1) 
      {
        this.moving = true;
      } else {
        this.moving = false;
      }
      resultDiv.innerHTML = "movingArduino ist: " + movingArduino + "<br/> und moving ist: " + this.moving;
    }); 
    this.scoreText.setText("Score: " + this.score);
    if (this.moving == false)
    {   
        this.circle.y = 400;
    }
    else if (this.moving == true)
    {
        this.circle.y = 200;
    }
    /*
    if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
    {
        this.circle.y = 200;
        //this.sfx_game.play();
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
    {
        this.circle.y = 400;
        //this.sfx_game.pause();
    }
    game.time.events.add(Phaser.Timer.SECOND * 25, gamePause, this);

    */
    game.physics.arcade.overlap(this.circle, this.rings, hitEnemy, null, this);
  }

};



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

    this.ButtonReturn = this.game.add.button(window.innerWidth/2, window.innerHeight-47, "button", this.returnBtn);
    this.ButtonReturn.anchor.set(0.5);
    textButtonReturn = this.game.add.text(20, 80, "Return to main menu", buttonText);
    textButtonReturn.setTextBounds(0,  window.innerHeight-147, window.innerWidth,0);

    playState.sfx_cheer.play();
    
  },

  update:function() {
      
  },

  returnBtn:function() {
    game.destroy();
    $ionicHistory.nextViewOptions({
    disableBack: true
    });
    timerArms = 0;
    $ionicViewSwitcher.nextDirection('back');
    $state.go('app.start');
  },
  
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
    console.log("game over wurde ausgeführt");
  }

  gamePause = function() {
  this.sfx_game.pause();
  console.log("wurde ausgeführt");
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


    //game = new Phaser.Game("100%", "90%", Phaser.CANVAS, 'game');
    game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.CANVAS, 'game');
    game.state.add("load", loadState);
    game.state.add("play", playState);
    game.state.add("menu", menuState);
    game.state.add("gameover", gameoverState);

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

.controller('SettingsCtrl', function($scope, $interval) {

/*
  var macAddress = "20:13:07:18:02:77";
    
  $scope.connectBlue = function() {
     bluetoothSerial.connect(macAddress, alert("verbunden"), alert("verbindung fehlgeschlagen"));
   };

  $scope.disconnectBlue = function() {
     bluetoothSerial.disconnect(alert("getrennt"), alert("trennung fehlgeschlagen"));
    };
  */
  /*  setInterval(function() {
      resultDiv.innerHTML = "";
      bluetoothSerial.clear;
      bluetoothSerial.readUntil('\n', function (data) {
      resultDiv.innerHTML = resultDiv.innerHTML + "Received: " + data + "<br/>";
    }); 
    }, 250);
*/
  /*$scope.readingData = function() {
    bluetoothSerial.read(function (data) {
      resultDiv.innerHTML = resultDiv.innerHTML + "Received: " + data + "<br/>";
      resultDiv.scrollTop = resultDiv.scrollHeight;
    }); 
  };

  $interval(, 1000);*/
  
});

angular.module('starter.controllers', ['spotify', 'LocalStorageModule'])

.config(function (SpotifyProvider) {
  SpotifyProvider.setClientId('42a1039c04f64175b5fd5e6018d0eff3');
  SpotifyProvider.setRedirectUri('<CALLBACK_URI>');
  SpotifyProvider.setScope('user-read-private playlist-read-private playlist-modify-private playlist-modify-public');
  // Token muss leider jede Stunde aktualisiert werden.  Mit dem Cordova OAuth haben wir es leider nicht hinbekomen
  SpotifyProvider.setAuthToken('BQBn8ZuWnvRdnYwN7lr1gJpqeWMX29QEuOa6XxF4byrFf5XV6d2gq2fmbiwzmNtPtbfo0QmBl4Hbo_a38lZ8oDqao5mfSauCUyDE3hDHxkWxsXdGN-ilFRFG8-VX85D9asf-ji0Y1K74luT7DiyIZ06pPVUMMWq4iS0m9tt7etsNScZ0jTg-Q79eT4-9eiYcsXr_wGMdjWhkghSrAhSZNkIypB7b3Tyjj3xymy-1RmbAsq34Fvg9qrCANQFaW0-nlBXc8tbGkgVKG6ASvujlAuK5UuOnpzrZdZ52Us9krCZJ2zol');
})

.controller('StartCtrl', function($scope, $timeout, $rootScope) {

  

  $rootScope.scoreArms = +window.localStorage['scoreArms'] || 0;

  console.log("Wert:" + $rootScope.scoreArms);

  timerArms = 0;
  timerTorso = 0;
  timerLegs = 0;


//console.log($scope.scoreArms); 
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

$timeout(function() {
       timerTorso = 1;
    }, 120000)
$timeout(function() {
       timerLegs = 1;
    }, 180000)


$scope.addArmScore = function() {
  console.log("Neuer ArmScore:" + scoreArms);
  scoreArms = scoreArms + 1;
}

})

.controller('MainCtrl', function($scope, $state, $timeout) {
  //console.log('MainCtrl');
  
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

})



.controller('GameCtrl', function($scope, $state, $ionicHistory,$ionicViewSwitcher, $rootScope, $timeout) {

  var getScoreArms = $rootScope.scoreArms;
  console.log("Wert im Game-Controller:" + getScoreArms);
  
  var macAddress = $rootScope.macAdress;
  
  var macAddress = window.localStorage['macAdress'] || "20:13:06:18:27:38";
  console.log(macAddress);
  bluetoothSerial.connect(macAddress, console.log("verbunden"), console.log("verbindung fehlgeschlagen"));
  
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
      game.load.image('circle', "img/circle.png");
      game.load.image('health', "img/health.png");
      game.load.image('healthLost', "img/health_lost.png");
      game.load.image('success_slim', "img/success.png");
      game.load.image('fail_slim', "img/fail.png");
      game.load.image('muscleGrowth1', "img/muscle_growth_1.png");
      game.load.image('button', "img/button.png");
      game.load.image('close', "img/close.png");

      game.load.audio('sfx_hit', 'audio/hit.mp3');
      game.load.audio('sfx_miss', 'audio/miss.mp3');
      game.load.audio('sfx_game', 'audio/game_music.m4a'/*,'audio/game_music.ogg'*/);
      game.load.audio('sfx_exhausted', 'audio/exhausted.mp3');
      game.load.audio('sfx_cheer', 'audio/cheer.mp3');

  },
  create:function() {
    game.state.start("boot");
    playState.score = 0;
    playState.health = 3;

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
    this.timerMoving = this.game.time.events.loop(20, ArduinoData, this);  
    this.gfx_health1 = game.add.sprite(window.innerWidth-80, 20, 'health');
    this.gfx_health2 = game.add.sprite(window.innerWidth-160, 20, 'health');
    this.gfx_health3 = game.add.sprite(window.innerWidth-240, 20, 'health');

    var circlePositionY = 400;
    this.circleposition2 = 800;
    //this.level = 1;
    this.circle = game.add.sprite(50, circlePositionY, 'circle');
    this.circle.anchor.set(0.5);
    this.game.physics.enable(this.circle, Phaser.Physics.ARCADE);
      
    this.ButtonReturn = this.game.add.button(20, 20, "close", this.returnBtn);
    this.moving = 0;
    this.pauseMoving = 0;
    movingArduino = 0;
    this.sfx_hit = this.game.add.audio('sfx_hit');
    this.sfx_miss = this.game.add.audio('sfx_miss');
    this.sfx_exhausted = this.game.add.audio('sfx_exhausted');
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
    game.physics.arcade.overlap(this.circle, this.rings, hitEnemy, null, this);
  },
  returnBtn:function() {
    game.destroy();
    bluetoothSerial.disconnect();
    $ionicHistory.nextViewOptions({
    disableBack: true
    });
    $ionicViewSwitcher.nextDirection('back');
    $state.go('app.start');
  }

};



bootState = {
  create:function() {
    game.stage.backgroundColor = '#4bd1db';
    
    text = this.game.add.text(0, 0, "Get Ready!", textStyle);
    text.setTextBounds(0, 20, window.innerWidth, 20);

    text = this.game.add.text(0, 0, "The game is about to begin", textStyleSmall);
    text.setTextBounds(0, 100, window.innerWidth, 100);

    this.success = game.add.sprite((game.world.width/2)-245, window.innerHeight-480, 'success_slim');

    //10 bis Spielstart
    game.time.events.add(Phaser.Timer.SECOND * 10, resumeGame, this);
  },

  update:function() {

  }

};

//THE MENU STATE
menuState = {
  create:function() {
    console.log("Menü gestartet");
    game.stage.backgroundColor = '#4bd1db';
    
    text = this.game.add.text(0, 0, "Well done!", textStyle);
    text.setTextBounds(0, 20, window.innerWidth, 20);

    text = this.game.add.text(0, 0, "Time to switch hands…", textStyleSmall);
    text.setTextBounds(0, 100, window.innerWidth, 100);

    this.success = game.add.sprite((game.world.width/2)-295, window.innerHeight-480, 'success_slim');
    playState.level = 1;
    //5 Sekunden Pause für Handwechsel
    game.time.events.add(Phaser.Timer.SECOND * 5, resumeGame, this);
  },

  update:function() {

  }

};

failState = {
  create:function() {
    game.stage.backgroundColor = '#4bd1db';
    
    textFailHeadline = this.game.add.text(0, 0, "Too bad!", textStyle);
    textFailHeadline.setTextBounds(0, 20, window.innerWidth, 20);

    textFailcontent = this.game.add.text(0, 0, "Your partner wore out \nTake a break and keep training!", textStyleSmall);
    textFailcontent.setTextBounds(0, 100, window.innerWidth, 100);

    this.fail = game.add.sprite((game.world.width/2)-245, window.innerHeight-480, 'fail_slim');
    playState.sfx_exhausted.play();
    this.ButtonReturn = this.game.add.button(window.innerWidth/2, window.innerHeight-117, "button", this.retryGame);
    this.ButtonReturn.anchor.set(0.5);
    textButtonReturn = this.game.add.text(20, 80, "Retry", buttonText);
    textButtonReturn.setTextBounds(0,  window.innerHeight-217, window.innerWidth,0);

    this.ButtonReturn = this.game.add.button(window.innerWidth/2, window.innerHeight-47, "button", this.returnBtn);
    this.ButtonReturn.anchor.set(0.5);
    textButtonReturn = this.game.add.text(20, 80, "Return to main menu", buttonText);
    textButtonReturn.setTextBounds(0,  window.innerHeight-147, window.innerWidth,0);
    
  },

  update:function() {
      
  },

  returnBtn:function() {
    game.destroy();
    bluetoothSerial.disconnect();
    $ionicHistory.nextViewOptions({
    disableBack: true
    });
    $ionicViewSwitcher.nextDirection('back');
    $state.go('app.start');
  },

  retryGame:function() {
    playState.sfx_game.destroy();
    playState.health = 3;
    game.state.start("boot");
  },
  
};



gameoverState = {
  create:function() {
    game.stage.backgroundColor = '#4bd1db';
    
    textSuccessHeadline = this.game.add.text(0, 0, "Great!", textStyle);
    textSuccessHeadline.setTextBounds(0, 20, window.innerWidth, 20);
    
    textSuccesscontent = this.game.add.text(0, 0, "Your partner's arm muscles\nhave grown by 10%.", textStyleSmall);
    textSuccesscontent.setTextBounds(0, 100, window.innerWidth, 100);

    this.success = game.add.sprite((game.world.width/2)-295, window.innerHeight-480, 'muscleGrowth1');

    this.ButtonReturn = this.game.add.button(window.innerWidth/2, window.innerHeight-47, "button", this.returnBtn);
    this.ButtonReturn.anchor.set(0.5);
    textButtonReturn = this.game.add.text(20, 80, "Return to main menu", buttonText);
    textButtonReturn.setTextBounds(0,  window.innerHeight-147, window.innerWidth,0);

    playState.sfx_cheer.play();
    console.log('GameOver wurde ausgeführt');
    
  },

  update:function() {
      
  },


  returnBtn:function() {
    game.destroy();

    $ionicHistory.nextViewOptions({
    disableBack: true
    });
    timerArms = 0;

    $scope.updateArmScore();
    $ionicViewSwitcher.nextDirection('back');
    $state.go('app.start');
 
  },
  
};
  
  $scope.updateArmScore = function(setScoreArms) {
    $rootScope.scoreArms = getScoreArms + 1;
    window.localStorage['scoreArms'] = $rootScope.scoreArms;
    console.log("Neuer Wert:"+$rootScope.scoreArms);
    /*** TEST Nach Update der Arme die Funktion ausführen um die Arme wieder zu aktivieren  ***/
    $timeout(function() {
      timerArms = 1;
    }, 10000)
  }

  //play button
  resumeGame = function() {
    game.state.start("play");
    //this.sfx_game.resume();
  },

  switchHands = function() {
    console.log('Switch-Handsfunktin wurde aufgerufen');
    playState.level = 1;
    game.state.start("menu");
  }
  gameOver = function() {
    playState.level = 2;
    console.log('GameOver-Funktion wurde aufgerufen');
    game.state.start("gameover");
    //console.log("game over wurde ausgeführt");
  }

  gamePause = function() {
  this.sfx_game.pause();
  //console.log("wurde ausgeführt");
}

 //Spawningfunktion für Ringe
  addMore = function() {
    var x;
    var y;
    var velX;

    if (Math.random() > 1/2 ) {
      x = playState.game.width - 10;
      y = 150;
      velX = -350;
    } else {
      x = playState.game.width - 10;
      y = 350;
      velX = -350;
    };

    //Ringe
    var ring = playState.rings.create(x, y, "ring");
    playState.game.physics.enable(ring, Phaser.Physics.ARCADE);
      ring.body.velocity.x = velX;
      ring.outOfBoundsKill = true;

      ring.checkWorldBounds = true;
      ring.events.onOutOfBounds.add(missEnemy, this);
  }

  ArduinoData = function() {
    //bluetoothSerial.readUntil('\n', function (data) {
    bluetoothSerial.read(function (data) {  
      movingArduino = data;
      //console.log(data);
      movingArduino = parseInt(movingArduino);
    });
    this.moving = movingArduino;

    if (this.moving == 1)
    {   
      if (this.circle.y == 200) 
      {
        this.circle.y = 400;
      } else if (this.circle.y == 400)
      {
        this.circle.y = 200;
      }
    }
    console.log(movingArduino);
  }

  hitEnemy = function(circle, ring) {
    
      ring.kill();
      this.score = this.score + 100;
      this.sfx_hit.play();
  };

  missEnemy = function(ring) {
      ring.destroy();
      //console.log("Miss");
      playState.health = playState.health-1;
      if (playState.health === 2) {
        this.gfx_health3.kill();
        this.gfx_health3 = game.add.sprite(window.innerWidth-240, 20, 'healthLost');
      }
      if (playState.health === 1) {
        this.gfx_health2.kill();
        this.gfx_health2 = game.add.sprite(window.innerWidth-160, 20, 'healthLost');
      }
      if (playState.health === 0) {
        this.gfx_health1.kill();
        game.state.start("fail");
      }
      this.sfx_miss.play();
  }


    //game = new Phaser.Game("100%", "90%", Phaser.CANVAS, 'game');
    game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.CANVAS, 'game');
    game.state.add("load", loadState);
    game.state.add("boot", bootState);
    game.state.add("play", playState);
    game.state.add("menu", menuState);
    game.state.add("fail", failState);
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

.controller('SettingsCtrl', function($scope, $rootScope, $ionicPopup, localStorageService) {

  var macAddress = "20:13:06:18:27:38";
  
  $scope.setAdress = function(mac1, mac2, mac3, mac4, mac5, mac6) {
    tempMacAddress = mac1 + ":" + mac2 + ":" + mac3 + ":" + mac4 + ":" + mac5 + ":" + mac6;
    macAddress = tempMacAddress;
    $rootScope.macAdress = tempMacAddress;
    $scope.testMac();
    window.localStorage['macAddress'] = mac1 + ":" + mac2 + ":" + mac3 + ":" + mac4 + ":" + mac5 + ":" + mac6;
    //function getItem(key) {
      //return localStorageService.get(macAddress);
    //};
    //nocheineadresse = localStorageService.get(macAddress);
    //console.log(nocheineadresse);
  };

  $scope.resetBody = function() {
    $rootScope.scoreArms = 0;
    //resetBodyDiv.innerHTML = "You are a leek again"
    window.localStorage['scoreArms'] = $rootScope.scoreArms;
    $scope.showAlertReset();
  }

  $scope.testMac = function() {
     var alertPopup = $ionicPopup.alert({
       title: 'Done!',
       template: 'Your new MAC address is: ' + macAddress
     });
   };

  $scope.setArmsOn1 = function() {
    $rootScope.scoreArms = 1;
    window.localStorage['scoreArms'] = $rootScope.scoreArms;
    $scope.showAlertArms1();
  }

  $scope.setArmsOn2 = function() {
    $rootScope.scoreArms = 2;
    window.localStorage['scoreArms'] = $rootScope.scoreArms;
    $scope.showAlertArms2();
  }

  $scope.setArmsOn3 = function() {
    $rootScope.scoreArms = 3;
    window.localStorage['scoreArms'] = $rootScope.scoreArms;
    $scope.showAlertArms3();
  }

  $scope.showAlertReset = function() {
     var alertPopup = $ionicPopup.alert({
       title: 'Done!',
       template: 'Wutz is back to normal!'
     });
   };

  $scope.showAlertArms1 = function() {
     var alertPopup = $ionicPopup.alert({
       title: 'Done!',
       template: 'Wutz trained a little'
     });
   };

  $scope.showAlertArms2 = function() {
     var alertPopup = $ionicPopup.alert({
       title: 'Done!',
       template: 'WUTZ trained a little more!'
     });
   };

  $scope.showAlertArms3 = function() {
     var alertPopup = $ionicPopup.alert({
       title: 'Done!',
       template: 'WUTZ trained a lot!'
     });
   };

  
})

.controller('SpotifyCtrl', function($scope, Spotify, $rootScope, localStorageService) {
  //access token 
  /*Spotify
  .getPlaylist('bastibastek', '25PAIlZRfztr8P43kEdbEZ')
  .then(function (data) {
    console.log(data);

    arrayLength = data.tracks.items.length;
    for (i = 0; i < arrayLength; i++) {
      //track = data.tracks.items[i];
      resultDiv.innerHTML = resultDiv.innerHTML + '<a class="item item-thumbnail-left" href="#">' + '<img class="albumimg" src="' + data.tracks.items[i].track.album.images[1].url + '"><h2 class="musicinfo">' + data.tracks.items[i].track.artists[0].name + '</h2>' + '<p>' + data.tracks.items[i].track.name + '</p>' + '</a>';
    }
    
  });
  */
})

.controller('ImpressumCtrl', function($scope, Spotify) {
  


});



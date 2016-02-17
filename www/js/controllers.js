angular.module('starter.controllers', [])

.controller('StartCtrl', function($scope) {})

.controller('GameCtrl', function($scope) {})

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

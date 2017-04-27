angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('CameraCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };

  console.log("hello");

  function setOptions(srcType) {
      var options = {
          // Some common settings are 20, 50, and 100
          quality: 50,
          destinationType: Camera.DestinationType.FILE_URI,
          // In this app, dynamically set the picture source, Camera or photo gallery
          sourceType: srcType,
          encodingType: Camera.EncodingType.JPEG,
          mediaType: Camera.MediaType.PICTURE,
          allowEdit: true,
          correctOrientation: true  //Corrects Android orientation quirks
      }
      return options;
  }

  function openFilePicker(selection) {

      console.log("define ?")
      var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
      console.log("pas define")
      var options = setOptions(srcType);
      var func = createNewFileEntry;

      console.log("tj ok")
      navigator.camera.getPicture(function cameraSuccess(imageUri) {

          // Do something

      }, function cameraError(error) {
          console.debug("Unable to obtain picture: " + error, "app");

      }, options);
  }

  console.log("camera", Camera);
  console.log("chargement ok");

  openFilePicker();
  alert("WIN");

});



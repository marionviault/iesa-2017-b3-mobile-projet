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

   $scope.chats.forEach(function(element) {
     var fields       = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
     var options      = new ContactFindOptions();
     options.filter   = element.name;
     options.multiple = false;
     options.desiredFields = [navigator.contacts.fieldType.id];
     options.hasPhoneNumber = true;

      navigator.contacts.find(fields, function(contacts){
         if(contacts.length > 0) $scope.chats[element.id].isContact = "oui";
      }, function(){
            alert("une erreur s'est produite")
      }, options);
   });


  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
  $scope.chats = Chats.all();


   var fields       = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
   var options      = new ContactFindOptions();
   options.filter   = $scope.chat.name;
   options.multiple = false;
   options.desiredFields = [navigator.contacts.fieldType.id];
   options.hasPhoneNumber = true;


    navigator.contacts.find(fields, function(contacts){
       if(contacts.length > 0) $scope.chats[$scope.chat.id].isContact = "oui";
    }, function(){
          alert("une erreur s'est produite")
    }, options);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };

  $scope.select = function(picture) {
      for(i=1; i<=4; i++){
          document.getElementById("img"+i).className = "";
      }
      document.getElementById("img"+picture).className = "selected";

      window.localStorage.setItem("stockageImage", picture);
  };

  $scope.saveProfil = function($scope) {
      var pseudo = document.getElementById("profilPseudo").value;
      var image = window.localStorage.getItem("stockageImage");
      window.localStorage.setItem("stockagePseudo", pseudo);

      document.getElementById("nameuser").innerHTML = pseudo;
      document.getElementById("userimg").src = "img/"+image+".png";
  };

  var pseudo = window.localStorage.getItem("stockagePseudo");
  if(pseudo) document.getElementById("profilPseudo").value = pseudo;

  var image = window.localStorage.getItem("stockageImage");
  document.getElementById("img"+image).className = "selected";

})

.controller('CameraCtrl', function($scope, Chats) {

    $scope.chats = Chats.all();
    $scope.actual = "nobody";

     $scope.check = function(idChat) {
          $scope.chats.forEach(function(element) {
              $scope.chats[element.id].check = false;
          });
          $scope.chats[idChat].check = !$scope.chats[idChat].check;
          $scope.actual = $scope.chats[idChat].name;
     };

    $scope.cameraLaunch = function() {
        openFilePicker();
    };

    $scope.cameraClose = function() {
        document.getElementById("send-img").innerHTML = "";
        document.getElementById("close-img").style.display = "none";
    };

    $scope.cameraSend = function() {

        alert("Votre image a bien été envoyée à "+$scope.actual);
        var storageRef = firebase.storage().ref();
        var imgSave = document.getElementById("saveImgName").value;
        var newSchmRef = storageRef.child(imgSave);
        var schmNameTxt = document.getElementById('cameratext').value;
        var pseudo = window.localStorage.getItem("stockagePseudo");

        newSchmRef.getDownloadURL().then(function (url) {
            addSchm(Date.now(), schmNameTxt, url, pseudo, $scope.actual);
        }).catch(function (error) {
            console.log(erreur);
        });

        document.getElementById("send-img").innerHTML = "";
        document.getElementById("close-img").style.display = "none";
        document.getElementById("cameratext").value = "";
        document.getElementById("saveImgName").value = "";
        
    };
})

.controller('GeolocationCtrl', function($scope) {

});



document.addEventListener("deviceready", whenLoaded, false);
function whenLoaded() {

  StatusBar.hide();

  var image = window.localStorage.getItem("stockageImage");
  if(image.length <= 0){
      image = 1;
      window.localStorage.setItem("stockageImage", "1");
  }

  var pseudo = window.localStorage.getItem("stockagePseudo");
  if(pseudo.length <= 0){
      window.localStorage.setItem("stockagePseudo", "user");
      pseudo = user;
  }

  document.getElementById("userimg").src = "img/"+image+".png";
  document.getElementById("nameuser").innerHTML = pseudo;


  function onSuccess(heading) {
     //alert("heading :" +heading.magneticHeading);
     if(heading.magneticHeading == 1){
        document.getElementById("send-img").style.opacity = "0.5";
     }
     else document.getElementById("send-img").style.opacity = "1";
  };

  function onError(compassError) {
     console.log('Compass error: ' + compassError.code);
  };

  var options = {
      frequency: 3000
  };

  var watchID = navigator.compass.watchHeading(onSuccess, onError, options);

}

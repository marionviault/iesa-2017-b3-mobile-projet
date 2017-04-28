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
})

.controller('CameraCtrl', function($scope, Chats) {

    $scope.chats =  Chats.all();

     $scope.check = function(idChat) {
          $scope.chats[idChat].check = !$scope.chats[idChat].check;
     };


    $scope.cameraLaunch = function($scope) {
        openFilePicker();
    };

    $scope.cameraClose = function() {
        document.getElementById("send-img").innerHTML = "";
        document.getElementById("close-img").style.display = "none";
    };

    $scope.cameraSend = function($scope) {
        alert("votre image a bien été envoyée");
        document.getElementById("send-img").innerHTML = "";
        document.getElementById("close-img").style.display = "none";
        document.getElementById("cameratext").value = "";
    };

})

.controller('GeolocationCtrl', function($scope) {

  function onSuccess(position) {


      var region = document.getElementById('region');
            var title = document.getElementById('title');
            var description = document.getElementById('description');

var radiusmoreildefrance = '48.90';
var radiuslessildefrance = '48.75';

    var radiusmorebretagne = '48.90';
    var radiuslessbretagne = '48.75';
    position.coords.accuracy < 5;
      if(position.coords.latitude < radiusmoreildefrance && position.coords.latitudeildefrance > radiuslessildefrance){
        var region = document.getElementById('region');
        var title = document.getElementById('title');
        var description = document.getElementById('description');
          title.innerHTML = 'Nourriture' + title.innerHTML;
          description.innerHTML = 'langouste à la parisienne' + description.innerHTML;
          region.innerHTML = 'Ile de France' + region.innerHTML;
       }else if(position.coords.latitude < radiusmorebretagne && position.coords.latitude > radiuslessbretagne){
                     var region = document.getElementById('region');
                     var title = document.getElementById('title');
                     var description = document.getElementById('description');
                       title.innerHTML = 'Nourriture' + title.innerHTML;
                       description.innerHTML = 'Crepes au caramel beurre salé' + description.innerHTML;
                       region.innerHTML = 'Bretagne' + region.innerHTML;
       }else{
           title.innerHTML = 'Position introuvable' + title.innerHTML;
       }
       console.log(position.coords.latitude,position.coords.longitude,position.coords.accuracy,position.coords.altitude);
    }
          function onError(error) {
              alert('code: '    + error.code    + '\n' +
                    'message: ' + error.message + '\n');
          }

         navigator.geolocation.getCurrentPosition(onSuccess, onError);

});

document.addEventListener("deviceready", whenLoaded, false);
function whenLoaded() {

 /* function onSuccess(heading) {
     // alert("changement !");
  };

  function onError(compassError) {
     // alert('Compass error: ' + compassError.code);
  };

  var options = {
      frequency: 1000
  };*/

 // var watchID = navigator.compass.watchHeading(onSuccess, onError, options);


  function onSuccess(heading) {
        //alert('Heading: ' + heading.magneticHeading);
    };

    function onError(error) {
        //alert('CompassError: ' + error.code);
    };

    navigator.compass.getCurrentHeading(onSuccess, onError);

}


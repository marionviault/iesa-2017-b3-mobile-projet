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
      $.get( "http://maps.googleapis.com/maps/api/geocode/json?latlng="+position.coords.latitude+","+position.coords.longitude, function( data ) {
            console.log(data);
            console.log(data.results[6].address_components[0].long_name);

            var dataRegion = data.results[6].address_components[0].long_name;
            var region = document.getElementById('region');
            var title = document.getElementById('title');
            var description = document.getElementById('description');

            if(dataRegion == "Île-de-France"){

                title.innerHTML = 'Nourriture' + title.innerHTML;
                description.innerHTML = 'langouste à la parisienne' + description.innerHTML;
                region.innerHTML = dataRegion;

            }else if(dataRegion == "Bretagne"){

               title.innerHTML = 'Nourriture' + title.innerHTML;
               description.innerHTML = 'Crepes au caramel beurre salé' + description.innerHTML;
               region.innerHTML = dataRegion;

             }else{

                 description.innerHTML = 'Aucune thématique est disponible pour cette région' + description.innerHTML;
                 region.innerHTML = dataRegion;
             }

             console.log(position.coords.latitude,position.coords.longitude,position.coords.accuracy,position.coords.altitude);

      });
  }
  function onError(error) {
      alert('code: '    + error.code    + '\n' +
           'message: ' + error.message + '\n');
   }

         navigator.geolocation.getCurrentPosition(onSuccess, onError);

});

document.addEventListener("deviceready", whenLoaded, false);
function whenLoaded() {

  // function onSuccess(heading) {
  //     alert('Heading: ' + heading.magneticHeading)
  // };

  // function onError(compassError) {
  //     alert('Compass error: ' + compassError.code);
  // };

  // var options = {
  //     frequency: 1000
  // }; // Update every 3 seconds

  // var watchID = navigator.compass.watchHeading(compassSuccess, compassError, options);

  // alert('yo : ' + navigator.compass);

  function onSuccess(heading) {
      alert('Heading: ' + heading.magneticHeading);
  };

  function onError(error) {
      alert('CompassError: ' + error.code);
  };

  navigator.compass.getCurrentHeading(onSuccess, onError);

}


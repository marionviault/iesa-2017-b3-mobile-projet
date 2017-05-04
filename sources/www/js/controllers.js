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

  function onSuccessGeo(position) {

      $.get( "http://maps.googleapis.com/maps/api/geocode/json?latlng="+position.coords.latitude+","+position.coords.longitude, function( data ) {
            console.log(data);
            console.log(data.results[6].address_components[0].long_name);

            var dataRegion = data.results[6].address_components[0].long_name;
            var region = document.getElementById('region');
            var title = document.getElementById('title');
            var description = document.getElementById('description');

            switch (dataRegion) {
              case "Île-de-France":

                title.innerHTML = 'Plats' + title.innerHTML;
                description.innerHTML = '<img src="http://www.toutlevin.com/uploads/dish/langouste-mayonnaise-big.jpg" alt="langouste à la parisienne" width="300px"/>' + description.innerHTML;
                region.innerHTML = dataRegion;
              break;
              case "Bretagne":

               title.innerHTML = 'Plats' + title.innerHTML;
               description.innerHTML = '<img src="https://kiwings-images-prod.s3-eu-west-1.amazonaws.com/recipes/527a206fb1045.jpeg" alt="langouste à la parisienne" width="300px"/>' + description.innerHTML;
               region.innerHTML = dataRegion;
              break;
              case "Provence-Alpes-Côte d'Azur":

               title.innerHTML = 'Plats' + title.innerHTML;
               description.innerHTML = '<img src="http://www.bestcharmingbnb.com/tables-hote/gastronomie-provence-alpes-cote-dazur/legumes-grilles-gastronomie-provence-alpes-cote-d-azur-4.jpg" alt="langouste à la parisienne" width="300px"/>' + description.innerHTML;
               region.innerHTML = dataRegion;
              break;
              default:
                 description.innerHTML = 'Aucune thématique est disponible pour cette région' + description.innerHTML;
                 region.innerHTML = dataRegion;
             }

             console.log(position.coords.latitude,position.coords.longitude,position.coords.accuracy,position.coords.altitude);

      });
  }
  function onErrorGeo(error) {
      alert('code: '    + error.code    + '\n' +
           'message: ' + error.message + '\n');
   }

  document.addEventListener("deviceready", getGeoloc, false);
  function getGeoloc() {
      navigator.geolocation.getCurrentPosition(onSuccessGeo, onErrorGeo);
  }

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

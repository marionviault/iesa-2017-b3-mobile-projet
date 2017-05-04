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

  console.log('test');

    var getJSON = function(url, successHandler, errorHandler) {
      var xhr = typeof XMLHttpRequest != 'undefined'
        ? new XMLHttpRequest()
        : new ActiveXObject('Microsoft.XMLHTTP');
      xhr.open('get', url, true);
      xhr.responseType = 'json';
      xhr.onreadystatechange = function() {
        var status;
        var data;
        // https://xhr.spec.whatwg.org/#dom-xmlhttprequest-readystate
        if (xhr.readyState == 4) { // `DONE`
          status = xhr.status;
          if (status == 200) {
            successHandler && successHandler(xhr.response);
          } else {
            errorHandler && errorHandler(status);
          }
        }
      };
      xhr.send();
    };

    getJSON("http://maps.googleapis.com/maps/api/geocode/json?latlng="+position.coords.latitude+","+position.coords.longitude, function( data ) {
            var dataRegion = data.results[6].address_components[0].long_name;
            console.log(dataRegion);
            console.log(data.results[6].address_components[0].long_name);

            var dataRegion = data.results[6].address_components[0].long_name;
            console.log(dataRegion);
            var region = document.getElementById('region');
            var title = document.getElementById('title');
            var description = document.getElementById('description');

            switch (dataRegion) {

              case "Centre-Val de Loire":
               title.innerHTML = 'Villes' + title.innerHTML;
               description.innerHTML = '<img src="http://www.fugue-varennes.com/wp-content/uploads/sancerre-accueil.jpg" alt="langouste à la parisienne" width="300px"/>' + description.innerHTML;
               region.innerHTML = dataRegion;
              break;

              case "Corse":
               title.innerHTML = 'Plats' + title.innerHTML;
               description.innerHTML = '<img src="https://kiwings-images-prod.s3-eu-west-1.amazonaws.com/recipes/527a206fb1045.jpeg" alt="langouste à la parisienne" width="300px"/>' + description.innerHTML;
               region.innerHTML = dataRegion;
              break;

              case "Occitanie":
               title.innerHTML = 'Villes' + title.innerHTML;
               description.innerHTML = '<img src="http://www.herault-tourisme.com/docs/1770-12-sete-en-pays-de-thau-herault-le-languedoc.jpg" alt="ville" width="300px"/>' + description.innerHTML;
               region.innerHTML = dataRegion;
              break;

              case "Hauts-de-France":
                title.innerHTML = 'Fromages' + title.innerHTML;
                description.innerHTML = '<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Maroilles_%28cheese%29.jpg/1200px-Maroilles_%28cheese%29.jpg" alt="fromages" width="300px"/>' + description.innerHTML;
                region.innerHTML = dataRegion;
              break;

              case "Grand Est":
                title.innerHTML = 'Monuments' + title.innerHTML;
                description.innerHTML = '<img src="http://www.meteocity.com/medias/gallery/large/france/REG23/DPTM68/abbaye-murbach.jpg" alt="abbaye-murbach" width="300px"/>' + description.innerHTML;
                region.innerHTML = dataRegion;
              break;

              case "Nouvelle-Aquitaine":
               title.innerHTML = 'Plats' + title.innerHTML;
               description.innerHTML = '<img src="https://kiwings-images-prod.s3-eu-west-1.amazonaws.com/recipes/527a206fb1045.jpeg" alt="langouste à la parisienne" width="300px"/>' + description.innerHTML;
               region.innerHTML = dataRegion;
              break;

              case "Auvergne-Rhône-Alpes":
               title.innerHTML = 'Chaîne de montagnes' + title.innerHTML;
               description.innerHTML = '<img src="http://www.auvergnerhonealpes.fr/uploads/Image/c2/IMF_100/GAB_CRRAA/108_718_Photo-d-un-lac-de-montagne-Tignes-en-Savoie.jpg" alt="chaine de montagnes" width="300px"/>' + description.innerHTML;
               region.innerHTML = dataRegion;
              break;

              case "Bourgogne-Franche-Comté":
               title.innerHTML = 'Chateaux' + title.innerHTML;
               description.innerHTML = '<img src="http://www.groupe-mercure.fr/images/regions/bourgogne-franche-comte/slideshow/Ch_teau_du_Clos_Vougeot_Bourgogne.jpg" alt="langouste à la parisienne" width="300px"/>' + description.innerHTML;
               region.innerHTML = dataRegion;
              break;

              case "Île-de-France":
                title.innerHTML = 'Monuments' + title.innerHTML;
                description.innerHTML = '<img src="http://monumentsdeparis.net/content/tour-eiffel.jpg" alt="tour eiffel" width="300px"/>' + description.innerHTML;
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

              case "Normandie":
               title.innerHTML = 'Plats' + title.innerHTML;
               description.innerHTML = '<img src="http://www.bestcharmingbnb.com/tables-hote/gastronomie-provence-alpes-cote-dazur/legumes-grilles-gastronomie-provence-alpes-cote-d-azur-4.jpg" alt="langouste à la parisienne" width="300px"/>' + description.innerHTML;
               region.innerHTML = dataRegion;
              break;

               case "Pays de la Loire":
                title.innerHTML = 'Plats' + title.innerHTML;
                description.innerHTML = '<img src="http://www.bestcharmingbnb.com/tables-hote/gastronomie-provence-alpes-cote-dazur/legumes-grilles-gastronomie-provence-alpes-cote-d-azur-4.jpg" alt="langouste à la parisienne" width="300px"/>' + description.innerHTML;
                region.innerHTML = dataRegion;
               break;

              default:
                 description.innerHTML = 'Aucune thématique est disponible pour cette région' + description.innerHTML;
             }
    }, function(status) {
        function onErrorGeo(error) {
              alert('code: '    + error.code    + '\n' +
                   'message: ' + error.message + '\n');
           }
          navigator.geolocation.getCurrentPosition(onSuccessGeo, onErrorGeo);
    });
    function onErrorGeo(error) {
                  alert('code: '    + error.code    + '\n' +
                       'message: ' + error.message + '\n');
               }
              navigator.geolocation.getCurrentPosition(onSuccessGeo, onErrorGeo);

  }
  function onErrorGeo(error) {
      alert('code: '    + error.code    + '\n' +
           'message: ' + error.message + '\n');
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

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

  function openFilePicker() {

    var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
    var options = setOptions(srcType);


      navigator.camera.getPicture(function cameraSuccess(imageUri) {
      alert(imageUri);
      document.getElementById("send-img").innerHTML = "<h3>Ma photo :</h3><img src='"+imageUri+"' style='width:70%;display:block;margin:auto;' />";
      document.getElementById("close-img").style.display = "block";
    }, function cameraError(error) {
     console.log("Une erreur s'est produite.");
     console.log(error);
    }, options);
  }



function onSuccessGeo(position) {

      $.get( "http://maps.googleapis.com/maps/api/geocode/json?latlng="+position.coords.latitude+","+position.coords.longitude, function( data ) {
            console.log(data);
            console.log(data.results[6].address_components[0].long_name);

            var dataRegion = data.results[6].address_components[0].long_name;
            console.log(dataRegion);
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

function sendValueGeoloc(){

  var latitudeGeoloc = document.getElementById('latitudeGeoloc').value;
  var longitudeGeoloc = document.getElementById('longitudeGeoloc').value;

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

  getJSON("http://maps.googleapis.com/maps/api/geocode/json?latlng="+latitudeGeoloc+","+longitudeGeoloc, function(data) {
  var dataRegion = data.results[0].address_components[4].long_name;
                console.log(dataRegion);
    document.getElementById("newregion").innerHTML = dataRegion;
            console.log(latitudeGeoloc, longitudeGeoloc);
  }, function(status) {
    document.getElementById("newregion").innerHTML = dataRegion;
            console.log(latitudeGeoloc, longitudeGeoloc);
  });

}

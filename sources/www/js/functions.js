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


    function enviarFirebase(file, nombre) {
    var storageRef = firebase.storage().ref();
    var uploadTask = storageRef.child('images/' + nombre).put(file);
    uploadTask.on('state_changed', function (snapshot) {
        alert(snapshot);
    }, function (error) {
        alert(error);
    }, function () {
        var downloadURL = uploadTask.snapshot.downloadURL;
        alert(downloadURL);
    });
}

  function openFilePicker() {

    var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
    var options = setOptions(srcType);

    navigator.camera.getPicture(function cameraSuccess(imageUri) {
    document.getElementById("send-img").innerHTML = "<h3>Ma photo :</h3><img src='"+imageUri+"' style='width:70%;display:block;margin:auto;' />";
    document.getElementById("close-img").style.display = "block";

    var storageRef = firebase.storage().ref();

    var getFileBlob = function(url, cb) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.responseType = "blob";
        xhr.addEventListener('load', function() {
            cb(xhr.response);
        });
        xhr.send();
    };

    var blobToFile = function(blob, name) {
        blob.lastModifiedDate = new Date();
        blob.name = name;
        return blob;
    };

   var directorioFuente = imageUri.substring(0, imageUri.lastIndexOf('/') + 1),
        archivoFuente = imageUri.substring(imageUri.lastIndexOf('/') + 1, imageUri.length),
        nombreParaGuardar = new Date().valueOf() + archivoFuente;


    var getFileObject = function(filePathOrUrl, cb) {
        getFileBlob(filePathOrUrl, function(blob) {

           
            console.log(nombreParaGuardar);
            cb(blobToFile(blob, nombreParaGuardar));
        });
    };

    getFileObject(imageUri, function(fileObject) {
        var uploadTask = storageRef.child('Schm/'+nombreParaGuardar).put(fileObject);

        uploadTask.on('state_changed', function(snapshot) {
            console.log(snapshot);
        }, function(error) {
            console.log(error);
        }, function() {
            var downloadURL = uploadTask.snapshot.downloadURL;
            console.log(downloadURL);
            // handle image here
        });
    });



    }, function cameraError(error) {
     alert("Une erreur s'est produite.");
     alert(error);
    }, options);


    

      // var storage = firebase.storage();
      // var storageRef = storage.ref();
      // var newSchmRef = storageRef.child('Schm/newSchm.jpg');

      // ref.put(imageUri).then(function(snapshot) {
      // });

      // newSchmRef.getDownloadURL().then(function (url) {

      //   addSchm("1", "banane", url, "Tomtom", "Floflo");

      // }).catch(function (error) {
      // });
  }


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


function sendValueGeoloc(){


  var latitudeGeoloc = document.getElementById('latitudeGeoloc').value;
  var longitudeGeoloc = document.getElementById('longitudeGeoloc').value;


  getJSON("http://maps.googleapis.com/maps/api/geocode/json?latlng="+latitudeGeoloc+","+longitudeGeoloc, function(data) {

  var dataRegion = data.results[4].address_components[0].long_name;
                console.log(dataRegion);
            document.getElementById("newregion").innerHTML = dataRegion;
            console.log(latitudeGeoloc, longitudeGeoloc);
            var region = document.getElementById('region');
            var title = document.getElementById('title');
            var description = document.getElementById('description');

            switch (dataRegion) {

              case "Centre-Val de Loire":
               title.innerHTML = 'Villes';
               description.replace = '<img src="http://www.fugue-varennes.com/wp-content/uploads/sancerre-accueil.jpg" alt="langouste à la parisienne" width="300px"/>';
               region.replace = dataRegion;
              break;

              case "Corse":
               title.innerHTML = 'Plats';
               description.innerHTML = '<img src="https://kiwings-images-prod.s3-eu-west-1.amazonaws.com/recipes/527a206fb1045.jpeg" alt="langouste à la parisienne" width="100%"/>';
               region.innerHTML = dataRegion;
              break;

              case "Occitanie":
               title.innerHTML = 'Villes';
               description.innerHTML = '<img src="http://www.herault-tourisme.com/docs/1770-12-sete-en-pays-de-thau-herault-le-languedoc.jpg" alt="ville" width="100%"/>';
               region.innerHTML = dataRegion;
              break;

              case "Hauts-de-France":
                title.innerHTML = 'Fromages';
                description.innerHTML = '<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Maroilles_%28cheese%29.jpg/1200px-Maroilles_%28cheese%29.jpg" alt="fromages" width="100%"/>';
                region.innerHTML = dataRegion;
              break;

              case "Grand Est":
                title.innerHTML = 'Monuments';
                description.innerHTML = '<img src="http://www.meteocity.com/medias/gallery/large/france/REG23/DPTM68/abbaye-murbach.jpg" alt="abbaye-murbach" width="100%"/>';
                region.innerHTML = dataRegion;
              break;

              case "Nouvelle-Aquitaine":
               title.innerHTML = 'Plats';
               description.innerHTML = '<img src="https://kiwings-images-prod.s3-eu-west-1.amazonaws.com/recipes/527a206fb1045.jpeg" alt="langouste à la parisienne" width="100%"/>';
               region.innerHTML = dataRegion;
              break;

              case "Auvergne-Rhône-Alpes":
               title.innerHTML = 'Chaîne de montagnes';
               description.innerHTML = '<img src="http://www.auvergnerhonealpes.fr/uploads/Image/c2/IMF_100/GAB_CRRAA/108_718_Photo-d-un-lac-de-montagne-Tignes-en-Savoie.jpg" alt="chaine de montagnes" width="100%"/>';
               region.innerHTML = dataRegion;
              break;

              case "Bourgogne-Franche-Comté":
               title.innerHTML = 'Chateaux';
               description.innerHTML = '<img src="http://www.groupe-mercure.fr/images/regions/bourgogne-franche-comte/slideshow/Ch_teau_du_Clos_Vougeot_Bourgogne.jpg" alt="langouste à la parisienne" width="100%"/>';
               region.innerHTML = dataRegion;
              break;

              case "Île-de-France":
                title.innerHTML = 'Monuments';
                description.innerHTML = '<img src="http://monumentsdeparis.net/content/tour-eiffel.jpg" alt="tour eiffel" width="100%"/>';
                region.innerHTML = dataRegion;
              break;

              case "Bretagne":
               title.innerHTML = 'Plats';
               description.innerHTML = '<img src="https://kiwings-images-prod.s3-eu-west-1.amazonaws.com/recipes/527a206fb1045.jpeg" alt="langouste à la parisienne" width="100%"/>';
               region.innerHTML = dataRegion;
              break;

              case "Provence-Alpes-Côte d'Azur":
               title.innerHTML = 'Plats';
               description.innerHTML = '<img src="http://www.bestcharmingbnb.com/tables-hote/gastronomie-provence-alpes-cote-dazur/legumes-grilles-gastronomie-provence-alpes-cote-d-azur-4.jpg" alt="langouste à la parisienne" width="100%"/>';
               region.innerHTML = dataRegion;
              break;

              case "Normandie":
               title.innerHTML = 'Plats';
               description.innerHTML = '<img src="http://www.bestcharmingbnb.com/tables-hote/gastronomie-provence-alpes-cote-dazur/legumes-grilles-gastronomie-provence-alpes-cote-d-azur-4.jpg" alt="langouste à la parisienne" width="100%"/>';
               region.innerHTML = dataRegion;
              break;

               case "Pays de la Loire":
                title.innerHTML = 'Plats';
                description.innerHTML = '<img src="http://www.bestcharmingbnb.com/tables-hote/gastronomie-provence-alpes-cote-dazur/legumes-grilles-gastronomie-provence-alpes-cote-d-azur-4.jpg" alt="langouste à la parisienne" width="100%"/>';
                region.innerHTML = dataRegion;
               break;

              default:
                 description.innerHTML = 'Aucune thématique est disponible pour cette région';
                 region.innerHTML = dataRegion;
             }
  }, function(status) {
            alert(status);
  });

}

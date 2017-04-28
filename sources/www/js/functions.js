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
      document.getElementById("send-img").innerHTML = "<h3>Ma photo :</h3><img src='"+imageUri+"' style='width:70%;display:block;margin:auto;' />";
      document.getElementById("close-img").style.display = "block";
    }, function cameraError(error) {
     console.log("Une erreur s'est produite.");
     console.log(error);
    }, options);
  }


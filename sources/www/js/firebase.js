// Initialize Firebase
var config = {
apiKey: "AIzaSyBVbk8yUqDuVDuesu4FKVC_l_gjTBrcSeg",
authDomain: "schmilblick-29091.firebaseapp.com",
databaseURL: "https://schmilblick-29091.firebaseio.com",
projectId: "schmilblick-29091",
storageBucket: "schmilblick-29091.appspot.com",
messagingSenderId: "1007660929860"
};
firebase.initializeApp(config);

var storage = firebase.storage();
var storageRef = storage.ref();

function addSchm(schmId, schmName, schmImage, schmFrom, schmTo) {
    firebase.database().ref('Schm/' + schmId).set({
        schmId: schmId,
        schmName: schmName,
        schmImage: schmImage,
        schmFrom: schmFrom,
        schmTo: schmTo
    });
}
// var schmImage1 = storageRef.child('Schm/banana-close-spotted.jpg').fullPath;

// addSchm("1", "banane", schmImage1, "Tomtom", "Floflo");


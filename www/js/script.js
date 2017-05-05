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

function showSchms() {
    $('.schms').html('');
    let schms = firebase.database().ref('Schm/');
    schms.on('value', function (snapshot) {

        //console.log(snapshot.val());

        let contents = [];

        for (let entityId in snapshot.val()) {
            let content = snapshot.val()[entityId];
            contents.push(content);
        }

        // let end = contents.length;
        // if (end < 6){
        //     var start = 0;
        // } else {
        //     var start = Math.floor(end - 6);
        // }
        // var newContents = contents.slice( start, end );

        $.each(contents, function() {
            //console.log(contents[i].comment);
            $('.schms').prepend('<div class="schm" id="' + this.schmId + '"><div class="schmFrom">From : ' + this.schmFrom + '</div><div clqss="schmTo">To : ' + this.schmTo + '</div><div class="schmImg" style="background-image:url(' + this.schmImage + ');"></div></div>');
        })
    });
}

showSchms();



















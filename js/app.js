console.log("In1");

var userEmail = "";
var password = "";

function initMap() {

    var theLat = 34.01839828491211;
    var theLong = -118.48661041259766;

    var uluru = {
        lat: theLat,
        lng: theLong
    };

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: uluru
    });

    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
}

$("#btn-add").on("click", function(event) {

    function validateEmail(e) {
        var re = /\S+@\S+\.\S+/;
        return re.test(e);
        userSignUp(event);
    }

});

$("form").on("keypress", function(event) {
    if (event.which == 13) {
        console.log("Enter!")
        userSignUp(event);
    }
});

var userSignUp = function(event) {

    // prevent page reload
    event.preventDefault;
    // store input data
    userEmail = $("#user-email").val();
    password = $("#user-password").val().trim();


    console.log("User: " + userEmail + " Password: " + password);


    // reset form
    $("#user-email").val("");
    $("#user-password").val("");

    firebase.auth().createUserWithEmailAndPassword(userEmail, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });

};
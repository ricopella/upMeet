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
    userSignUp(event);
});

$("#create-form").on("keypress", function(event) {
    if (event.which == 13) {
        console.log("Enter!")
        userSignUp(event);
    }
});

$("#btn-login").on("click", function(event) {
    userLogin(event);
});

$("#login-form").on("keypress", function(event) {
    if (event.which == 13) {
        console.log("Enter!")
        userLogin(event);
    }
});

var userSignUp = function(event) {

    // prevent page reload
    event.preventDefault;
    // store input data
    userEmail = $("#user-email").val();
    password = $("#user-password").val().trim();


    console.log("User: " + userEmail + " Password: " + password);

    // email must be > 4
    if (userEmail.length < 4) {
        alert("Please enter an email address.");
        return;
    }
    // password must be > 4
    if (password.length < 4) {
        alert("Please enter a password.");
        return;
    }
    // IF email & password are valid, create user
    firebase.auth().createUserWithEmailAndPassword(userEmail, password).catch(function(error) {
        // Handle Errors
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        if (errorCode == 'auth/week-password') {
            alert("The password is too weak.");
        } else {
            alert(errorMessage);
        }
        console.log(error);
    }); // end createUserWithEmailAndPassword

    // reset form
    $("#user-email").val("");
    $("#user-password").val("");

}; // end userSignUp

var userLogin = function(event) {
    // prevent page reload
    event.preventDefault;
    currentUser = $("#user-name").val();
    userPassword = $("#current-password").val();

    firebase.auth().signInWithEmailAndPassword(currentUser, userPassword).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });


};
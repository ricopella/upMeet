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
} // end initMap

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
    console.log("reached me!");
    // prevent page reload
    event.preventDefault;
    userEmail = $("#user-name").val();
    password = $("#current-password").val();

    if (firebase.auth().currentUser) {
        // start signout
        firebase.auth().signOut();
        // end signout
    } else {
        if (userEmail.length < 4) {
            alert("Please enter an email address.");
            return;
        }
        if (password.length < 4) {
            alert("Please enter a password.");
            return;
        }
    }
    // sign in with email & pasword
    firebase.auth().signInWithEmailAndPassword(userEmail, password).catch(function(error) {
        console.log("User: " + userEmail + " Password: " + password);
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
        } else {
            alert(errorMessage);
        }
        console.log(error);
        // disable / hide login ***
        console.log("successful login!");
    });
    // reset form
    $("#user-name").val("");
    $("#current-password").val("");

}; // end userLogin

// handles event listeners & registering Firebase authlisteners
var initApp = function() {
    // listens for changes to auth (login / sign ou)
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // user is signed in
            var email = user.email;
            console.log("Signed In!");
            // CREATE SIGNOUT BUTTON ***
        } else {
            // user is signed out
            console.log("Signed out!");
            // CREATE SIGNED IN BUTTON ***
        }
    });
    //  EVENT LISTENERS

    // submit button on Sign-Up
    $("#btn-add").on("click", function(event) {
        userSignUp(event);
    });

    // enter key on Sign-up
    $("#create-form").on("keypress", function(event) {
        if (event.which == 13) {
            console.log("Enter!")
            userSignUp(event);
        }
    });

    // submit button on Login
    $("#btn-login").on("click", function(event) {
        console.log("Entered on Form!");
        userLogin(event);
    });

    // enter key on login
    $("#login-form").on("keypress", function(event) {
        if (event.which == 13) {
            console.log("Enter on form!");
            userLogin(event);
        }
    });
}

window.onload = function() {
    initApp();
};
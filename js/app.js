console.log("In1");

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

var userSubject;
var userAddress;
var userDate;
var userTime;

// Click event for to render data to accordian
$("#user-submit").on("click", function() {
    userSubject = $("#user-subject").val().trim();
    userAddress = $("#user-address").val().trim();
    userDate = $("#user-date").val().trim();
    userTime = $("#user-time").val().trim();
    // CONVERT userDate & userTime to one UNIX number
});
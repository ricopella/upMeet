console.log("app.js Loaded");

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

var search;
var lat;
var lon;

// User submits form for query data
// stores data for use in other functions
$("#user-submit").on("click", function() {
    search = $("#search-subject").val();
    lat = $("#search-lat").val();
    lon = $("#search-lon").val();

    // CONVERT userDate & userTime to one UNIX number


    // run searchAPI
    searchAPIS(search, lat, lon);
    // run updatePage
    updatePage(meetupResponse);
});
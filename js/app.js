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

// User submits form for query data
// stores data for use in other functions
// $("#user-submit").on("click", function() {
//     var search = $("#search-subject").val();
//     var address = $("#search-address").val()
//     geocodeAddress(geocoder, address, function() {
//         console.log('first func ran!');
//         searchAPIS(search, lat, lng, function() {
//             console.log('Second func ran!');
//             updatePage(meetupResponse);
//             console.log('Third func ran!');
//         });
//     });
// });

// Timeouts
// $("#user-submit").on("click", function() {
//     var search = $("#search-subject").val();
//     var address = $("#search-address").val();
//     // setTimeout(geocodeAddress(geocoder, address), 10);
//     searchAPIS(search, 34.0183982849121, -118.48661041259766);
//     setTimeout(updatePage(meetupResponse), 10000);
// })

// chaining
$("#user-submit").on("click", function() {
    var address = $("#search-address").val();
    geocodeAddress(geocoder, address);
})
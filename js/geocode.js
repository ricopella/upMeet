var geocoder;
var map;
var address;
var lat;
var lng;

function geocodeAddress(geocoder, userInput) {
    geocoder = new google.maps.Geocoder();
    address = userInput;
    geocoder.geocode({ 'address': address }, function(results, status) {
        if (status === 'OK') {
            lat = results[0].geometry.location.lat();
            lng = results[0].geometry.location.lng();
            console.log("address: " + address + " lat: " + lat + " lng: " + lng);
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}
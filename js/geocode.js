  console.log("geocode");

  var geocoder = new google.maps.Geocoder();
  var map;
  var address;

  function geocodeAddress(geocoder, userInput) {
      var address = userInput;
      geocoder.geocode({ 'address': address }, function(results, status) {
          if (status === 'OK') {
              console.log(results[0].geometry.location.lat());
              console.log(results[0].geometry.location.lng());
              console.log(address);
          } else {
              alert('Geocode was not successful for the following reason: ' + status);
          }
      });
  }
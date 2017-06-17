  console.log("geocode");

  var geocoder;
  var map;
  var address;

  var initialize = function() {
      console.log("iiiintialized");
      geocoder = new google.maps.Geocoder();
      var latlng = new google.maps.LatLng(-34.397, 150.644);
      var mapOptions = {
          zoom: 8,
          center: latlng
      }
      map = new google.maps.Map(document.getElementById('map2'), mapOptions);
  }

  var codeAddress = function() {
      console.log("clicked2");
      address = $("#address").val();
      geocoder.geocode({ 'address': address }, function(results, status) {
          if (status == 'OK') {
              map.setCenter(results[0].geometry.location);
              var marker = new google.maps.Marker({
                  map: map,
                  position: results[0].geometry.location
              });
          } else {
              alert('Geocode was not successful for the following reason: ' + status);
          }
      });
  }

  $("#address-btn").on("click", function() {
      codeAddress();
      initialize();
      console.log("clicked!");
  })

  window.onload = function() {
      console.log("initialized");
      initialize();
  }
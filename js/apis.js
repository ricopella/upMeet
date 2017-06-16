console.log("in");
// NY // searchAPIS("python", 40.728862, -73.996413);
// LA // searchAPIS("javascript", 34.020204, -118.490765)

var meetupResponse;
var youtubeResponse;
var wikiResponse;
var mapCoordinates;

function searchAPIS (search, lat, lon) {
  var query = search;

  // call meetup
  $.ajax({
    url: "https://api.meetup.com/find/events?&sign=true&photo-host=public&lon=" +
      lon + "&text="+ query + "&radius=" + "30" + "&lat=" + lat + "&key=13493128171b80333fc956a274b1c",
    method: "GET",
  }).done(function(response){
    meetupResponse = response;
    console.log(response);
    console.log(response.length);
  });

  // call youtube
  $.get( "https://www.googleapis.com/youtube/v3/search", {
        part: 'snippet, id',
        q: query,
        type:'video',
        'maxResults': '50',
        key: 'AIzaSyBCZgipwmv-daOhKVQWBKISU5dGjx24rng'},

        function (data) {
          console.log(data.items);
          youtubeData = data.items;
        }
    );

    // call wikipedia
    $.ajax({
        type: 'GET',
        dataType:'jsonp',
        url: 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&inprop=url&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch='+ query,
        crossDomain: true,
        cache: false,
        success: function(json) {
            console.log(json.query.pages);
            wikiData = json.query.pages
        }
    });
}

// googlemaps update
function updateMap (meetupResponse) {

  var locations = [];

      for (i = 0; i < 50; i++) {
      	if ('venue' in meetupResponse[i]) {
          locations.push([meetupResponse[i].name, meetupResponse[i].venue.lat, meetupResponse[i].venue.lon, meetupResponse[i].venue.name]);
      	}
    }
    console.log(locations);

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 9,
      center: new google.maps.LatLng(locations[2][1], locations[2][2]),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0] + "<br />" + locations[i][3]);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }
    var trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(map);
}

// to have data on page load
searchAPIS("javascript", 34.020204, -118.490765);

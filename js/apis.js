console.log("in");
// LA // searchMeetup("python", 40.728862, -73.996413);
// NY // searchMeetup("javascript", 34.020204, -118.490765)

var meetupResponse;
var youtubeResponse;
var wikiResponse;
var mapCoordinates;

function searchAPIS (search, lat, lon) {
  var query = search;

  // call meetup
  $.ajax({
    url: "https://api.meetup.com/find/events?&sign=true&photo-host=public&lon=" +
      lon + "&text="+ query + "&radius=50&lat=" + lat + "&key=13493128171b80333fc956a274b1c",
    method: "GET",
  }).done(function(response){
    theResponse = response;
    meetupResponse = response;
    console.log(theResponse);
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

searchAPIS("javascript", 34.020204, -118.490765);

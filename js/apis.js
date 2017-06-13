console.log("in");

function searchMeetup (query) {
  var searchTerm = "javascript";
  var queryURL = "https://api.meetup.com/find/events?photo-host=public&text="+ searchTerm + "&key=13493128171b80333fc956a274b1c";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).done(function(response){

    theResponse = response;

    console.log(theResponse);

    for (var i = 0; i < theResponse.length; i++) {
      // console.log(theResponse[i].name);
      // console.log(theResponse[i].group.who);

      // $("#the-response").append("<div><h2>" + theResponse[i].name + "</h2>" +
      //   "<p>" + "Time " + theResponse[i].time + ", " +
      //   "Duration " + theResponse[i].duration + "</p>" +
      //   "<p>" + theResponse[i].description + "</p>" +
      //   "<p>" + theResponse[i].group.who + "</p></div>")
    };
    console.log(theResponse);
  });
}

function searchYouTube (query) {
  $.get(
  		"https://www.googleapis.com/youtube/v3/search",{
  			part: 'snippet, id',
  			q: query,
  			type:'video',
        'maxResults': '20',
  			key: 'AIzaSyBCZgipwmv-daOhKVQWBKISU5dGjx24rng'},
  			function(data){
  				var nextPageToken = data.nextPageToken;
  				var prevPageToken = data.prevPageToken;
          // TO SEARCH for video https://www.youtube.com/watch?v=
  				// Log Data
  				console.log(data);

  				$.each(data.items, function(i, item){
            console.log();
  					// Get Output
  					// var output = getOutput(item);

  					// Display Results
  					// $('#results').append(output);
  				});

  				// var buttons = getButtons(prevPageToken, nextPageToken);
  				// Display Buttons
  				// $('#buttons').append(buttons);
  			}
  	);
}

function wikiSearch (query) {
  var apiURL = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&inprop=url&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch='+ query;

  $.ajax({
      type: 'GET',
      dataType:'jsonp',
      url: apiURL,
      crossDomain: true,
      cache: false,
      success: function(json) {
          console.log(json);

          if (json.hasOwnProperty('query')) {

          var pages = json.query.pages;

          console.log(pages);

          for (var val in pages) {
              var title = pages[val].title;
              var extract = pages[val].extract;
              var articleURL = 'https://en.wikipedia.org/?curid='+pages[val].pageid;
              console.log(title, extract, articleURL);
          }
        } // end if query
          // If nothing found
          else {

          }
      }
  });
}

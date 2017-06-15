console.log("in");


$(document).ready(function() {

    console.log( "ready!" );
    var searchTerm = "javascript";
    var queryURL = "https://api.meetup.com/find/events?photo-host=public&text="+ searchTerm + "&key=13493128171b80333fc956a274b1c";

    // Meetup.com API call
    $.ajax({
      url: queryURL,
      method: "GET",
    }).done(function(response){

      theResponse = response;
      for (var i = 0; i < theResponse.length; i++) {
        // console.log(theResponse[i].name);
        // console.log(theResponse[i].group.who);
        $("#the-response").append("<div><h2>" + theResponse[i].name + "</h2>" +
          "<p>" + "Time " + theResponse[i].time + ", " +
          "Duration " + theResponse[i].duration + "</p>" +
          "<p>" + theResponse[i].description + "</p>" +
          "<p>" + theResponse[i].group.who + "</p></div>")
      };
      console.log(theResponse);
    });
});
// YouTube

// Sample js code for search.list

// See full sample for buildApiRequest() code, which is not
// specific to a particular youtube or youtube method.

// The client ID is obtained from the {{ Google Cloud Console }}
// at {{ https://cloud.google.com/console }}.
// If you run this code from a server other than http://localhost,
// you need to register your own client ID.
var OAUTH2_CLIENT_ID = '__YOUR_CLIENT_ID__';
var OAUTH2_SCOPES = [
  'https://www.googleapis.com/auth/youtube'
];

// Upon loading, the Google APIs JS client automatically invokes this callback.
googleApiClientReady = function() {
  gapi.auth.init(function() {
    window.setTimeout(checkAuth, 1);
  });
}

// Attempt the immediate OAuth 2.0 client flow as soon as the page loads.
// If the currently logged-in Google Account has previously authorized
// the client specified as the OAUTH2_CLIENT_ID, then the authorization
// succeeds with no user intervention. Otherwise, it fails and the
// user interface that prompts for authorization needs to display.
function checkAuth() {
  gapi.auth.authorize({
    client_id: OAUTH2_CLIENT_ID,
    scope: OAUTH2_SCOPES,
    immediate: true
  }, handleAuthResult);
}

// Handle the result of a gapi.auth.authorize() call.
function handleAuthResult(authResult) {
  if (authResult && !authResult.error) {
    // Authorization was successful. Hide authorization prompts and show
    // content that should be visible after authorization succeeds.
    $('.pre-auth').hide();
    $('.post-auth').show();
    loadAPIClientInterfaces();
  } else {
    // Make the #login-link clickable. Attempt a non-immediate OAuth 2.0
    // client flow. The current function is called when that flow completes.
    $('#login-link').click(function() {
      gapi.auth.authorize({
        client_id: OAUTH2_CLIENT_ID,
        scope: OAUTH2_SCOPES,
        immediate: false
        }, handleAuthResult);
    });
  }
}

// Load the client interfaces for the YouTube Analytics and Data APIs, which
// are required to use the Google APIs JS client. More info is available at
// https://developers.google.com/api-client-library/javascript/dev/dev_jscript#loading-the-client-library-and-the-api
function loadAPIClientInterfaces() {
  gapi.client.load('youtube', 'v3', function() {
    handleAPILoaded();
  });
}

buildApiRequest('GET',
                '/youtube/v3/search',
                {'maxResults': '25',
                 'part': 'snippet',
                 'q': 'javascript',
                 'type': ''}); // channel, video, or playlist




// function wikiRequest (){
//   $.ajax( {
//     var url = "https://en.wikipedia.org/w/api.php?action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=json";
//
//       url: remoteUrlWithOrigin,
//       data: queryData,
//       dataType: 'json',
//       type: 'POST',
//       headers: { 'Api-User-Agent': 'Example/1.0' },
//       success: function(data) {
//          console.log(data);
//       }
//   } );
//
// }

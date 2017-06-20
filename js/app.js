// NY // searchAPIS("python", 40.728862, -73.996413);
// LA // searchAPIS("javascript", 34.020204, -118.490765)

var meetupResponse = [];
var youtubeResponse;
var wikiResponse;
var mapCoordinates;
var allData = [];
var geocoder;
var map;
var address;
var lat;
var lng;

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
        var search = $("#search-subject").val();
        searchAPIS(search, lat, lng);
    });

}

// uses inputed subject & geocodeAddress Latitude & Longitude
// generates meetupResonse of data to be used on page
function searchAPIS(search, lat, lng) {
    var query = search;
    var numFinished = 0;

    // call meetup
    $.ajax({
        url: "https://api.meetup.com/find/events?&sign=true&photo-host=public&lon=" +
            lng + "&text=" + query + "&radius=" + "30" + "&lat=" + lat + "&key=13493128171b80333fc956a274b1c",
        method: "GET",
    }).done(function(response) {

        console.log(meetupResponse.length);

        response.forEach(function(item, index) {
            var evalStatement = (moment(item.time, 'YYYY-MM-DD').diff(moment()), "hours") <= 6;

            console.log(evalStatement);

            // filter results to NOT include meetups with NO VENUE
            if (item.venue !== undefined) {
                meetupResponse.push(response[index]);
                // console.log(index);
            }
        });

        // waits for all 3 API's calls to finish loading data
        numFinished++;
        if (numFinished === 3) {
            updatePage(meetupResponse);
            updateMap(meetupResponse);
        }
    });

    // call youtube
    $.get("https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet, id',
            q: query,
            type: 'video',
            'maxResults': '50',
            key: 'AIzaSyBCZgipwmv-daOhKVQWBKISU5dGjx24rng'
        },

        function(data) {
            console.log("youtube Data: " + data.items);
            youtubeResponse = data.items;

            // waits for all 3 API's calls to finish loading data
            numFinished++;
            if (numFinished === 3) {
                updatePage(meetupResponse);
                updateMap(meetupResponse);
            }
        }
    );

    // call wikipedia
    $.ajax({
        type: 'GET',
        dataType: 'jsonp',
        url: 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&inprop=url&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=' + query,
        crossDomain: true,
        cache: false,
        success: function(json) {
            console.log("Wiki data: " + json.query.pages);
            wikiResponse = json.query.pages;

            // waits for all 3 API's calls to finish loading data
            numFinished++;
            if (numFinished === 3) {
                updatePage(meetupResponse);
                updateMap(meetupResponse);
            }
        }
    });
}

var updatePage = function(meetupResponse) {

        allData = [];
        console.log("update page mayne!");
        console.log(meetupResponse);

        for (var i = 0; i < meetupResponse.length; i++) {
            allData.push(allData[meetupResponse[i]] = {
                "meetupName": meetupResponse[i].name,
                "meetupDescription": meetupResponse[i].description,
                "startTime": meetupResponse[i].time,
                "meetingLength": meetupResponse[i].duration,
                "lat": meetupResponse[i].group.lat,
                "lon": meetupResponse[i].group.lon,
                "rsvp": meetupResponse[i].yes_rsvp_count,
                "waitlist": meetupResponse[i].waitlist_count,
                "venueName": meetupResponse[i].venue.name,
                "venueAddress": meetupResponse[i].venue.address_1,
                "venueCity": meetupResponse[i].venue.city,
                "meetupURL": meetupResponse[i].link,
                "waitlist": meetupResponse[i].waitlist_count
            });
        }

        // append Youtube results to object
        addYoutubeLinks(youtubeResponse);

        console.log("All Data:");
        console.log(allData);

        // Append items to page
        for (j = 0; j <= 10; j++) {

            // structures accordion & title
            var panelDefault = $("<div>").addClass("panel panel-default");
            var panelHeading = $("<div>").addClass("panel-heading");
            var panelName = $("<h4>")
                .addClass("panel-title")
                .append('<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapse' + j + '">' + allData[j].meetupName + '</a>');

            // accordion collapsed data
            var collapseId = $("<div>")
                .addClass("panel-collapse collapse in")
                .attr("id", "collapse" + j);

            var collapseBody = $('<p>').html(allData[j].meetupDescription).text();
            var collapseVenue = $("<p>").text(allData[j].venueName + " Address: " + allData[j].venueAddress + " " + allData[j].venueCity);
            var collapseUrl = $("<a>").text("Click for more info").attr("href", allData[j].meetupURL);
            var collapseAttending = $("<p>").text("RSVP'd: " + allData[j].rsvp);
            var collapseWaitlist = $("<p>").text("Waitlist: " + allData[j].waitlist);

            // displays time

            // display wiki description

            // display youtube title
            var videoTitle = $("<p>").text(allData[j].youtubeTitle);
            // display youtube Thumbnail
            var videoThumbnail = $("<img>").attr("src", allData[j].youtubeThumbnail);
            var imgContainer = $("<div>").addClass("ytImgContainer");

            // create accordion HTML elements
            panelDefault.append(panelHeading);
            panelDefault.append(panelName);
            collapseId.append(collapseBody);
            collapseId.append(collapseVenue);
            collapseId.append(collapseUrl);
            collapseId.append(collapseAttending);
            collapseId.append(collapseWaitlist);
            imgContainer.append(videoTitle);
            imgContainer.append(videoThumbnail);
            collapseId.append(imgContainer);

            // update accordion to page
            $("#accordion").append(panelDefault);
            $("#accordion").append(collapseId);

        } // end for loop
    } // end updatePage()

// adds Youtube query to meetupResponse object
function addYoutubeLinks(youtubeResponse) {
    for (var i = 0; i < youtubeResponse.length; i++) {
        allData[i].youtubeTitle = youtubeResponse[i].snippet.title;
        allData[i].youtubeURL = "https://www.youtube.com/watch?v=" + youtubeResponse[i].id.videoId;
        allData[i].youtubeThumbnail = youtubeResponse[i].snippet.thumbnails.high.url;
    }
} // end addYoutubeResponse()

// Updates Map to display one marker for each meetup
// utilizes meetupResponse for lat/lng
function updateMap(meetupResponse) {

    var locations = [];

    for (i = 0; i < 10; i++) {
        if ('venue' in meetupResponse[i]) {
            locations.push([meetupResponse[i].name, meetupResponse[i].venue.lat, meetupResponse[i].venue.lon, meetupResponse[i].venue.name]);
        }
    }
    console.log(locations);

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
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

//  add wikipedia data to meetupResponse object
// for (var val in wikiData) {
//     var title = wikiData[val].title;
//     var extract = wikiData[val].extract;
//     var articleURL = 'https://en.wikipedia.org/?curid='+wikiData[val].pageid;
//     console.log(title, extract, articleURL);
//     allData
// }

// User submits form for query data
// stores data for use in other functions
$("#user-submit").on("click", function() {
    meetupResponse = [];
    var search = $("#search-subject").val();
    var address = $("#search-address").val();
    geocodeAddress(geocoder, address);
})

//Bootstrap Carousel (timing)
$('.carousel').carousel({
    interval: 6000
})

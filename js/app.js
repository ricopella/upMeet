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

function searchAPIS(search, lat, lng) {
    var query = search;
    var numFinished = 0;

    // call meetup
    $.ajax({
        url: "https://api.meetup.com/find/events?&sign=true&photo-host=public&lon=" +
            lng + "&text=" + query + "&radius=" + "30" + "&lat=" + lat + "&key=13493128171b80333fc956a274b1c",
        method: "GET",
    }).done(function(response) {
        //  meetupResponse = response;
        console.log(meetupResponse.length);

        // var counterOfDel = 0;

        response.forEach(function(item, index) {
          var evalStatement = (moment(item.time, 'YYYY-MM-DD').diff(moment()), "hours") <= 6;

          // moment(meetupResponse[0].time).diff(moment("2017-06-18"), "days") ===1
          console.log(evalStatement);

          if (item.venue !== undefined){
            // && evalStatement === true
            // console.log(moment(item.time).diff(moment("2017-07-11"), "days"));
        		// console.log(item.venue);
            meetupResponse.push(response[index]);
            console.log(index);
            // counterOfDel++;
        	}
          // console.log(meetupResponse.length);

          // if (moment(item.time).diff(moment("2017-07-11"), "days") === 1){
          //   console.log(moment(item.time).diff(moment("2017-07-11"), "days"));
        	// 	// console.log(item.venue);
          //   meetupResponse.splice(index, 1);
        	// }
          // console.log(counterOfDel);
          // console.log("item time: " + moment(item.time).format("YYYYMMDD") + "passed: 2017-07-11" + " diff: " + moment(item.time).diff(moment("2017-07-11"), "days"));
        });
        numFinished++;
        if(numFinished === 3) {
          updatePage(meetupResponse);
          updateMap(meetupResponse);
        }

        // meetupResponse.forEach(function(item) {
        //     console.log(moment(item.time).format("YYYY-MM-DD"));
        //     console.log(moment(item.time).diff(moment("2017-07-11"), "days") === 1);
        // });

        // console.log(meetupResponse[i].time);

        // if (true) {
        //
        // }
        // moment(1500512400000).diff(moment("2017-07-11"), "days") > 1
        // word.venue !== undefined

        // console.log("MeetUp Response:");
        // console.log(response);
        // console.log("Meetup Response Length " + response.length);
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
            numFinished++;
            if(numFinished === 3) {
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
            numFinished++;
            if(numFinished === 3) {
              updatePage(meetupResponse);
              updateMap(meetupResponse);
            }
        }
    });

    // setTimeout(updatePage(meetupResponse), 100000);

}



// to have data on page load
// searchAPIS("javascript", 34.020204, -118.490765);



// User submits form for query data
// stores data for use in other functions
$("#user-submit").on("click", function() {

    var search = $("#search-subject").val();
    var address = $("#search-address").val()

    geocodeAddress(geocoder, address, function() {
        console.log('first func ran!');

        searchAPIS(search, lat, lng, function() {
            console.log('Second func ran!');
            updatePage(meetupResponse);
            console.log('Third func ran!');
        });
    });
});

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
                "venueAdress": meetupResponse[i].venue.address_1,
                "venueCity": meetupResponse[i].venue.city,
                "meetupURL": meetupResponse[i].link,
                "waitlist": meetupResponse[i].waitlist_count
            });
        }

        // // pull these in
        // if (meetupItem.duration !== undefined) {
        //     var a = meetupItem.time;
        //     var b = meetupItem.duration;
        //     console.log(moment(a).format("h:mm") + " - " + moment(a + b).format("hh:mm a"));
        // }

        // if (waitlist > 0) {
        //     console.log("this one is full");
        // }

        // append Youtube results to object
        addYoutubeLinks(youtubeResponse);

        console.log("All Data:");
        console.log(allData);

        // Append items to page
        for (j = 0; j <= 10; j++) {

            var panelDefault = $("<div>").addClass("panel panel-default");
            var panelHeading = $("<div>").addClass("panel-heading"); // displays Accordian title
            var panelName = $("<h4>")
                .addClass("panel-title")
                .append('<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapse' + j + '">' + allData[j].meetupName + '</a>');

            // collapsed data
            var collapseId = $("<div>")
                .addClass("panel-collapse collapse in")
                .attr("id", "collapse" + j);
            // displays subject short description
            var collapseBody = $("<div>")
                .addClass("panel-body")
                .text(allData[j].meetupDescription);
            // var collapseVenue = $("<p>").text(allData[j].venueName + " Address: " + allData[j].venueAddress + " " + allData[j].venueCity);
            var collapseUrl = $("<a>").attr("src", allData[j].link);
            var collapseAttending = $("<p>").text("RSVP'd: " + allData[j].rsvp);
            var collapseWaitlist = $("<p>").text("Waitlist: " + allData[j].waitlist);

            // // displays time
            // var time = $("<p>").text(allData[j].startTime);
            // // display wiki description

            // display youtube title
            var videoTitle = $("<p>").text(allData[j].youtubeTitle);
            // display youtube Thumbnail
            var videoThumbnail = $("<img>").attr("src", allData[j].youtubeThumbnail);
            var imgContainer = $("<div>").addClass("ytImgContainer");



            panelDefault.append(panelHeading);
            panelDefault.append(panelName);
            // panelLink.wrap(panelName);
            collapseId.append(collapseBody);
            // collapseId.append(collapseVenue);
            collapseId.append(collapseUrl);
            collapseId.append(collapseAttending);
            collapseId.append(collapseWaitlist);
            imgContainer.append(videoTitle);
            imgContainer.append(videoThumbnail);
            collapseId.append(imgContainer);

            $("#accordion").append(panelDefault);
            $("#accordion").append(collapseId);

        } // end for loop
    } // end updatePage()

function addYoutubeLinks(youtubeResponse) {
    for (var i = 0; i < youtubeResponse.length; i++) {
        allData[i].youtubeTitle = youtubeResponse[i].snippet.title;
        allData[i].youtubeURL = "https://www.youtube.com/watch?v=" + youtubeResponse[i].id.videoId;
        allData[i].youtubeThumbnail = youtubeResponse[i].snippet.thumbnails.high.url;
    }
} // end addYoutubeResponse()

// googlemaps update
function updateMap(meetupResponse) {

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

// for (var val in wikiData) {
//     var title = wikiData[val].title;
//     var extract = wikiData[val].extract;
//     var articleURL = 'https://en.wikipedia.org/?curid='+wikiData[val].pageid;
//     console.log(title, extract, articleURL);
//     allData
// }

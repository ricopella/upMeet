console.log("updatepage.js loaded");

// user clicks acoordian for drop down data

function updatePage(meetupResponse, wikiResponse, youtubeResponse) {

    meetupResponse.forEach(function(meetupItem) {
        var meetupName = meetupItem.name;
        var meetupDescription = meetupItem.description;
        var startTime = meetupItem.time;
        var meetingLength = meetupItem.duration;
        var lat = meetupItem.group.lat;
        var lon = meetupItem.group.lon;
        var meetupURL = meetupItem.link;
        var waitlist = meetupItem.waitlist_count;

        console.log(meetupName, meetupDescription, startTime, meetingLength, meetupURL, waitlist);

        // pull these in
        if (meetupItem.duration !== undefined) {
            var a = meetupItem.time;
            var b = meetupItem.duration;
            console.log(moment(a).format("h:mm") + " - " + moment(a + b).format("hh:mm a"));
        }

        if (waitlist > 0) {
            console.log("this one is full");
        }
    });

    youtubeData.forEach(function(youtubeItem) {
        console.log(youtubeItem.snippet.title);
        console.log("https://www.youtube.com/watch?v=" + youtubeItem.id.videoId);
        console.log(youtubeItem.snippet.thumbnails.high.url);
    });

    for (var val in wikiData) {
        var title = wikiData[val].title;
        var extract = wikiData[val].extract;
        var articleURL = 'https://en.wikipedia.org/?curid=' + wikiData[val].pageid;
        console.log(title, extract, articleURL);
    }

    // Append items to page

    // creates a accordian for 10 different results
    for (j = 0; j < 10; j++) {
        // displays Accordian title
        var subject = $("<h1>").text("Subject: " + meetupItem[j].name);
        // displays subject short description
        var description = $("<p>").text(meetupItem[j].description);
        // displays Venue
        var venue = $("<p>").text(meetupItem[j].venue.name);
        // displays time
        var time = $("<p>").text(meetupItem[j].time);
        // display wiki description

        // display youtube video

    } // end for loop



}
var allData = [];

function updatePage(meetupResponse) {

    allData = [];
    console.log('update page mayne! ' + meetupResponse);

    for (var i = 0; i < meetupResponse.length; i++) {
        allData.push(allData[meetupResponse[i]] = {
            "meetupName": meetupResponse[i].name,
            "meetupDescription": meetupResponse[i].description,
            "startTime": meetupResponse[i].time,
            "meetingLength": meetupResponse[i].duration,
            "lat": meetupResponse[i].group.lat,
            "lon": meetupResponse[i].group.lon,
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

        // displays Accordian title
        var meetupName = $("<h1>").text("Name: " + allData[j].meetupName);
        // displays subject short description
        var description = $("<p>").text("Description: " + allData[j].meetupDescription);
        // displays time
        var time = $("<p>").text(allData[j].startTime);
        // display wiki description

        // display youtube title
        var videoTitle = $("<p>").text(allData[j].youtubeTitle);
        // display youtube Thumbnail
        var videoThumbnail = $("<img>").attr("src", allData[j].youtubeThumbnail);
        var imgContainer = $("<div>").addClass("ytImgContainer");
        imgContainer.append(videoTitle);
        imgContainer.append(videoThumbnail);

        var meetupSelection = $("<div>").addClass("meetup-selection");
        meetupSelection.append(meetupName);
        meetupSelection.append(description);
        meetupSelection.append(venue);
        meetupSelection.append(time);

        $("#render-data").append(meetupSelection);
        $("#render-data").append(imgContainer);

    } // end for loop
}

function addYoutubeLinks(youtubeResponse) {
    for (var i = 0; i < youtubeResponse.length; i++) {
        allData[i].youtubeTitle = youtubeResponse[i].snippet.title;
        allData[i].youtubeURL = "https://www.youtube.com/watch?v=" + youtubeResponse[i].id.videoId;
        allData[i].youtubeThumbnail = youtubeResponse[i].snippet.thumbnails.high.url;
    }
}

// for (var val in wikiData) {
//     var title = wikiData[val].title;
//     var extract = wikiData[val].extract;
//     var articleURL = 'https://en.wikipedia.org/?curid='+wikiData[val].pageid;
//     console.log(title, extract, articleURL);
//     allData
// }
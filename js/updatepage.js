var allData = [];

var updatePage = function(meetupResponse) {

        allData = [];
        console.log("update page mayne!");
        console.log(meetupResponse);

        for (var i = 0; i < meetupResponse.length; i++) {
            console.log('breaking on: ' + i);

            allData.push(allData[meetupResponse[i]] = {
                "meetupName": meetupResponse[i].name,
                "meetupDescription": meetupResponse[i].description,
                "startTime": meetupResponse[i].time,
                "meetingLength": meetupResponse[i].duration,
                "lat": meetupResponse[i].group.lat,
                "lon": meetupResponse[i].group.lon,
                "rsvp": meetupResponse[i].yes_rsvp_count,
                "waitlist": meetupResponse[i].waitlist_count,
                // "venueName": meetupResponse[i].venue.name,
                // "venueAdress": meetupResponse[i].venue.address_1,
                // "venueCity": meetupResponse[i].venue.city,
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

// for (var val in wikiData) {
//     var title = wikiData[val].title;
//     var extract = wikiData[val].extract;
//     var articleURL = 'https://en.wikipedia.org/?curid='+wikiData[val].pageid;
//     console.log(title, extract, articleURL);
//     allData
// }
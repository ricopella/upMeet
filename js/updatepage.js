console.log("updatepage.js loaded");

var allData = [];

function updatePage(meetupResponse) {

    allData = [];

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

    addYoutubeLinks(youtubeResponse);

    console.log(allData);
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
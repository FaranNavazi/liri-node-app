require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var moment = require("moment");

var axios = require("axios");
var action = process.argv[2];
var nodeArgs = process.argv;
var input = "";

for (var i = 3; i < nodeArgs.length; i++) {
  if (i > 3 && i < nodeArgs.length) {
    input = input + "+" + nodeArgs[i];
  } else {
    input += nodeArgs[i];
  }
}

switch (action) {
  case "movie":
    movie();
    break;

  case "concert":
    concert();
    break;

  case "spotify":
    spotifyThis();
    break;
  
  case "do-what-it-says":
    doWhat();
    break;

  default:
    console.log("After 'node liri.js' Please enter one of the following:");
    console.log("*movie");
    console.log("*concert")
    console.log("*spotify")
    console.log("*do-what-it-says")
    break;
}

//function for OMDB movie finder
function movie() {
  var queryUrl =
    "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";

  axios.get(queryUrl).then(function(response) {
    console.log("==============================================");
    console.log("");
    console.log("Movie Title: " + response.data.Title);
    console.log("Release Year: " + response.data.Year);
    console.log("IMDB Rating: " + response.data.imdbRating);
    console.log("Country the movie is from: " + response.data.Country);
    console.log("Language of the movie is: " + response.data.Language);
    console.log("Plot: " + response.data.Plot);
    console.log("Actors: " + response.data.Actors);
    console.log("");
    console.log("==============================================");
  });
}

function concert() {
  var queryUrl =
    "https://rest.bandsintown.com/artists/" +
    input +
    "/events?app_id=codingbootcamp+limit=3";

  axios.get(queryUrl).then(function(response) {
    for (var i = 0; i < response.data.length; i++) {
      console.log("==============================================");
      console.log("");
      console.log("Name Of The Venue: " + response.data[i].venue.name);
      console.log("Release Year: " + response.data[i].venue.city + ", " + response.data[i].venue.region + ", " + response.data[i].venue.country);
      console.log("Date Of The Event: " + moment(response.data[i].datetime).toDate());
      console.log("");
      console.log("==============================================");
    }
  });
}

function spotifyThis() {
  spotify
    .search({
      type: "track",
      query: input,
      limit: 3
    })
    .then(function(response) {
      for (var k = 0; k < response.tracks.items.length; k++) {
        console.log("==============================================");
        console.log("");
        console.log("Artist: ", response.tracks.items[k].artists[0].name);
        console.log("Song Name: ", response.tracks.items[k].name);
        console.log("Preview Link: ", response.tracks.items[k].external_urls.spotify);
        console.log("Album Name: ", response.tracks.items[k].album.name);
        console.log("");
        console.log("==============================================");
      }
    })
    .catch(function(err) {
      console.log(err);
    });
}

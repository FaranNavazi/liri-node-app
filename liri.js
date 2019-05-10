// npm for dotenv
require("dotenv").config();

// npm for fs
var fs = require("fs");

// npm for spotify API and requesting for key from .env file
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

// npm for moment.js
var moment = require("moment");

// npm for axios
var axios = require("axios");

// variables for input and looping through the multi input
var action = process.argv[2];
var nodeArgs = process.argv;
var input = "";

// loop for multi input
for (var i = 3; i < nodeArgs.length; i++) {
  if (i > 3 && i < nodeArgs.length) {
    input = input + "+" + nodeArgs[i];
  } else {
    input += nodeArgs[i];
  }
}

// action words for awaking requier function
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
    doWhatItSays();
    break;

  default:
    console.log("After 'node liri.js' Please enter one of the following Command:");
    console.log("*movie");
    console.log("*concert")
    console.log("*spotify")
    console.log("*do-what-it-says")
    break;
}

//function for OMDB API
function movie() {
  if (input === "") input = "Mr.Nobody"

  var queryUrl =
    "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";

  axios.get(queryUrl).then(function(response) {
    console.log("==============================================");
    console.log("");
    console.log("- Movie Title: " + response.data.Title);
    console.log("- Release Year: " + response.data.Year);
    console.log("- IMDB Rating: " + response.data.imdbRating);
    console.log("- Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
    console.log("- Country the movie is from: " + response.data.Country);
    console.log("- Language of the movie is: " + response.data.Language);
    console.log("- Plot: " + response.data.Plot);
    console.log("- Actors: " + response.data.Actors);
    console.log("");
    console.log("==============================================");
  });
}

// function for Bands in Town API
function concert() {
  var queryUrl =
    "https://rest.bandsintown.com/artists/" +
    input +
    "/events?app_id=codingbootcamp+limit=3";

  axios.get(queryUrl).then(function(response) {
    for (var i = 0; i < response.data.length; i++) {
      console.log("==============================================");
      console.log("");
      console.log("- Name Of The Venue: " + response.data[i].venue.name);
      console.log("- Location Of The Venue: " + response.data[i].venue.city + ", " + response.data[i].venue.region + ", " + response.data[i].venue.country);
      console.log("- Date Of The Event: " + moment(response.data[i].datetime).toDate());
      console.log("");
      console.log("==============================================");
    }
  })
  .catch(function(err) {
    console.log(err);
  });
}

//functoin for Spotify API
function spotifyThis() {
  if (input === "") input = "the sign ace of base"

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
        console.log("- Artist: ", response.tracks.items[k].artists[0].name);
        console.log("- Song Name: ", response.tracks.items[k].name);
        console.log("- Preview Link: ", response.tracks.items[k].external_urls.spotify);
        console.log("- Album Name: ", response.tracks.items[k].album.name);
        console.log("");
        console.log("==============================================");
      }
    })
    .catch(function(err) {
      console.log(err);
    });
}

// function for Random pick action
function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) return console.log(err);
    console.log(data);
    input = data;
    spotifyThis();
  })
}
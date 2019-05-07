//require("dotenv").config();

//var keys = require("./keys.js");

//var spotify = new spotify(keys.spotify);

var axios = require("axios");
var action = process.argv[2];
var nodeArgs = process.argv;
var movieName = "";


switch (action) {
  case "movie":
    movie();
    break;

  case "concert":
    concert();
    break;

  case "spotify":
    spotify();
    break;

  default:
    console.log("After 'liri.js' Please enter one of the following: ")
    break;
}





//function for OMDB movie finder
function movie() {

  for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {
      movieName = movieName + "+" + nodeArgs[i];
    }
    else {
      movieName += nodeArgs[i];
  
    }
  }
  
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
  
  axios.get(queryUrl).then(
    function(response) {
      console.log("==============================================");
      console.log("");
      console.log("Movie Title: " + response.data.Title);
      console.log("Release Year: " + response.data.Year);
      console.log("IMDB Rating: " + response.data.imdbRating);
      console.log("Country the movie is from: " + response.data.Country);
      console.log("Language of the movie is: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Actors: " + response.data.Actors)
      console.log("");
      console.log("==============================================");
    }
  );
}


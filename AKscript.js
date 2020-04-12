$(document).ready(function () {




});

const BASEURL = "http://www.omdbapi.com/?apikey="
const APIKEY = "550dba5f"
const arr = [];
//start the request
//plot description isn't currently working
function startMovieRequest(liquor, pageNum) {
    var URL = BASEURL + APIKEY + "&s=" + liquor + "&page=" + pageNum
    console.log(URL);
    $.ajax({
        method: "GET",
        url: URL,
        dataType: "JSON",
    })
        //executes when GET request is done
        //getting a movie array from the response object called Search
        .done(function (response) {
            let movieArr = response.Search;
            renderMovies(movieArr);
        });
}
// API page limit 1-100
function getNumMoviePages(limit) {
    for (let index = 1; index < limit; index++) {
      startMovieRequest("speed",index)
    }
}

//a helper function a random index of the full movie array
function getRandomArrayIndex(arr) {
    return Math.floor(Math.random() * arr.length)
}
//Currenlty only passedin 10 length array
// need larger array of all movies from pages combined into one array
function renderMovies(arr) {
    var selectedMovies = []
    for (var i = 0; i < 5; i++) {
        var random = getRandomArrayIndex(arr)
        selectedMovies.push(arr[random])
    }

}

$(document).ready(function () {




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
            ///.done(function (response) {
            // let movieArr = response.Search;
            // renderMovies(movieArr);
            //});
            //}
            .then(function (response) {

                //console.log(data);
                let movieImg = $("<img>").attr("src", response.Search[0].Poster)
                // picture of movie here
                $("#movieImg").empty().append(movieImg);
                // add title of movie
                $(".titleMovie").text(response.Search[0].Title);
                // type of movie/show
                $("#mediaType").text(response.Search[0].Type);
                // year released
                $("#year").text(response.Search[0].Year);

            })
    }

    ///});

    // make buttons
    $("button1").text(response.Search.Title[0]);
    $("button2").text(response.Search.Title[0]);
    $("button3").text(response.Search.Title[0]);
    $("button4").text(response.Search.Title[0]);
    $("button5").text(response.Search.Title[0]);

    //card
    //function to match each button with response, goes on card
    $("button1").on("click", function () {
        //$("#title1").text(response.Search.Title[0]);
        //title that matches with button 1 to go in the card 
        //$("#year1").text(response.Search.Year[0])  
        //}





        // API page limit 1-100
        function getNumMoviePages(limit) {
            for (let index = 1; index < limit; index++) {
                startMovieRequest("speed", index)
            }
        }

        //random index of the full movie array
        function getRandomArrayIndex(arr) {
            return Math.floor(Math.random() * arr.length)
        }
        //Currently only passed in 10 length array
        // need larger array of all movies from pages combined into one array
        function renderMovies(arr) {
            var selectedMovies = []
            for (var i = 0; i < 5; i++) {
                var random = getRandomArrayIndex(arr)
                selectedMovies.push(arr[random])
            }

    };
$(document).ready(function () {
    $("#tile2, #tile3").hide()

    AOS.init({
        duration: 3000
        
    });

    // select a spirit
    $(".drink").on("click", function (e) {
        e.preventDefault();
        //hide the intro text and show the buttons
        $("#introTile").hide()
        $("#tile2").show();
        // this keyword means the current element
        let drinkChoice = $(this).val();

        let spirit = drinkChoice;
        getDrinks(spirit);
        getMovies(spirit);

    });

    $(".drinkChoice, .movieChoice").click(function () {
        // Check for both movie choice and spirit choice
        $("#tile3").show();
        $("html, body").animate({ scrollTop: $(document).height() }, 4000);
        return false;
    });
});

function getDrinks(spirit) {
    let drinkURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + spirit;
    $.ajax({

        url: drinkURL,
        method: "GET"

    }).then(function (data) {
        //console.log(data);
        
        indexArray = [];
        
        for (let i = 0; i < 5; i++) {
            //console.log(data.drinks.length);
            let index = Math.floor(Math.random() * data.drinks.length);
            //if there is a duplicate, generate a new number 
            while (indexArray.includes(index)) {
                index = Math.floor(Math.random() * data.drinks.length);
            }
            indexArray.push(index);

            let randomDrink = data.drinks[index].strDrink;

            //iterate over children
            let childArray = $(".drink-list").children("button");
            $(childArray[i]).attr("data-ID", data.drinks[index].idDrink);
            $(childArray[i]).text(randomDrink);

        };

        $(".drinkChoice").on("click", function (e) {
            e.preventDefault();

            $(".drink-placeholder").hide();

            let drinkID = $(this).attr("data-ID");

            let drinkInfoURL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkID;

            $.ajax({
                url: drinkInfoURL,
                method: "GET"

            }).then(function (data) {
                //console.log(data);
                let drinkImg = $("<img>").attr("src", data.drinks[0].strDrinkThumb);
                // picture of drink
                $("#drinkPoster").empty().append(drinkImg);
                // add title of drink
                $(".drinkTitle").text(data.drinks[0].strDrink);
                // add instructions
                $("#drinkInstructions").text("Instructions: " + data.drinks[0].strInstructions);
                // add Ingredients
                $("#drinkIngredients").text("Ingredients: " + data.drinks[0].strIngredient1 + ", " + data.drinks[0].strIngredient2 + ", " + data.drinks[0].strIngredient3);
            });
        });
    });
}

function getMovies(spirit) {


    let movieURL = "https://api.themoviedb.org/3/search/movie?api_key=ac8d8df8618ce748ba6ec85b601a0f67&language=en-US&query=" + spirit + "&page=1&include_adult=false";
    // *********** search movie by a keyword 
    $.ajax({

        url: movieURL,
        method: "GET"

    }).then(function (data) {
        //console.log(data);

        indexArray = [];

        for (let i = 0; i < 5; i++) {

            // Grab a random movie title from the query results
            let index = Math.floor(Math.random() * data.results.length);
            //if there is a duplicate, generate a new number
            while (indexArray.includes(index)) {

                index = Math.floor(Math.random() * data.results.length);
            };
            indexArray.push(index);
            // use the random index number to grab a random Movie out of array
            let randomMovie = data.results[index].title;
            //store the children of the movie-list class in an array
            let childArray = $(".movie-list").children("button");
            // add the text of the title on to the button 
            $(childArray[i]).text(randomMovie);
            //creating an attribute with the value of the Movie ID to use below
            $(childArray[i]).attr("data-ID", data.results[index].id);

        }


        $(".movieChoice").on("click", function (e) {
            e.preventDefault();

            $(".movie-placeholder").hide();

            let movieID = $(this).attr("data-ID");

            let movieInfoURL = "https://api.themoviedb.org/3/movie/" + movieID + "?api_key=ac8d8df8618ce748ba6ec85b601a0f67&language=en-US";


            // get movie information by ID 
            $.ajax({

                url: movieInfoURL,
                method: "GET"

            }).then(function (data) {
                //console.log(data);

                let movieImg = "";
                if (data.poster_path === null) {

                    movieImg = $("<img>").attr("src", "./Assets/no-image.jpg");
                    
                }
                else {
                    let moviePosterPath = "http://image.tmdb.org/t/p/w185/" + data.poster_path;
                    movieImg = $("<img>").attr("src", moviePosterPath);
                }
                //picture of Movie
                $("#moviePoster").empty().append(movieImg);
                //add movie title
                $(".movieTitle").text(data.original_title);
                if(data.overview === "") {
                    $("#movieInfo").text("Overview: No information available");
                } else {
                    $("#movieInfo").text("Overview:" + data.overview);
                }
            });
        });
    });
};
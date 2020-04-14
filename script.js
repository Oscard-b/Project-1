$(document).ready(function () {




    //console.log($("#xxx")); $("[id=xxx]")
    $(".drink").on("click", function (e) {
        e.preventDefault();

        // this keyword means the current element
        let drinkChoice = $(this).val();

        let spirit = drinkChoice;

        let drinkURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + spirit;
        $.ajax({

            url: drinkURL,
            method: "GET"

        }).then(function (data) {
            //console.log(data);
            // console.log(data.drinks)
             //console.log(data.drinks[5].idDrink);
            indexArray = [];
            // data.drinks
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
startMovieRequest();
            };

            //here

            $(".drinkChoice").on("click", function (e) {
                e.preventDefault();

                let drinkID = $(this).attr("data-ID");

                let drinkInfoURL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkID;

                $.ajax({
                    url: drinkInfoURL,
                    method: "GET"

                }).then(function (data) {
                    
                    //console.log(data);
                    let drinkImg = $("<img>").attr("src", data.drinks[0].strDrinkThumb)
                    // picture of drink
                    $("#moviePoster").empty().append(drinkImg);
                    // add title of drink
                    $(".drinkTitle").text(data.drinks[0].strDrink);
                    // add instructions
                    $("#drinkInstructions").text("Instructions: " + data.drinks[0].strInstructions);
                    // add Ingredients
                    $("#drinkIngredients").text("Ingredients: " + data.drinks[0].strIngredient1 + ", " + data.drinks[0].strIngredient2 + ", " + data.drinks[0].strIngredient3);
                });

            });

            // let drinkImg = $("<img>").attr("src", data.drinks[x].strDrinkThumb + "/preview");

        });
    });


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
  //  $("button1").text(response.Search.Title[0]);
    
    //card
    //function to match each button with response, goes on card
    //$("button1").on("click", function(){
    //$("#title1").text(response.Search.Title[0]);
    //title that matches with button 1 to go in the card 
    //$("#year1").text(response.Search.Year[0])  
    //}
    
    
    
      
         
    // API page limit 1-100
    function getNumMoviePages(limit) {
        for (let index = 1; index < limit; index++) {
          startMovieRequest("speed",index)
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
    
    }
    //});
    


    // user chooces a one of five spirits
    // user is presented with 5 random drinks with that spirit
    //user is presented with 5 random movies with that spirit 
    //user picks one drink
    //user picks one movie
    //user is presented with the drink details, pic, measurements, instructions
    //user is presented with the movie picture, year, cast, synopsis 

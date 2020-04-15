document).ready(function () {





    //var vodkaBtn = $('#vodka');
    //everything that happens when you click vodka or each spirt should happen here
    //including the api call for buttons buttons and appending them to the screen with drinks and appending them to the screewn and 5 movies
    //$('vodka').on("click", function(){
    /// run api call that matches this liqour for movie 
    /// decide what we are going to search by in the api call
    
    
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
                $(".drinkChoice").on("click", function (e) {
                    e.preventDefault();
    
                    
                        
                        //console.log(data);
                        let movieImg = $("<img>").attr("src", response.Search.Poster)
                        // picture of drink
                        $("#moviePoster").empty().append(movieImg);
                        // add title of drink
                        $(".movieTitle").text(re.drinks[0].strDrink);
                        // 
                        $("#drinkInstructions").text("Instructions: " + data.drinks[0].strInstructions);
                        // add Ingredients
                        $("#drinkIngredients").text("Ingredients: " + data.drinks[0].strIngredient1 + ", " + data.drinks[0].strIngredient2 + ", " + data.drinks[0].strIngredient3);
                    });
    
                });
    
               
            };
        
    // make buttons
    $("button1").text(response.Search.Title[0]);
    
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
    
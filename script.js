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

            };

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


    // });




    // user chooces a one of five spirits
    // user is presented with 5 random drinks with that spirit
    //user is presented with 5 random movies with that spirit 
    //user picks one drink
    //user picks one movie
    //user is presented with the drink details, pic, measurements, instructions
    //user is presented with the movie picture, year, cast, synopsis 








});
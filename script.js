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
            // console.log(data.drinks[5].strDrink);
            indexArray = [];
            // data.drinks
            for (let i = 0; i < 5; i++) {
                console.log(data.drinks.length);
                let x = Math.floor(Math.random() * data.drinks.length);
                //if there is a duplicate, generate a new number 
                while (indexArray.includes(x)) {
                    x = Math.floor(Math.random() * data.drinks.length);
                }
                indexArray.push(x);
                let randomDrink = data.drinks[x].strDrink;
                
                //console.log(randomDrink);

                //iterate over children
                let childArray = $(".drink-list").children("div");
                $(childArray[i]).text(randomDrink);
                
            }


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
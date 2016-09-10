/* Step 1- define the main objects of the app */

//array of different flavors
var spices = {
    strong: ["hard whiskey", "gin and tonic",
            "40 proof rum"],
    salty: ["fish flavor", "salt flavor", "bacon breath"],
    bitter: ["cod liver", "sour grapes", "lemon with a twist"],
    sweet: ["sweetener", "diabetic special", "honey on the house"],
    fruity: ["orange crush", "raspberry split", "banana flavor"]

};
//function designed to organize the spices
var Order = function (orderValues) {
    this.strong = orderValues[0];
    this.salty = orderValues[1];
    this.bitter = orderValues[2];
    this.sweet = orderValues[3];
    this.fruity = orderValues[4];
};
var Drink = function (spices, drinkOrder) {
    var ingredientNumber = [];
    var ingredientsArray = [];

    for (var userPreference in drinkOrder) {
        //generate a random number in order to pick up on ingredient in each ingredients category  (for example choose "slug of whisky" for a dring where the client selected the "strong" category of ingredients)
        ingredientNumber = generateRandomNumber(0, 2);
        if (drinkOrder[userPreference]) {
            //for each one of the ingredient categories chose one random ingredient and populate the ingredientsArray with it
            ingredientsArray.push(spices[userPreference][ingredientNumber]);
        }
    }
    return ingredientsArray;
};

/* Step 2- Define the functions to be used in the app */

//changes the ingredient names from whichever case they are to "Title Case"
var toTitleCase = function (str) {
    // "/\w\S*/g" is a regular expression (http://www.regular-expressions.info/) which searches for all words in a phrase ignoring the spaces
    return str.replace(/\w\S*/g, function (txt) {
        //only the first letter in the word make Upper case and all the other letters apart from the first one ("substr(1)") to lower case
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

// Function to generate the random number
var generateRandomNumber = function (min, max) {
    //Returns a random integer between min (included) and max (included); Math.floor() will give you a non-uniform distribution!
    //random number generator details can be found here https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
}

// use if statements to piece together name conditionally based on the ingredients that comprise it
var drinkNamer = function (concoction) {
    //if there is at least one ingredient in the concoction
    if (concoction.length > 0) {
        //split the concoction by space to be able to use the words
        var drinkNamerOutput = concoction[0].split(" ");
        //chose the last word of the first ingredient
        var lastWord = drinkNamerOutput[drinkNamerOutput.length - 1];
        //change the title case of the last word
        return toTitleCase(lastWord);
    } else {
        return false;
    }
};

/* Step 3 -Use the functions define in Step 2 */

$(document).ready(function () {

    //by default the output container is empty
    $('.output').hide();

    //when the form is submitted
    $('form').on('submit', function (event) {

        //if the page refreshes when you submit the form use "preventDefault()" to force JavaScript to handle the form submission
        event.preventDefault();

        //set the empty orderValues array
        orderValues = [];

        //check if the each one of the ingredient types have been chosen and that to the orderValues array;
        $('select').each(function () {
            if ($(this).val() === 'yes') {
                orderValues.push(true);
            } else {
                orderValues.push(false);
            }
        });

        //use the 2 constructors to create 2 new objects
        drinkOrder = new Order(orderValues); // create new order from existing user choice
        concoction = new Drink(spices, drinkOrder); // mix drink with Drink constructor

        //if there is at least one ingredient selected then show the concoction
        if (concoction.length > 0) {

            //build the chosen ingredients from the ingredients array
            var buildTheHtmlOutput = "";
            $.each(concoction, function (key, value) {
                buildTheHtmlOutput += "<li>" + value + "</li>";
            });

            //show the output container
            $('.output').show();

            // name the customer's beverage with drinkNamer();
            $(".output h3").html("Here is ye poison: " + drinkNamer(concoction) + " Grog, ye scurvy dog!");

            //populate it with the ingredients
            $(".output ul").html(buildTheHtmlOutput);
        }
        //if there are no ingredients selected then show alert
        else {
            alert('Pick something for your poison!');
        }
    });
});


//global variable declarations
//topicsArray is used in the renderbuttons function, and is pushed to by the "add-to-favs" buttonclick
//lastSearchObject holds the last search so that the "more" buttons knows what to search for.

const topicsArray = [];
let lastSearchObject;

//the dropdown favorites menu is structured like a list of buttons in bootstrap
//the renderButtons function renders the buttons to the dropdown in the same way
//that it would to a div in the document.
function renderButtons() {
    $("#button-container").empty();
    
    for (i = 0; i < topicsArray.length; i++) {
        let button = $(`<button type="button" class="dropdown-item">`);
        button.attr("data-topic", topicsArray[i]);
        button.attr("data-limit", 10);
        button.attr("data-offset", 0);
        button.attr("data-rating", "pg-13");
        button.text(topicsArray[i]);
        $("#button-container").append(button);
    };

    //add the click event listener to all buttons each time the buttons are rendered
    $(".dropdown-item").on("click", function () {
        $('#more').attr('disabled', false)
        let offset = parseInt($(this).attr("data-offset"));
        let limit = parseInt($(this).attr("data-limit"));
        
        //make searchObject from the clicked buttons data-attributes
        let searchObject = {
            searchWord: $(this).attr("data-topic"),
            limit: $(this).attr("data-limit"),
            offset: $(this).attr("data-offset"),
            rating: $(this).attr("data-rating")
        };

        getGifs(searchObject);
        //increment the offset so that the next gifs in the stack will be returned if more are requested
        offset = offset + limit;
        $(this).attr("data-offset", offset);
    });
};

function getGifs(queryObject) {
    let topic = queryObject.searchWord;
    let offset = queryObject.offset;
    let limit = parseInt(queryObject.limit);
    let rating = queryObject.rating;

    $('#gif-display-text').html(`Your Search: "` + topic + `"`);
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        topic + "&limit=" + limit + "&offset=" + offset + "&rating=" + rating + "&api_key=G56yi3BK55QO0wjAO1tKVY2Vy4xkDTZH";

    lastSearchObject = queryObject;
    lastSearchObject.offset = parseInt(lastSearchObject.offset) + parseInt(lastSearchObject.limit);
    

    $('#more').text(`More ` + queryObject.searchWord + `!`)

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        let results = response.data;

        for (i = 0; i < results.length; i++) {
            let gifDiv = $(`<div class="m-2">`);
            let gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height.url);
            gifDiv.append(gifImage);
            $("#gifs-appear-here").prepend(gifDiv);
        }
    });
};

function getTrending() {
    $('#gif-display-text').html("Trending Gifs!");
    let queryURL = "https://api.giphy.com/v1/gifs/trending?q=&limit=5&rating=pg-13&api_key=G56yi3BK55QO0wjAO1tKVY2Vy4xkDTZH";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        let results = response.data;

        for (i = 0; i < results.length; i++) {
            let gifDiv = $(`<div class="m-2">`);
            let gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height.url);
            gifDiv.append(gifImage);
            $("#gifs-appear-here").prepend(gifDiv);
        }
    });
};

function getRandom() {
    $('#gif-display-text').html("Random Gifs!");
    for (i = 0; i < 5; i++) {
        let queryURL = "https://api.giphy.com/v1/gifs/random?q=&rating=pg-13&api_key=G56yi3BK55QO0wjAO1tKVY2Vy4xkDTZH";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            
            let results = response.data;

            let gifDiv = $(`<div class="m-2">`);
            let gifImage = $("<img>");
            gifImage.attr("src", results.images.fixed_height.url);
            gifDiv.append(gifImage);
            $("#gifs-appear-here").prepend(gifDiv);
        });
    }
};

$('#custom-search').on('click', function (event) {
    event.preventDefault();
    let searchObject = {
        searchWord: $("#search-text").val().trim(),
        limit: $('#limit-return').val(),
        offset: 0,
        rating: $("#rating-return").val(),
    };
    lastSearchObject = searchObject;
    lastSearchObject.offset = parseInt(lastSearchObject.offset) + parseInt(lastSearchObject.limit);

    $("form").trigger("reset");

    getGifs(searchObject);
    
    $('#search-form-button').trigger('click')
    $('#add-to-favs').attr('disabled', false)
    $('#more').attr('disabled', false);
});


$("select").on('click', function (event) {
    event.stopPropagation();
});

$('#random').on('click', function () {
    getRandom();
});

$('#clear').on('click', function () {
    $("#gifs-appear-here").empty();
    $('#gif-display-text').empty();
    $('#more').attr('disabled', true);
    $('#more').text('More!');
    $('#add-to-favs').attr('disabled', true);

});

$('#trending').on('click', function () {
    getTrending();
});

$('#more').on('click', function () {
    getGifs(lastSearchObject);
})

$('#add-to-favs').on('click', function () {
    $('#dropdown-favorites').attr('disabled', false);
    let topic = lastSearchObject.searchWord;
    topicsArray.push(topic);
    renderButtons();
})

//Initialize the page with the unusable buttons disabled, 
//call getRandom to load rndom gifs to welcome the user
$('#more').attr('disabled', true);
$('#dropdown-favorites').attr('disabled', true);
$('#add-to-favs').attr('disabled', true);
getRandom();
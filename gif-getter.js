
const topicsArray = [];
let lastSearchObject;

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
    console.log(lastSearchObject);

    $("form").trigger("reset");

    console.log(searchObject);
    getGifs(searchObject);
    $('#search-form-button').trigger('click')

});



function renderButtons() {
    $("#button-container").empty();
    for (i = 0; i < topicsArray.length; i++) {
        let button = $(`<button type="button" class="dropdown-item">`);
        button.attr("data-topic", topicsArray[i][0]);
        button.attr("data-limit", 10);
        button.attr("data-offset", topicsArray[i][1]);
        button.attr("data-rating", "g");
        button.text(topicsArray[i][0]);
        $("#button-container").append(button);
    }
    $(".dropdown-item").on("click", function () {
        let offset = parseInt($(this).attr("data-offset"));
        let limit = parseInt($(this).attr("data-limit"));
        console.log("offset: " + offset);
        console.log("limit: " + limit);
        let searchObject = {
            searchWord: $(this).attr("data-topic"),
            limit: $(this).attr("data-limit"),
            offset: $(this).attr("data-offset"),
            rating: $(this).attr("data-rating")
        };
        getGifs(searchObject);
        offset = offset + limit;
        $(this).attr("data-offset", offset);
    });
};

function getGifs(queryObject) {
    let topic = queryObject.searchWord;
    let offset = queryObject.offset;
    let limit = parseInt(queryObject.limit);
    let rating = queryObject.rating;

    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        topic + "&limit=" + limit + "&offset=" + offset + "&rating=" + rating + "&api_key=G56yi3BK55QO0wjAO1tKVY2Vy4xkDTZH";

    lastSearchObject = queryObject;
    lastSearchObject.offset = parseInt(lastSearchObject.offset) + parseInt(lastSearchObject.limit);
    console.log(lastSearchObject);

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

    let queryURL = "https://api.giphy.com/v1/gifs/trending?q=&limit=5&api_key=G56yi3BK55QO0wjAO1tKVY2Vy4xkDTZH";

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
}
function getRandom() {
    for (i = 0; i < 5; i++) {
        let queryURL = "https://api.giphy.com/v1/gifs/random?q=&api_key=G56yi3BK55QO0wjAO1tKVY2Vy4xkDTZH";
        // lastQueryUrl = queryURL;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response)
            let results = response.data;

            let gifDiv = $(`<div class="m-2">`);
            let gifImage = $("<img>");
            gifImage.attr("src", results.images.fixed_height.url);
            gifDiv.append(gifImage);
            $("#gifs-appear-here").prepend(gifDiv);
            // }
        });
    }
}

$('#random').on('click', function () {
    getRandom();
});
$('#clear').on('click', function () {
    $("#gifs-appear-here").empty();
});
$('#trending').on('click', function () {
    getRandom();
});
$('#more').on('click', function () {
    getGifs(lastSearchObject);
})

$('#add-to-favs').on('click', function () {
    $('#dropdown-favorites').attr('disabled', false);
    let topic = [lastSearchObject.searchWord, lastSearchObject.limit];
    console.log(topic);
    topicsArray.push(topic);
    renderButtons();
})

$('#dropdown-favorites').attr('disabled', true);
renderButtons();

getRandom();

$('#navbarNavDropdown').on('show.bs.collapse', function () {
    alert('booyah')
})
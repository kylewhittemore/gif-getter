
const topicsArray = [];

$('#custom-search').on('click', function (event) {
    event.preventDefault();
    let searchObject = {
        searchWord: $("#search-text").val().trim(),
        limit: $('#limit-return').val(),
        offset: 0,
        rating: $("#rating-return").val(),
    };
    let keepSearch = $('#keep-search').is(":checked");

    if (keepSearch) {
        $('#dropdown-favorites').attr('disabled', false);
        let topic = [searchObject.searchWord, searchObject.limit];
        console.log(topic);
        topicsArray.push(topic);
        renderButtons();
    }
    $("form").trigger("reset");
    console.log(keepSearch);
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

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        let results = response.data;
        // Looping through each result item
        for (i = 0; i < results.length; i++) {
            let gifDiv = $(`<div class="m-2">`);
            let p = $("<p>").text("Rating: " + results[i].rating);
            let gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height.url);
            gifDiv.append(gifImage);
            gifDiv.append(p);
            $("#gifs-appear-here").prepend(gifDiv);
        }
    });
};

$('#dropdown-favorites').attr('disabled', true);
renderButtons();

const topicsArray = ["The Office", "The Simpsons", "Family Matters", "Married with Children", "Seinfeld", "Curb Your Enthusiasm"];

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
        let topic = searchObject.searchWord;
        console.log(topic);
        topicsArray.push(topic);
        renderButtons();
    }
    $("form").trigger("reset");
    console.log(keepSearch);
    console.log(searchObject);
    getGifs(searchObject);
});

function renderButtons() {
    $("#button-container").empty();
    for (i = 0; i < topicsArray.length; i++) {
        let button = $(`<button type="button" class="btn m-1 btn-success">`);
        button.attr("data-topic", topicsArray[i]);
        button.attr("data-limit", 10);
        button.attr("data-offset", 0);
        button.attr("data-rating", "g");
        button.text(topicsArray[i]);
        $("#button-container").append(button);
    }
    $("button").on("click", function () {
        let searchObject = {
            searchWord: $(this).attr("data-topic"),
            limit: $(this).attr("data-limit"),
            offset: $(this).attr("data-offset"),
            rating: $(this).attr("data-rating")
        };
        getGifs(searchObject);
    });
};


function getGifs(queryObject) {
    let topic = queryObject.searchWord;
    let offset = queryObject.offset;
    let limit = parseInt(queryObject.limit);
    let rating = queryObject.rating;
    
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    topic + "&limit=" + limit + "&offset=" + offset + "&rating=" + rating + "&api_key=G56yi3BK55QO0wjAO1tKVY2Vy4xkDTZH";
    
    offset = offset + 10;
    queryObject.offset = offset;
    
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

renderButtons();
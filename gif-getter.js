$('#custom-search').on('click', function () {
    let searchObject = {
        searchWord: $("#search-text").val().trim(),
        limit: $('#limit-return').val(),
        offset: 0,
        rating: $("#rating-return").val(),
    };

    getGifs(searchObject);
});

function getGifs(queryObject) {
    let topic = queryObject.searchWord;
    let offset = queryObject.offset;
    let limit = parseInt(queryObject.limit);
    let rating = 'r'
    console.log(rating);

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

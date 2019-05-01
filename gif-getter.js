const topicsArray = ["The Office", "The Simpsons", "Family Matters", "Married with Children", "Seinfeld", "Curb Your Enthusiasm"];

$


$("#add-topic").on("click", function (event) {
    event.preventDefault();
    let topic = $("#topic-input").val().trim();
    topicsArray.push(topic);
    $("form").trigger("reset");
    renderButtons();
});

function renderButtons() {
    $("#button-container").empty();
    for (i = 0; i < topicsArray.length; i++) {
        let button = $(`<button type="button" class="btn m-1 btn-success">`);
        button.attr("data-topic", topicsArray[i]);
        button.attr("data-offset", 0)
        button.text(topicsArray[i]);
        $("#button-container").append(button);
    }
    $("button").on("click", getGifs);
};

function getGifs() {
    let topic = $(this).attr("data-topic");
    let offset = parseInt($(this).attr("data-offset"));
    console.log(offset);
    console.log(topic);

    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        topic + "&limit=10&offset=" + offset + "&api_key=G56yi3BK55QO0wjAO1tKVY2Vy4xkDTZH";

    offset = offset + 10;
    $(this).attr("data-offset", offset)

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

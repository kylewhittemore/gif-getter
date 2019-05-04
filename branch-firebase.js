let globalGif;
let favGifsArray = [];

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCSnA5GcP_3dW31WUPMHasTDGWTtOqcL7I",
    authDomain: "practice-project-ea1e7.firebaseapp.com",
    databaseURL: "https://practice-project-ea1e7.firebaseio.com",
    projectId: "practice-project-ea1e7",
    storageBucket: "practice-project-ea1e7.appspot.com",
    messagingSenderId: "112440563230",
    appId: "1:112440563230:web:609f7215fe59e1f6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Create a variable to reference the database
var database = firebase.database();


database.ref().on("value", function (snapshot) {
    console.log(snapshot.val());
    favGifsArray = snapshot.val();
    favGifsArray.push(globalGif);

}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});



function getRandom() {

    let queryURL = "https://api.giphy.com/v1/gifs/random?q=&rating=pg-13&api_key=G56yi3BK55QO0wjAO1tKVY2Vy4xkDTZH";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        let results = response.data;

        favGifsArray.push(results.images.fixed_height.url)

        database.ref().set({
            favGifsArray: favGifsArray
        })

        console.log(database.favGifsArray);

        let gifDiv = $(`<div class="m-2">`);
        let gifImage = $("<img>");
        gifImage.attr("src", results.images.fixed_height.url);
        gifDiv.append(gifImage);
        $("#gifs-appear-here").prepend(gifDiv);

    });
}

getRandom();
getRandom();


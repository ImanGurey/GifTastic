$(document).ready(function () {
    var movies = ["Brides Maid", "The Hangover", "Dumb and Dumber", "Rush Hour 2", "The Wedding Crashers", "Anchorman", "Coming To America", "Next Friday"];

    // Add buttons for original movies array
    function renderButtons() {
        $("#movie-buttons").empty();
        for (i = 0; i < movies.length; i++) {
            $("#movie-buttons").append("<button class='btn btn-success' data-movie='" + movies[i] + "'>" + movies[i] + "</button>");
        }
    }

    renderButtons();

    // Adding a button for movie entered
    $("#add-movie").on("click", function () {
        event.preventDefault();
        var movie = $("#movie-input").val().trim();
        movies.push(movie);
        renderButtons();
        return;
    });


    // Getting gifs from api... onto html
    $("button").on("click", function () {
        var movie = $(this).attr("data-movie");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            movie + "&api_key=RF3Ji1uUPP7dRc7qpIPZNQ4FIVtbI57r"

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            var results = response.data;
            $("#movies").empty();
            for (var i = 0; i < results.length; i++) {
                var movieDiv = $("<div>");
                var p = $("<p>").text("Rating: " + results[i].rating);
                var movieImg = $("<img>");

                movieImg.attr("src", results[i].images.original_still.url);
                movieImg.attr("data-still", results[i].images.original_still.url);
                movieImg.attr("data-animate", results[i].images.original.url);
                movieImg.attr("data-state", "still");
                movieImg.attr("class", "gif");
                movieDiv.append(p);
                movieDiv.append(movieImg);
                $("#movies").append(movieDiv);
            }
        });
    });

    function changeState() {
        var state = $(this).attr("data-state");
        var animateImage = $(this).attr("data-animate");
        var stillImage = $(this).attr("data-still");

        if (state == "still") {
            $(this).attr("src", animateImage);
            $(this).attr("data-state", "animate");
        }

        else if (state == "animate") {
            $(this).attr("src", stillImage);
            $(this).attr("data-state", "still");
        }
    }





//     $(document).on("click", "#input", displayImg);
    $(document).on("click", ".gif", changeState);

});

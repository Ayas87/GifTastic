var topics = [];

$('.submit-btn').on('click', function() {
    topics.push($('#topic').val())
    $("form-group").trigger("reset");
    renderBtns();
})

function renderBtns() {
    $('.append-buttons').empty();
    for (i = 0; i < topics.length; i++) {
        var renderBtns = $('<button class="btn btn-info">')
        renderBtns.text(topics[i]);
        $('.append-buttons').append(renderBtns);
        $(this).on('click', function() {
            var btnTopic = renderBtns.text();

            function ajaxCall() {
                $.ajax({
                    url: "https://api.giphy.com/v1/gifs/search?",
                    method: "GET",
                    data: {
                        api_key: "dc6zaTOxFJmzC",
                        q: btnTopic,
                        rating: "pg",
                        limit: 10,
                    }
                }).done(function(response) {
                    appendGifs(response);
                })
            };
            ajaxCall();
        })
    }
}

function appendGifs(response) {
    $(".append-gifs").empty();
    for (i = 0; i < 10; i++) {
        var gifDiv = $("<div class='col-lg-6 text-center'> </div>");
        var rating = $("<h2>").append("Rating: " + response.data[i].rating);
        var gifImage = $("<img>").attr("src", response.data[i].images.fixed_height_downsampled.url);
        gifImage.attr("data-animated", response.data[i].images.fixed_height_downsampled.url);
        gifImage.attr("data-still", response.data[i].images.fixed_height_still.url);
        gifImage.attr("data-status", "animated");
        gifDiv.append(rating);
        gifDiv.append(gifImage);
        $(".gifArea").append(gifDiv);
    }
}


// app key dc6zaTOxFJmzC

var topics = ['doge','shibe','woof'];

$('.submit-btn').on('click', function() {
	if($('#topic').val().length > 1) {
    topics.push($('#topic').val())
    $('#topic').val("");
    $("form-group").trigger("reset");
    renderBtns();
}
})

function renderBtns() {
    $('.append-buttons').empty();
    for (i = 0; i < topics.length; i++) {
        var renderBtns = $('<button class="rendered btn btn-info" value="'+topics[i]+'"">')
        renderBtns.text(topics[i]);
        $('.append-buttons').append(renderBtns);
    }
    $('.rendered').on('click', function() {
		ajaxCall($(this).text());
	})
}

function ajaxCall(input) {
	var btnTopic = input;
	// console.log('test1 : ' + btnTopic);
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

function appendGifs(response) {
    $(".append-gifs").empty();
    for (i = 0; i < 10; i++) {
        var gifDiv = $('<div class="col-lg-6 text-center">');
        var rating = $('<h2>').append('Rating: ' + response.data[i].rating);
        var gifImage = $('<img class="topicGif">').attr('src', response.data[i].images.fixed_height_downsampled.url);
        gifImage.attr("data-animated", response.data[i].images.fixed_height_downsampled.url);
        gifImage.attr('data-still', response.data[i].images.fixed_height_still.url);
        gifImage.attr('data-status', 'animated');
        gifDiv.append(rating);
        gifDiv.append(gifImage);
        $(".append-gifs").append(gifDiv);
    }
    $('.topicGif').on('click', function() {
    	    pauseClick(this);
    	})
}

function pauseClick(input) {
		if ($(input).attr('data-status') == 'animated') {
            $(input).attr('src', $(input).attr('data-still'));
            $(input).attr('data-status', 'still');
        } else {
            $(input).attr('src', $(input).attr('data-animated'));
            $(input).attr('data-status', 'animated');
        }
	
}

renderBtns();
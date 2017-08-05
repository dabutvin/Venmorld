var ids = {};
var lastMessage = "";

$(function() {
	fire();
	setInterval(fire, 3000);
})

function fire() {
	$.ajax({
		url: '/api/'
	}).done(function(data) {
		if(ids[data.id]) {
			// already captured
		} else {

			ids[data.id] = true;
			if(lastMessage) {
				$('.messages').prepend('<li>' + lastMessage +'</li>');
			}

			$('.picture').attr('src', data.picture);
			$('.message').html(data.message);
			lastMessage = data.message;
		}
	});
}
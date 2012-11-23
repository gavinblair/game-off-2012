var context;
var connection;

$(document).ready(function(){

	// if user is running mozilla then use it's built-in WebSocket
	window.WebSocket = window.WebSocket || window.MozWebSocket;

	// if browser doesn't support WebSocket, just show some notification and exit
	if (!window.WebSocket) {
		console.log( 'Sorry, but your browser doesn\'t support WebSockets.');
		return;
	}


	// open connection
	connection = new WebSocket(websocketurl);


	

	$("#loginbutton").click(function(){ 
		if($("#name").val().length > 0) { 
			localStorage.name = $("#name").val();
			$("#login").modal('hide');
			login();
		} else { 
			$("#name").focus(); 
		}
	});
	

	$("#start").click(function(){
		//ready. disable button.
		$("#start span").text("!");

		$(this).removeClass("btn-primary").attr("disabled", "disabled");

		//send ready message
		connection.send(JSON.stringify({
			type: 'ready',
			data: localStorage.name
		}));

	});


	connection.onopen = function () {
		console.log('connected!');

		if(localStorage.name == undefined) {
			$('#login').modal({ backdrop: 'static' });
		} else {
			login();
		}
	};
	connection.onerror = function (error) {
		// just in there were some problems with conenction...
		console.log(error);
	};

	$("#msg").keydown(function(e){
		if(e.keyCode == 13) {
			var msg = localStorage.name+": "+$(this).val();
			$(this).val("");

			connection.send(JSON.stringify({
				type: 'msg',
				data: msg
			}));
		}
	});

});

function login(){

	$("#players").append("<li>"+localStorage.name+"</li>");

	connection.send(JSON.stringify({
		type: 'login',
	  	data: localStorage.name
	}));

	// most important part - incoming messages
	connection.onmessage = function (message) {
		// try to parse JSON message. Because we know that the server always returns
		// JSON this should work without any problem but we should make sure that
		// the massage is not chunked or otherwise damaged.
		try {
			var json = JSON.parse(message.data);
		} catch (e) {
			console.log('This doesn\'t look like a valid JSON: ', message.data);
			return;
		}

		console.log(json);
		if (json.type === 'connect') {
			//got a list of players
			for(var i in json.data){
				$("#players").append("<li>"+json.data[i]+"</li>");
			}
		} else if (json.type == 'msg') {
			$("#chat").append(json.data+"\n");
			var psconsole = $('#chat');
		    psconsole.scrollTop(
		        psconsole[0].scrollHeight - psconsole.height()
		    );
		} else if (json.type === 'update') { // it's a single message
			
		} else if (json.type == 'remove'){
			
		}else {
			console.log('Hmm..., I\'ve never seen JSON like this: ', json);
		}
	};
}
/**
* Globals
**/

var port = 1337;
var NumOfObjects = 0;
var clients = [];
var objs = [];

var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function(request, response){//HTTP started
	
});

server.listen(port, function(){						//Start listening on HTTP
	console.log("Listening on port " + port + "...");
});

var wss = new WebSocketServer({httpServer: server});//Start websocket from http

wss.on('request',function (request){				//New Client Connecting
	var connection = request.accept(null, request.origin);
	console.log('Request accepted from ' + request.origin);
	
	clients.push(connection);
	
	connection.sendUTF(JSON.stringify({type:'init', data: objs}));
	
	NumOfObjects ++;
	
	console.log(clients.length-1);
	
	var obj = {};
	obj['client'] = clients.length-1;
	obj['x'] = 50 + (50 * clients.length);
	obj['y'] = 50 + (50 * clients.length);
	obj['sprite'] = 'player';
	
	objs.push(obj);
	
	updateClients(obj);
	
	//Message
	connection.on('message', function onMessage(message){
		if (message.type === 'utf8') {
			var json = JSON.parse(message.utf8Data);
			
			if (json.type == "")
			{
			
			}
			else if (json.type == "")
			{
			
			}
		}
	});
	
	connection.on('close', function () {
		
		var id = -1;
		for (var i=0; i<clients.length;i++)
		{
			if (clients[i] == this)
			{
				id = i;
			}
		}
		
		clients.splice(id,1);
		objs.splice(id,1);
		
		for (var i = 0; i<clients.length; i++)
		{
			var connection = clients[i];
			console.log('removing ' + id);
			connection.sendUTF(JSON.stringify({type:'remove', data: id}));
		}
	});
});

function updateClients(obj)
{
	for (var i = 0; i<clients.length; i++)
	{
		var connection = clients[i];
		connection.sendUTF(JSON.stringify({type:'update', data: obj}));
	}
}
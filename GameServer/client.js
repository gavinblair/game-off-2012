/**
* Globals
**/

var port = 1337;
var NumOfObjects = 0;
var clients = [];

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
	
	//clients.push(connection);
	
	connection.sendUTF(JSON.stringify({type:'connect', data: getClientList()}));
	
	//Message
	connection.on('message', function onMessage(message){
		if (message.type === 'utf8') {
			var json = JSON.parse(message.utf8Data);
			
			if (json.type == "login")
			{
				//CLIENT SENT NAME, CREATE CLIENT
					var client = {};
					client['conn'] = this;
					client['id'] = json.data;
					client['ready'] = false;
					
					clients.push(client);
					
					msgClients(client.id + " has connected!");
					updateClients();
				
					console.log(json.data + " has joined the game.");
			}
			else if (json.type == 'ready')
			{
				console.log(json.data + " is ready.")
				msgClients(json.data + " is ready.");
				clients[json.data].ready = true;
				updateClients();
			}
			else if (json.type == "msg")
			{
				console.log(json.data);
				
				msgClients(json.data);
			}
		}
	});
	
	connection.on('close', function () {
		for (var i in clients)
		{
			var cli = clients[i];
			if (cli.conn == this)
			{
				msgClients(cli.id + ' has disconnected.');
				console.log(cli.id + " has disconnected");
				clients.splice(i,1);
				updateClients(cli.id);
				break;
			}
		}
		
		
	});
});

function getClientList(clientToSend){
	var clientList = {};
	
	for (var i in clients)
	{
		clientList[clients[i].id] = {};
		clientList[clients[i].id]['ready'] = clients[i].ready;
	}
	
	return clientList;
}

function msgClients(message)
{
	for (var i in clients)
	{
		var oc = clients[i];
		oc.conn.sendUTF(JSON.stringify({type:'msg', data: message}));
	}
}

function updateClients()
{
	for (var i in clients)
	{
		var oc = clients[i];
		oc.conn.sendUTF(JSON.stringify({type:'update', data: getClientList()}));
	}
}
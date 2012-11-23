/**
* GLOBAL VARIABLES
**/

var port = 1337;									//Port for connections
var clients = [];									//Client List
var objects = {};									//Dynamic Object List

var th = require('threads_a_gogo').create();		//Box2D Thread
var WebSocketServer = require('websocket').server;	//WebSocketServer Class
var http = require('http');							//HTTP object

th.load(__dirname + "/Box2dWeb-2.1.a.3.min.js"); 	//Load the box2d code to the thread
th.load(__dirname + "/g_box2D.js");					//Load our box2d thread code to the thread

//th.eval('init()');									//Initialize our box2d world

th.on('updateObj', function(objStr){				//Object is updated
	//parse obj from string
	var obj = JSON.parse(objStr);
	
	pushToClients(obj);								//Update object on client
	
	objects[obj.id] = obj;							//Update object in object list (for new clients)
});

th.on('msg', function(msg){ console.log(msg); });

function pushToClients(obj)							//PUSH NEW UPDATE TO CLIENT(S)
{
	for (var i=0; i < clients.length; i++)
	{
		var conn = clients[i];
		
		conn.sendUTF(JSON.stringify({type:'updateObj', data:obj}));
		console.log(obj.id + ' has been sent to client');
	}
}

var server = http.createServer(function(request, response){//HTTP started
	
});

server.listen(port, function(){						//Start listening on HTTP
	console.log("Listening on port " + port + "...");
});

var wss = new WebSocketServer({httpServer: server});//Start websocket from http

wss.on('request',function (request){				//New Client Connecting
	console.log('bing!');
	var connection = request.accept(null, request.origin);
	console.log('Request accepted from ' + request.origin);
	
	clients.push(connection);
	
	th.eval('init()');
	connection.sendUTF(JSON.stringify({type:'init', data:objects})); //Send client all current objects
	
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
});
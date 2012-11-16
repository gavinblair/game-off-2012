
var physicsThread = require('threads_a_gogo').create();

var sprites = [];

physicsThread.load(__dirname + "/Box2dWeb-2.1.a.3.min.js");
physicsThread.load(__dirname + "/b2df.js");

physicsThread.on('objUpdate', function(id, propStr, updateStr){
	var prop = JSON.parse(propStr);
	sprites.push(prop);
});

physicsThread.on('msg', function (msg){
	console.log(msg);
});

console.log("starting");
physicsThread.eval("init()");

/**
* Web Server Stuff
**/

var WebSocketServer = require('websocket').server;
var http = require('http');

var port = 1337;
var clients = [];

var server = http.createServer(function(request, response){
	
});

server.listen(port, function(){
	console.log("Listening on port " + port + "...");
});

var wss = new WebSocketServer({httpServer: server});

wss.on('request', function(request){
	var connection = request.accept(null, request.origin);
	console.log('Request accepted from ' + request.origin);
	
	//Send world info
	if (sprites.length > 0)
	{
		connection.sendUTF(JSON.stringify( { type: 'initWorld', data: sprites} ));
	}
	
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
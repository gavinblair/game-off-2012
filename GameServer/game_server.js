
var physicsThread = require('threads_a_gogo').create();

var sprites = [];

physicsThread.load(__dirname + "/Box2dWeb-2.1.a.3.min.js");
physicsThread.load(__dirname + "/b2df.js");

//physicsThread.on('objUpdate', function(id, propStr, updateStr){
//	var prop = JSON.parse(propStr);
//	sprites.push(prop);
//});

var st_obj = [];
var dy_obj = [];
physicsThread.on('drawall', function(st_objStr, dy_objStr){
	console.log('drawall');
	st_obj = JSON.parse(st_objStr);
	dy_obj = JSON.parse(dy_objStr);
	updateObjects(true);
});

physicsThread.on('drawdynamic', function(dy_objStr){
	console.log('drawall');
	dy_obj = JSON.parse(dy_objStr);
	updateObjects(false);
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

var clients = [];

function updateObjects(all){
	for (var i=0; i<clients.length;i++)
	{
		var connection = clients[i];
		if (all)
		{
			var data = { st_obj: st_obj, dy_obj: dy_obj};
			connection.sendUTF(JSON.stringify( { type: 'updateAll', data: data } ));
		}
		else
		{
			connection.sendUTF(JSON.stringify( { type: 'update', data: dy_obj } ));
		}
	}
};

wss.on('request', function(request){
	var connection = request.accept(null, request.origin);
	console.log('Request accepted from ' + request.origin);
	
	clients.push(connection);
	
	//Send world info
	console.log('drawall sent')
	physicsThread.emit('drawall');
	
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

var physicsThread = require('threads_a_gogo').create();

physicsThread.load(__dirname + "/Box2dWeb-2.1.a.3.min.js");
physicsThread.load(__dirname + "/b2df.js");

var st_obj = {};
var dy_obj = {};

physicsThread.on('createNewObject', function(objStr){
	var obj = JSON.parse(objStr);
	console.log("**" + objStr);
	
	if(obj.type == 0)
	{
		st_obj[obj.id] = obj;
	}
	else if(obj.type == 2)
	{
		dy_obj[obj.id] = obj;
	}
});

physicsThread.on('updateObject', function(objStr){
	
	var prop = JSON.parse(objStr);
	
	if (prop.type == 0)
	{
		var obj = st_obj[prop.id];
		obj.pos = prop.pos;
		
		st_obj[prop.id] = obj;
		updateClients(obj);
	}
	else if (prop.type == 2)
	{
		var obj = dy_obj[prop.id];
		obj.pos = prop.pos;
		
		dy_obj[prop.id] = obj;
		updateClients(obj);
	}
	
	
});

var clients = [];

function updateClients(obj)
{
	for (var i=0; i<clients.length; i++)
	{
		var connection = clients[i];
		connection.sendUTF(JSON.stringify( { type: 'updateObject', data: obj } ));
	}
}

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
	
	clients.push(connection);
	
	//Send world info
	if (Object.keys(st_obj).length > 0)
	{
		console.log("sending statics");
		connection.sendUTF(JSON.stringify( { type: 'updateStatics', data: st_obj } ));
	}
	
	if (Object.keys(dy_obj).length > 0)
	{
		console.log("sending dynamics");
		connection.sendUTF(JSON.stringify( { type: 'updateDynamics', data: dy_obj } ));
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
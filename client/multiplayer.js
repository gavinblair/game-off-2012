//var interval = setInterval('postMsg()', 1000);
//var count = 0;

//function postMsg()
//{
//	self.postMessage("hello from worker");
//	count ++;
//	if (count == 5)
//		clearInterval(interval);
//}

var conn;

self.addEventListener('message', receiveMessage, false);

function receiveMessage(e)
{
	if (e.data == "connect")
	{
		conn = new WebSocket('ws://gamedev.lab.unlab.ca:8000');
		conn.onmessage = function (ce) {
			self.postMessage(ce.data);
		};
		
		conn.onopen = function (ce) {
			postMessage("Connected to server!");
		};
		
		conn.onclose = function (ce) {
			postMessage("Disconnected from server!1");
		}
		
		conn.onerror = function (ce) {
			postMessage(e.data);
		};
	}
	else if (e.data == "disconnect")
	{
		conn = null;
		postMessage("Disconnected from server!2");
	}
	else if (e.data == "MSG|Hello World")
	{
		conn.send(e.data);
	}
}
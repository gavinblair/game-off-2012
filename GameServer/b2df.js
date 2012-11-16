var running;
var world;

var b2d_obj = new Array();

var st_obj = {};
var dy_obj = {};

var PPP = 100;

function init()
{
	var b2Vec2 = Box2D.Common.Math.b2Vec2;
   	var b2BodyDef = Box2D.Dynamics.b2BodyDef;
   	var b2Body = Box2D.Dynamics.b2Body;
   	var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
   	var b2Fixture = Box2D.Dynamics.b2Fixture;
  	var b2World = Box2D.Dynamics.b2World;
   	var b2MassData = Box2D.Collision.Shapes.b2MassData;
   	var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
   	var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
   	var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;

	world = new b2World(new b2Vec2(0,10.0), true);
	running = true;

	var bodyDef = new b2BodyDef();
	var fixDef = new b2FixtureDef();	

	bodyDef.type = b2Body.b2_staticBody;

	fixDef.shape = new b2PolygonShape();
	fixDef.shape.SetAsBox(640.0/PPP, 30.0/PPP);

	bodyDef.position.x = 0.0;
	bodyDef.position.y = (480.0 - 30.0)/PPP;

	var ground = world.CreateBody(bodyDef);
	ground.CreateFixture(fixDef);

	initObj('ground', ground, 640.0, 30.0);

	thread.emit('msg', 'test');

	//Update Loop
	while (running)
	{
		world.Step(
			1/60	//frame-rate
			, 10	//velocity iterations
			, 10	//position iterations
		);
	}
}

function initObj(id, body, width, height){
	var prop = {};
	prop["id"] = id;
	prop["pos"] = body.GetPosition();
	prop["width"] = width/PPP;
	prop["height"] = height/PPP;
		
	if (body.GetType() = b2Body.b2_staticBody)
	{
		st_obj[prop["id"]] = prop;
	}
	else if (body.GetType() = b2Body.b2_dynamicBody)
	{
		dy_obj[prop["id"]] = prop;
	}
}

function updateObject(id, body){
	
	if (body.GetType() = b2Body.b2_staticBody)
	{
		var prop = st_obj[id];
		prop["pos"] = body.GetPosition();
		
		st_obj[prop["id"]] = prop;
	}
	else if (body.GetType() = b2Body.b2_dynamicBody)
	{
		var prop = dy_obj[id];
		prop["pos"] = body.GetPosition();
		
		dy_obj[prop["id"]] = prop;
	}
}

function updateAll(){
	thread.emit('drawall'
		, JSON.stringify(st_obj)
		, JSON.stringify(dy_obj)
	);
}

function updateDynamic(){
	thread.emit('drawdynamic'
		, JSON.stringify(dy_obj)
	);
}

thread.on('drawall', function(){
	updateAll();
});

thread.on('drawdynamic', function(){
	updateDynamic();
});

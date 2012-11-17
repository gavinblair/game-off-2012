var running;
var world;

var b2d_obj = {};

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
	
	thread.emit('msg', 'creating ground');
	createNewObject('ground', ground, 640, 30);

	bodyDef = new b2BodyDef();
	fixDef = new b2FixtureDef();	

	bodyDef.type = b2Body.b2_dynamicBody;

	fixDef.shape = new b2PolygonShape();
	fixDef.shape.SetAsBox(100.0/PPP, 100.0/PPP);

	bodyDef.position.x = 100.0/PPP;
	bodyDef.position.y = 100.0/PPP;

	var box = world.CreateBody(bodyDef);
	box.CreateFixture(fixDef);
	
	thread.emit('msg', 'creating box');
	createNewObject('box', box, 100, 100);
	
	thread.emit('msg',JSON.stringify(running));
	//Update Loop
	while (running)
	{
		
		world.Step(
			1/60	//frame-rate
			, 10	//velocity iterations
			, 10	//position iterations
		);
		
		updateObject('box');
	}
	
	thread.emit('msg', 'done b2df');
}

function createNewObject(id, body, width, height)
{
	var prop = {};
	prop['id'] = id;
	prop['type'] = body.GetType();
	prop['pos'] = body.GetPosition();
	prop['width'] = width/PPP;
	prop['height'] = height/PPP;
	
	b2d_obj[id] = body;
	
	thread.emit('createNewObject', JSON.stringify(prop));
}

function updateObject(id)
{
	var body = b2d_obj[id];

	var prop = {};
	prop['id'] = id;
	prop['type'] = body.GetType();
	prop['pos'] = body.GetPosition();
	
	thread.emit('updateObject', JSON.stringify(prop));
}
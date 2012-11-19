var running;
var world;

var b2d_obj = {};

var PPM = 100;

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
	
	var bodyDef = new b2BodyDef();
	var fixDef = new b2FixtureDef();
	
	//CREATE GROUND
	bodyDef.type = 0;
	
	bodyDef.position.x = 0;
	bodyDef.position.y = (480-30)/PPM;
	
	fixDef.shape = new b2PolygonShape();
	fixDef.shape.SetAsBox(640/PPM, 30/PPM);
	
	var ground = world.CreateBody(bodyDef);
	ground.CreateFixture(fixDef);
	
	updateObject('ground', ground);
	
	//CREATE BODY
	bodyDef.type = 2;
	
	bodyDef.position.x = 50/PPM;
	bodyDef.position.y = 50/PPM;
	
	fixDef.shape = new b2PolygonShape();
	fixDef.shape.SetAsBox(100/PPM, 100/PPM);
	
	var box = world.CreateBody(bodyDef);
	box.CreateFixture(fixDef);
	
	updateObject('box', box);
	
	run();
}

function run(){
	running = true;
	
	//Update Loop
	while (running)
	{
		
		world.Step(
			1/60	//frame-rate
			, 10	//velocity iterations
			, 10	//position iterations
		);
		
		for (var id in b2d_obj)
		{
			var obj = b2d_obj[id];
			
			if (obj.GetType() == 2)
			{
				if (!obj.IsAwake())
				{
					var client = {};
					client['id'] = id;
					client['pos'] = obj.GetPosition();
					
					thread.emit('updateObj', JSON.stringify(client));
				}
			}
		}
	}
}

function updateObject(id, body){
	b2d_obj[id] = body;
	
	var obj = {};
	obj['id'] = id;
	obj['pos'] = body.GetPosition();
	
	thread.emit('updateObj', JSON.stringify(obj));
}
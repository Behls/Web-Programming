/***
 * BOX 2D Web Definintions
 */

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

/*****
* Objects for Destruction
*/

var destroylist = []; // Empty List at start

/*****
* Define Canvas and World
*/
 var WIDTH=800;
 var HEIGHT=600;
 var SCALE=30;
 var world = new b2World(
 
 new b2Vec2(0,9.81),
     true
 );

/**
* World objects
*/
 
 var ground = defineNewStatic(1.0,0.5,0.2,(WIDTH/2),HEIGHT,(WIDTH/2),30,"ground",0);
 var leftWall = defineNewStatic(1.0,0.5,0.2,5, HEIGHT, 20, HEIGHT,"leftwall",0);
 var rightWall = defineNewStatic(1.0,0.5,0.2,WIDTH-5,HEIGHT,20,HEIGHT,"rightwall",0);

//  platforms
var plat1 = defineNewStatic(1.0,0.5,0.1,520, 250, 250, 5,"plat1",-0.2);
var plat2 = defineNewStatic(1.0,0.5,0.1,300,100,250,5,"plat2",0.2);
var plat3 = defineNewStatic(1.0,0.5,0.1,200, 450, 250, 5,"plat3",0.2);

// can do it outside the object or pass in an angle value to the static function
// plat1.GetBody().SetAngle(-0.2);
// plat2.GetBody().SetAngle(0.2);
// plat3.GetBody().SetAngle(0.3);

 var box = defineNewDynamicCircle(1.0,1.0,0.5,200,200,30,40,"circle3");
 var circle = defineNewDynamicCircle(1.0,1.0,0.5,400,100,20,"circle");
 var circle2 = defineNewDynamicCircle(1.0,1.0,0.5,380,110,10,"circle2");

/*
Debug Draw
*/
 var debugDraw = new b2DebugDraw();
 debugDraw.SetSprite(
     document.getElementById("b2dcan").getContext("2d")
 );
 debugDraw.SetDrawScale(SCALE);
 debugDraw.SetFillAlpha(0.3);
 debugDraw.SetLineThickness(1.0);
 debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
 world.SetDebugDraw(debugDraw);

// Update World Loop
 function update() {
     world.Step(
         1/60, // framerate
         10, // velocity iterations
         10 // position iterations
     );
     world.DrawDebugData();
     world.ClearForces();

     for(var i in destroylist) {
         world.DestroyBody(destroylist[i]);
     }
     destroylist.length = 0;

     window.requestAnimationFrame(update);
 }

 window.requestAnimationFrame(update);

/*****
* Listeners
*/
 var listener = new Box2D.Dynamics.b2ContactListener;

     listener.BeginContact = function(contact) {
     console.log("Begin Contact:"+contact.GetFixtureA().GetBody().GetUserData());
 }
     listener.EndContact = function(contact) {
     console.log("End Contact:"+contact.GetFixtureA().GetBody().GetUserData());
 }
     listener.PostSolve = function(contact, impulse) {
         var fixa=contact.GetFixtureA().GetBody().GetUserData().id;
         var fixb=contact.GetFixtureB().GetBody().GetUserData().id;
         console.log(fixa+" hits "+fixb+" withimp:"+impulse.normalImpulses[0]);
 }
     listener.PreSolve = function(contact, oldManifold) {
 }
 this.world.SetContactListener(listener);

/*****
* Utility Functions & Objects
*/

// restitution = bouncy

 function defineNewStatic(density, friction, restitution, x, y, width, height, objid, angle) {
     var fixDef = new b2FixtureDef;
     fixDef.density = density;
     fixDef.friction = friction;
     fixDef.restitution = restitution;
     var bodyDef = new b2BodyDef;
     bodyDef.type = b2Body.b2_staticBody;
     bodyDef.position.x = x / SCALE;
     bodyDef.position.y = y / SCALE;
     bodyDef.angle = angle;
     fixDef.shape = new b2PolygonShape;
     fixDef.shape.SetAsBox(width/SCALE, height/SCALE);
     var thisobj = world.CreateBody(bodyDef).CreateFixture(fixDef);
     thisobj.GetBody().SetUserData({id:objid})
     return thisobj;
 }

 function defineNewDynamic(density, friction, restitution, x, y, width, height, objid) {
     var fixDef = new b2FixtureDef;
     fixDef.density = density;
     fixDef.friction = friction;
     fixDef.restitution = restitution;
     var bodyDef = new b2BodyDef;
     bodyDef.type = b2Body.b2_dynamicBody;
     bodyDef.position.x = x / SCALE;
     bodyDef.position.y = y / SCALE;
     fixDef.shape = new b2PolygonShape;
     fixDef.shape.SetAsBox(width/SCALE, height/SCALE);
     var thisobj = world.CreateBody(bodyDef).CreateFixture(fixDef);
     thisobj.GetBody().SetUserData({id:objid})
     return thisobj;
 }

 function defineNewDynamicCircle(density, friction, restitution, x, y, r, objid) {
     var fixDef = new b2FixtureDef;
     fixDef.density = density;
     fixDef.friction = friction;
     fixDef.restitution = restitution;
     var bodyDef = new b2BodyDef;
     bodyDef.type = b2Body.b2_dynamicBody;
     bodyDef.position.x = x / SCALE;
     bodyDef.position.y = y / SCALE;
     fixDef.shape = new b2CircleShape(r/SCALE);
     var thisobj = world.CreateBody(bodyDef).CreateFixture(fixDef);
     thisobj.GetBody().SetUserData({id:objid})
     return thisobj;
 }
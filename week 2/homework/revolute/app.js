
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
var HEIGHT=700;
var SCALE=30;
var world = new b2World(
new b2Vec2(0,9.81),
    true
);

// static
var ground = defineNewStatic(1.0,0.5,0.2,(WIDTH/2),HEIGHT,(WIDTH/2),30,"ground",0);

var ground = defineNewStatic(1.0,0.5,0.2,(WIDTH/2),500,(WIDTH/2),10,"plat1",0.1);


// dynamic
var wheel1 = defineNewDynamicCircle(1,1,0.5,400,300,20,"wheel1");
var wheel2 = defineNewDynamicCircle(1,1,0.5,480,300,20,"wheel2");

var car = defineNewDynamic(1,1,0.5,440,295,60,10,"car");

// revolute joint - anchor joint to another object, like a tie to another object - can rotate around a point, where it is connected to another object 
var rearWheel = defineRevoluteJoint(wheel1,car);
var frontWheel = defineRevoluteJoint(wheel2,car);


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
const container = document.getElementById('text-container');
let canJump;

listener.BeginContact = function(contact) {
   //  console.log("Begin Contact:"+contact.GetFixtureA().GetBody().GetUserData());
    var fixa=contact.GetFixtureA().GetBody().GetUserData();
    var fixb=contact.GetFixtureB().GetBody().GetUserData();
}

listener.EndContact = function(contact) {
   //  console.log("End Contact:"+contact.GetFixtureA().GetBody().GetUserData());
   var fixa=contact.GetFixtureA().GetBody().GetUserData();
   var fixb=contact.GetFixtureB().GetBody().GetUserData();
}

listener.PostSolve = function(contact, impulse) {
        var fixa=contact.GetFixtureA().GetBody().GetUserData();
        var fixb=contact.GetFixtureB().GetBody().GetUserData();
       //  console.log(fixa+" hits "+fixb+" withimp:"+impulse.normalImpulses[0]);
}

listener.PreSolve = function(contact, oldManifold) {
}

this.world.SetContactListener(listener);


/***
 * Keyboard Controls
 */

$(document).keydown(function(e){
    if(e.keyCode == 87 || e.keyCode == 38){
        doJump();
    }if(e.keyCode == 83 || e.keyCode == 40){
 
    }if(e.keyCode == 65 || e.keyCode == 37){
        goLeft();
    }if(e.keyCode == 68 || e.keyCode == 39){
        goRight();
    }
 })
 
 $(document).keyup(function(e){
    if(e.keyCode == 87 || e.keyCode == 38){
        console.log("up up");
    }if(e.keyCode == 83 || e.keyCode == 40){
        console.log("down up");
    }if(e.keyCode == 65 || e.keyCode == 37){
        console.log("left up");
    }if(e.keyCode == 68 || e.keyCode == 39){
        console.log("right up");
    }
 })


/*****
* Utility Functions & Objects
*/

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

function changeUserdata(target, property, newvalue){
    var currentData = target.GetBody().GetUserData();
    currentData[property] = newvalue;
    target.GetBody().SetUserData(currentData);
    console.log(target.GetBody().GetUserData());
}

function defineRevoluteJoint(body1, body2){
    var joint = new Box2D.Dynamics.Joints.b2RevoluteJointDef();
    // third parameter - the joint where it will revolve around -> wheel is rotating not the car block
    joint.Initialize(body1.GetBody(), body2.GetBody(), body1.GetBody().GetWorldCenter());
    return world.CreateJoint(joint);
}
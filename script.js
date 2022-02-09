var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var check = document.getElementById("check");
var checkText = document.getElementById("checkText");
var checkDebugText = document.getElementById("checkDebugText");
var posX = window.innerWidth/2;
var posY = window.innerHeight/2; 
var a;
var b;
var c = 750;
var d = 350;
var r0 = 180;
var r1 = 200;
var dist;
var theta;
var x;
var y;
var a1;
var a2;

ctx.canvas.width  = window.innerWidth-35;
ctx.canvas.height = window.innerHeight-40;

document.onmousemove = function(event)
{
  a = event.pageX;
  b = event.pageY;
  dist = Math.sqrt(((c - a)**2)+(d - b)**2)
  console.log("D: " + dist);
  theta = 1/4*Math.sqrt((dist+r0+r1)*(dist+r0-r1)*(dist-r0+r1)*(-dist+r0+r1));
  console.log("Theta: " + theta);
  x = ((a+c)/2)+(((c-a)*(r0**2-r1**2))/(2*dist**2))+(2*theta*((b-d)/dist**2));
  y = ((b+d)/2)+(((d-b)*(r0**2-r1**2))/(2*dist**2))-(2*theta*((a-c)/dist**2));
  console.log("X: " + x + ", Y: " + y);
  a0 = toDegrees(Math.acos(((r0**2)+(r1**2)-(dist**2))/(2*r0*r1)));
  a1 = toCircle(toDegrees(Math.atan2((y-d),(x-c))));
  console.log("A0: " + a0 + ", A1: " + a1);
  Clear();
  Draw();
}
function Clear(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function Draw() {
  if (!checkDebugText.checked){
    drawDebugLines();
  }
  drawLines();
  drawBase();
  drawBounds();
  drawEnd();
  drawIntersect();
  if (!checkText.checked){
    drawText();
  }
}

function drawEnd(){
  ctx.fillStyle = "#FF3333";
  ctx.strokeStyle = "#FF3333";
  ctx.beginPath();
  ctx.arc(a,b,4.5,0,Math.PI*2,true);
  ctx.fill();
  ctx.closePath();
  if (!check.checked){
    ctx.beginPath();
    ctx.arc(a,b,r0,0,Math.PI*2,true);
    ctx.stroke();
    ctx.closePath();
  }
}

function drawBase(){
  ctx.fillStyle = "#7AD7F0";
  ctx.strokeStyle = "#7AD7F0";
  ctx.beginPath();
  ctx.arc(c,d,4.5,0,Math.PI*2,true);
  ctx.fill();
  ctx.closePath();
  if (!check.checked){
    ctx.beginPath();
    ctx.arc(c,d,r1,0,Math.PI*2,true);
    ctx.stroke();
    ctx.closePath();
  }
}

function drawBounds(){
  ctx.strokeStyle = "#82e105";
  ctx.beginPath();
  ctx.arc(c,d,r1+r0,0,Math.PI*2,true);
  ctx.stroke();
  ctx.closePath();
}

function drawIntersect(){
  ctx.fillStyle = "#FFF44F";
  ctx.beginPath();
  ctx.arc(x,y,4.5,0,Math.PI*2,true);
  ctx.fill();
  ctx.closePath();
}

function drawLines(){
  ctx.strokeStyle = "#FF0081";
  ctx.beginPath();
  ctx.moveTo(c, d);
  ctx.lineTo(x, y);
  ctx.lineTo(a, b);
  ctx.stroke();
  ctx.closePath();
}

function drawText(){
  ctx.font = "15px Verdana";
  ctx.fillStyle = "#000000"
  ctx.fillText(a1, c, d-10);
  ctx.fillText(a0, x, y-10);
}

function drawDebugLines(){
  ctx.strokeStyle = "#d3d3d3";
  ctx.beginPath();
  ctx.moveTo(0, d);
  ctx.lineTo(window.innerWidth, d);
  ctx.moveTo(x, y);
  ctx.lineTo(x, d);
  ctx.moveTo(a, b);
  ctx.lineTo(c, d);
  ctx.stroke();
  ctx.closePath();
}

function toDegrees(radians)
{
  var pi = Math.PI;
  return radians * (180/pi);
}

function toCircle(degrees){
  if(degrees < 0){
    return Math.abs(degrees - 90);
  }
  else{
    return Math.abs(degrees - 90);
  }
}
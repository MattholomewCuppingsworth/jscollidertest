var clickCanvas = function(){
	var mainCanvas = document.getElementById("mainCanvas");
	var mainContext = mainCanvas.getContext("2d");
	mainContext.fillRect(50, 25, 150, 100);
}
var canv = {}
canv.maxHeight = 225;
canv.maxWidth = 300;


var randColor = function() {
	return '#'+Math.floor(Math.random()*16777215).toString(16);
}

var createRect = function() {
	newRect = {}
	newRect.x = Math.floor(Math.random()*canv.maxWidth);
	newRect.y = Math.floor(Math.random()*canv.maxHeight);
	newRect.width = Math.floor(Math.random()*(canv.maxWidth-newRect.x)+1);
	newRect.height =  Math.floor(Math.random()*(canv.maxHeight-newRect.y)+1);
	newRect.color = randColor();
	newRect.xdir = 1
	newRect.ydir = 1

}

var collider = function(rect1, rect2) {
	if (rect1.x < rect2.x + rect2.width &&
	rect1.x + rect1.width > rect2.x &&
	rect1.y < rect2.y + rect2.height &&
	rect1.height + rect1.y > rect2.y) {
		//collision!
		rect1.xdir = rect1.xdir * -1
		rect2.xdir = rect2.xdir * -1
		rect1.ydir = rect1.ydir * -1
		rect2.ydir = rect2.ydir * -1
	}
}

var draw = function(context, rect) {
	context.clearRect(rect.x, rect.y, rect.width, rect.height);
	rect.x +=rect.xdir;
	rect.y +=rect.ydir;
	context.fillStyle = rect.color
	context.fillRect(rect.x, rect.y, rect.width, rect.height);
	if(rect.x+rect.width >= canv.maxWidth) {
		rect.xdir = -1;
	}
	if(rect.x <= 0) {
		rect.xdir = 1;
	}
	if(rect.y+rect.height >= canv.maxHeight) {
		rect.ydir = -1;
	}
	if(rect.y <= 0) {
		rect.ydir = 1;
	}
}

var onTimerTick = function (){
	rects.forEach( draw )
	collider(rectA, rectB)
	draw(mainContext, rectB)
}

var mainCanvas = document.getElementById("mainCanvas");
var mainContext = mainCanvas.getContext("2d");
var rects = [];
rect.push(createRect());
rect.push(createRect());

setInterval(onTimerTick, 33); // 33 milliseconds = ~ 30 frames per sec

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
	newRect.width = 15;
	newRect.height = 15;

	//newRect.width = Math.floor(Math.random()*(canv.maxWidth-newRect.x)+1);
	//newRect.height =  Math.floor(Math.random()*(canv.maxHeight-newRect.y)+1);
	newRect.color = randColor();
	newRect.xdir = Math.round(Math.random())*2 - 1
	newRect.ydir = Math.round(Math.random())*2 - 1
	return newRect;
}

var collider = function(rect1, rect2, action) {
	if (rect1.x < rect2.x + rect2.width &&
	rect1.x + rect1.width > rect2.x &&
	rect1.y < rect2.y + rect2.height &&
	rect1.height + rect1.y > rect2.y) {
		//collision!
		action(rect1, rect2);
	}
}

var bounceAway = function (rect1, rect2){
	rect1.xdir = rect1.xdir * -1
	rect2.xdir = rect2.xdir * -1
	rect1.ydir = rect1.ydir * -1
	rect2.ydir = rect2.ydir * -1
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
	rects.forEach(function(rect) {
		rects.forEach(function(otherRect){
			collider(rect, otherRect, bounceAway);
		})
		draw(mainContext, rect)
	})
}

var mainCanvas = document.getElementById("mainCanvas");
var mainContext = mainCanvas.getContext("2d");
var rects = [];
rects.push(createRect());
rects.push(createRect());

var clickCanvas = function(){
	rects.push(createRect());
}

setInterval(onTimerTick, 33); // 33 milliseconds = ~ 30 frames per sec

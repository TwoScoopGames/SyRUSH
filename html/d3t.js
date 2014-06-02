var canvas = document.getElementById("canvas");

var manifest = {
	"images": {
		"logo": "images/logo.png",
		"waffle-filled": "images/waffleFilled.png",
		"waffle-hole": "images/waffleHole.png"
	},
	"sounds": {
		"music" : "sound/Glass_Boy_-_02_-_Bent.mp3",
		"bad-tap" : "sound/bad.mp3",
		"tap1" : "sound/tap1.wav",
		"tap2" : "sound/tap2.wav",
		"tap3" : "sound/tap3.wav",
		"tap4" : "sound/tap4.wav",
		"tap5" : "sound/tap5.wav"
	},
	"fonts": {
		"lato": {
			"embedded-opentype": "font/lato.eot",
			"woff": "font/lato.woff",
			"truetype": "font/Lato.ttf",
			"svg": "font/lato.svg#lato"
		}
	},
	"animations": {
		"two-scoop": {
			"strip": "images/two-scoop-anim.png",
			"frames": 32,
			"msPerFrame": 50,
			"repeatAt": 31
		}
	}
};

var game = new Splat.Game(canvas, manifest);

game.scenes.add("title", new Splat.Scene(canvas, function() {
	this.timers.running = new Splat.Timer(null, 2000, function() {
		game.scenes.switchTo("main");
	});
	this.timers.running.start();
}, function(elapsedMillis) {
	game.animations.get("two-scoop").move(elapsedMillis);
}, function(context) {
	context.fillStyle = "#93cbcd";
	context.fillRect(0, 0, canvas.width, canvas.height);
	var anim = game.animations.get("two-scoop");
	context.fillStyle = "#ffffff";
	context.font = "50px lato";
	centerText(context, "Two Scoop Games", 0, (canvas.height / 2) + (anim.height / 2) + 30);

	anim.draw(context, (canvas.width / 2) - (anim.width / 2), (canvas.height / 2) - (anim.height / 2));
}));

function getBest() {
	var b = parseInt(Splat.saveData.get("bestScore"));
	if (isNaN(b) || b < 0 || !b) {
		b = 0;
	}
	return b;
}

function setBest(b) {
	best = b;
	Splat.saveData.set("bestScore", best);
}

var dead = false;
var waitingToStart = true;
var score = 0;
var best = getBest();
var newBest = false;
var rand = new Splat.math.Random();

function centerText(context, text, offsetX, offsetY) {
	var w = context.measureText(text).width;
	var x = offsetX + (canvas.width / 2) - (w / 2) |0;
	var y = offsetY |0;
	context.fillText(text, x, y);
}

function anythingWasPressed() {
	return game.keyboard.isPressed("left") || game.keyboard.isPressed("right") || game.mouse.isPressed(0);
}

function drawScoreScreen(context, scene) {
	var ftb = scene.timers.fadeToBlack.time;
	scene.camera.drawAbsolute(context, function() {
		var opacity = Math.min(ftb / 300, 0.7);
		context.fillStyle = "rgba(0, 0, 0, " + opacity + ")";
		context.fillRect(0, 0, canvas.width, canvas.height);

		context.fillStyle = "#ffffff";
		context.font = "50px lato";
		centerText(context, "SCORE", 0, 300);
		context.font = "100px lato";
		centerText(context, score, 0, 400);

		context.font = "50px lato";
		if (newBest) {
			context.fillStyle = "#be4682";
			centerText(context, "NEW BEST!", 0, 600);
		} else {
			centerText(context, "BEST", 0, 600);
		}

		context.font = "100px lato";
		centerText(context, best, 0, 700);
	});
}

function drawIntroOverlay(context, scene) {
	scene.camera.drawAbsolute(context, function() {
		context.fillStyle = '#b6d3aa';
		context.fillRect(0,0,canvas.width,canvas.height);
		var logo = game.images.get("logo");
		context.drawImage(logo, (canvas.width / 2) - (logo.width / 2)|0, 200);
		context.fillStyle = "#fff";
		context.font = "50px lato";
		centerText(context, "Music by Glass Boy", 0, canvas.height - 90);
	});
}

function drawFlash(context, scene) {
	var flashTime = scene.timers.flash.time;
	var flashLen = scene.timers.flash.expireMillis;

	if (flashTime > 0) {
		var opacity = Splat.math.oscillate(flashTime, flashLen);
		context.fillStyle = "rgba(255, 255, 255, " + opacity + ")";
		context.fillRect(scene.camera.x, scene.camera.y, canvas.width, canvas.height);
	}
}


function drawMouse(context, entity){
	context.fillStyle = "#000";
	context.fillRect(entity.x, entity.y, entity.width, entity.height);
}

function isInside(container, item) {
	return item.x >= container.x &&
	item.x + item.width <= container.x + container.width &&
	item.y >= container.y &&
	item.y + item.height <= container.y + container.height;
}

function makeSquares(squareSize){
	var filled = [];
	var holes = [];
	var squaresAcross = Math.floor(canvas.width / squareSize) + 1; 
	var squaresDown = Math.floor(canvas.height / squareSize) + 1; 
	var squaresCount = squaresAcross * squaresDown; 
	var row = 0;
	var column = 0;

	for (var i = 0; i < squaresCount; i++){
		if(i != 0){
			if(i % squaresAcross === 0){
				row += 1;
				column = 0;
			}else{
				column += 1;
			}
		}

		
		if(Math.floor(Math.random() * 2) === 0){
			var entity = new Splat.Entity(column * squareSize,row * squareSize,squareSize,squareSize);
			filled.push(entity);
		}else{
			var entity = new Splat.Entity(column * squareSize,row * squareSize,squareSize,squareSize);
			holes.push(entity);
		}
	}
	console.log([filled, holes]);
	return [filled, holes];
}




game.scenes.add("main", new Splat.Scene(canvas, function() {

	this.camera.vx = 0.1;
	waitingToStart = true;
	dead = false;
	
	score = 0;
	newBest = false;


	this.timers.flash = new Splat.Timer(null, 150, function() {
		this.reset();
	});

	var scene = this;

	
this.squares = makeSquares(100);
	this.timers.fadeToBlack = new Splat.Timer(null, 800, function() {
		game.scenes.switchTo("main");
	});


},
function(elapsedMillis) {
	
	this.filled = this.squares[0];
	this.holes = this.squares[1];

	/*
	loop all squares, record higehes t x value, hightest x value plus the width 

	if that's less than the camera x plus camera width, then add new column

columns new x should be hightest plus width of square
		*/


	if (waitingToStart) {
		if (game.keyboard.consumePressed("r") && this.lastReplay && walls.length > 0) {
			waitingToStart = false;
			rand = new Splat.math.Random(seed);
		}
		if (anythingWasPressed()) {
			//game.sounds.play("music", true);
			waitingToStart = false;
		}
	}



	if (dead) {
		return;
	}




	var left = false;
	var right = false;



	if (game.mouse.consumePressed(0)) {
		if (game.mouse.x < canvas.width / 2) {
			left = true;
		} else {
			right = true;
		}
	}

},

function(context) {


var waffleHoleImage = game.images.get("waffle-hole");
var waffleFilledImage = game.images.get("waffle-filled");



	context.fillStyle = 'lime';
	context.fillRect(0,0,canvas.width,canvas.height);

	

	for (var i = 0; i < this.holes.length; i++) {
		var thisHole = this.holes[i];
		this.camera.drawAbsolute(context, function() {
			var waffleHole = new Splat.AnimatedEntity(thisHole.x, thisHole.y, thisHole.width, thisHole.height, waffleHoleImage, 0, 0);
				waffleHole.draw(context);
			});
	}

	for (var i = 0; i < this.filled.length; i++) {
		var thisFilled = this.filled[i];
		this.camera.drawAbsolute(context, function() {
			var waffleFilled = new Splat.AnimatedEntity(thisFilled.x, thisFilled.y, thisFilled.width, thisFilled.height, waffleFilledImage, 0, 0);
				waffleFilled.draw(context);
			});
	}



	//drawFlash(context, this);

	var mousebox = new Splat.Entity(game.mouse.x,game.mouse.y,1,1);
	drawMouse(context, mousebox);


	for (var i = 0; i < this.holes.length; i++) {
		var square = this.holes[i];
		if (isInside(square, mousebox)){
			this.holes.splice(i);
			this.filled.push(new Splat.Entity(square.x,square.y,square.width,square.height));
			score += 1;
		}
	}


	if (this.timers.fadeToBlack.running) {
		drawScoreScreen(context, this);
		return;
	}

	if (waitingToStart) {
		drawIntroOverlay(context, this);
	}
	this.camera.drawAbsolute(context, function() {
		context.fillStyle = "#ffffff";
		context.font = "100px lato";
		centerText(context, score, 0, 100);
	});

}));

game.scenes.switchTo("loading");

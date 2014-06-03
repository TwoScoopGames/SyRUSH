var canvas = document.getElementById("canvas");

var manifest = {
	"images": {
		"ad-placeholder": "images/ad-placeholder.png",
		"logo": "images/logo.png",
		"title-background": "images/title-background.png",
		"start-button": "images/start-button.png",
		"waffle-filled": "images/waffleFilled.png",
		"waffle-hole": "images/waffleHole.png",
		"sound-off": "images/sound-off-icon.png",
		"sound-on": "images/sound-on-icon.png"
	},
	"sounds": {
		"music" : "sound/Glass_Boy_-_02_-_Bent.mp3",
		"bad-tap" : "sound/bad.mp3",
		"pop1" : "sound/pop1.wav",
		"pop2" : "sound/pop2.wav",
		"pop3" : "sound/pop3.wav",
		"pop4" : "sound/pop4.wav",
		"pop5" : "sound/pop5.wav",
		"pop6" : "sound/pop6.wav",
		"pop7" : "sound/pop7.wav",
		"pop8" : "sound/pop8.wav"
		
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
function ToggleButton(x, y, width, height, onIcon, offIcon, key, onToggle) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.onIcon = onIcon;
	this.offIcon = offIcon;
	this.key = key;
	this.toggled = true;
	this.onToggle = onToggle;
}
ToggleButton.prototype.move = function(elapsedMillis) {
	if (game.mouse.buttons[0] && game.mouse.x >= this.x && game.mouse.x < this.x + this.width && game.mouse.y >= this.y && game.mouse.y < this.y + this.height) {
		game.mouse.buttons[0] = false;
		this.toggle();
	}
	if (game.keyboard.consumePressed(this.key)) {
		this.toggle();
	}
};
ToggleButton.prototype.draw = function(context) {
	var icon = this.offIcon;
	if (this.toggled) {
		icon = this.onIcon;
	}
	context.drawImage(icon, this.x, this.y);
};
ToggleButton.prototype.toggle = function() {
	if (this.onToggle(!this.toggled) !== false) {
		this.toggled = !this.toggled;
	}
};
ToggleButton.prototype.attachToRight = function(canvas, xOffset) {
	var that = this;
	var adjustX = function() {
		that.x = canvas.width - that.width - xOffset;
	};
	adjustX();
	window.addEventListener("resize", adjustX);
};

var game = new Splat.Game(canvas, manifest);
var soundToggle;


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

var waitingToStart = true;
var score = 0;
var best = Math.floor(getBest());
var newBest = false;
var rand = new Splat.math.Random();

function centerText(context, text, offsetX, offsetY) {
	var w = context.measureText(text).width;
	var x = offsetX + (canvas.width / 2) - (w / 2) |0;
	var y = offsetY |0;
	context.fillText(text, x, y);
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
	

	soundToggle.attachToRight(canvas, 12);
	scene.camera.drawAbsolute(context, function() {

		
		//context.fillStyle = '#eed513';
		//context.fillRect(0,0,canvas.width,canvas.height);
		var titleBackground = game.images.get("title-background");
		context.drawImage(titleBackground, 0, 0);

		var logo = game.images.get("logo");
		context.drawImage(logo, (canvas.width/2) - (logo.width/2), 200);

		var startButton = game.images.get("start-button");
		context.drawImage(startButton,(canvas.width/2) - (startButton.width/2), 700);

		context.fillStyle = "#fff";
		context.font = "50px lato";
		centerText(context, "Music by Glass Boy", 0, canvas.height - 60);

		var adPlaceholder = game.images.get("ad-placeholder");
		context.drawImage(adPlaceholder, 0, 0);

		soundToggle.draw(context);
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

var squareSize = 200;

function makeSquare(x, y){
	var waffleHoleImage = game.images.get("waffle-hole");
	var waffleFilledImage = game.images.get("waffle-filled");
	var isFilled = Math.random() > .5;
	var image = isFilled ? waffleFilledImage : waffleHoleImage;
	var entity = new Splat.AnimatedEntity(x,y,squareSize,squareSize, image, 0, 0);
	entity.filled = isFilled;
	return entity;
}

function makeSquareColumn(x){
	var squares = [];
	for(var y = 0; y < canvas.height; y+= squareSize){
		squares.push(makeSquare(x, y));
	}
	return squares;
}



function findMaxX(entities){
	return entities.reduce(function(a,b){
		return Math.max(a,b.x);
	}, 0);
}

function makeSquares(scene, squares){
	var maxX = findMaxX(squares);
	var newSquares = [];
	if (maxX < scene.camera.x + canvas.width){
		newSquares = newSquares.concat(makeSquareColumn(maxX + squareSize));
	}
	return newSquares;
}

var fillSounds = ["pop1", "pop2", "pop3", "pop4", "pop5", "pop6", "pop7", "pop8"];

function fillSound() {
	var i = Math.random() * fillSounds.length |0;
	game.sounds.play(fillSounds[i]);
}

function isInside(container, x, y) {
	return x >= container.x &&
		x < container.x + container.width &&
		y >= container.y &&
		y < container.y + container.height;
}

game.scenes.add("main", new Splat.Scene(canvas, function() {
soundToggle = new ToggleButton(0, 108, 72, 72, game.images.get("sound-on"), game.images.get("sound-off"), "m", function(toggled) {
		game.sounds.muted = !toggled;
	});
	this.camera.x = 0;
	speedIncrimenter = false;
	columnsPassed = 0;
	waitingToStart = true;
	
	score = 0;
	newBest = false;

	this.squares = [];

	this.timers.fadeToBlack = new Splat.Timer(null, 1000, function() {
		game.scenes.switchTo("main");
	});


},
function(elapsedMillis) {

	score = Math.floor(columnsPassed);
	var waffleFilledImage = game.images.get("waffle-filled");
	if (waitingToStart) {
		if (game.mouse.consumePressed(0)) {
			console.log("pressed");
			if (!isInside(soundToggle, game.mouse.x, game.mouse.y)){
				speedIncrimenter = true;
		  		game.sounds.play("music", true);
				waitingToStart = false;
			}
		}
	}
	if(speedIncrimenter){
		if(columnsPassed === 0){
			this.camera.vx = 0.17;
		}
		if(columnsPassed / 200 > 0.17){
			this.camera.vx = columnsPassed / 200;
		}
	}

	if (this.timers.fadeToBlack.running) {
		return;
	}

	this.squares = this.squares.concat(makeSquares(this, this.squares));

	if (!waitingToStart) {
		while (this.squares[0].x + this.squares[0].width < this.camera.x) {
			if(this.squares[0].filled){
				this.squares.shift();
				columnsPassed +=.16;
				
			}else{
				this.timers.fadeToBlack.start();
				this.camera.vx = 0;
				return;
			}
		}
	}
	for (var i = 0; i < this.squares.length; i++) {
		var square = this.squares[i];
		if(game.mouse.consumePressed(0, square.x - this.camera.x, square.y, square.width, square.height)){
			if(!square.filled){
				fillSound();
				square.filled = true;
			square.sprite = waffleFilledImage;
		}else{
			game.sounds.play("bad-tap");
			this.timers.fadeToBlack.start();
			this.camera.vx = 0;
			return;
		}

		}
	}

},

function(context) {

	context.fillStyle = '#fff';
	context.fillRect(0,0,canvas.width,canvas.height);


	for (var i = 0; i < this.squares.length; i++) {
		this.squares[i].draw(context);
	}

	if (this.timers.fadeToBlack.running) {
		drawScoreScreen(context, this);
		return;
	}

	if (waitingToStart) {
		drawIntroOverlay(context, this);
	}else{
		this.camera.drawAbsolute(context, function() {
			context.fillStyle = "#ffffff";
			context.font = "100px lato";
			centerText(context, Math.floor(score), 0, 100);
		});
	}
	

}));

game.scenes.switchTo("loading");

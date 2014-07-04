"use strict";

var canvas = document.getElementById("canvas");

var manifest = {
	"images": {
		"ad-placeholder": "images/ad-placeholder.png",
		"berries-cream-filled": "images/berries-cream-filled.png",
		"berry-filled": "images/berry-filled.png",
		"berry-filled-2": "images/berry-filled-2.png",
		"berry-filled-3": "images/berry-filled-3.png",
		"bg-left": "images/bg-left.png",
		"bg-right": "images/bg-right.png",
		"butter-filled": "images/butter-filled.png",
		"butter-syrup-filled": "images/butter-syrup-filled.png",
		"logo": "images/logo.png",
		"sound-off": "images/sound-off-icon.png",
		"sound-on": "images/sound-on-icon.png",
		"start-button": "images/start-button.png",
		"syrup-filled": "images/syrup-filled.png",
		"title-background": "images/title-background.png",
		"waffle-hole": "images/waffle-hole.png",
	},
	"sounds": {
		"button": "sound/menuchange.wav",
		"music": "sound/Glass_Boy_-_02_-_Bent.mp3",
		"bad-tap": "sound/196725__paulmorek__sz-squish-12.wav",
		"gasp": "sound/180005__gentlemanwalrus__shocked-gasp.wav",
		"yay": "sound/yay.mp3",
		"pop1": "sound/pop1.wav",
		"pop2": "sound/pop2.wav",
		"pop3": "sound/pop3.wav",
		"pop4": "sound/pop4.wav",
		"pop5": "sound/pop5.wav",
		"pop6": "sound/pop6.wav",
		"pop7": "sound/pop7.wav",
		"pop8": "sound/pop8.wav"
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
		"berries-cream-anim": {
			"strip": "images/berries-cream-anim.png",
			"frames": 3,
			"msPerFrame": 75,
			"repeatAt": 2
		},
		"berry-anim": {
			"strip": "images/berry-anim.png",
			"frames": 4,
			"msPerFrame": 75,
			"repeatAt": 3
		},
		"butter-anim": {
			"strip": "images/butter-anim.png",
			"frames": 4,
			"msPerFrame": 75,
			"repeatAt": 3
		},
		"butter-syrup-anim": {
			"strip": "images/butter-syrup-anim.png",
			"frames": 4,
			"msPerFrame": 75,
			"repeatAt": 3
		},
		"syrup-anim": {
			"strip": "images/syrup-anim.png",
			"frames": 5,
			"msPerFrame": 75,
			"repeatAt": 4
		},
		"two-scoop": {
			"strip": "images/two-scoop-anim.png",
			"frames": 32,
			"msPerFrame": 50,
			"repeatAt": 31
		},
		"next-waffle-anim": {
			"strip": "images/next-waffle-anim.png",
			"frames": 8,
			"msPerFrame": 50,
			"repeatAt": 7
		},
		"next-topping-anim": {
			"strip": "images/next-topping-anim.png",
			"frames": 7,
			"msPerFrame": 50,
			"repeatAt": 6
		},

	}
};

var game = new Splat.Game(canvas, manifest);
var godmode = true;
var score = 0;
var best = Math.floor(getBest());
var newBest = false;
var syrupParticles = [];
var gravity = 0.2;
var tileSize = 200;
var fillSounds = ["pop1", "pop2", "pop3", "pop4", "pop5", "pop6", "pop7", "pop8"];
var waffleWidth = 10;

function getBest() {
	var b = parseInt(Splat.saveData.get("bestScore"));
	if (isNaN(b) || b < 0 || !b) {
		b = 0;
	}
	return b;
}

function drawCircle(context, color, radius, strokeColor, strokeSize, x, y) {
	context.beginPath();
	context.arc(x, y, radius, 0, 2 * Math.PI, false);
	context.fillStyle = color;
	context.fill();
	context.lineWidth = strokeSize;
	context.strokeStyle = strokeColor;
	context.stroke();
}

function spray(mouse, color, velocity, radius, quantity) {
	syrupParticles.length = 0;
	for (var q = 0; q < quantity; q++) {
		syrupParticles.push({
			x: mouse.x,
			y: mouse.y,
			xv: (Math.random() - 0.5) * velocity,
			yv: (Math.random() - 0.5) * velocity,
			radius: Math.random() * radius,
			color: color,
			stroke: color
		});
	}
}

function drawParticles(context, particles) {
	for (var i = 0; i < particles.length; i++) {
		var particle = particles[i];
		drawCircle(context, particle.color, particle.radius, particle.stroke, 0, particle.x, particle.y);
	}
}

function moveParticles(elapsedMillis, particles, gravitySwitch) {
	for (var i = 0; i < particles.length; i++) {
		var particle = particles[i];
		particle.x += particle.xv * elapsedMillis;
		particle.y += particle.yv * elapsedMillis;
		if (gravitySwitch) {
			particle.yv += gravity;
		}
	}
}

function centerText(context, text, offsetX, offsetY) {
	var w = context.measureText(text).width;
	var x = offsetX + (canvas.width / 2) - (w / 2) | 0;
	var y = offsetY | 0;
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

function makeSquare(x, y, filledImage, emptyImage) {
	var isFilled = Math.random() > 0.5;

	var image = isFilled ? filledImage : emptyImage;
	var entity = new Splat.AnimatedEntity(x, y, tileSize, tileSize, image, 0, 0);
	entity.filled = isFilled;
	return entity;
}

function makeSquareColumn(x, filledImage, emptyImage) {
	var squares = [];
	for (var y = 0; y < canvas.height; y += tileSize) {
		squares.unshift(makeSquare(x, y, filledImage, emptyImage));
	}
	return squares;
}

function makeWaffle(squaresWide, filledImage, emptyImage) {
	var newSquares = [];
	for (var i = 0; i < squaresWide; i++) {
		newSquares = newSquares.concat(makeSquareColumn(i * tileSize, filledImage, emptyImage));
	}
	return newSquares;
}

function fillSound() {
	var i = Math.random() * fillSounds.length | 0;
	game.sounds.play(fillSounds[i]);
}

function isInside(container, x, y) {
	return x >= container.x &&
		x < container.x + container.width &&
		y >= container.y &&
		y < container.y + container.height;
}

/*=========================================
  Scenes 
  ===========================================*/

game.scenes.add("title", new Splat.Scene(canvas, function() {
	this.timers.running = new Splat.Timer(null, 1, function() {
		game.scenes.switchTo("game-title");
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

game.scenes.add("game-title", new Splat.Scene(canvas, function() {

}, function(elapsedMillis) {
	if (game.mouse.consumePressed(0, (canvas.width - 115), 100, 115, 109)) {
		game.sounds.muted = !game.sounds.muted;
		if (game.sounds.muted) {
			game.sounds.stop("music");
		}
	}
	if (game.mouse.consumePressed(0)) {
		game.sounds.play("button");
		game.sounds.play("music", true);
		game.scenes.switchTo("main");
	}
}, function(context) {
	this.camera.drawAbsolute(context, function() {
		var titleBackground = game.images.get("title-background");
		context.drawImage(titleBackground, 0, 0);

		var logo = game.images.get("logo");
		context.drawImage(logo, (canvas.width / 2) - (logo.width / 2), 200);

		var startButton = game.images.get("start-button");
		context.drawImage(startButton, (canvas.width / 2) - (startButton.width / 2), 700);

		context.fillStyle = "#fff";
		context.font = "50px lato";
		centerText(context, "Music by Glass Boy", 0, canvas.height - 60);

		var adPlaceholder = game.images.get("ad-placeholder");
		context.drawImage(adPlaceholder, 0, 0);

		var soundSwitch;
		if (game.sounds.muted) {
			soundSwitch = game.images.get("sound-off");
		} else {
			soundSwitch = game.images.get("sound-on");
		}
		context.drawImage(soundSwitch, (canvas.width - soundSwitch.width), 100);
	});
}));

function butterOnly(width, speed) {
	return {
		filledImage: "butter-filled",
		emptyImage: "waffle-hole",
		fillAnim: "butter-anim",
		particleColor: "yellow",
		width: width,
		speed: speed
	};
}

function syrupOnly(width, speed) {
	return {
		filledImage: "syrup-filled",
		emptyImage: "waffle-hole",
		fillAnim: "syrup-anim",
		particleColor: "#6d511f",
		width: width,
		speed: speed
	};
}

function butterSyrup(width, speed) {
	return {
		filledImage: "butter-syrup-filled",
		emptyImage: "butter-filled",
		fillAnim: "butter-syrup-anim",
		particleColor: "#6d511f",
		width: width,
		speed: speed
	};
}

function berriesOnly(width, speed) {
	return {
		filledImage: "berry-filled-3",
		emptyImage: "waffle-hole",
		fillAnim: "berry-anim",
		particleColor: "rgba(255,255,255,1)",
		width: width,
		speed: speed
	};
}

function berriesCream(width, speed) {
	return {
		emptyImage: "berry-filled-3",
		fillAnim: "berries-cream-anim",
		particleColor: "rgba(255,255,255,0)",
		width: width,
		speed: speed
	};
}

function randomIntBetween(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

var minWidth = 20;
var maxWidth = 40;
var speed = 0.20;
var level = -1;
var levels = [
	//syrupOnly(randomIntBetween(1, 2), speed),
	//butterOnly(randomIntBetween(2, 3), -speed),
	//syrupOnly(randomIntBetween(minWidth, maxWidth), speed),
	//butterOnly(randomIntBetween(minWidth, maxWidth), -speed),
	//butterSyrup(randomIntBetween(minWidth, maxWidth), speed),
	//berriesOnly(randomIntBetween(minWidth, maxWidth), -speed),
	//berriesCream(randomIntBetween(minWidth, maxWidth), speed),
	berriesOnly(randomIntBetween(minWidth, maxWidth), speed),
	berriesOnly(randomIntBetween(minWidth, maxWidth), -speed),
	//berriesCream(randomIntBetween(minWidth, maxWidth), speed)
];

function isOdd(num) {
	return num % 2;
}

function makeWaffleForLevel() {
	var filledSquare = game.images.get(levels[level].filledImage);
	var goalSquare = game.images.get(levels[level].emptyImage);
	return makeWaffle(levels[level].width, filledSquare, goalSquare);
}

game.scenes.add("main", new Splat.Scene(canvas, function() {

	this.camera.x = -game.images.get("bg-left").width;

	score = 0;
	newBest = false;

	this.nextLevel = function() {
		level++;
		if (level >= levels.length) {
			level = -1;
			game.scenes.switchTo("game-title");
			return;
		}

		this.camera.vx = levels[level].speed;



		this.squares = makeWaffleForLevel();
	}.bind(this);
	this.nextLevel();

	this.timers.fadeToBlack = new Splat.Timer(null, 1000, function() {
		game.scenes.switchTo("game-title");
	});
	var scene = this;

	this.timers.banner = new Splat.Timer(null, 1000, function() {
		scene.message = "";
	});

}, function(elapsedMillis) {
	var nextTopping = game.animations.get("next-topping-anim");
	var nextWaffle = game.animations.get("next-waffle-anim");
	nextWaffle.move(elapsedMillis);
	nextTopping.move(elapsedMillis);
	if (this.message != "Next waffle!") {
		nextWaffle.reset();
	}
	if (this.message != "Next topping!") {
		nextTopping.reset();
	}

	var scene = this;
	if (this.camera.x >= (levels[level].width * tileSize) + game.images.get("bg-right").width - canvas.width && this.camera.vx > 0) {
		this.message = "Next topping!";
		this.timers.banner.reset();
		this.timers.banner.start();
		this.nextLevel();
	}
	if (this.camera.x < -game.images.get("bg-left").width && this.camera.vx < 0) {
		this.camera.x = -game.images.get("bg-left").width;
		this.camera.vx = 0;
		game.sounds.play("yay");
		scene.nextLevel();
		this.message = "Next waffle!";
		this.timers.banner.reset();
		this.timers.banner.start();
	}

	moveParticles(elapsedMillis, syrupParticles, true);

	if (this.timers.fadeToBlack.running) {
		return;
	}

	var movingRight = this.camera.vx > 0;

	function isOffScreen(entity) {
		return movingRight ? entity.x + entity.width < scene.camera.x : entity.x > scene.camera.x + scene.camera.width;
	}

	while (this.squares.length > 0) {
		var currentSquareIndex = movingRight ? 0 : this.squares.length - 1;
		var nextSquareIndex = movingRight ? 1 : this.squares.length - 2;
		var nextSquare = this.squares[nextSquareIndex];
		var isSquareOffScreen = isOffScreen(this.squares[currentSquareIndex]);
		if (!isSquareOffScreen) {
			break;
		}
		var last = this.squares.splice(currentSquareIndex, 1)[0];
		if (last.filled) {
			if (nextSquare !== undefined && last.x !== nextSquare.x) {
				score++;
			}
		} else {
			if (!godmode) {
				game.sounds.play("gasp");
				this.timers.fadeToBlack.start();
				this.camera.vx = 0;
				return;
			}
		}
	}

	for (var i = 0; i < this.squares.length; i++) {
		var square = this.squares[i];
		square.move(elapsedMillis);
		for (var t = 0; t < game.mouse.touches.length; t++) {
			var touch = game.mouse.touches[t];
			if (touch.consumed) {
				continue;
			}
			if (!isInside(square, touch.x + this.camera.x, touch.y)) {
				continue;
			}
			touch.consumed = true;
			if (!square.filled) {
				fillSound();
				square.filled = true;
				square.sprite = game.animations.get(levels[level].fillAnim).copy();
				spray(game.mouse, levels[level].particleColor, 5, 25, 8);
			} else {
				game.sounds.play("bad-tap");
				spray(game.mouse, levels[level].particleColor, 5, 25, 100);
				speed += 0.05;
			}
		}
	}
}, function(context) {
	if (level < 0) {
		return;
	}
	var bg = game.images.get("bg-left");
	context.drawImage(bg, -bg.width, 0);
	bg = game.images.get("bg-right");
	context.drawImage(bg, levels[level].width * tileSize, 0);

	for (var i = 0; i < this.squares.length; i++) {
		this.squares[i].draw(context);
	}

	if (this.timers.fadeToBlack.running) {
		drawScoreScreen(context, this);
		return;
	}

	var scene = this;
	this.camera.drawAbsolute(context, function() {
		context.fillStyle = "#ffffff";
		context.font = "100px lato";
		centerText(context, Math.floor(score), 0, 100);
		drawParticles(context, syrupParticles);
		if (scene.message === "Next waffle!") {
			console.log("Next waffle!");
			var nextWaffle = game.animations.get("next-waffle-anim");
			nextWaffle.draw(context, (canvas.width / 2) - (nextWaffle.width / 2), (canvas.height / 2) - (nextWaffle.height / 2));
		}
		if (scene.message === "Next topping!") {
			console.log("Next topping!");
			var nextTopping = game.animations.get("next-topping-anim");
			nextTopping.draw(context, (canvas.width / 2) - (nextTopping.width / 2), 0);
		}

	});
}));

game.scenes.switchTo("loading");

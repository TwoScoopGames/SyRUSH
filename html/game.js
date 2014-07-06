"use strict";

var canvas = document.getElementById("canvas");
canvas.height = 1136;
canvas.width = 640;
if (window.ejecta) {
	canvas.width = window.innerWidth * (canvas.height / window.innerHeight);
}

var manifest = {
	"images": {
		"ad-placeholder": "images/ad-placeholder.png",
		"blueberry-cream-filled": "images/blueberry-cream-filled.png",
		"blueberry-filled": "images/blueberry-filled.png",
		"blueberry-filled-2": "images/blueberry-filled-2.png",
		"blueberry-filled-3": "images/blueberry-filled-3.png",
		"bg-left": "images/bg-left.png",
		"bg-right": "images/bg-right.png",
		"butter-filled": "images/butter-filled.png",
		"butter-sugar-filled": "images/butter-sugar-filled.png",
		"butter-syrup-filled": "images/butter-syrup-filled.png",
		"logo": "images/logo.png",
		"sound-off": "images/sound-off-icon.png",
		"sound-on": "images/sound-on-icon.png",
		"start-button": "images/start-button.png",
		"strawberry-filled": "images/strawberry-filled.png",
		"strawberry-cream-filled": "images/strawberry-cream-filled.png",
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
		"pop8": "sound/pop8.wav",
		"sugar1": "sound/sugar-1.mp3",
		"sugar2": "sound/sugar-2.mp3",
		"whip1": "sound/whip-1.mp3",
		"whip2": "sound/whip-2.mp3",
		"whip3": "sound/whip-3.mp3",
		"whip4": "sound/whip-4.mp3",
		"whip5": "sound/whip-5.mp3",
		"whip6": "sound/whip-6.mp3",
		"whip7": "sound/whip-7.mp3",
		"whip8": "sound/whip-8.mp3",
		"whip9": "sound/whip-9.mp3",
		"whip10": "sound/whip-10.mp3",
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
		"blueberry-anim": {
			"strip": "images/blueberry-anim.png",
			"frames": 4,
			"msPerFrame": 75,
			"repeatAt": 3
		},
		"blueberry-cream-anim": {
			"strip": "images/blueberry-cream-anim.png",
			"frames": 3,
			"msPerFrame": 75,
			"repeatAt": 2
		},
		"butter-anim": {
			"strip": "images/butter-anim.png",
			"frames": 4,
			"msPerFrame": 75,
			"repeatAt": 3
		},
		"butter-sugar-anim": {
			"strip": "images/butter-sugar-anim.png",
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
		"strawberry-anim": {
			"strip": "images/strawberry-anim.png",
			"frames": 4,
			"msPerFrame": 75,
			"repeatAt": 3
		},
		"strawberry-cream-anim": {
			"strip": "images/strawberry-cream-anim.png",
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
	}
};

var game = new Splat.Game(canvas, manifest);
var godmode = true;
var score = 0;
var best = 0;
var newBest = false;
var syrupParticles = [];
var gravity = 0.2;
var tileSize = 200;

var best = 0;

function getBest() {
	Splat.saveData.get("bestScore", function(err, data) {
		if (!err) {
			var b = data["bestScore"];
			if (b) {
				best = parseInt(b);
			}
		}
	});
}
getBest();

function setBest() {
	Splat.saveData.set({
		"bestScore": best
	}, function(err) {});
}

function Particles() {
	this.particles = [];
	this.gravity = 0.2;
}
Particles.prototype.move = function(elapsedMillis) {
	for (var i = 0; i < this.particles.length; i++) {
		var particle = this.particles[i];
		particle.x += particle.vx * elapsedMillis;
		particle.y += particle.vy * elapsedMillis;
		particle.vy += this.gravity;
	}
};
Particles.prototype.draw = function(context) {
	for (var i = 0; i < this.particles.length; i++) {
		var particle = this.particles[i];
		drawCircle(context, particle.color, particle.radius, particle.stroke, 0, particle.x, particle.y);
	}
};
Particles.prototype.spray = function(x, y, color, velocity, radius, quantity) {
	this.particles = [];
	for (var q = 0; q < quantity; q++) {
		this.particles.push({
			x: x,
			y: y,
			vx: (Math.random() - 0.5) * velocity,
			vy: (Math.random() - 0.5) * velocity,
			radius: Math.random() * radius,
			color: color,
			stroke: color
		});
	}
};
var particles = new Particles();

function drawCircle(context, color, radius, strokeColor, strokeSize, x, y) {
	context.beginPath();
	context.arc(x, y, radius, 0, 2 * Math.PI, false);
	context.fillStyle = color;
	context.fill();
	context.lineWidth = strokeSize;
	context.strokeStyle = strokeColor;
	context.stroke();
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
		centerText(context, scene.score, 0, 400);
		context.font = "50px lato";
		if (scene.newBest) {
			context.fillStyle = "#be4682";
			centerText(context, "NEW BEST!", 0, 600);
		} else {
			centerText(context, "BEST", 0, 600);
		}

		context.font = "100px lato";
		centerText(context, best, 0, 700);
	});
}

function makeSquare(x, y, filledImage, emptyImage, emptyPercent) {
	var isFilled = Math.random() > emptyPercent;

	var image = isFilled ? filledImage : emptyImage;
	var entity = new Splat.AnimatedEntity(x, y, tileSize, tileSize, image, 0, 0);
	entity.filled = isFilled;
	return entity;
}

function makeSquareColumn(x, filledImage, emptyImage, emptyPercent) {
	var squares = [];
	for (var y = 0; y < canvas.height; y += tileSize) {
		squares.unshift(makeSquare(x, y, filledImage, emptyImage, emptyPercent));
	}
	return squares;
}

function makeWaffle(squaresWide, filledImage, emptyImage, emptyPercent) {
	var newSquares = [];
	for (var i = 0; i < squaresWide; i++) {
		newSquares = newSquares.concat(makeSquareColumn(i * tileSize, filledImage, emptyImage, emptyPercent));
	}
	return newSquares;
}

function playRandomSound(sounds) {
	if (typeof sounds === "string") {
		sounds = [sounds];
	}
	var i = Math.floor(Math.random() * sounds.length);
	game.sounds.play(sounds[i]);
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
		for (var x = 0; x < canvas.width; x += titleBackground.width) {
			context.drawImage(titleBackground, x, 0);
		}

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

function makeLevel(filledImage, emptyImage, fillAnim, particleColor, fillSounds, width, speed, emptyPercent) {
	return {
		filledImage: filledImage,
		emptyImage: emptyImage,
		fillAnim: fillAnim,
		particleColor: particleColor,
		width: width,
		speed: speed,
		emptyPercent: emptyPercent,
		fillSounds: fillSounds
	};
}

var popSounds = ["pop1", "pop2", "pop3", "pop4", "pop5", "pop6", "pop7", "pop8"];
var whipSounds = ["whip1", "whip2", "whip3", "whip4", "whip5", "whip6", "whip7", "whip8", "whip9", "whip10"];
var sugarSounds = ["sugar1", "sugar2"];

var butterOnly = makeLevel.bind(undefined, "butter-filled", "waffle-hole", "butter-anim", "#fde95e", popSounds);
var butterSugar = makeLevel.bind(undefined, "butter-sugar-filled", "butter-filled", "butter-sugar-anim", "#ffffff", sugarSounds);
var butterSyrup = makeLevel.bind(undefined, "butter-syrup-filled", "butter-filled", "butter-syrup-anim", "#6d511f", popSounds);
var blueberryOnly = makeLevel.bind(undefined, "blueberry-filled-3", "waffle-hole", "blueberry-anim", "#760630", popSounds);
var blueberryCream = makeLevel.bind(undefined, "blueberry-cream-filled", "blueberry-filled-3", "blueberry-cream-anim", "#ffffff", whipSounds);
var strawberryOnly = makeLevel.bind(undefined, "strawberry-filled", "waffle-hole", "strawberry-anim", "#e33838", popSounds);
var strawberryCream = makeLevel.bind(undefined, "strawberry-cream-filled", "strawberry-filled", "strawberry-cream-anim", "#ffffff", whipSounds);

function randomIntBetween(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

var level = -1;
var levels = [];

function generateLevels() {
	var l = Math.floor(levels.length / 2);
	var width = 15 + (4 * l);
	var speed = 0.20 + (0.02 * l);
	var empty = 0.3 + (0.05 * l);

	var levelSequence = l % 4;
	if (levelSequence === 0) {
		levels.push(butterOnly(width, speed, empty));
		levels.push(butterSyrup(width, -speed, empty));
	} else if (levelSequence === 1) {
		levels.push(blueberryOnly(width, speed, empty));
		levels.push(blueberryCream(width, -speed, empty));
	} else if (levelSequence === 2) {
		levels.push(butterOnly(width, speed, empty));
		levels.push(butterSugar(width, -speed, empty));
	} else {
		levels.push(strawberryOnly(width, speed, empty));
		levels.push(strawberryCream(width, -speed, empty));
	}
}

function isOdd(num) {
	return num % 2;
}

function makeWaffleForLevel() {
	var filledSquare = game.images.get(levels[level].filledImage);
	var goalSquare = game.images.get(levels[level].emptyImage);
	return makeWaffle(levels[level].width, filledSquare, goalSquare, levels[level].emptyPercent);
}

game.scenes.add("main", new Splat.Scene(canvas, function() {

	this.camera.x = -game.images.get("bg-left").width;

	this.score = 0;
	this.newBest = false;
	this.message = "";
	levels = [];

	this.nextLevel = function() {
		level++;
		if (level >= levels.length) {
			generateLevels();
		}

		this.camera.vx = levels[level].speed;

		this.squares = makeWaffleForLevel();
	}.bind(this);
	this.nextLevel();

	this.timers.fadeToBlack = new Splat.Timer(null, 1000, function() {
		level = -1;
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

	particles.move(elapsedMillis);

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
				this.score++;
				if (this.score > best) {
					best = this.score;
					this.newBest = true;
					setBest();
				}
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
				playRandomSound(levels[level].fillSounds);
				square.filled = true;
				square.sprite = game.animations.get(levels[level].fillAnim).copy();
				particles.spray(game.mouse.x, game.mouse.y, levels[level].particleColor, 5, 25, 8);
			} else {
				game.sounds.play("bad-tap");
				particles.spray(game.mouse.x, game.mouse.y, levels[level].particleColor, 5, 25, 100);
				// speed up camera as penalty
				if (this.camera.vx > 0) {
					this.camera.vx += 0.1;
				} else {
					this.camera.vx -= 0.1;
				}
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
		centerText(context, scene.score, 0, 100);
		particles.draw(context);
		if (scene.message === "Next waffle!") {
			var nextWaffle = game.animations.get("next-waffle-anim");
			nextWaffle.draw(context, (canvas.width / 2) - (nextWaffle.width / 2), (canvas.height / 2) - (nextWaffle.height / 2));
		}
		if (scene.message === "Next topping!") {
			var nextTopping = game.animations.get("next-topping-anim");
			nextTopping.draw(context, (canvas.width / 2) - (nextTopping.width / 2), 0);
		}
	});
}));

game.scenes.switchTo("loading");

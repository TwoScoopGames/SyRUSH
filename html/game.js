"use strict";

var canvas = document.getElementById("canvas");
canvas.height = 1136;
canvas.width = 640;
if (window.ejecta) {
	canvas.width = window.innerWidth * (canvas.height / window.innerHeight);
}

var manifest = {
	"images": {
		"bg-left": "images/bg-left.png",
		"bg-right": "images/bg-right.png",
		"next-topping-text": "images/next-topping-text.png",
		"logo": "images/logo.png",
		"sound-off": "images/sound-off-icon.png",
		"sound-on": "images/sound-on-icon.png",
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
			"frames": 5,
			"msPerFrame": 75,
			"repeatAt": 4
		},
		"butter-anim": {
			"strip": "images/butter-anim.png",
			"frames": 5,
			"msPerFrame": 75,
			"repeatAt": 4
		},
		"chip-anim": {
			"strip": "images/chip-anim.png",
			"frames": 5,
			"msPerFrame": 75,
			"repeatAt": 4
		},
		"cream-anim": {
			"strip": "images/cream-anim.png",
			"frames": 5,
			"msPerFrame": 75,
			"repeatAt": 4
		},
		"next-topping-cream": {
			"strip": "images/next-topping-cream.png",
			"frames": 6,
			"msPerFrame": 100,
			"repeatAt": 5
		},
		"next-topping-sugar": {
			"strip": "images/next-topping-sugar.png",
			"frames": 7,
			"msPerFrame": 100,
			"repeatAt": 6
		},
		"next-topping-syrup": {
			"strip": "images/next-topping-syrup.png",
			"frames": 6,
			"msPerFrame": 100,
			"repeatAt": 5
		},
		"next-waffle-anim": {
			"strip": "images/next-waffle-anim.png",
			"frames": 8,
			"msPerFrame": 50,
			"repeatAt": 7
		},
		"start-button": {
			"strip": "images/start-button-f5.png",
			"frames": 5,
			"msPerFrame": 25,
			"repeatAt": 4
		},
		"strawberry-anim": {
			"strip": "images/strawberry-anim.png",
			"frames": 5,
			"msPerFrame": 75,
			"repeatAt": 4
		},
		"sugar-anim": {
			"strip": "images/sugar-anim.png",
			"frames": 5,
			"msPerFrame": 75,
			"repeatAt": 4
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
var godmode = false;
var syrupParticles = [];
var gravity = 0.2;
var tileSize = 200;

var lastScore = -1;
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

function makeSquare(x, y, toppings, emptyPercent, hasEmpty) {
	var i = toppings.length;
	if (Math.random() <= emptyPercent && i > 0) {
		i--;
		if (hasEmpty && Math.random() <= 0.1 && i > 0) {
			i--;
		}
	}

	return new Square(x, y, tileSize, tileSize, toppings, i);
}

function Square(x, y, width, height, toppings, nextTopping) {
	Splat.Entity.call(this, x, y, width, height);
	this.toppings = toppings.slice(0);
	this.animations = toppings.map(function(t) {
		return game.animations.get(t.animation).copy();
	});
	this.nextTopping = nextTopping;
}
Square.prototype = Object.create(Splat.Entity.prototype);
Square.prototype.move = function(elapsedMillis) {
	for (var i = 0; i < this.nextTopping; i++) {
		this.animations[i].move(elapsedMillis);
	}
};
Square.prototype.draw = function(context) {
	var waffle = game.images.get("waffle-hole");
	context.drawImage(waffle, this.x, this.y);
	for (var i = 0; i < this.nextTopping; i++) {
		this.animations[i].draw(context, this.x, this.y);
	}
};
Square.prototype.isFinished = function() {
	return this.nextTopping === this.toppings.length;
};
Square.prototype.next = function() {
	if (this.isFinished()) {
		return;
	}

	var topping = this.toppings[this.nextTopping];
	this.nextTopping++;

	playRandomSound(topping.sounds);
	particles.spray(game.mouse.x, game.mouse.y, topping.particleColor, 5, 25, 8);
};
Square.prototype.bad = function() {
	game.sounds.play("bad-tap");
	var topping = this.toppings[this.nextTopping - 1];
	particles.spray(game.mouse.x, game.mouse.y, topping.particleColor, 5, 25, 100);
};

function makeSquareColumn(x, toppings, emptyPercent, hasEmpty) {
	var squares = [];
	for (var y = 0; y < canvas.height; y += tileSize) {
		squares.unshift(makeSquare(x, y, toppings, emptyPercent, hasEmpty));
	}
	return squares;
}

function makeWaffle(squaresWide, toppings, emptyPercent, hasEmpty) {
	var newSquares = [];
	for (var i = 0; i < squaresWide; i++) {
		newSquares = newSquares.concat(makeSquareColumn(i * tileSize, toppings, emptyPercent, hasEmpty));
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
	this.timers.running = new Splat.Timer(null, 2000, function() {
		Splat.ads.show(false);
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
	this.showLastScore = false;
	this.startPushed = false;
	var scene = this;
	this.timers.score = new Splat.Timer(undefined, 2000, function() {
		scene.showLastScore = lastScore !== -1 && !scene.showLastScore;
		this.reset();
		this.start();
	});
	this.timers.score.start();
	this.startButton = game.animations.get("start-button").copy();
}, function(elapsedMillis) {
	if (game.mouse.isPressed(0, (canvas.width - 115), Splat.ads.height, 115, 109)) {
		game.sounds.muted = !game.sounds.muted;
		if (game.sounds.muted) {
			game.sounds.stop("music");
		}
	}

	var buttonX = (canvas.width / 2) - (this.startButton.width / 2);
	var buttonY = 700;
	if (!this.startPushed && game.mouse.isPressed(0, buttonX, buttonY, this.startButton.width, this.startButton.height)) {
		this.startPushed = true;
		game.sounds.play("button");
	}
	if (this.startPushed) {
		this.startButton.move(elapsedMillis);
	}
	if (this.startPushed && !game.mouse.isPressed(0)) {
		this.startButton.move(elapsedMillis);
		game.sounds.play("music", true);
		Splat.ads.hide();
		game.scenes.switchTo("main");
	}
}, function(context) {
	var titleBackground = game.images.get("title-background");
	for (var x = 0; x < canvas.width; x += titleBackground.width) {
		context.drawImage(titleBackground, x, 0);
	}

	var logo = game.images.get("logo");
	context.drawImage(logo, (canvas.width / 2) - (logo.width / 2), 200);

	this.startButton.draw(context, (canvas.width / 2) - (this.startButton.width / 2), 700);

	context.fillStyle = "#fff";
	context.font = "50px lato";
	centerText(context, "Music by Glass Boy", 0, canvas.height - 60);

	var scoreMessage = "Best: " + best;
	if (this.showLastScore) {
		scoreMessage = "Last: " + lastScore;
	}
	centerText(context, scoreMessage, 0, 614);

	var soundSwitch;
	if (game.sounds.muted) {
		soundSwitch = game.images.get("sound-off");
	} else {
		soundSwitch = game.images.get("sound-on");
	}
	context.drawImage(soundSwitch, (canvas.width - soundSwitch.width), Splat.ads.height);
}));

function makeLevel(toppings, width, speed, emptyPercent) {
	return {
		toppings: toppings,
		width: width,
		speed: speed,
		emptyPercent: emptyPercent
	};
}

var popSounds = ["pop1", "pop2", "pop3", "pop4", "pop5", "pop6", "pop7", "pop8"];
var whipSounds = ["whip1", "whip2", "whip3", "whip4", "whip5", "whip6", "whip7", "whip8", "whip9", "whip10"];
var sugarSounds = ["sugar1", "sugar2"];

var toppings = {
	blueberry: {
		animation: "blueberry-anim",
		particleColor: "#760630",
		sounds: popSounds
	},
	butter: {
		animation: "butter-anim",
		particleColor: "#fde95e",
		sounds: popSounds
	},
	chip: {
		animation: "chip-anim",
		particleColor: "#513218",
		sounds: popSounds
	},
	cream: {
		animation: "cream-anim",
		particleColor: "#ffffff",
		sounds: whipSounds,
		nextAnim: "next-topping-cream"
	},
	strawberry: {
		animation: "strawberry-anim",
		particleColor: "#e33838",
		sounds: popSounds
	},
	sugar: {
		animation: "sugar-anim",
		particleColor: "#ffffff",
		sounds: sugarSounds,
		nextAnim: "next-topping-sugar"
	},
	syrup: {
		animation: "syrup-anim",
		particleColor: "#6d511f",
		sounds: popSounds,
		nextAnim: "next-topping-syrup"
	},
};


var butterOnly = makeLevel.bind(undefined, [toppings.butter]);
var butterSugar = makeLevel.bind(undefined, [toppings.butter, toppings.sugar]);
var butterSyrup = makeLevel.bind(undefined, [toppings.butter, toppings.syrup]);
var blueberryOnly = makeLevel.bind(undefined, [toppings.blueberry]);
var blueberryCream = makeLevel.bind(undefined, [toppings.blueberry, toppings.cream]);
var strawberryOnly = makeLevel.bind(undefined, [toppings.strawberry]);
var strawberryCream = makeLevel.bind(undefined, [toppings.strawberry, toppings.cream]);
var chipOnly = makeLevel.bind(undefined, [toppings.chip]);
var chipCream = makeLevel.bind(undefined, [toppings.chip, toppings.cream]);

function randomIntBetween(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

var level = -1;
var levels = [];

function generateLevels() {
	var l = Math.floor(levels.length / 2);
	var width = 15 + (4 * l);
	var speed = 0.25 + (0.01 * l);
	var empty = 0.3 + (0.03 * l);
	if (empty > 0.6) {
		empty = 0.6;
	}

	var levelSequence = l % 5;
	if (levelSequence === 0) {
		levels.push(butterOnly(width, speed, empty));
		levels.push(butterSyrup(width, -speed, empty));
	} else if (levelSequence === 1) {
		levels.push(blueberryOnly(width, speed, empty));
		levels.push(blueberryCream(width, -speed, empty));
	} else if (levelSequence === 2) {
		levels.push(butterOnly(width, speed, empty));
		levels.push(butterSugar(width, -speed, empty));
	} else if (levelSequence === 3) {
		levels.push(strawberryOnly(width, speed, empty));
		levels.push(strawberryCream(width, -speed, empty));
	} else {
		levels.push(chipOnly(width, speed, empty));
		levels.push(chipCream(width, -speed, empty));
	}
}

function isOdd(num) {
	return num % 2;
}

function makeWaffleForLevel() {
	var l = levels[level];
	return makeWaffle(l.width, l.toppings, l.emptyPercent, level >= 8);
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

	var scene = this;
	this.timers.fadeToBlack = new Splat.Timer(null, 1000, function() {
		lastScore = scene.score;
		level = -1;
		game.scenes.switchTo("game-title");
	});

	this.timers.banner = new Splat.Timer(function(elapsedMillis) {
		scene.message.move(elapsedMillis);
	}, 1000, function() {
		scene.message.reset();
		scene.message = undefined;
		scene.messageText = undefined;
	});

}, function(elapsedMillis) {
	if (this.camera.x >= (levels[level].width * tileSize) + game.images.get("bg-right").width - canvas.width && this.camera.vx > 0) {
		this.nextLevel();
		this.message = game.animations.get(levels[level].toppings[1].nextAnim);
		this.messageText = game.images.get("next-topping-text");
		this.timers.banner.reset();
		this.timers.banner.start();
	}
	if (this.camera.x < -game.images.get("bg-left").width && this.camera.vx < 0) {
		this.camera.x = -game.images.get("bg-left").width;
		this.camera.vx = 0;
		game.sounds.play("yay");
		this.nextLevel();
		this.message = game.animations.get("next-waffle-anim");
		this.timers.banner.reset();
		this.timers.banner.start();
	}

	particles.move(elapsedMillis);

	if (this.timers.fadeToBlack.running) {
		return;
	}

	var movingRight = this.camera.vx > 0;

	var scene = this;
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
		if (last.isFinished()) {
			if (nextSquare !== undefined && last.x !== nextSquare.x) {
				this.score++;
				if (scene.score > best) {
					best = scene.score;
					scene.newBest = true;
					setBest();
				}
			}
		} else {
			if (!godmode) {
				game.sounds.play("gasp");
				Splat.ads.show(false);
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
			if (square.isFinished()) {
				square.bad();
				// speed up camera as penalty
				if (this.camera.vx > 0) {
					this.camera.vx += 0.1;
				} else {
					this.camera.vx -= 0.1;
				}
			} else {
				square.next();
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
		if (scene.message) {
			scene.message.draw(context, (canvas.width / 2) - (scene.message.width / 2), (canvas.height / 2) - (scene.message.height / 2));
		}
		if (scene.messageText) {
			context.drawImage(scene.messageText, (canvas.width / 2) - (scene.messageText.width / 2), (canvas.height / 2) - (scene.messageText.height / 2));
		}
	});
}));

game.scenes.switchTo("loading");

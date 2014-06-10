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
		"two-scoop": {
			"strip": "images/two-scoop-anim.png",
			"frames": 32,
			"msPerFrame": 50,
			"repeatAt": 31
		}
	}
};


var game = new Splat.Game(canvas, manifest);
var score = 0;
var best = Math.floor(getBest());
var newBest = false;
var syrupParticles = [];
var gravity = 0.2;
var tileSize = 200;
var fillSounds = ["pop1", "pop2", "pop3", "pop4", "pop5", "pop6", "pop7", "pop8"];



function getBest() {
	var b = parseInt(Splat.saveData.get("bestScore"));
	if (isNaN(b) || b < 0 || !b) {
		b = 0;
	}
	return b;
}

// function setBest(b) {
// 	best = b;
// 	Splat.saveData.set("bestScore", best);
// }

function drawCircle(context, color, radius, strokeColor, strokeSize, x, y) {
	context.beginPath();
	context.arc(x, y, radius, 0, 2 * Math.PI, false);
	context.fillStyle = color;
	context.fill();
	context.lineWidth = strokeSize;
	context.strokeStyle = strokeColor;
	context.stroke();
}

function spray(mouse, velocity, radius, quantity) {
	syrupParticles.length = 0;
	for (var q = 0; q < quantity; q++) {
		syrupParticles.push({
			x: mouse.x,
			y: mouse.y,
			xv: (Math.random() - 0.5) * velocity,
			yv: (Math.random() - 0.5) * velocity,
			radius: Math.random() * radius
		});

	}
}

function drawParticles(context, particles) {
	for (var i = 0; i < particles.length; i++) {
		var particle = particles[i];
		drawCircle(context, "#6d511f", particle.radius, "#2d1e05", 0, particle.x, particle.y);
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



function drawFlash(context, scene) {
	var flashTime = scene.timers.flash.time;
	var flashLen = scene.timers.flash.expireMillis;

	if (flashTime > 0) {
		var opacity = Splat.math.oscillate(flashTime, flashLen);
		context.fillStyle = "rgba(255, 255, 255, " + opacity + ")";
		context.fillRect(scene.camera.x, scene.camera.y, canvas.width, canvas.height);
	}
}

function makeSquare(x, y) {
	var waffleHoleImage = game.images.get("waffle-hole");
	var waffleFilledImage = game.images.get("waffle-filled");
	var isFilled = false;
	if (x < 800) {
		isFilled = true;
	} else {
		isFilled = Math.random() > 0.5;
	}

	var image = isFilled ? waffleFilledImage : waffleHoleImage;
	var entity = new Splat.AnimatedEntity(x, y, tileSize, tileSize, image, 0, 0);
	entity.filled = isFilled;
	return entity;
}

var first = true;

function makeSquareColumn(x) {

	if (first) {
		console.log(x);
		first = false;
	}

	var squares = [];
	for (var y = 0; y < canvas.height; y += tileSize) {
		squares.unshift(makeSquare(x, y));
	}
	return squares;
}

function findMaxX(entities) {
	return entities.reduce(function(a, b) {
		return Math.max(a, b.x);
	}, -200);
}

function makeSquares(scene, squares) {
	var maxX = findMaxX(squares);
	var newSquares = [];
	if (maxX < scene.camera.x + canvas.width) {
		if (first) {
			console.log("scene camera x: ", scene.camera.x);
		}
		newSquares = newSquares.concat(makeSquareColumn(maxX + tileSize));
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
	},
	function(context) {
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

game.scenes.add("main", new Splat.Scene(canvas, function() {
		first = true;
		this.camera.x = 0;



		score = 0;
		newBest = false;

		this.squares = [];

		this.timers.fadeToBlack = new Splat.Timer(null, 1000, function() {
			game.scenes.switchTo("game-title");
		});


	},
	function simulation(elapsedMillis) {


		moveParticles(elapsedMillis, syrupParticles, true);
		var waffleFilledImage = game.images.get("waffle-filled");


		if (this.timers.fadeToBlack.running) {
			return;
		}

		this.camera.vx = 1;
		this.squares = this.squares.concat(makeSquares(this, this.squares));

		while (this.squares[0].x + this.squares[0].width < this.camera.x) {
			if (this.squares[0].filled) {
				var last = this.squares.shift();
				if (last.x !== this.squares[0].x) {
					score++;
				}

			} else {

				game.sounds.play("gasp");

				this.timers.fadeToBlack.start();
				this.camera.vx = 0;
				return;
			}
		}



		for (var i = 0; i < this.squares.length; i++) {
			var square = this.squares[i];
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
					square.sprite = waffleFilledImage;
					spray(game.mouse, 5, 25, 8);
				} else {

					game.sounds.play("bad-tap");

					spray(game.mouse, 5, 25, 100);
				}
			}
		}
	},

	function draw(context) {

		context.fillStyle = "#fff";
		context.fillRect(0, 0, canvas.width, canvas.height);

		for (var i = 0; i < this.squares.length; i++) {
			this.squares[i].draw(context);
		}

		if (this.timers.fadeToBlack.running) {
			drawScoreScreen(context, this);
			return;
		}


		this.camera.drawAbsolute(context, function() {
			context.fillStyle = "#ffffff";
			context.font = "100px lato";
			centerText(context, Math.floor(score), 0, 100);
			drawParticles(context, syrupParticles);
		});


	}));

game.scenes.switchTo("loading");
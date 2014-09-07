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
		"buy-screen": "images/buy-screen.png",
		"next-topping-text": "images/next-topping-text.png",
		"logo": "images/logo.png",
		"particle-star": "images/particle-star.png",
		"score-cavity": "images/score-cavity.png",
		"score-tab": "images/score-tab.png",
		"score-screen-background": "images/score-screen-background.png",
		"sound-off": "images/button-sound-off.png",
		"sound-on": "images/button-sound-on.png",
		"starticle": "images/starticle.png",
		"title-background": "images/title-background.png",
		"twoscoop-logo-small": "images/twoscoop-logo-small.png",
		"waffle-hole": "images/waffle-hole.png",
	},
	"sounds": {
		"button": "sound/menuchange.wav",
		"music": "sound/RoccoW_-_02_-_Weeklybeats_2014_2_-_Daniels_Kruis2.mp3",
		"bad-tap": "sound/196725__paulmorek__sz-squish-12.wav",
		"gasp": "sound/180005__gentlemanwalrus__shocked-gasp.wav",
		"yay": "sound/yay.mp3",
		"next-topping": "sound/next-topping.mp3",
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
		"bebasneue": {
			"embedded-opentype": "font/bebasneue-webfont.eot",
			"woff": "font/bebasneue-webfont.woff",
			"truetype": "font/bebasneue-webfont.ttf",
			"svg": "font/bebasneue-webfont.svg#bebasneue"
		},
		"olivier": {
			"embedded-opentype": "font/olivier.eot",
			"woff": "font/olivier.woff",
			"truetype": "font/olivier.ttf",
			"svg": "font/olivier.svg#olivier"
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
		"button-achievements": {
			"strip": "images/button-achievements.png",
			"frames": 5,
			"msPerFrame": 75,
			"repeatAt": 0
		},
		"button-achievements-disabled": {
			"strip": "images/button-achievements-disabled.png",
			"frames": 1,
			"msPerFrame": 75,
			"repeatAt": 0
		},
		"button-buy": {
			"strip": "images/button-buy.png",
			"frames": 25,
			"msPerFrame": 45,
			"repeatAt": 0,
			"rotate": "ccw"
		},
		"button-buy-confirm": {
			"strip": "images/button-buy-confirm.png",
			"frames": 1,
			"msPerFrame": 45,
			"repeatAt": 0
		},
		"button-buy-down": {
			"strip": "images/button-buy-down.png",
			"frames": 10,
			"msPerFrame": 30,
			"repeatAt": 9,
			"rotate": "ccw"
		},
		"button-leaderboard": {
			"strip": "images/button-leaderboard.png",
			"frames": 5,
			"msPerFrame": 75,
			"repeatAt": 0
		},
		"button-leaderboard-disabled": {
			"strip": "images/button-leaderboard-disabled.png",
			"frames": 1,
			"msPerFrame": 75,
			"repeatAt": 0
		},
		"button-not-yet": {
			"strip": "images/button-not-yet.png",
			"frames": 1,
			"msPerFrame": 45,
			"repeatAt": 0
		},
		"button-restore": {
			"strip": "images/button-restore.png",
			"frames": 5,
			"msPerFrame": 75,
			"repeatAt": 0
		},
		"button-singleplayer": {
			"strip": "images/button-singleplayer.png",
			"frames": 5,
			"msPerFrame": 25,
			"repeatAt": 4
		},
		"button-twoplayer": {
			"strip": "images/button-twoplayer.png",
			"frames": 5,
			"msPerFrame": 25,
			"repeatAt": 4
		},
		"button-twoplayer-disabled": {
			"strip": "images/button-twoplayer-disabled.png",
			"frames": 1,
			"msPerFrame": 25,
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
		"multiplayer-divider": {
			"strip": "images/multiplayer-divider-f14.png",
			"frames": 14,
			"msPerFrame": 100,
			"rotate": "cw"
		},
		"multiplayer-lost": {
			"strip": "images/multiplayer-lost.png",
			"frames": 10,
			"msPerFrame": 100
		},
		"multiplayer-lost-180": {
			"strip": "images/multiplayer-lost.png",
			"frames": 10,
			"msPerFrame": 100,
			"rotate": "180"
		},
		"multiplayer-won": {
			"strip": "images/multiplayer-won.png",
			"frames": 10,
			"msPerFrame": 100
		},
		"multiplayer-won-180": {
			"strip": "images/multiplayer-won.png",
			"frames": 10,
			"msPerFrame": 100,
			"rotate": "180"
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
		"score-card-anim": {
			"strip": "images/score-card-anim-11f.png",
			"frames": 11,
			"msPerFrame": 30,
			"repeatAt": 10
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

var score = -1;
var best = 0;
var newBest = false;

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
	Splat.leaderboards.reportScore("single_player", best);
}

var particles = new Splat.Particles(100, function(particle, options) {
	options = options || { radius: 25, color: "#ffffff" };
	particle.image = options.image;
	particle.radius = Math.random() * options.radius;
	particle.color = options.color;
	particle.stroke = options.color;
}, function(context, particle) {
	if (particle.image) {
		context.drawImage(particle.image, particle.x - particle.image.width / 2, particle.y - particle.image.height / 2);
	} else {
		drawCircle(context, particle.color, particle.radius, particle.stroke, 0, particle.x, particle.y);
	}
});

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
	particles.add(8, game.mouse.x, game.mouse.y, 5, { radius: 25, color: topping.particleColor });
};
Square.prototype.bad = function() {
	game.sounds.play("bad-tap");
	var topping = this.toppings[this.nextTopping - 1];
	particles.add(100, game.mouse.x, game.mouse.y, 5, { radius: 25, color: topping.particleColor });
};

var pixelsHigh = Math.ceil(canvas.height / tileSize) * tileSize;
var pixelDiff = pixelsHigh - canvas.height;
var startingY = -Math.floor(pixelDiff / 2);

function makeSquareColumn(x, toppings, emptyPercent, hasEmpty) {
	var squares = [];
	for (var y = startingY; y < canvas.height; y += tileSize) {
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
		if (!paid) {
			Splat.ads.show(false);
		}
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
	context.font = "50px olivier";
	centerText(context, "Two Scoop Games", 0, (canvas.height / 2) + (anim.height / 2) + 30);

	anim.draw(context, (canvas.width / 2) - (anim.width / 2), (canvas.height / 2) - (anim.height / 2));
}));

var mode = "1p";
var paid = false;

function convertToPaid() {
	paid = true;
	game.scenes.switchTo("game-title");
}

game.scenes.add("game-title", new Splat.Scene(canvas, function() {
	if (paid) {
		Splat.ads.hide();
	}
	this.showLastScore = false;

	var scene = this;
	this.timers.score = new Splat.Timer(undefined, 2000, function() {
		scene.showLastScore = score !== -1 && !scene.showLastScore;
		this.reset();
		this.start();
	});
	this.timers.score.start();

	particles.reset();

	this.buttons = [];
	var buttonTop = 520;
	var buttonHSpacing = 175;

	var buttonCol1 = (canvas.width / 2) - 243;
	var buttonCol2 = (canvas.width / 2) - (game.animations.get("button-restore").width / 2);
	var buttonCol3 = (canvas.width / 2) + 243 - game.animations.get("button-restore").width;

	var anim;

	var soundToggle = new Splat.Button(game.mouse, buttonCol1, buttonTop, { normal: game.images.get("sound-on"), pressed: game.images.get("sound-off") }, function(state) {
		if (state === "pressed") {
			game.sounds.muted = true;
			game.sounds.stop("music");
		} else if (state === "normal") {
			game.sounds.muted = true;
			playRandomSound(popSounds);
		}
	}, function() {
	});
	soundToggle.isToggle = true;
	this.buttons.push(soundToggle);

	anim = game.animations.get(paid ? "button-leaderboard" : "button-leaderboard-disabled").copy();
	this.buttons.push(new Splat.Button(game.mouse, buttonCol2, buttonTop, { pressDown: anim }, function(state) {
		if (!paid) {
			if (state === "pressed") {
				game.sounds.play("gasp");
			}
			return;
		}
		if (state === "pressed") {
			Splat.leaderboards.showLeaderboard("single_player");
		}
	}));

	anim = game.animations.get(paid ? "button-achievements" : "button-achievements-disabled").copy();
	this.buttons.push(new Splat.Button(game.mouse, buttonCol3, buttonTop, { pressDown: anim }, function(state) {
		if (!paid) {
			if (state === "pressed") {
				game.sounds.play("gasp");
			}
			return;
		}
		if (state === "pressed") {
			Splat.leaderboards.showAchievements();
		}
	}));

	anim = game.animations.get("button-singleplayer").copy();
	this.buttons.push(new Splat.Button(game.mouse, buttonCol1, buttonTop + buttonHSpacing, { pressDown: anim }, function(state) {
		if (state === "pressDown") {
			game.sounds.play("bad-tap");
			particles.add(100, game.mouse.x, game.mouse.y, 5, { radius: 25, color: "#6d511f" });
			mode = "1p";
		} else if (state === "pressed") {
			game.mouse.onmouseup = undefined;
			game.sounds.play("music", true);
			Splat.ads.hide();
			game.scenes.switchTo("main");
		}
	}));

	anim = game.animations.get(paid ? "button-twoplayer" : "button-twoplayer-disabled").copy();
	this.buttons.push(new Splat.Button(game.mouse, buttonCol3, buttonTop + buttonHSpacing, { pressDown: anim }, function(state) {
		if (!paid) {
			if (state === "pressed") {
				game.sounds.play("gasp");
			}
			return;
		}
		if (state === "pressDown") {
			game.sounds.play("bad-tap");
			particles.add(100, game.mouse.x, game.mouse.y, 5, { radius: 25, color: "#6d511f" });
			mode = "2p";
		} else if (state === "pressed") {
			game.mouse.onmouseup = undefined;
			game.sounds.play("music", true);
			Splat.ads.hide();
			game.scenes.switchTo("main");
		}
	}));

	if (!paid) {
		this.buttons.push(new Splat.Button(game.mouse, buttonCol1, buttonTop + 2 * buttonHSpacing - 13, { normal: game.animations.get("button-buy").copy(), pressDown: game.animations.get("button-buy-down") }, function(state) {
			if (state === "pressDown") {
				game.sounds.play("yay");
				particles.add(100, game.mouse.x, game.mouse.y, 5, { image: game.images.get("starticle") });
			} else if (this.state === "pressed") {
				game.scenes.switchTo("buy");
			}
		}));

		anim = game.animations.get("button-restore").copy();
		this.buttons.push(new Splat.Button(game.mouse, buttonCol3, buttonTop + 2 * buttonHSpacing, { pressDown: anim }, function(state) {
			if (this.state === "pressed") {
				Splat.iap.restore(function(err, skus) {
					if (err) {
						console.error("Error restoring purchases", err);
						return;
					}
					if (skus.indexOf("fullgame") !== -1) {
						convertToPaid();
					}
				});
			}
		}));
	}

	var mouseUpHandler = function(x, y) {
		if (x < 344 && y > 1039) {
			playRandomSound(popSounds);
			Splat.openUrl("https://soundcloud.com/roccow");
		}
		if (x > canvas.width - 220 && y > 1039) {
			playRandomSound(popSounds);
			Splat.openUrl("http://twoscoopgames.com/");
		}
	};
	game.mouse.onmouseup = game.mouse.isPressed(0) ? function() { game.mouse.onmouseup = mouseUpHandler; } : mouseUpHandler;
}, function(elapsedMillis) {
	particles.move(elapsedMillis);

	this.buttons.forEach(function(button) {
		button.move(elapsedMillis);
	});

	if (game.keyboard.consumePressed("p") || game.mouse.consumePressed(0, 0, Splat.ads.height, 100, 100)) {
		paid = !paid;
		game.scenes.switchTo("game-title");
	}
}, function(context) {
	var titleBackground = game.images.get("title-background");
	for (var x = canvas.width / 2 - titleBackground.width; x > -titleBackground.width; x -= titleBackground.width) {
		context.drawImage(titleBackground, x, 0);
	}
	for (var x = canvas.width / 2; x < canvas.width; x += titleBackground.width) {
		context.drawImage(titleBackground, x, 0);
	}

	this.buttons.forEach(function(button) {
		button.draw(context);
	});

	context.fillStyle = "#fff";
	context.font = "40px olivier";
	context.fillText("Music by RoccoW", 20, canvas.height - 30);

	var twoScoopLogo = game.images.get("twoscoop-logo-small");
	context.drawImage(twoScoopLogo, canvas.width - twoScoopLogo.width - 17, canvas.height - twoScoopLogo.height);

	var scoreCavity = game.images.get("score-cavity");
	var cavityX = (canvas.width / 2) - (scoreCavity.width / 2);
	var cavityY = 318;
	context.drawImage(scoreCavity, cavityX, cavityY);

	context.fillStyle = "#553013";
	context.font = "80px olivier";
	var cavityTextY = cavityY + 110;
	if (this.showLastScore) {
		context.fillText("Last:", cavityX + 40, cavityTextY);
		context.font = "80px bebasneue";
		var w = context.measureText(score).width;
		context.fillText(score, cavityX + scoreCavity.width - w - 40, cavityTextY);
	} else {
		context.fillText("Best:", cavityX + 40, cavityTextY);
		context.font = "80px bebasneue";
		var w = context.measureText(best).width;
		context.fillText(best, cavityX + scoreCavity.width - w - 40, cavityTextY);
	}

	var logo = game.images.get("logo");
	context.drawImage(logo, (canvas.width / 2) - (logo.width / 2), 80);

	particles.draw(context);
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
	var speed = 0.2 + (0.01 * l);
	var empty = 0.3 + (0.03 * l);
	if (empty > 0.6) {
		empty = 0.6;
	}

	var levelSequence = l % 5;
	if (!paid || levelSequence === 0) {
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

	score = 0;
	newBest = false;
	this.message = "";
	levels = [];
	level = -1;

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
	this.timers.banner = new Splat.Timer(function(elapsedMillis) {
		scene.message.move(elapsedMillis);
	}, 1000, function() {
		scene.message.reset();
		scene.message = undefined;
		scene.messageText = undefined;
	});
	this.timers.twoPlayerDead = new Splat.Timer(function(elapsedMillis) {
		scene.top.move(elapsedMillis);
		scene.bottom.move(elapsedMillis);
	}, 5000, function() {
		game.scenes.switchTo("game-title");
	});
}, function(elapsedMillis) {
	if (this.camera.x >= (levels[level].width * tileSize) + game.images.get("bg-right").width - canvas.width && this.camera.vx > 0) {
		this.nextLevel();

		if (!this.timers.twoPlayerDead.running) {
			game.sounds.play("next-topping");
			this.message = game.animations.get(levels[level].toppings[1].nextAnim);
			this.messageText = game.images.get("next-topping-text");
			this.timers.banner.reset();
			this.timers.banner.start();
		}
	}
	if (this.camera.x < -game.images.get("bg-left").width && this.camera.vx < 0) {
		this.camera.x = -game.images.get("bg-left").width;
		this.camera.vx = 0;
		this.nextLevel();

		if (!this.timers.twoPlayerDead.running) {
			game.sounds.play("yay");
			this.message = game.animations.get("next-waffle-anim");
			this.timers.banner.reset();
			this.timers.banner.start();
		}
	}

	game.animations.get("multiplayer-divider").move(elapsedMillis);
	particles.move(elapsedMillis);

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
				score++;
			}
		} else {
			if (mode == "2p") {
				if (!scene.timers.twoPlayerDead.running) {
					if (last.y < canvas.height / 2) {
						this.top = game.animations.get("multiplayer-lost-180").copy();
						this.bottom = game.animations.get("multiplayer-won").copy();
					} else {
						this.top = game.animations.get("multiplayer-won-180").copy();
						this.bottom = game.animations.get("multiplayer-lost").copy();
					}
					game.sounds.play("yay");
				}
				scene.timers.twoPlayerDead.start();
			} else if (!godmode) {
				if (score > best) {
					best = score;
					newBest = true;
					if (mode == "1p") {
						setBest();
					}
				}
				game.sounds.play("gasp");
				game.scenes.switchTo("score");
			}
			return;
		}
	}
	for (var i = 0; i < this.squares.length; i++) {
		var square = this.squares[i];
		square.move(elapsedMillis);
		if (scene.timers.twoPlayerDead.running) {
			continue;
		}
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

	var scene = this;
	this.camera.drawAbsolute(context, function() {
		if (mode == "1p") {
			var tab = game.images.get("score-tab");
			context.drawImage(tab, (canvas.width / 2) - (tab.width / 2), 0);

			context.fillStyle = "#4b4b4b";
			context.font = "72px bebasneue";
			centerText(context, score, 0, 65);
		}

		if (mode == "2p") {
			var divider = game.animations.get("multiplayer-divider");
			divider.draw(context, 0, (canvas.height / 2) - (divider.height / 2));
		}
		particles.draw(context);

		if (scene.message) {
			scene.message.draw(context, (canvas.width / 2) - (scene.message.width / 2), (canvas.height / 2) - (scene.message.height / 2));
		}
		if (scene.messageText) {
			context.drawImage(scene.messageText, (canvas.width / 2) - (scene.messageText.width / 2), (canvas.height / 2) - (scene.messageText.height / 2));
		}
		if (scene.timers.twoPlayerDead.running) {
			scene.top.draw(context, (canvas.width / 2) - (scene.top.width / 2), (canvas.height / 4) - (scene.top.height / 2));
			scene.bottom.draw(context, (canvas.width / 2) - (scene.bottom.width / 2), (canvas.height * 3 / 4) - (scene.bottom.height / 2));
		}
	});
}));

game.scenes.add("score", new Splat.Scene(canvas, function() {
	if (!paid) {
		Splat.ads.show(false);
	}

	this.timers.done = new Splat.Timer(undefined, 2000, function() {
		if (paid) {
			game.scenes.switchTo("game-title");
		} else {
			game.scenes.switchTo("buy");
		}
	});

	this.score = 0;
	this.showBest = false;

	this.scoreAnim = game.animations.get("score-card-anim").copy();
	this.bestAnim = game.animations.get("score-card-anim").copy();

	this.incrementParticles = new Splat.Particles(100, function(particle, options) {
		options = options || { radius: 25, color: "#ffffff" };
		particle.radius = Math.random() * options.radius;
		particle.color = options.color;
		particle.stroke = options.color;
	}, function(context, particle) {
		drawCircle(context, particle.color, particle.radius, particle.stroke, 0, particle.x, particle.y);
	});
	this.incrementParticles.gravity = 1;

	var scene = this;
	this.timers.increment = new Splat.Timer(undefined, 20, function() {
		if (scene.score < score) {
			scene.incrementParticles.add(2, canvas.width / 2, 200 + (scene.scoreAnim.height / 2), 5, { radius: 25, color: "#6d511f" });
			playRandomSound(popSounds);
			scene.score++;
			this.reset();
			this.start();
		} else {
			scene.showBest = true;
			scene.timers.glimmerBest.start();
		}
	});

	this.timers.glimmer = new Splat.Timer(function(elapsedMillis) {
		scene.scoreAnim.move(elapsedMillis);
	}, 700, function() {
		scene.timers.increment.start();
	});
	this.timers.glimmer.start();

	this.timers.glimmerBest = new Splat.Timer(function(elapsedMillis) {
		scene.bestAnim.move(elapsedMillis);
	}, 700, function() {
		game.sounds.play("bad-tap");
		if (newBest) {
			game.sounds.play("yay");
			particles.add(100, canvas.width / 2, 500 + (scene.bestAnim.height / 2), 3, { image: game.images.get("particle-star") });
		} else {
			particles.add(40, canvas.width / 2, 500 + (scene.bestAnim.height / 2), 3, { radius: 25, color: "#6d511f" });
		}
		scene.timers.done.start();
	});
}, function(elapsedMillis) {
	this.incrementParticles.move(elapsedMillis);
	particles.move(elapsedMillis);
}, function(context) {
	var bg = game.images.get("score-screen-background");
	context.drawImage(bg, (canvas.width / 2) - (bg.width / 2), 0);

	this.scoreAnim.draw(context, (canvas.width / 2) - (this.scoreAnim.width / 2), 200);

	if (!this.timers.glimmer.running) {
		context.fillStyle = "#ffffff";
		context.font = "50px olivier";
		centerText(context, "SCORE", 0, 300);
		context.font = "100px bebasneue";
		centerText(context, this.score, 0, 400);
	}

	if (this.showBest) {
		this.bestAnim.draw(context, (canvas.width / 2) - (this.bestAnim.width / 2), 500);
	}

	if (this.timers.done.running) {
		context.font = "50px olivier";
		if (newBest) {
			context.fillStyle = "#f3f27a";
			centerText(context, "NEW BEST!", 0, 600);
		} else {
			centerText(context, "BEST", 0, 600);
		}

		context.font = "100px bebasneue";
		centerText(context, best, 0, 700);
	}

	this.incrementParticles.draw(context);
	particles.draw(context);
}));

game.scenes.add("buy", new Splat.Scene(canvas, function() {
	Splat.ads.hide();

	var anim = game.animations.get("button-buy-confirm").copy();
	var x = canvas.width / 2 - anim.width / 2;
	this.buyButton = new Splat.Button(game.mouse, x, 860, { pressDown: anim }, function(state) {
		if (state === "pressed") {
			game.sounds.play("yay");
			Splat.iap.get("fullgame", function(err, product) {
				if (err) {
					console.error("Error fetching sku", err);
					return;
				}
				Splat.iap.buy(product, 1, function(err) {
					if (err) {
						console.error("Error buying product", err);
						return;
					}
					convertToPaid();
				});
			});
		}
	});
	anim = game.animations.get("button-not-yet").copy();
	x = canvas.width / 2 - anim.width / 2;
	this.notYetButton = new Splat.Button(game.mouse, x, 1050, { pressDown: anim }, function(state) {
		if (state === "pressed") {
			game.sounds.play("gasp");
			Splat.ads.show(false);
			game.scenes.switchTo("game-title");
		}
	});
}, function(elapsedMillis) {
	this.buyButton.move(elapsedMillis);
	this.notYetButton.move(elapsedMillis);
}, function(context) {
	var bg = game.images.get("buy-screen");
	context.drawImage(bg, canvas.width / 2 - bg.width / 2, 0);
	this.buyButton.draw(context);
	this.notYetButton.draw(context);
}));

game.scenes.switchTo("loading");

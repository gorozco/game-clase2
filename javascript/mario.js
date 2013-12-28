Q.animations("mario_anim", {
	caminar : {
		frames : [4, 5, 8],
		rate : 1 / 6,
		loop : false
	},
	quieto : {
		frames : [1],
		rate : 1 / 2,
		loop : false
	},
	saltar : {
		frames : [2],
		rate : 1 / 2,
		loop : false
	},
	morir : {
		frames : [12],
		rate : 1,
		loop : false,
		trigger : "muerto"
	}
});

Q.Sprite.extend("Mario", {
	init : function(p) {

		this._super(p, {
			sheet : "mario_enano",
			sprite : "mario_anim",
			frame : 1,
			x : 100,
			y : 50,
			jumpSpeed : -500,
			isMuerto : false
		});

		this.add("2d, platformerControls, animation, tween");

		this.on("bump.left, bump.right, bump.top", function(colisiones) {
			if (colisiones.obj.isA("Goomba") || colisiones.obj.isA("TortugaVerde") || colisiones.obj.isA("TortugaVerdeAlada")) {
				Q.audio.stop("tema_superficie.mp3");
				Q.audio.play("mario_muere.mp3");
				this.del("platformerControls");
				this.p.isMuerto = true;
				this.play("morir");
			}
		});

		this.on("muerto", function() {
			this.del("2d");
			this.animate({
				y : this.p.y - 50,
				//x : this.p.x + 100
			}, 0.5, {
				callback:function(){
					this.animate({
						y : 384
					}, 2, Q.Easing.Quadratic.In, {
						callback: function(){
							this.destroy();
						}
					});
				}
			});
			//this.destroy();
		});

	},
	step : function() {

		if (this.p.isMuerto === false) {

			if (this.p.vx > 0 && this.p.vy === 0) {

				this.p.flip = false;
				this.play("caminar");
			} else if (this.p.vx < 0 && this.p.vy === 0) {

				this.p.flip = "x";
				this.play("caminar");
			} else if (this.p.vx === 0 && this.p.vy === 0) {

				this.play("quieto");
			} else if (this.p.vy !== 0) {
				Q.audio.play("salto_enano.mp3", {
					debounce : 1000
				});
				this.play("saltar");
				Q.audio.play("patada.mp3", {
					debounce: 1000
				});
			}

		}

	}
});

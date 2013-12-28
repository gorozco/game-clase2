Q.animations("goomba_anim", {
	caminar : {
		frames : [1, 0],
		rate : 1 / 4
	},
	aplastar :{
		frames : [3],
		rate : 1,
		loop : false,
		trigger : "aplastado"
	}
});

Q.animations("tortuga_verde_anim", {
	caminar : {
		frames : [0, 1],
		rate : 1 / 4,
		loop : false
	},
	concha :{
		frames : [2, 4],
		rate : 1 / 2,
		loop : false
	}
});

//ANIMACION TORTUGA VERDE ALADA(TAREA1)
Q.animations("tortuga_verde_alada_anim", {
	caminar : {
		frames : [5, 6],
		rate : 1 / 4,
		loop : false
	}
});

//DEFINICION TORTUGA VERDE ALADA
Q.Sprite.extend("TortugaVerdeAlada", {
	init : function(p) {

		this._super(p, {
			sheet : "enemigos_altos",
			sprite : "tortuga_verde_alada_anim", //note que usamos una animacion que definimos
			x : 200,
			y : 40,
			vx : 120,
			frame : 0
		});

		//HABILITAMOS LOS MODULOS PARA QUE LA TORTUGA TENGA ANIMACIONES Y REBOTE
		this.add("2d, aiBounce, animation, tween");

	},
	step : function() {

		//invertimos la animacion dependiendo de si esta caminando a la derecha o la izquierda
		if (this.p.vx > 0) {

			this.p.flip = "x";
			this.play("caminar");

		} else if (this.p.vx < 0) {

			this.p.flip = false;
			this.play("caminar");

		}
	},
	
	choqueConcha: function(){
		this.del("2d");
		this.animate({
			y : this.p.y - 384,
			x : this.p.x + 100
		},0.5, {
			callback: function(){
				this.destroy();
			}
		});
	}
});

Q.Sprite.extend("Goomba", {
	init : function(p) {

		this._super(p, {
			sheet : "enemigos_bajos",
			sprite : "goomba_anim",
			x : 110,
			y : 40,
			vx : 120,
			frame : 0,
			jumpSpeed : -300
		});

		this.add("2d, aiBounce, animation, tween");
		this.play("caminar");
		
		//seunda forma para escuchar eventos
		//this.on("bump.right, bump.left", this, "colisionDerecha");
		
		this.on("aplastado", function(){
			this.destroy();
		});
		this.on("bump.top", function(colisiones){
			if(colisiones.obj.isA("Mario")){
				//detenemsos al Gomba
				this.p.vx = 0;
				//hacemos que rebote el mario
				colisiones.obj.p.vy = -300,
				this.play("aplastar");
				//this.destroy();
			}
		});
	}, colisionDerecha : function(colisiones){
		if(colisiones.obj.isA("Mario")){
			colisiones.obj.destroy();
		}
	},
	
	choqueConcha: function(){
		this.animate({
			y : this.p.y - 384,
			x : this.p.x + 100
		},0.5, {
			callback: function(){
				this.destroy();
			}
		});
	}

	
	
	
});

Q.Sprite.extend("TortugaVerde", {
	init : function(p) {

		this._super(p, {
			sheet : "enemigos_altos",
			sprite : "tortuga_verde_anim",
			x : 180,
			y : 40,
			vx : 120,
			frame : 0,
			jumpSpeed : -300,
			esConcha : false
		});

		this.add("2d, aiBounce,animation, tween");
		this.on("bump.top", function(colisiones){
			if(colisiones.obj.isA("Mario")){
				this.sheet("enemigos_bajos", true);
				this.p.esConcha =  true;
				this.p.vx = 300;
				this.play("concha");
			}
		});
		
		
		
		this.on("bump.left, bump.right", function(colisiones){
			if(this.p.esConcha){
				if (colisiones.obj.isA("Gomba") || colisiones.obj.isA("TortugaVerdeAlada")) {
					Q.audio.play("patada.mp3");
					//colisiones.obj.destroy();
					colisiones.choqueConcha();
				}
				
			}
			
		});
		
		
		
		
	},
	step : function() {
		if(this.p.esConcha == false){
			if (this.p.vx > 0) {
				this.p.flip = "x";
				this.play("caminar");
			} else if (this.p.vx < 0) {

				this.p.flip = false;
				this.play("caminar");
			}
		}
	},
	
	choqueConcha: function(){
		this.animate({
			y : this.p.y - 384,
			x : this.p.x + 100
		},0.5, {
			callback: function(){
				this.destroy();
			}
		});
	}
	
});


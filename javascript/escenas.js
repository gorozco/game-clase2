Q.scene("escena1", function(stage) {

	var cielo = new Q.TileLayer({
		dataAsset : "mapa_escena1.tmx",
		layerIndex : 0,
		sheet : "escenario",
		type : Q.SPRITE_NONE
	});

	stage.insert(cielo);

	var nubes = new Q.TileLayer({
		dataAsset : "mapa_escena1.tmx",
		layerIndex : 1,
		sheet : "escenario",
		type : Q.SPRITE_NONE
	});
	stage.insert(nubes);

	var colisiones = new Q.TileLayer({
		dataAsset : "mapa_escena1.tmx",
		layerIndex : 2,
		sheet : "escenario"
	});
	stage.collisionLayer(colisiones);

	var alturaPiso = colisiones.p.h - (3 * 32);
	var mario = stage.insert(new Q.Mario({
		x : 40,
		y : alturaPiso
	}));

	stage.add("viewport").follow(mario, {
		x : true,
		y : true
	}, {
		minX : 32,
		maxX : colisiones.p.w,
		minY : 0,
		maxY : colisiones.p.h
	});

	stage.insert(new Q.Goomba({
		x : 300,
		y : alturaPiso
	}));

	stage.insert(new Q.TortugaVerde({
		x : 350,
		y : alturaPiso
	}));

	stage.insert(new Q.TortugaVerdeAlada({
		x : 450,
		y : alturaPiso
	}));
	
	Q.audio.play("tema_superficie.mp3", {
		loop: true
	});
});

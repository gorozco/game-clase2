var Q = new Quintus({
	development : true
});

Q.include("Scenes, Sprites, 2D, Input, Anim, Touch, Audio");
Q.enableSound();
Q.setup("juego");
Q.controls();

var recursos = "mapa_escena1.tmx, mosaicos_escenario.png, mosaicos_mario_enano.png, mosaicos_enemigos_32x32.png, mosaicos_enemigos_32x46.png";
recursos = recursos + ", salto_enano.mp3, tema_superficie.mp3, mario_muere.mp3, patada.mp3";
Q.load(recursos, function() {

	Q.sheet("escenario", "mosaicos_escenario.png", {
		tileH : 32,
		tileW : 32
	});

	Q.sheet("mario_enano", "mosaicos_mario_enano.png", {
		tileH : 30,
		tileW : 30
	});

	Q.sheet("enemigos_bajos", "mosaicos_enemigos_32x32.png", {
		tileH : 32,
		tileW : 32
	});

	Q.sheet("enemigos_altos", "mosaicos_enemigos_32x46.png", {
		tileW : 32,
		tileH : 46,
	});

	Q.stageScene("escena1");
},
{
	progressCallback: function(leidos, total){
		var porcentaje = Math.floor(leidos / total * 100) + "%";
		
		$("#loading-barra").css("width", porcentaje);
		
		if(leidos === total){
			$("#loading-contenedor").remove();
			$("canvas").css("display", "block");
		}
		
	}
});
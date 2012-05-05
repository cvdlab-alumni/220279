var getWingModel = function() {
	var drawBezierS0Curve = function(controlPoints) {
		var domain = INTERVALS(1)(80); // In HD xD

		// punti di controllo
		// var listaDfacce = [];
		// controlPoints.forEach( function(v,i) { listaDfacce.push([i]); } );
		// DRAW( COLOR([0.1,0.6,0.2])( SIMPLICIAL_COMPLEX(controlPoints)(listaDfacce) ) );

		// polyline che unisce punti di controllo
		// DRAW( COLOR([0.5,0.2,0.7])( POLYLINE(controlPoints) ) );

		// curva
		var curveMapping = BEZIER(S0)(controlPoints);
		var curve = MAP(curveMapping)(domain);
		DRAW( COLOR([0,0.5,0.5])( curve ) );

		return curveMapping;
	};

	var drawBezierS0 = function(controlPoints) {
		return BEZIER(S0)(controlPoints);
	};

	var scaleWingSection = function(controlWing, scaleFactor) {
		return controlWing.map(function(p) { return [p[0] * scaleFactor, p[1] * scaleFactor, p[2]]; } );
	};

	var moveWingSection = function(controlWing, zeta) {
		return controlWing.map(function(p) { return [p[0], p[1], p[2] + zeta]; } );
	};

	var movexWingSection = function(controlWing, ics) {
		return controlWing.map(function(p) { return [p[0] + ics, p[1], p[2]]; } );
	};

	// Lunghezza massima ala = 6
	// in z quindi posso andare 11
	var wingcontrol = [[10-10,0,0], [9-10,0.1,0], [7-10, 0.5, 0], [7-10,1,0], [3-10,5,0], [1-10,-4.9,0], [5-10,2,0], [7-10,-1,0], [10-10,0,0]];
	var zRuote = 0;

	var wingProfile = [];
	var lastZ = 0;
	wingProfile.push(drawBezierS0(wingcontrol));
	// Qui incastra nella fusoliera
	lastZ = lastZ + 0.2;
	wingProfile.push(drawBezierS0(moveWingSection(wingcontrol, lastZ))); 
	lastZ = lastZ + 0.2;
	wingProfile.push(drawBezierS0(moveWingSection(wingcontrol, lastZ)));
	lastZ = lastZ + 0.2;
	wingProfile.push(drawBezierS0(moveWingSection(wingcontrol, lastZ)));
	lastZ = lastZ + 0.2;
	wingProfile.push(drawBezierS0(moveWingSection(wingcontrol, lastZ)));
	lastZ = lastZ + 0.2;
	wingProfile.push(drawBezierS0(moveWingSection(wingcontrol, lastZ)));
	// Qui s'attaccano le ruote
	lastZ = lastZ + 0.2;
	wingProfile.push(drawBezierS0(moveWingSection(wingcontrol, lastZ)));
	lastZ = lastZ + 0.2;
	wingProfile.push(drawBezierS0(moveWingSection(wingcontrol, lastZ)));
	lastZ = lastZ + 0.2;
	wingProfile.push(drawBezierS0(moveWingSection(wingcontrol, lastZ)));
	lastZ = lastZ + 0.2;
	wingProfile.push(drawBezierS0(moveWingSection(wingcontrol, lastZ)));
	lastZ = lastZ + 0.2;
	zRuote = lastZ;
	wingProfile.push(drawBezierS0(moveWingSection(wingcontrol, lastZ)));
	// z = 2
	// Da qui si deve rimpicciolire, visto che rimaniamo dritti dietro (semplificazione)
	lastZ = 2.7;
	wingProfile.push(drawBezierS0( movexWingSection(scaleWingSection(moveWingSection(wingcontrol, lastZ), 0.9), -0.2) ));
	lastZ = lastZ + 0.2;
	wingProfile.push(drawBezierS0( movexWingSection(scaleWingSection(moveWingSection(wingcontrol, lastZ), 0.9), -0.2) ));
	lastZ = lastZ + 0.1;
	wingProfile.push(drawBezierS0( movexWingSection(scaleWingSection(moveWingSection(wingcontrol, lastZ), 0.9), -0.2) ));
	// 1/4
	lastZ = 4.7;
	wingProfile.push(drawBezierS0( movexWingSection(scaleWingSection(moveWingSection(wingcontrol, lastZ), 0.8), -0.4) ));
	lastZ = lastZ + 0.2;
	wingProfile.push(drawBezierS0( movexWingSection(scaleWingSection(moveWingSection(wingcontrol, lastZ), 0.8), -0.4) ));
	lastZ = lastZ + 0.1;
	wingProfile.push(drawBezierS0( movexWingSection(scaleWingSection(moveWingSection(wingcontrol, lastZ), 0.8), -0.4) ));
	// 2/4
	lastZ = 6.7;
	wingProfile.push(drawBezierS0( movexWingSection(scaleWingSection(moveWingSection(wingcontrol, lastZ), 0.7), -0.5) ));
	lastZ = lastZ + 0.2;
	wingProfile.push(drawBezierS0( movexWingSection(scaleWingSection(moveWingSection(wingcontrol, lastZ), 0.7), -0.5) ));
	lastZ = lastZ + 0.1;
	wingProfile.push(drawBezierS0( movexWingSection(scaleWingSection(moveWingSection(wingcontrol, lastZ), 0.7), -0.5) ));
	// 3/4
	lastZ = 8.7;
	wingProfile.push(drawBezierS0( movexWingSection(scaleWingSection(moveWingSection(wingcontrol, lastZ), 0.6), -0.6) ));
	lastZ = lastZ + 0.2;
	wingProfile.push(drawBezierS0( movexWingSection(scaleWingSection(moveWingSection(wingcontrol, lastZ), 0.6), -0.6) ));
	lastZ = lastZ + 0.1;
	wingProfile.push(drawBezierS0( movexWingSection(scaleWingSection(moveWingSection(wingcontrol, lastZ), 0.6), -0.6) ));
	// fine
	lastZ = 10.7;
	wingProfile.push(drawBezierS0( movexWingSection(scaleWingSection(moveWingSection(wingcontrol, lastZ), 0.5), -0.7) ));
	lastZ = lastZ + 0.2;
	wingProfile.push(drawBezierS0( movexWingSection(scaleWingSection(moveWingSection(wingcontrol, lastZ), 0.5), -0.7) ));
	lastZ = lastZ + 0.1;
	wingProfile.push(drawBezierS0( movexWingSection(scaleWingSection(moveWingSection(wingcontrol, lastZ), 0.5), -0.7) ));
	

	var domain2 = DOMAIN([[0,1],[0,1]])([30,30]);
	var surfWing = BEZIER(S1)(wingProfile);
	var surfImage = MAP(surfWing)(domain2);

	// Chiusura ala
	var curvaChiusa = [[10-10,0,0],[10-10,0,1.1],[6-10,0,1.1],[6-10,0,0]];
	var chiudiAla = [];
	chiudiAla.push(drawBezierS0( movexWingSection(scaleWingSection(moveWingSection(wingcontrol, lastZ), 0.5), -0.7) ));
	chiudiAla.push(drawBezierS0( movexWingSection(scaleWingSection(moveWingSection(curvaChiusa, lastZ), 0.5), -0.7) ));
	var surfchiudiAla1 = BEZIER(S1)(chiudiAla);
	var surfImchiudiAla1 = MAP(surfchiudiAla1)(domain2);

	var curvaChiusa2 = [[6-10,0,0],[9.9-10,0,0]];
	var tappoAla = [];
	tappoAla.push(drawBezierS0( movexWingSection(scaleWingSection(moveWingSection(curvaChiusa, lastZ), 0.5), -0.7) ));
	tappoAla.push(drawBezierS0( movexWingSection(scaleWingSection(moveWingSection(curvaChiusa2, lastZ), 0.5), -0.7) ));	
	var tappoWing = BEZIER(S1)(tappoAla);
	var surfTappo = MAP(tappoWing)(domain2);
	
	// prova ruote
	
	var torusSurface = COLOR([105/255, 105/255, 105/255])( TORUS_SOLID([0.1, 0.9])([10,10,10]) );
	var steccainRuota = CUBOID([0.1,0.1,0.8]);
	var steccainRuota2 = T([1])([-0.8])(CUBOID([0.1,1.8,0.1]));
	var steccainRuota3 = T([0])([-0.8])(CUBOID([1.8,0.1,0.1]));
	var steccainRuota3 = T([0])([-0.8])(CUBOID([1.8,0.1,0.1]));
	var steccainSu = T([1,2])([0,+0.8])(CUBOID([0.1,3,0.1]));
	// 
	var strutturaRuota = COLOR([85/255, 107/255, 47/255])( STRUCT([steccainRuota,steccainRuota2,steccainRuota3,steccainSu]) );
	var ruotaSotto = T([0,1,2])([-3,-1.2,zRuote])( S([0,1,2])([0.5,0.5,0.5])( STRUCT([torusSurface,strutturaRuota]) ));

	var tuttoInsieme = STRUCT([ 
		COLOR([189/255,183/255,107/255])( STRUCT([surfImage,surfImchiudiAla1,surfTappo]) ),
		ruotaSotto
		]);
		
	return tuttoInsieme;
};

var getFusModel = function() {
	var drawHalfSphere = function(r,color){
		r = r || 1;
		color = color || [255/255,204/255,0/255, 1];

		var domain = DOMAIN([[0,PI/2],[0,2*PI]])([r*20,r*20]);

		var mapping = function(p){
			var u = p[0];
			var v = p[1];

			return [
				r*SIN(u)*COS(v),
				r*SIN(u)*SIN(v),
				r*COS(u)
			];
		};

		var mapped = MAP(mapping)(domain);

		return COLOR(color)(mapped);
	};
	
	var drawBezierS0Curve = function(controlPoints) {
		// var domain = INTERVALS(1)(80); // In HD xD

		// punti di controllo
		// var listaDfacce = [];
		// controlPoints.forEach( function(v,i) { listaDfacce.push([i]); } );
		// DRAW( COLOR([0.1,0.6,0.2])( SIMPLICIAL_COMPLEX(controlPoints)(listaDfacce) ) );

		// polyline che unisce punti di controllo
		// DRAW( COLOR([0.5,0.2,0.7])( POLYLINE(controlPoints) ) );

		// curva
		var curveMapping = BEZIER(S0)(controlPoints);
		// var curve = MAP(curveMapping)(domain);
		// DRAW( COLOR([0,0.5,0.5])( curve ) );

		return curveMapping;
	};
	
	var drawBezierS0 = function(controlPoints) {
		return BEZIER(S0)(controlPoints);
	};

	var scaleFusSection = function(controlWing, scaleFactor) {
		return controlWing.map(function(p) { return [p[0] * scaleFactor, p[1] * scaleFactor, p[2]]; } );
	};

	var moveFusSection = function(controlWing, zeta) {
		return controlWing.map(function(p) { return [p[0], p[1], p[2] + zeta]; } );
	};

	var moveyFusSection = function(controlWing, ics) {
		return controlWing.map(function(p) { return [p[0], p[1] + ics, p[2]]; } );
	};	

	// DRAW(POLYLINE([[0.0],[-0.6,0]]));

	// Frontalino
	var controls = [[0.6, 0, 0], [0.6, -2, 0], [-0.75, -2, 0], [0, -1, 0], [-1.3, 0, 0], [-1.3, 0.6, 0], [0.6, 0.6, 0], [0.6, 0, 0]];
	
	var fusProfile = [];
	var lastZ = 0;
	// scaliamo i punti di 1.2 o 1.3 ed e' fatto... poi i successivi di 2 e poi di 0.9
	// aumentando le z
	fusProfile.push(drawBezierS0Curve(controls));
	lastZ = lastZ + 0.2;
	fusProfile.push(drawBezierS0Curve(controls));
	lastZ = 2.45;
	fusProfile.push(drawBezierS0Curve( moveyFusSection(scaleFusSection(moveFusSection(controls, lastZ), 1.28), 0.45) ));
	lastZ = lastZ + 0.2;
	fusProfile.push(drawBezierS0Curve( moveyFusSection(scaleFusSection(moveFusSection(controls, lastZ), 1.28), 0.45) ));
	lastZ = lastZ + 5.3;
	fusProfile.push(drawBezierS0Curve( moveyFusSection(scaleFusSection(moveFusSection(controls, lastZ), 1.28), 0.45) ));
	lastZ = lastZ + 0.2;
	fusProfile.push(drawBezierS0Curve( moveyFusSection(scaleFusSection(moveFusSection(controls, lastZ), 1.28), 0.45) ));	
	lastZ = lastZ + 2.4;
	fusProfile.push(drawBezierS0Curve( moveyFusSection(scaleFusSection(moveFusSection(controls, lastZ), 1.28), 0.5) ));
	lastZ = lastZ + 0.2;
	fusProfile.push(drawBezierS0Curve( moveyFusSection(scaleFusSection(moveFusSection(controls, lastZ), 1.28), 0.5) ));
	lastZ = 13.8;
	fusProfile.push(drawBezierS0Curve( moveyFusSection(scaleFusSection(moveFusSection(controls, lastZ), 0.8), 0.3) ));
	lastZ = lastZ + 0.2;
	fusProfile.push(drawBezierS0Curve( moveyFusSection(scaleFusSection(moveFusSection(controls, lastZ), 0.8), 0.3) ));

	var domain2 = DOMAIN([[0,1],[0,1]])([30,30]);
	var surfFUS = BEZIER(S1)(fusProfile);
	var FUSImage = MAP(surfFUS)(domain2);
	
	
	var frontaleFusoliera = [];
	frontaleFusoliera.push(drawBezierS0Curve(controls));
	frontaleFusoliera.push(drawBezierS0Curve( moveyFusSection(scaleFusSection(moveFusSection(controls, -0.4), 0.6), 0) ));
	var surfFrontale = BEZIER(S1)(frontaleFusoliera);
	var surfFrontaleImm = MAP(surfFrontale)(domain2);	
	
	
	var curvaChiusa = [[0.6, 0, 0]];
	var chiusuraFus = [];
	chiusuraFus.push(drawBezierS0Curve( moveyFusSection(scaleFusSection(moveFusSection(controls, -0.4), 0.6), 0) ));
	chiusuraFus.push(drawBezierS0Curve( moveyFusSection(scaleFusSection(moveFusSection(curvaChiusa, -0.4), 0.6), 0) ));
	var surfFrontaleChiusura = BEZIER(S1)(chiusuraFus);
	var surfFrontaleChiusuraImm = MAP(surfFrontaleChiusura)(domain2);
	
	var modellinoIncastroElica = T([2])([0.3])(S([0,1])([0.2,0.2])(S([2])([-1])(drawHalfSphere())));
	
	var chiusuraFusDietro = [];
	chiusuraFusDietro.push(drawBezierS0Curve( moveyFusSection(scaleFusSection(moveFusSection(controls, lastZ), 0.8), 0.3) ));
	chiusuraFusDietro.push(drawBezierS0Curve( moveyFusSection(scaleFusSection(moveFusSection(curvaChiusa, lastZ), 0.8), 0.3) ));
	var surfDietroChiusura = BEZIER(S1)(chiusuraFusDietro);
	var surfDietroChiusuraImm = MAP(surfDietroChiusura)(domain2);
	
	// Tentativo chiusura micro
	var chiudiFusMicro = [];
	chiudiFusMicro.push(drawBezierS0Curve( moveyFusSection(scaleFusSection(moveFusSection(controls, lastZ), 0.8), 0.3) ));
	lastZ = lastZ + 0.2;
	chiudiFusMicro.push(drawBezierS0Curve( moveyFusSection(scaleFusSection(moveFusSection(controls, lastZ), 0.4), 0.3) ));
	var surfchiudiFusMicro = BEZIER(S1)(chiudiFusMicro);
	var surfchiudiFusMicroImm = MAP(surfchiudiFusMicro)(domain2);
	
	var chiudiLaFusMicro = [];
	chiudiLaFusMicro.push(drawBezierS0Curve( moveyFusSection(scaleFusSection(moveFusSection(controls, lastZ), 0.4), 0.3) ));
	chiudiLaFusMicro.push(drawBezierS0Curve( moveyFusSection(scaleFusSection(moveFusSection(curvaChiusa, lastZ), 0.4), 0.3) ))
	var surfchiudiLaFusMicro = BEZIER(S1)(chiudiLaFusMicro);
	var surfchiudiLaFusMicroImm = MAP(surfchiudiLaFusMicro)(domain2);
	
	// Elica
	var cpointElica = [[0,0,0],[1,1.5,0],[2,4,0],[0.5,2,0],[0,0,0]];
	var cpointElicaChiudi = [[0,0,0]];
	
	var listElicaSolida = [];
	var listElicaSup1 = [];
	var listElicaSup2 = [];
	listElicaSup1.push(drawBezierS0Curve(cpointElica));
	listElicaSup1.push(drawBezierS0Curve(cpointElicaChiudi));
	listElicaSup2.push(drawBezierS0Curve(moveFusSection(cpointElica,0.02)));
	listElicaSup2.push(drawBezierS0Curve(moveFusSection(cpointElicaChiudi,0.02)));
	listElicaSolida.push( BEZIER(S1)(listElicaSup1) );
	listElicaSolida.push( BEZIER(S1)(listElicaSup2) );
	
	var domain3 = DOMAIN([[0,1],[0,1],[0,1]])([50,1,1]);
	var elicaBezier = BEZIER(S2)(listElicaSolida);
	var elicaImmagine = MAP(elicaBezier)(domain3);	

	var elicaSolida = T([2])([-0.6])( S([0,1])([0.5,0.5])( STRUCT([elicaImmagine, R([0,1])(PI), elicaImmagine]) ) );
	
	// Finestra
	var vetroFinestra = T([0,2])([-0.4,2.45])(BOUNDARY(CUBOID([0.8,1,0.1])));
	var colFinestra = COLOR([30/255, 144/255, 254/255, 0.6])(vetroFinestra);
	
	var tuttoInsieme = STRUCT([
		COLOR([255/255,204/255,0/255, 1])( STRUCT([FUSImage,surfFrontaleImm,surfFrontaleChiusuraImm,surfDietroChiusuraImm,surfchiudiFusMicroImm,surfchiudiLaFusMicroImm]) ), 
		
		COLOR([169/255,169/255,169/255, 1])(modellinoIncastroElica),
		
		COLOR([5/255,5/255,5/255, 1])( elicaSolida ),
		
		colFinestra
		]);
		
	return tuttoInsieme;
};

var stabilizzatoriDiCodaVert = function () {
	var drawBezierS0 = function(controlPoints) {
		return BEZIER(S0)(controlPoints);
	};

	var moveFusSection = function(controlWing, zeta) {
		return controlWing.map(function(p) { return [p[0], p[1], p[2] + zeta]; } );
	};
	
	var domain2 = DOMAIN([[0,1],[0,1]])([50,50]);
	var domain3 = DOMAIN([[0,1],[0,1],[0,1]])([50,1,1]);

	var p0 = [[0,-0.85, 0], [2.3,0,0], [0.8,2,0], [1.3/3,2,0], [1.3/3,2,0], [2, 0.1, 0], [-2.5, 0.6, 0], [-2.5, 0.6, 0], [0,-0.85, 0]];
	var p0chiusa = [[0,-0.85, 0]];
	
	var listPSup = [];
	
	var listSupP0 = [];
	listSupP0.push(drawBezierS0(p0));
	listSupP0.push(drawBezierS0(p0chiusa));
	
	listPSup.push( BEZIER(S1)(listSupP0) );
	
	var listSupP1 = [];
	listSupP1.push(drawBezierS0(moveFusSection(p0, 0.1)));
	listSupP1.push(drawBezierS0(moveFusSection(p0chiusa, 0.1)));
	
	listPSup.push( BEZIER(S1)(listSupP1) );
	
	var timoneVerticaleBez = BEZIER(S2)(listPSup);
	var timoneVerticaleImm = MAP(timoneVerticaleBez)(domain3);
	
	return timoneVerticaleImm;
};

var stabilizzatoriDiCodaOrizz = function () {	
	var drawBezierS0 = function(controlPoints) {
		return BEZIER(S0)(controlPoints);
	};

	var moveFusSection = function(controlWing, zeta) {
		return controlWing.map(function(p) { return [p[0], p[1] + zeta, p[2]]; } );
	};
	
	var domain2 = DOMAIN([[0,1],[0,1]])([50,50]);
	var domain3 = DOMAIN([[0,1],[0,1],[0,1]])([50,1,1]);

	var p0 = [[0,0,0.1], [0.5,0,0.1],
	[0.5, 0, 0.6], [0.5, 0, 0.8], [0.5, 0, 1], [0.5, 0, 1.2], [0.5, 0, 1.4], [0.5, 0, 1.7], [0.5, 0, 2], [0.5, 0, 2.2], [0.5, 0, 2.4], [0.5, 0, 2.6],       
	[2, 0, 4], [0, 0, 1], [-2, 0, 4], 
	[-2, 0, 2.6], [-2, 0, 2.4], [-2, 0, 2.2], [-2, 0, 2], [-2, 0, 1.7], [-2, 0, 1.4], [-2, 0, 1.2], [-2, 0, 1], [-2, 0, 0.8], [-2, 0, 0.6], 
	[-2,0,0.1], [0,0,0.1]];
	var p0chiusa = [[0,0,0.1]];
	
	var listPSup = [];
	var listSupP0 = [];
	var listSupP01 = [];
	
	listSupP0.push(drawBezierS0(p0));
	listSupP0.push(drawBezierS0(p0chiusa));
	listSupP01.push(drawBezierS0(moveFusSection(p0,0.1)));
	listSupP01.push(drawBezierS0(moveFusSection(p0chiusa,0.1)));
	listPSup.push( BEZIER(S1)(listSupP0) );
	listPSup.push( BEZIER(S1)(listSupP01) );
	
	
	var p1 = [[0,0,-0.1], [0.5,0,-0.1],
	[0.5, 0, -0.6], [0.5, 0, -0.8], [0.5, 0, -1], [0.5, 0, -1.2], [0.5, 0, -1.4], [0.5, 0, -1.7], [0.5, 0, -2], [0.5, 0, -2.2], [0.5, 0, -2.4], [0.5, 0, -2.6],       
	[2, 0, -4], [0, 0, -1], [-2, 0, -4], 
	[-2, 0, -2.6], [-2, 0, -2.4], [-2, 0, -2.2], [-2, 0, -2], [-2, 0, -1.7], [-2, 0, -1.4], [-2, 0, -1.2], [-2, 0, -1], [-2, 0, -0.8], [-2, 0, -0.6], 
	[-2,0,-0.1], [0,0,-0.1]];
	var p1chiusa = [[0,0,-0.1]];
	
	var listPSup1 = [];
	var listSupP1 = [];
	var listSupP11 = [];
	listSupP1.push(drawBezierS0(p1));
	listSupP1.push(drawBezierS0(p1chiusa));
	listSupP11.push(drawBezierS0(moveFusSection(p1,0.1)));
	listSupP11.push(drawBezierS0(moveFusSection(p1chiusa,0.1)));
	listPSup1.push( BEZIER(S1)(listSupP1) );
	listPSup1.push( BEZIER(S1)(listSupP11) );
	
	var timoneVerticaleBez1 = BEZIER(S2)(listPSup);
	var timoneVerticaleImm1 = MAP(timoneVerticaleBez1)(domain3);
	
	var timoneVerticaleBez2 = BEZIER(S2)(listPSup1);
	var timoneVerticaleImm2 = MAP(timoneVerticaleBez2)(domain3);
	
	return STRUCT([T([2])([-0.05])(timoneVerticaleImm1),T([2])([0.15])(timoneVerticaleImm2)]);
};

var drawTimoni = function() {
	return STRUCT([COLOR([255/255,204/255,0/255])( stabilizzatoriDiCodaVert() ),
	
	    COLOR([189/255,183/255,107/255])( stabilizzatoriDiCodaOrizz()) 
		]);
};

var drawAereo = function() {
	var alaInPosizione = T([1,2])([-0.8,8.45])( R([0,2])(-PI/2)(getWingModel()));
	var alaSpeculare = S([0])([-1])(alaInPosizione);
	var timoni = T([1,2])([0.5,14.15])( R([0,2])(-PI/2)( drawTimoni() ) );
	return STRUCT([
		alaInPosizione,
		getFusModel(),
		alaSpeculare,
		timoni
	]);
}

DRAW(drawAereo());
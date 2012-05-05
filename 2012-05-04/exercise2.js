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
	
	var tuttoInsieme = STRUCT([
		COLOR([255/255,204/255,0/255, 1])( STRUCT([FUSImage,surfFrontaleImm,surfFrontaleChiusuraImm,surfDietroChiusuraImm,modellinoIncastroElica]) ), 
		
		COLOR([5/255,5/255,5/255, 1])( elicaSolida )
		]);
		
	return tuttoInsieme;
};

DRAW( getFusModel() );
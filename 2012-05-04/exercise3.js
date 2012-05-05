// TODO
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
	var drawBezierS0Curve = function(controlPoints) {
		var domain = INTERVALS(1)(80); // In HD xD

		// punti di controllo
		var listaDfacce = [];
		controlPoints.forEach( function(v,i) { listaDfacce.push([i]); } );
		DRAW( COLOR([0.1,0.6,0.2])( SIMPLICIAL_COMPLEX(controlPoints)(listaDfacce) ) );

		// polyline che unisce punti di controllo
		DRAW( COLOR([0.5,0.2,0.7])( POLYLINE(controlPoints) ) );

		// curva
		var curveMapping = BEZIER(S0)(controlPoints);
		var curve = MAP(curveMapping)(domain);
		DRAW( COLOR([0,0.5,0.5])( curve ) );

		return curveMapping;
	};
	
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
}

DRAW(stabilizzatoriDiCodaVert());

	
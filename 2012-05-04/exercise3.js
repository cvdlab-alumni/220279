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
	return STRUCT([COLOR([255/255,204/255,0/255, 1])( stabilizzatoriDiCodaVert() ),
	
	    COLOR([255/255,204/255,0/255, 1])( stabilizzatoriDiCodaOrizz()) 
		]);
};

DRAW( drawTimoni() );


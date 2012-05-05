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

DRAW( getWingModel() );
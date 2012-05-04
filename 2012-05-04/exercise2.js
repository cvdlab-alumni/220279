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

// DRAW(POLYLINE([[0.0],[-0.6,0]]));

// Frontalino
var controls = [[0.6, 0, 0], [0.6, -2, 0], [-0.75, -2, 0], [0, -1, 0], [-1.3, 0, 0], [-1.3, 0.6, 0], [0.6, 0.6, 0], [0.6, 0, 0]];

// scaliamo i punti di 1.2 o 1.3 ed e' fatto... poi i successivi di 2 e poi di 0.9
// aumentando le z

drawBezierS0Curve(controls);
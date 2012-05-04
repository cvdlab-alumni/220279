// TODO
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
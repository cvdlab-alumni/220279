var pillars = SIMPLEX_GRID([
	REPLICA(3)([0.15, -6*2.4, 0.15]),  // x (*3)
	[0.15, -6*2.4, 0.15],			   // y
	[1.5,3,3]						   // z
]);

// DRAW(pillars);

var beams = SIMPLEX_GRID([
	REPLICA(3)([0.15, -6*2.4, 0.15]),  // x (*3)
	[0.15 + 6*2.4 + 0.15],			   // y
	[-(1.5 + 3 + 3), 1.5]						   // z
]);

// DRAW(beams);

// var buildingSkeleton = STRUCT([pillars, beams]);
// DRAW(buildingSkeleton);

// Colore [RGB] normlizzato tra 0 e 1
var steelFrames = COLOR([0.2,0.2,0.2])(STRUCT([pillars, beams]));

// I solai
var floors = SIMPLEX_GRID([
	REPLICA(3)(14.7),
	[-0.15, 14.4, -0.15],
	[-1.2, 0.3, -2.7, 0.3, -2.7, 0.3]
]);

var building = STRUCT([steelFrames, floors]);
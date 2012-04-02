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

var buildingSkeleton = STRUCT([pillars, beams]);
DRAW(buildingSkeleton);
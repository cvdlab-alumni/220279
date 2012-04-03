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

// var building = STRUCT([steelFrames, floors]);

// Struttura a sbalzo
// piano
var cantivelerFloors = SIMPLEX_GRID([
	[0.15, 2*2.4, 0.15],
	[-0.15, 14.4, -0.15],
	[-1.2, 0.3, -2.7, 0.3, -2.7, 0.3]
]);
// pilastro
var cantivelerPillars = SIMPLEX_GRID([
	[0.15],
	[0.15,-14.4,0.15],
	[1.5,3,3]
]);
// travi
var cantivelerBeams = SIMPLEX_GRID([
	[0.15],
	[14.7],
	[-7.5,1.5]
]);

var cantilever = STRUCT([cantivelerFloors,cantivelerPillars,cantivelerBeams]);
// Ribalto e diventa nero (a causa dello scambio interno dei simplessi)
var cantilever1 = S([0])([-1])(cantilever);
// Traslo
var cantilever2 = T([0])([3*14.7])(cantilever);


var building = STRUCT([steelFrames, floors, cantilever1, cantilever2]);

// Costruiamo il pannello interno (3 griglie di simplessi)
var grid1 = SIMPLEX_GRID([[-0.15, 0.05, -2.3, 0.05, -0.15], [7.5]])
var grid2 = SIMPLEX_GRID([[-0.15, -0.05, 2.3, -0.05, ]])
var grid3 = SIMPLEX_GRID([[]])

// le finestre
var panel = SIMPLEX_GRID([])

var grid = COLOR([0.2,0.2,0.2])(STRUCT([grid1,grid2,grid3]));

// Funzione che colora le finestre e li mergia ad una grid
var frame = function(color) {
	return STRUCT([COLOR(color)(panel), grid]);
}

// Replica gruppi con panello
var frameGroup = function(number, color){
	return STRUCT(REPLICA(number)([frame(color), T([0])([2.4])]));
}
var up = STRUCT([
POLYLINE([[0,0],[9,0]]),
POLYLINE([[1,1],[4,1]]),
POLYLINE([[5,1],[8,1]]),
POLYLINE([[0,3],[1,3]]),
POLYLINE([[4,3],[5,3]]),
POLYLINE([[8,3],[9,3]]),

POLYLINE([[0,0],[0,3]]),
POLYLINE([[1,1],[1,3]]),
POLYLINE([[4,1],[4,3]]),
POLYLINE([[5,1],[5,3]]),
POLYLINE([[8,1],[8,3]]),
POLYLINE([[9,0],[9,3]]),
]);

var down = STRUCT([
POLYLINE([[0,7],[9,7]]),
POLYLINE([[1,6],[4,6]]),
POLYLINE([[5,6],[8,6]]),
POLYLINE([[0,4],[1,4]]),
POLYLINE([[4,4],[5,4]]),
POLYLINE([[8,4],[9,4]]),

POLYLINE([[0,4],[0,7]]),
POLYLINE([[1,4],[1,6]]),
POLYLINE([[4,4],[4,6]]),
POLYLINE([[5,4],[5,6]]),
POLYLINE([[8,4],[8,6]]),
POLYLINE([[9,4],[9,7]]),
]);

var labPiano = STRUCT([up,down]);

var lab3d = COLOR([0.2,0.1,0.2,0.3])(EXTRUDE([3])(labPiano));
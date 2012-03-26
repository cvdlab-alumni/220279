var dominio = DOMAIN([[0,1]])([10]);
/* p e' un array di m coordinate */
var mapping = function(p) {
	var u = p[0];

	return [u,1];
};
/* mappa ritorna nuovo dominio MAP(funzione mapping)(dominio da mappare) */
var mapped = MAP(mapping)(dominio);

/*****/

var dominioBisettrice = DOMAIN([[0,10]])([100]);

var mappingBisettrice = function(p) {
	var u = p[0];

	return [u,u];
};

var mappedBisettrice = MAP(mappingBisettrice)(dominioBisettrice);

/****/

var dominioSin = DOMAIN([[0,100*PI]])([1000]);

var mappingSin = function(p) {
	var u = p[0];

	return [u,SIN(u)];
};

var mappedSin = MAP(mappingSin)(dominioSin);
DRAW(mappedSin);

/****/


var drawCircle = function(r,n) {
	var dominioCircle = DOMAIN([[0,2*PI]])([n]);

	var mappingCircle = function(p) {
		var u = p[0];
		return [r * COS(u), r * SIN(u)];
	};

	var mappedCircle = MAP(mappingCircle)(dominioCircle);
	DRAW(mappedCircle);
};

/*****/

var drawCilinder = function(r,h,n,m,color) {
	var dominioCircle = DOMAIN([[0,2*PI],[0,h]])([n,m]);

	var mappingCircle = function(p) {
		var u = p[0];
		var v = p[1];
		return [r * COS(u), r * SIN(u), v];
	};

	var mappedCircle = MAP(mappingCircle)(dominioCircle);
	DRAW(mappedCircle);
	COLOR(color)(mappedCircle);
};
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

var dominioSin = DOMAIN([[0,100]])([1000]);

var mappingSin = function(p) {
	var u = p[0];

	return [u,Math.sin(u)];
};

var mappedSin = MAP(mappingSin)(dominioSin);
DRAW(mappedSin);